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

  // ---- hero scroll-scrubbed frame sequence (canvas) ----
  const heroTrack = document.getElementById('heroTrack');
  const heroCanvas = document.getElementById('heroCanvas');
  const isNarrow = window.matchMedia('(max-width: 900px)').matches;

  if (heroTrack && heroCanvas && !reduceMotion && !isNarrow) {
    const FRAME_COUNT = 60;
    const ctx = heroCanvas.getContext('2d');
    const frames = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `assets/img/hero-frames/frame-${String(i).padStart(3, '0')}.webp`;
      frames.push(img);
    }
    frames[0].addEventListener('load', () => draw(0));

    function resizeCanvas() {
      const rect = heroCanvas.getBoundingClientRect();
      heroCanvas.width = Math.round(rect.width * devicePixelRatio);
      heroCanvas.height = Math.round(rect.height * devicePixelRatio);
      draw(currentFrame);
    }

    function draw(index) {
      const img = frames[index];
      if (!img || !img.complete || !img.naturalWidth) return;
      const cw = heroCanvas.width, ch = heroCanvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw, dh, dx, dy;
      if (ir > cr) { dh = ch; dw = ch * ir; dx = cw - dw; dy = 0; }
      else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    let currentFrame = 0;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const heroHeight = document.querySelector('.hero').offsetHeight;
        const pinDistance = heroTrack.offsetHeight - heroHeight;
        const scrolled = -heroTrack.getBoundingClientRect().top;
        const progress = pinDistance > 0 ? Math.min(1, Math.max(0, scrolled / pinDistance)) : 0;
        currentFrame = Math.round(progress * (FRAME_COUNT - 1));
        draw(currentFrame);
        ticking = false;
      });
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', onScroll, { passive: true });
    resizeCanvas();
    onScroll();
  }
})();
