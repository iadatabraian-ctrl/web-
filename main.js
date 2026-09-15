(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  // ---- scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Number(el.dataset.d || 0) * 120;
        setTimeout(() => el.classList.add('is-in'), delay);
        io.unobserve(el);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  // ---- story stage: laptop hilo conductor de toda la página ----
  const wide = window.matchMedia('(min-width: 901px)').matches;
  const storyStage = document.getElementById('storyStage');

  if (storyStage && wide && !reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const STAGE_HALF_W = 170;  // half of .story-stage's own 340px width
    const STAGE_HALF_H = 127.5; // half of its 4:3 height

    // Los anchors invisibles ahora solo deciden CUÁNDO pasa cada tramo (su posición
    // real en el documento, medida una vez), no DÓNDE dibujar la laptop. Usar su
    // getBoundingClientRect() en vivo para la posición fallaba en cuanto la sección
    // scrolleaba fuera de la pantalla (el "dwell" de Software, por ejemplo, dura
    // todo Servicios+Proceso — mucho más que lo que el propio anchor pasa a la
    // vista), así que el DÓNDE es una fracción fija del viewport por tramo, y solo
    // se interpola entre las fracciones del tramo actual y el siguiente.
    const anchors = {
      hero: document.getElementById('anchorHero'),
      diagnostico: document.getElementById('anchorDiagnostico'),
      software: document.getElementById('anchorSoftware'),
      proceso: document.getElementById('anchorProceso'),
      cierre: document.getElementById('anchorCierre'),
    };
    // La laptop se queda siempre del mismo lado (derecha) — igual que en la
    // referencia del Hero: texto/tarjetas a la izquierda, laptop a la derecha,
    // siempre. Alternar de lado (probado y descartado) hacía que la laptop
    // tuviera que cruzar todo el ancho de pantalla justo cuando las tarjetas del
    // tramo siguiente ya estaban visibles del otro lado, pisándolas. La variedad
    // entre tramos ahora viene de tamaño/altura/rotación, no de lado.
    // "chassis" es la orientación de la imagen: como la pantalla (código/gráfico)
    // está pintada en la misma foto que el chasis, no se puede espejar por CSS sin
    // que el texto quede al revés — se generó una segunda imagen real, rotada
    // 3/4 hacia el otro lado, para que la laptop "mire" hacia el contenido
    // (a la izquierda) en vez de mirar hacia afuera.
    const tramoOrder = ['hero', 'diagnostico', 'software', 'proceso', 'cierre'];
    const tramoPose = {
      hero: { xPct: 0.80, yPct: 0.85, scale: 2.3, rotation: 0, chassis: 'open' },
      diagnostico: { xPct: 0.76, yPct: 0.46, scale: 1.05, rotation: -4, chassis: 'openMirrored' },
      software: { xPct: 0.76, yPct: 0.44, scale: 1.55, rotation: 3, chassis: 'openMirrored' },
      proceso: { xPct: 0.76, yPct: 0.50, scale: 1.05, rotation: -3, chassis: 'openMirrored' },
      cierre: { xPct: 0.5, yPct: 0.07, scale: 0.4, rotation: 0, chassis: 'open' },
    };

    const screens = {
      closed: document.getElementById('laptopClosed'),
      open: document.getElementById('laptopOpen'),
      openMirrored: document.getElementById('laptopOpenMirrored'),
      web: document.getElementById('screenWeb'),
      nodos: document.getElementById('screenNodos'),
      chat: document.getElementById('screenChat'),
    };

    function lerp(a, b, t) { return a + (b - a) * t; }
    function clamp01(v) { return Math.max(0, Math.min(1, v)); }
    function trapezoid(p, inStart, inEnd, outStart, outEnd) {
      if (p <= inStart || p >= outEnd) return 0;
      if (p >= inEnd && p <= outStart) return 1;
      if (p < inEnd) return (p - inStart) / (inEnd - inStart);
      return 1 - (p - outStart) / (outEnd - outStart);
    }

    const serviciosEl = document.getElementById('servicios');

    let boundaries = [];   // position tramos (hero/diagnostico/software/cierre)
    let bWeb = 0, bAuto = 0, bCierre = 0; // screen-content timing within Servicios
    function measureBoundaries() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;
      const svcTop = docTop(serviciosEl);
      const svcHeight = serviciosEl.offsetHeight;
      const frac = (v) => (scrollable > 0 ? clamp01(v / scrollable) : 0);

      boundaries = tramoOrder.map(key => frac(docTop(anchors[key])));

      // Estas 3 bandas de pantalla (código/web/nodos/chat) tienen que quedar
      // encerradas DENTRO del propio alto de Servicios — no hasta el anchor de
      // Cierre, que puede estar mucho más lejos (Proceso/Directo/Nosotros de por
      // medio) y antes hacía que el último tramo (chat) se extendiera y quedara
      // visible superpuesto sobre la pose de Proceso.
      bWeb = frac(svcTop + svcHeight * 0.4);
      bAuto = frac(svcTop + svcHeight * 0.7);
      bCierre = frac(svcTop + svcHeight);
    }
    measureBoundaries();
    window.addEventListener('resize', () => remeasureAndRender());

    function setScreens(weights) {
      for (const key in screens) {
        screens[key].style.opacity = weights[key] ?? 0;
      }
    }

    function render(p) {
      // fade the whole stage in near the top and out shortly after the Cierre anchor
      // (Cierre sits inside the CTA card, well before the footer — the widget must not
      // linger past it).
      const cierreB = boundaries[boundaries.length - 1];
      const fadeOut = clamp01((cierreB + 0.04 - p) / 0.04);

      // find the two nearest tramos and the local blend between them
      let i = 0;
      while (i < boundaries.length - 2 && p > boundaries[i + 1]) i++;
      const from = tramoOrder[i], to = tramoOrder[i + 1];
      const span = boundaries[i + 1] - boundaries[i];
      const t = span > 0 ? clamp01((p - boundaries[i]) / span) : 0;

      const poseA = tramoPose[from], poseB = tramoPose[to];
      const scale = lerp(poseA.scale, poseB.scale, t);
      const rotation = lerp(poseA.rotation, poseB.rotation, t);
      const cx = lerp(poseA.xPct, poseB.xPct, t) * window.innerWidth;
      const cy = lerp(poseA.yPct, poseB.yPct, t) * window.innerHeight;
      // qué chasis (orientación) mostrar: no se puede "mezclar" dos fotos distintas,
      // así que se elige una de las dos en vez de cruzarlas en opacity (se vería
      // doble-expuesto). Cambia casi apenas arranca la transición hacia el próximo
      // tramo — el tramo de destino ya es visible en pantalla mucho antes de que
      // termine de moverse/escalar hasta su lugar final, así que esperar a t=0.5
      // dejaba la orientación vieja puesta sobre las tarjetas nuevas.
      const chassis = t < 0.12 ? poseA.chassis : poseB.chassis;

      gsap.set(storyStage, {
        opacity: fadeOut,
        x: cx - STAGE_HALF_W,
        y: cy - STAGE_HALF_H,
        scale,
        rotation,
      });

      // screen content: discrete bands over the global progress, independent of the x/y/scale blend above
      const spanWeb = bAuto - bWeb;
      const spanAuto = bCierre - bAuto;

      const closedW = trapezoid(p, 0, 0, 0, 0.03);
      setScreens({
        closed: closedW,
        open: chassis === 'open' ? 1 - closedW : 0,
        openMirrored: chassis === 'openMirrored' ? 1 - closedW : 0,
        web: trapezoid(p, bWeb - spanWeb * 0.2, bWeb, bWeb + spanWeb * 0.45, bWeb + spanWeb * 0.6),
        nodos: trapezoid(p, bAuto - spanAuto * 0.15, bAuto, bAuto + spanAuto * 0.25, bAuto + spanAuto * 0.35),
        chat: trapezoid(p, bAuto + spanAuto * 0.3, bAuto + spanAuto * 0.45, bAuto + spanAuto * 0.7, bAuto + spanAuto * 0.8),
      });
    }

    const masterTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => render(self.progress),
    });
    render(0);

    // sections can still resize once web fonts/images finish (layout shift), which
    // would leave `boundaries` stale until the next scroll — refresh + redraw once
    // those settle, using whatever scroll position the user is at by then.
    function remeasureAndRender() {
      ScrollTrigger.refresh();
      measureBoundaries();
      render(masterTrigger.progress);
    }
    if (document.readyState === 'complete') {
      remeasureAndRender();
    } else {
      window.addEventListener('load', remeasureAndRender);
    }
    document.fonts?.ready.then(remeasureAndRender);
  }
})();
