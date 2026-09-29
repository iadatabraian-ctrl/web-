"use client";

import { useEffect, useRef, type RefObject } from "react";

type Vec2 = [number, number];
type Vec3 = [number, number, number];

interface PathData {
  pts: Vec2[];
  cum: number[];
  L: number;
}

type NodeKind = "web" | "panel" | "chat" | "flow" | "phone" | "store" | "kanban" | "table" | "calendar" | "cube";

interface NodeSeed {
  x: number;
  z: number;
  kind: NodeKind;
  p: number;
  lx?: number;
  lz?: number;
}

interface NodeDef extends NodeSeed {
  i: number;
  bx: number;
  bz: number;
  g: number;
  bit: boolean;
  dC: number;
  ret: number;
  k: number;
  phi: number;
  dir: number;
  h: number;
  on: boolean;
  path: PathData | null;
  start: number;
  dur: number;
  tc: number;
  tl: number;
}

interface LinkDef {
  a: number;
  b: number;
  path: PathData | null;
  m: number;
}

// --brand-accent (#FF5C1A, app/globals.css). The approved status green (#22c55e)
// already matches this prototype's own green, so it needs no adjustment.
const ACCENT: Vec3 = [255, 92, 26];
// --brand-cream (#f6f1e7), used for the neutral chrome inside the mini screen UIs.
const CREAM: Vec3 = [246, 241, 231];
const OK: Vec3 = [34, 197, 94];

interface HeroBackgroundProps {
  stageRef: RefObject<HTMLDivElement | null>;
}

export default function HeroBackground({ stageRef }: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const wrapEl = canvasEl?.parentElement ?? null;
    const ctxMaybe = canvasEl?.getContext("2d") ?? null;
    const stageEl = stageRef.current;
    if (!canvasEl || !wrapEl || !ctxMaybe || !stageEl) return;
    // Non-null aliases: TS narrowing from the guard above doesn't carry into
    // the nested functions/closures below, so give them definite types once.
    const canvas: HTMLCanvasElement = canvasEl;
    const wrap: HTMLElement = wrapEl;
    const ctx: CanvasRenderingContext2D = ctxMaybe;
    const stage: HTMLElement = stageEl;

    const T = 18;
    const TAU = Math.PI * 2;
    const CAMY = 12, CAMZ = -2;
    let cp = Math.cos(0.62), sp = Math.sin(0.62);
    let W = 0, H = 0, f = 300, ox = 0, oy = 0;
    let SX = 0, SY = 0, SW = 0, SH = 0, lite = false;
    const mode: "diag" | "rect" = "diag";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = (navigator.hardwareConcurrency || 8) <= 4;
    const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2);
    const dustCount = lowPower ? 35 : 70;

    const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeIO = (x: number) => x * x * (3 - 2 * x);
    const ease3 = (x: number) => 1 - Math.pow(1 - x, 3);
    const fract = (x: number) => x - Math.floor(x);
    const st = (v: number, a: number, b: number) => clamp((v - a) / (b - a), 0, 1);

    function rng(seed: number) {
      return () => {
        seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const R = rng(47);

    function raw(x: number, y: number, z: number): Vec3 {
      const dy = y - CAMY, dz = z - CAMZ;
      const y2 = dy * cp + dz * sp;
      const z2 = -dy * sp + dz * cp;
      return [x / z2, -y2 / z2, z2];
    }
    function P(x: number, y: number, z: number): Vec3 {
      const r = raw(x, y, z);
      return [ox + f * r[0], oy + f * r[1], r[2]];
    }

    // ---------- Escena ----------
    const C = { x: 0, z: 13 };
    const CW = 3.6;
    const CARD_H = 0.71;
    const RMAX = 12.5, RG = 17;

    const NL: NodeSeed[] = [
      { x: -6.2, z: 9.0, kind: "web", p: -1, lx: -5.0, lz: 9.5 },
      { x: 6.2, z: 9.0, kind: "panel", p: -1, lx: 5.0, lz: 9.5 },
      { x: -8.2, z: 13.5, kind: "chat", p: -1, lx: -5.6, lz: 14.2 },
      { x: 8.2, z: 13.5, kind: "flow", p: -1, lx: 5.6, lz: 14.2 },
      { x: -3.4, z: 17.5, kind: "phone", p: 2, lx: -2.5, lz: 19.0 },
      { x: 3.4, z: 17.5, kind: "store", p: 3, lx: 2.5, lz: 19.0 },
      { x: -9.2, z: 18.6, kind: "kanban", p: 2 },
      { x: 9.2, z: 18.6, kind: "table", p: 3 },
      { x: 0, z: 21.8, kind: "calendar", p: 4 },
      { x: -5.8, z: 22.2, kind: "web", p: 6 },
      { x: 5.8, z: 22.2, kind: "chat", p: 7 },
    ];
    const XL: [number, number][] = [[0, 2], [1, 3], [4, 5], [6, 4], [7, 5]];

    const nodes: NodeDef[] = NL.map((p, i) => ({
      ...p, i, bx: p.x, bz: p.z, g: 0, bit: i % 2 === 0,
      dC: Math.hypot(p.x - C.x, p.z - C.z),
      ret: R() * 0.6, k: 4 + ((R() * 3) | 0), phi: R(), dir: R() < 0.35 ? -1 : 1,
      h: 0.7 + R() * 0.8, on: true, path: null, start: 0, dur: 0, tc: 0, tl: 0,
    }));

    function mkPath(ax: number, az: number, bx: number, bz: number, bit: boolean): PathData {
      const dx = bx - ax, dz = bz - az;
      const pts: Vec2[] = [[ax, az]];
      if (mode === "rect") {
        pts.push(bit ? [ax, bz] : [bx, az]);
      } else {
        const m = Math.min(Math.abs(dx), Math.abs(dz)), sx = Math.sign(dx), sz = Math.sign(dz);
        if (bit) pts.push([ax + sx * m, az + sz * m]);
        else if (Math.abs(dx) >= Math.abs(dz)) pts.push([ax + sx * (Math.abs(dx) - m), az]);
        else pts.push([ax, az + sz * (Math.abs(dz) - m)]);
      }
      pts.push([bx, bz]);
      const cum = [0];
      for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      return { pts, cum, L: cum[cum.length - 1] || 1 };
    }

    const links: LinkDef[] = XL.map(([a, b]) => ({ a, b, path: null, m: 0 }));

    function buildPaths() {
      nodes.forEach(n => {
        n.dC = Math.hypot(n.x - C.x, n.z - C.z);
        n.g = n.p < 0 ? 0 : nodes[n.p].g + 1;
        const from = n.p < 0 ? C : nodes[n.p];
        n.path = mkPath(from.x, from.z, n.x, n.z, n.bit);
        if (n.p < 0) {
          n.start = 3.1 + n.dC * 0.2 + (n.bit ? 0 : 0.12);
          n.dur = 1.2 + 0.07 * n.path.L;
        } else {
          n.start = nodes[n.p].tc + 0.12 + (n.i % 3) * 0.08;
          n.dur = 1.0 + 0.06 * n.path.L;
        }
        n.tc = n.start + n.dur;
        n.tl = 9.4 + (n.dC / RG) * 2.8;
      });
      links.forEach((l, i) => {
        const A = nodes[l.a], B = nodes[l.b];
        l.path = mkPath(A.x, A.z, B.x, B.z, i % 2 === 0);
        l.m = Math.max(A.tc, B.tc);
      });
    }
    buildPaths();

    function pointAt(path: PathData, s: number): Vec2 {
      const d = clamp(s, 0, 1) * path.L;
      for (let i = 1; i < path.pts.length; i++) {
        if (d <= path.cum[i] + 1e-9) {
          const seg = path.cum[i] - path.cum[i - 1] || 1;
          const k = (d - path.cum[i - 1]) / seg;
          return [lerp(path.pts[i - 1][0], path.pts[i][0], k), lerp(path.pts[i - 1][1], path.pts[i][1], k)];
        }
      }
      const l = path.pts[path.pts.length - 1];
      return [l[0], l[1]];
    }
    function subPath(path: PathData, a: number, b: number): Vec2[] {
      const out: Vec2[] = [pointAt(path, a)];
      const da = a * path.L, db = b * path.L;
      for (let i = 1; i < path.pts.length - 1; i++) {
        if (path.cum[i] > da + 1e-6 && path.cum[i] < db - 1e-6) out.push(path.pts[i]);
      }
      out.push(pointAt(path, b));
      return out;
    }

    // Encuadre: la escena se ajusta al "escenario" reservado en el flujo del hero,
    // no a toda la pantalla. La rejilla, las ondas y las partículas sí cubren el fondo entero.
    function fit() {
      let umin = 1e9, umax = -1e9, vmin = 1e9, vmax = -1e9;
      const add = (x: number, y: number, z: number) => {
        const r = raw(x, y, z);
        umin = Math.min(umin, r[0]); umax = Math.max(umax, r[0]);
        vmin = Math.min(vmin, r[1]); vmax = Math.max(vmax, r[1]);
      };
      nodes.forEach(n => {
        if (!n.on) return;
        const hw = n.kind === "cube" ? 0.5 : CW / 2, top = n.kind === "cube" ? 1.6 : 0.55 + CW * CARD_H;
        add(n.x - hw, 0, n.z); add(n.x + hw, 0, n.z); add(n.x - hw, top, n.z); add(n.x + hw, top, n.z);
      });
      f = Math.min((SW * 0.98) / (umax - umin), (SH * 0.97) / (vmax - vmin));
      ox = SX + SW / 2 - f * (umin + umax) / 2;
      oy = SY + SH / 2 - f * (vmin + vmax) / 2;
    }

    function resize() {
      W = wrap.clientWidth; H = wrap.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const hr = canvas.getBoundingClientRect(), sr = stage.getBoundingClientRect();
      SX = sr.left - hr.left; SY = sr.top - hr.top; SW = sr.width; SH = sr.height;
      lite = SW < 520;
      const pitch = lite ? 0.88 : 0.62; cp = Math.cos(pitch); sp = Math.sin(pitch);
      nodes.forEach(n => {
        n.on = !(lite && n.i > 5);
        n.x = lite && n.lx !== undefined ? n.lx : n.bx;
        n.z = lite && n.lz !== undefined ? n.lz : n.bz;
      });
      buildPaths();
      fit();
    }

    const dust = Array.from({ length: dustCount }, () => ({
      x: (R() * 2 - 1) * 14, y: 0.5 + R() * 10, z: 4 + R() * 22,
      a: 0.3 + R() * 0.8, k: 1 + ((R() * 2) | 0), p: R() * TAU, k2: 1 + ((R() * 3) | 0), p2: R() * TAU,
    }));

    // ---------- Utilidades de dibujo ----------
    function poly(pts: Vec3[]) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
    function line(pts: Vec3[]) { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }

    const WD = 2.6;
    const WAVES: [number, number][] = [[0, 1], [0.55, 0.55], [1.1, 0.32]];
    function wellDepth(t: number) {
      const e = st(t, 0.6, 3.0);
      return WD * e * e * (1 - easeIO(st(t, 3.0, 3.22)));
    }
    function hgt(x: number, z: number, t: number) {
      const dx = x - C.x, dz = z - C.z, r = Math.hypot(dx, dz);
      let h = 0;
      const D = wellDepth(t);
      if (D > 0.001) h -= D * Math.exp(-(r * r) / (2 * 2.5 * 2.5));
      for (let w = 0; w < WAVES.length; w++) {
        const age = t - 3 - WAVES[w][0];
        if (age <= 0 || age > 6) continue;
        const rw = age * 3.7;
        h += WAVES[w][1] * 0.9 * Math.exp(-age * 0.5) * (Math.exp(-Math.pow((r - rw) / 0.9, 2)) - 0.5 * Math.exp(-Math.pow((r - rw + 1.6) / 1.0, 2)));
      }
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i], age = t - n.tc;
        if (!n.on || age <= 0 || age > 2.2) continue;
        const rn = Math.hypot(x - n.x, z - n.z);
        h += 0.35 * Math.exp(-age * 1.6) * Math.exp(-Math.pow((rn - age * 2.6) / 0.6, 2));
      }
      return h;
    }

    const gridChunks: { pts: Vec2[]; a: number }[] = [];
    for (let z = 2; z <= 44; z += 2) {
      const pts: Vec2[] = []; for (let x = -28; x <= 28; x += 1.5) pts.push([x, z]);
      gridChunks.push({ pts, a: 0.04 + 0.11 * Math.max(0, 1 - (z - 2) / 44) });
    }
    for (let x = -28; x <= 28; x += 2) {
      const side = Math.exp(-Math.pow(x / 20, 2));
      for (let z0 = 2; z0 < 44; z0 += 4) {
        const pts: Vec2[] = []; for (let z = z0; z <= z0 + 4; z += 1) pts.push([x, z]);
        gridChunks.push({ pts, a: (0.03 + 0.11 * Math.max(0, 1 - (z0 + 4 - 2) / 44)) * side });
      }
    }

    function drawGrid(t: number) {
      ctx.lineJoin = "round";
      const proj: Vec3[][] = [];
      ctx.lineWidth = 1;
      for (const ch of gridChunks) {
        const sp2 = ch.pts.map(q => { const h = hgt(q[0], q[1], t); const p = P(q[0], h, q[1]); return [p[0], p[1], Math.min(1, Math.abs(h) / 1.0)] as Vec3; });
        proj.push(sp2);
        ctx.strokeStyle = `rgba(255,130,80,${ch.a})`;
        ctx.beginPath(); sp2.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      }
      ctx.globalCompositeOperation = "lighter";
      for (const s2 of proj) {
        for (let i = 1; i < s2.length; i++) {
          const k = Math.max(s2[i][2], s2[i - 1][2]);
          if (k < 0.07) continue;
          ctx.lineWidth = 1 + 1.3 * k;
          ctx.strokeStyle = `rgba(255,${(105 + 50 * k) | 0},${(50 + 30 * k) | 0},${0.85 * k})`;
          ctx.beginPath(); ctx.moveTo(s2[i - 1][0], s2[i - 1][1]); ctx.lineTo(s2[i][0], s2[i][1]); ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = "source-over";
    }

    function drawDust(t: number) {
      const e = st(t, 0.8, 3.0);
      const pull = e * e * (1 - st(t, 3.0, 3.6)) * 0.9;
      const D = wellDepth(t);
      for (const d of dust) {
        let x = d.x + 0.6 * Math.sin((TAU * d.k * t) / T + d.p);
        let y = d.y + 0.5 * Math.sin((TAU * d.k2 * t) / T + d.p2);
        let z = d.z;
        x = lerp(x, C.x, pull); y = lerp(y, -D * 0.9, pull); z = lerp(z, C.z, pull);
        const p = P(x, y, z);
        const size = clamp((f * 0.05) / p[2], 0.6, 2.2) * (1 + pull * 0.8);
        const tw = 0.5 + 0.5 * Math.sin((TAU * d.k2 * t) / T + d.p);
        ctx.fillStyle = `rgba(255,140,90,${Math.min(1, (0.1 + 0.26 * tw) * d.a + pull * 0.5)})`;
        ctx.fillRect(p[0] - size / 2, p[1] - size / 2, size, size);
      }
    }

    function drawBox(cx: number, cy: number, cz: number, w: number, d: number, h: number, L: number, edgeBase: number, dotA: number, gv: number) {
      if (h < 0.02) return;
      const x0 = cx - w / 2, x1 = cx + w / 2, z0 = cz - d / 2, z1 = cz + d / 2, y0 = cy, y1 = cy + h;
      const xs = cx > 0 ? x0 : x1;
      const top = [P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)];
      const front = [P(x0, y0, z0), P(x1, y0, z0), P(x1, y1, z0), P(x0, y1, z0)];
      const side = [P(xs, y0, z0), P(xs, y0, z1), P(xs, y1, z1), P(xs, y1, z0)];
      const edgeA = Math.min(1, edgeBase + 0.5 * L);
      ctx.globalCompositeOperation = "source-over";
      ([[side, 0.05 + 0.16 * L], [front, 0.07 + 0.22 * L], [top, 0.1 + 0.34 * L]] as const).forEach(([face, a]) => {
        poly(face); ctx.fillStyle = "rgba(12,7,5,0.88)"; ctx.fill();
        ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${a})`; ctx.fill();
      });
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(255,${lerp(ACCENT[1], 150, L) | 0},${lerp(ACCENT[2], 90, L) | 0},${edgeA})`;
      [side, front, top].forEach(face => { poly(face); ctx.stroke(); });
      if (L > 0.05 || gv > 0.03) {
        ctx.globalCompositeOperation = "lighter";
        ctx.lineWidth = 3; ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${0.22 * L})`;
        [side, front, top].forEach(face => { poly(face); ctx.stroke(); });
        if (gv > 0.03) { ctx.strokeStyle = `rgba(${OK[0]},${OK[1]},${OK[2]},${0.9 * gv})`; [side, front, top].forEach(face => { poly(face); ctx.stroke(); }); }
      }
      if (dotA > 0.01) {
        const c = P(cx, y1 + 0.42, cz);
        const rad = Math.max(1.6, (0.16 * f) / c[2]) * (1 + gv);
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = `rgba(${OK[0]},${OK[1]},${OK[2]},${0.22 * dotA})`;
        ctx.beginPath(); ctx.arc(c[0], c[1], rad * 2.6, 0, TAU); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(${OK[0]},${OK[1]},${OK[2]},${dotA})`;
        ctx.beginPath(); ctx.arc(c[0], c[1], rad, 0, TAU); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    function ringPts(x: number, z: number, r: number, n: number, tt?: number): Vec3[] {
      const pts: Vec3[] = [];
      for (let i = 0; i <= n; i++) {
        const a = (i / n) * TAU, px = x + r * Math.cos(a), pz = z + r * Math.sin(a);
        pts.push(P(px, (tt === undefined ? 0 : hgt(px, pz, tt)) + 0.02, pz));
      }
      return pts;
    }

    // ---------- Interfaces (coordenadas normalizadas: ancho 0..1, alto 0..CARD_H) ----------
    function rr(x: number, y: number, w: number, h: number, r: number) {
      r = Math.max(0, Math.min(r, w / 2, h / 2));
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
    }
    function fr(x: number, y: number, w: number, h: number, r: number, c: string) { if (w <= 0.0008 || h <= 0.0008) return; rr(x, y, w, h, r); ctx.fillStyle = c; ctx.fill(); }
    function circ(x: number, y: number, r: number, c: string) { if (r <= 0) return; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = c; ctx.fill(); }
    const ORG = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},`;
    const WHT = `rgba(${CREAM[0]},${CREAM[1]},${CREAM[2]},`;
    const GRN = `rgba(${OK[0]},${OK[1]},${OK[2]},`;
    const topbar = () => fr(0, 0, 1, 0.1, 0, WHT + "0.05)");

    function uiWeb(cr: number) {
      topbar();
      for (let i = 0; i < 3; i++) circ(0.05 + 0.04 * i, 0.05, 0.012, WHT + "0.35)");
      fr(0.22, 0.036, 0.56, 0.028, 0.014, WHT + "0.10)");
      const a = st(cr, 0, 0.3), b = st(cr, 0.15, 0.45), c = st(cr, 0.4, 0.65), d = st(cr, 0.3, 0.6), e = st(cr, 0.6, 1);
      fr(0.08, 0.19, 0.44 * a, 0.05, 0.012, WHT + "0.88)");
      fr(0.08, 0.27, 0.32 * b, 0.028, 0.01, WHT + "0.38)");
      fr(0.08, 0.315, 0.26 * b, 0.028, 0.01, WHT + "0.38)");
      fr(0.08, 0.39, 0.17 * c, 0.06, 0.02, ORG + "0.95)");
      fr(0.6, 0.16, 0.32, 0.3, 0.02, ORG + 0.16 * d + ")");
      if (d > 0) {
        ctx.strokeStyle = ORG + 0.7 * d + ")"; ctx.lineWidth = 0.008;
        ctx.beginPath(); ctx.moveTo(0.62, 0.44); ctx.lineTo(0.62 + 0.28 * d, 0.44 - 0.26 * d); ctx.stroke();
        circ(0.76, 0.3, 0.03 * d, ORG + "0.9)");
      }
      for (let i = 0; i < 3; i++) fr(0.08 + 0.29 * i, 0.53, 0.26, 0.13 * e, 0.015, WHT + "0.07)");
    }

    function uiPanel(cr: number, t: number) {
      fr(0, 0, 0.15, CARD_H, 0, WHT + "0.05)");
      const a = st(cr, 0, 0.35), b = st(cr, 0.25, 1);
      for (let i = 0; i < 4; i++) fr(0.04, 0.08 + 0.1 * i, 0.07, 0.05, 0.012, i === 0 ? ORG + "0.9)" : WHT + "0.28)");
      for (let i = 0; i < 3; i++) {
        fr(0.19 + 0.27 * i, 0.07, 0.24, 0.13 * a, 0.015, WHT + "0.07)");
        fr(0.21 + 0.27 * i, 0.09, 0.09 * a, 0.02, 0.008, WHT + "0.4)");
        fr(0.21 + 0.27 * i, 0.135, 0.14 * a, 0.04, 0.01, i === 2 ? ORG + "0.95)" : WHT + "0.75)");
      }
      const hs = [0.12, 0.18, 0.15, 0.26, 0.22, 0.31, 0.36];
      for (let j = 0; j < 7; j++) {
        const g = easeIO(st(b, j * 0.09, j * 0.09 + 0.4));
        const wob = 1 + 0.07 * Math.sin((TAU * 4 * t) / T + j * 0.9) * (cr > 0.95 ? 1 : 0);
        const h = hs[j] * g * wob;
        fr(0.2 + 0.1 * j, 0.66 - h, 0.065, h, 0.01, j === 6 ? ORG + "0.95)" : ORG + "0.34)");
      }
      fr(0.19, 0.665, 0.77 * st(cr, 0.2, 0.6), 0.006, 0, WHT + "0.25)");
    }

    function uiFlow(cr: number, t: number) {
      const boxes: [number, number, number, number][] = [[0.07, 0.14, 0.22, 0.15], [0.39, 0.14, 0.22, 0.15], [0.71, 0.14, 0.22, 0.15], [0.3, 0.44, 0.4, 0.15]];
      const seq = [0, 0.2, 0.4, 0.65];
      ctx.lineWidth = 0.008;
      const l1 = st(cr, 0.15, 0.3), l2 = st(cr, 0.35, 0.5), l3 = st(cr, 0.5, 0.7);
      ctx.strokeStyle = ORG + "0.7)";
      ctx.beginPath(); ctx.moveTo(0.29, 0.215); ctx.lineTo(lerp(0.29, 0.39, l1), 0.215); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0.61, 0.215); ctx.lineTo(lerp(0.61, 0.71, l2), 0.215); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0.5, 0.29); ctx.lineTo(0.5, lerp(0.29, 0.44, l3)); ctx.stroke();
      boxes.forEach((b, i) => {
        const k = st(cr, seq[i], seq[i] + 0.25);
        if (k <= 0) return;
        ctx.save(); ctx.translate(b[0] + b[2] / 2, b[1] + b[3] / 2); ctx.scale(k, k); ctx.translate(-b[2] / 2, -b[3] / 2);
        fr(0, 0, b[2], b[3], 0.02, WHT + "0.07)");
        rr(0, 0, b[2], b[3], 0.02); ctx.strokeStyle = ORG + "0.8)"; ctx.lineWidth = 0.008; ctx.stroke();
        if (i < 3) { fr(0.03, 0.035, b[2] * 0.5, 0.025, 0.01, WHT + "0.55)"); fr(0.03, 0.085, b[2] * 0.7, 0.02, 0.008, WHT + "0.22)"); }
        ctx.restore();
      });
      if (cr > 0.9) {
        const s = fract((4 * t) / T);
        let x, y;
        if (s < 0.5) { x = lerp(0.18, 0.5, s / 0.5); y = 0.215; } else { x = 0.5; y = lerp(0.215, 0.515, (s - 0.5) / 0.5); }
        circ(x, y, 0.022, "rgba(255,170,110,0.28)"); circ(x, y, 0.012, "rgba(255,200,150,1)");
        ctx.strokeStyle = GRN + "0.95)"; ctx.lineWidth = 0.014; ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.beginPath(); ctx.moveTo(0.44, 0.515); ctx.lineTo(0.485, 0.55); ctx.lineTo(0.565, 0.48); ctx.stroke();
      }
    }

    function uiChat(cr: number, t: number) {
      topbar();
      circ(0.07, 0.05, 0.026, ORG + "0.9)");
      circ(0.088, 0.066, 0.008, GRN + "1)");
      fr(0.12, 0.036, 0.24, 0.02, 0.01, WHT + "0.5)");
      fr(0.12, 0.066, 0.14, 0.014, 0.007, WHT + "0.2)");
      const b1 = easeIO(st(cr, 0, 0.2)), b2 = easeIO(st(cr, 0.2, 0.4)), b3 = easeIO(st(cr, 0.4, 0.6)), b4 = easeIO(st(cr, 0.6, 0.8));
      fr(0.07, 0.15, 0.5 * b1, 0.09, 0.03, WHT + "0.16)");
      fr(0.93 - 0.52 * b2, 0.28, 0.52 * b2, 0.09, 0.03, ORG + "0.88)");
      fr(0.07, 0.42, 0.36 * b3, 0.08, 0.03, WHT + "0.16)");
      fr(0.93 - 0.44 * b4, 0.54, 0.44 * b4, 0.09, 0.03, ORG + "0.88)");
      if (cr > 0.85) {
        fr(0.07, 0.56, 0.2, 0.08, 0.03, WHT + "0.12)");
        for (let i = 0; i < 3; i++) {
          const a = 0.3 + 0.6 * Math.max(0, Math.sin((TAU * 5 * t) / T - i * 0.9));
          circ(0.12 + 0.05 * i, 0.6, 0.011, WHT + a + ")");
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for a uniform (cr, t) signature across UI[kind]
    function uiPhone(cr: number, t: number) {
      const a = st(cr, 0, 0.3), b = st(cr, 0.2, 0.55), c = st(cr, 0.45, 0.8), d = st(cr, 0.7, 1);
      fr(0.34, 0.04, 0.32, 0.63, 0.05, WHT + "0.05)");
      rr(0.34, 0.04, 0.32, 0.63, 0.05); ctx.strokeStyle = WHT + "0.4)"; ctx.lineWidth = 0.008; ctx.stroke();
      fr(0.45, 0.055, 0.1, 0.012, 0.006, WHT + "0.3)");
      fr(0.37, 0.09, 0.26 * a, 0.05, 0.012, ORG + "0.92)");
      fr(0.37, 0.16, 0.26 * b, 0.17, 0.014, WHT + "0.10)");
      if (b > 0.4) circ(0.5, 0.245, 0.03 * st(b, 0.4, 1), ORG + "0.85)");
      for (let i = 0; i < 3; i++) {
        fr(0.37, 0.36 + 0.07 * i, 0.26 * c * (1 - 0.12 * i), 0.045, 0.012, WHT + "0.16)");
        circ(0.392, 0.3825 + 0.07 * i, 0.011 * c, i === 0 ? GRN + "0.95)" : ORG + "0.8)");
      }
      for (let i = 0; i < 3; i++) circ(0.42 + 0.08 * i, 0.64, 0.01 * d, i === 0 ? ORG + "0.95)" : WHT + "0.4)");
      fr(0.06, 0.2, 0.2 * d, 0.03, 0.012, WHT + "0.3)");
      fr(0.06, 0.26, 0.14 * d, 0.03, 0.012, WHT + "0.16)");
      fr(0.06, 0.32, 0.17 * d, 0.03, 0.012, ORG + "0.75)");
      ctx.strokeStyle = ORG + 0.9 * d + ")"; ctx.lineWidth = 0.014; ctx.lineCap = "round";
      ctx.beginPath(); ctx.arc(0.83, 0.28, 0.06, -Math.PI / 2, -Math.PI / 2 + TAU * 0.72 * d); ctx.stroke();
      ctx.strokeStyle = WHT + "0.1)"; ctx.beginPath(); ctx.arc(0.83, 0.28, 0.06, 0, TAU); ctx.stroke();
    }

    function uiStore(cr: number) {
      topbar();
      fr(0.06, 0.035, 0.18, 0.03, 0.015, WHT + "0.5)");
      circ(0.9, 0.05, 0.022, ORG + "0.9)");
      circ(0.925, 0.03, 0.009, GRN + "1)");
      for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
        const i = r * 3 + c, k = st(cr, i * 0.1, i * 0.1 + 0.3);
        const x = 0.07 + 0.3 * c, y = 0.16 + 0.26 * r;
        fr(x, y, 0.26, 0.15 * k, 0.02, ORG + (0.1 + 0.1 * ((r + c) % 2)) + ")");
        fr(x, y + 0.17, 0.14 * k, 0.02, 0.01, WHT + "0.5)");
        fr(x + 0.16, y + 0.17, 0.08 * k, 0.02, 0.01, ORG + "0.9)");
      }
    }

    function uiKanban(cr: number, t: number) {
      topbar();
      fr(0.06, 0.035, 0.22, 0.03, 0.015, WHT + "0.5)");
      const colX = [0.05, 0.36, 0.67];
      for (let i = 0; i < 3; i++) {
        const k = st(cr, i * 0.12, i * 0.12 + 0.3);
        fr(colX[i], 0.14, 0.28, 0.53 * k, 0.02, WHT + "0.05)");
        fr(colX[i] + 0.03, 0.16, 0.12 * k, 0.02, 0.01, i === 2 ? GRN + "0.85)" : WHT + "0.4)");
      }
      const counts = [3, 2, 1];
      for (let i = 0; i < 3; i++) for (let j = 0; j < counts[i]; j++) {
        const k = st(cr, 0.3 + 0.1 * (i + j), 0.6 + 0.1 * (i + j));
        fr(colX[i] + 0.025, 0.31 + 0.1 * j, 0.23 * k, 0.075, 0.015, WHT + "0.12)");
      }
      if (cr > 0.9) {
        const s = fract(3 * t / T), seg = s * 2;
        const i = Math.min(Math.floor(seg), 1);
        const k = easeIO(clamp((seg - i - 0.4) / 0.5, 0, 1));
        const x = lerp(colX[i], colX[i + 1], seg >= 2 ? 1 : k);
        const al = st(s, 0, 0.05) * (1 - st(s, 0.93, 1));
        fr(x + 0.025, 0.21, 0.23, 0.075, 0.015, ORG + 0.9 * al + ")");
      }
    }

    function uiTable(cr: number) {
      topbar();
      fr(0.06, 0.035, 0.22, 0.03, 0.015, WHT + "0.5)");
      fr(0.66, 0.033, 0.26, 0.034, 0.017, WHT + "0.10)");
      for (let i = 0; i < 6; i++) {
        const k = st(cr, i * 0.1, i * 0.1 + 0.3), y = 0.16 + 0.085 * i;
        fr(0.06, y, 0.05 * k, 0.03, 0.01, WHT + "0.3)");
        fr(0.16, y, 0.28 * k, 0.03, 0.01, WHT + "0.55)");
        fr(0.5, y, 0.16 * k, 0.03, 0.01, WHT + "0.25)");
        fr(0.74, y - 0.004, 0.18 * k, 0.038, 0.019, i % 3 === 0 ? GRN + "0.75)" : i % 3 === 1 ? ORG + "0.8)" : WHT + "0.25)");
        fr(0.06, y + 0.05, 0.88 * k, 0.003, 0, WHT + "0.06)");
      }
    }

    function uiCalendar(cr: number, t: number) {
      topbar();
      fr(0.06, 0.035, 0.2, 0.03, 0.015, WHT + "0.5)");
      circ(0.82, 0.05, 0.02, WHT + "0.2)"); circ(0.9, 0.05, 0.02, WHT + "0.2)");
      for (let c = 0; c < 5; c++) fr(0.08 + 0.17 * c, 0.13, 0.14, 0.02, 0.01, WHT + "0.25)");
      for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
        const i = r * 5 + c, x = 0.08 + 0.17 * c, y = 0.18 + 0.12 * r;
        fr(x, y, 0.14, 0.09, 0.015, WHT + "0.05)");
        if ((i * 7) % 5 < 2) {
          const k = st(cr, (i / 20) * 0.7, (i / 20) * 0.7 + 0.25);
          fr(x, y, 0.14 * k, 0.09, 0.015, ORG + "0.8)");
        }
      }
      if (cr > 0.9) fr(0.08 + 0.17 * 2, 0.18 + 0.12, 0.14, 0.09, 0.015, GRN + (0.55 + 0.35 * Math.sin((TAU * 4 * t) / T)) + ")");
    }

    const UI: Record<Exclude<NodeKind, "cube">, (cr: number, t: number) => void> = {
      web: uiWeb, panel: uiPanel, flow: uiFlow, chat: uiChat, phone: uiPhone, store: uiStore, kanban: uiKanban, table: uiTable, calendar: uiCalendar,
    };

    function drawCard(n: NodeDef, ns: number, lit: number, cr: number, t: number) {
      const p = P(n.x, 0.55, n.z);
      const sz = f / p[2];
      const cw = CW * sz * ns;
      if (cw < 2.5) return;
      const fl = P(n.x, 0, n.z);
      ctx.globalAlpha = [1, 0.84, 0.64][Math.min(n.g, 2)];
      const gv = Math.exp(-Math.pow((t - n.tl - 0.15) / 0.3, 2));
      const rev = easeIO(st(cr, 0, 0.45)), cc = st(cr, 0.15, 1);

      ctx.globalCompositeOperation = "source-over";
      const fw = CW * 0.46 * ns, fd = 0.5 * ns;
      poly([P(n.x - fw, 0.02, n.z - fd), P(n.x + fw, 0.02, n.z - fd), P(n.x + fw, 0.02, n.z + fd), P(n.x - fw, 0.02, n.z + fd)]);
      ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${0.1 * ns})`; ctx.fill();
      ctx.lineWidth = 1.2; ctx.strokeStyle = `rgba(255,110,50,${0.6 * ns})`; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(fl[0], fl[1]); ctx.lineTo(p[0], p[1]); ctx.stroke();

      ctx.save();
      ctx.translate(p[0] - cw / 2, p[1] - cw * CARD_H);
      ctx.scale(cw, cw);
      rr(0, 0, 1, CARD_H, 0.035);
      ctx.fillStyle = "rgba(11,7,5,0.95)"; ctx.fill();
      ctx.save();
      ctx.clip();
      ctx.save();
      ctx.beginPath(); ctx.rect(0, 0, 1, CARD_H * rev + 0.002); ctx.clip();
      UI[n.kind as Exclude<NodeKind, "cube">](cc, t);
      ctx.restore();
      if (rev > 0.003 && rev < 0.995) {
        const y = CARD_H * rev;
        fr(0, y - 0.07, 1, 0.07, 0, ORG + "0.16)");
        fr(0, y - 0.012, 1, 0.012, 0, "rgba(255,215,170,0.95)");
      }
      ctx.restore();
      ctx.lineWidth = 1.6 / cw;
      ctx.strokeStyle = ORG + (0.7 + 0.3 * lit) + ")";
      rr(0, 0, 1, CARD_H, 0.035); ctx.stroke();
      if (lit > 0.03 || gv > 0.03) {
        ctx.globalCompositeOperation = "lighter";
        if (lit > 0.03) { ctx.lineWidth = 5 / cw; ctx.strokeStyle = ORG + 0.35 * lit + ")"; rr(0, 0, 1, CARD_H, 0.035); ctx.stroke(); }
        ctx.globalCompositeOperation = "source-over";
      }
      const da = st(cr, 0.4, 0.7);
      if (da > 0.01) {
        ctx.globalCompositeOperation = "lighter";
        circ(0.97, 0.0, 0.05 * (1 + 2 * gv), GRN + 0.22 * da + ")");
        ctx.globalCompositeOperation = "source-over";
        circ(0.97, 0.0, 0.022 * (1 + 0.8 * gv), GRN + da + ")");
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    // ---------- Cuadro ----------
    function frame(t: number) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#050403"; ctx.fillRect(0, 0, W, H);

      const sh = t >= 3 ? 4 * Math.exp(-(t - 3) * 8) : 0;
      ctx.save();
      if (sh > 0.05) ctx.translate(sh * Math.sin(t * 95), sh * 0.7 * Math.cos(t * 83));

      const shut = st(t, 16.0, 17.6);
      const pa = ease3(st(t, 3.0, 3.7)) * (1 - easeIO(shut));

      if (pa > 0.02) {
        const c = P(C.x, 0, C.z);
        const g = ctx.createRadialGradient(c[0], c[1], 0, c[0], c[1], f * 0.9);
        g.addColorStop(0, `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${0.15 * pa})`); g.addColorStop(1, "rgba(255,90,31,0)");
        ctx.fillStyle = g; ctx.fillRect(-20, -20, W + 40, H + 40);
      }

      drawGrid(t);
      drawDust(t);

      if (t > 0.9 && t < 3.3) {
        const e = st(t, 0.9, 3.0), D = wellDepth(t);
        const c = P(C.x, -D + 0.05, C.z);
        const rp = clamp((0.35 + 1.1 * e * e) * f / c[2], 3, 40);
        const g = ctx.createRadialGradient(c[0], c[1], 0, c[0], c[1], rp);
        g.addColorStop(0, `rgba(255,225,190,${0.95 * e})`); g.addColorStop(0.3, `rgba(255,120,55,${0.6 * e})`); g.addColorStop(1, "rgba(255,90,31,0)");
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c[0], c[1], rp, 0, TAU); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      const flash = Math.exp(-Math.pow((t - 3.05) / 0.3, 2));
      if (flash > 0.02) {
        const c = P(C.x, 0.05, C.z), rp = (3.2 * f) / c[2];
        const g = ctx.createRadialGradient(c[0], c[1], 0, c[0], c[1], rp);
        g.addColorStop(0, `rgba(255,190,140,${0.8 * flash})`); g.addColorStop(1, "rgba(255,90,31,0)");
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c[0], c[1], rp, 0, TAU); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      if (pa > 0.01) {
        ctx.globalCompositeOperation = "lighter";
        const breathe = 0.1 * Math.sin((TAU * 4 * t) / T);
        const inner = ringPts(C.x, C.z, 0.9 * pa, 48);
        poly(inner); ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${0.18 * pa})`; ctx.fill();
        ctx.lineWidth = 1.6; ctx.strokeStyle = `rgba(255,120,60,${0.85 * pa})`; line(inner);
        ctx.lineWidth = 1.2; ctx.strokeStyle = `rgba(255,110,50,${0.55 * pa})`; line(ringPts(C.x, C.z, (1.5 + breathe) * pa, 64));
        ctx.setLineDash([7, 9]); ctx.lineWidth = 1.1; ctx.strokeStyle = `rgba(255,110,50,${0.4 * pa})`;
        line(ringPts(C.x, C.z, 2.3 * pa, 72)); ctx.setLineDash([]);
        const c0 = P(C.x, 0.04, C.z);
        ctx.fillStyle = `rgba(255,200,150,${0.95 * pa})`; ctx.beginPath(); ctx.arc(c0[0], c0[1], 2.6, 0, TAU); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.globalCompositeOperation = "lighter";
      WAVES.forEach(([d0, amp]) => {
        const age = t - 3 - d0;
        if (age < 0 || age > 3.5) return;
        const r = age * 3.7, fo = clamp(1 - r / (RMAX + 0.5), 0, 1) * amp;
        if (fo <= 0.01) return;
        const pts = ringPts(C.x, C.z, r, 96, t);
        ([[7, 0.1], [3, 0.22], [1.4, 0.85]] as const).forEach(([lw, al]) => { ctx.lineWidth = lw; ctx.strokeStyle = `rgba(255,95,35,${al * fo})`; line(pts); });
      });
      ctx.globalCompositeOperation = "source-over";

      const retL = easeIO(st(t, 14.6, 15.6));
      links.forEach(l => {
        if (!nodes[l.a].on || !nodes[l.b].on || !l.path) return;
        const g = easeIO(st(t, l.m + 0.2, l.m + 1.2)) * (1 - retL);
        if (g < 0.01) return;
        const pts = subPath(l.path, 0, g).map(p => P(p[0], 0.03, p[1]));
        ctx.globalCompositeOperation = "lighter"; ctx.lineJoin = "round";
        ctx.lineWidth = 3; ctx.strokeStyle = "rgba(255,95,35,0.07)"; line(pts);
        ctx.lineWidth = 1; ctx.strokeStyle = "rgba(255,125,60,0.38)"; line(pts);
        ctx.globalCompositeOperation = "source-over";
      });

      const live: NodeDef[] = [];
      nodes.forEach(n => {
        if (!n.on || !n.path) return;
        const b = easeIO(clamp((t - n.start) / n.dur, 0, 1));
        const a = easeIO(clamp((t - (14.6 + n.ret)) / 1.3, 0, 1));
        if (b - a < 0.002) return;
        const pts = subPath(n.path, a, b).map(p => P(p[0], 0.03, p[1]));
        ctx.globalCompositeOperation = "lighter";
        ctx.lineJoin = "round"; ctx.lineCap = "round";
        ([[6, 0.07], [2.6, 0.18]] as const).forEach(([lw, al]) => { ctx.lineWidth = lw; ctx.strokeStyle = `rgba(255,95,35,${al})`; line(pts); });
        ctx.globalCompositeOperation = "source-over";
        ctx.lineWidth = 1.3; ctx.strokeStyle = "rgba(255,110,50,0.72)"; line(pts);
        if (b < 0.999 && a < 0.001 && b > 0.01) {
          const h = pts[pts.length - 1];
          const g = ctx.createRadialGradient(h[0], h[1], 0, h[0], h[1], 9);
          g.addColorStop(0, "rgba(255,190,140,0.95)"); g.addColorStop(0.35, "rgba(255,100,40,0.55)"); g.addColorStop(1, "rgba(255,90,31,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(h[0], h[1], 9, 0, TAU); ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
        if (b > 0.999 && a < 0.001) live.push(n);
      });

      const pkA = easeIO(st(t, 7, 7.8)) * (1 - easeIO(st(t, 14, 14.8)));
      if (pkA > 0.01) {
        ctx.globalCompositeOperation = "lighter";
        live.forEach(n => {
          if (!n.path) return;
          let s = fract((n.k * t) / T + n.phi);
          if (n.dir < 0) s = 1 - s;
          for (let j = 0; j < 5; j++) {
            const sj = s - n.dir * 0.022 * j;
            if (sj < 0 || sj > 1) continue;
            const q = pointAt(n.path, sj), p = P(q[0], 0.06, q[1]);
            const rad = clamp((0.06 * f) / p[2], 1.1, 3.4) * (1 - j * 0.16);
            const edge = Math.sin(Math.PI * clamp(sj, 0, 1));
            ctx.fillStyle = `rgba(255,${150 - j * 12},${80 - j * 10},${pkA * edge * (0.9 - j * 0.17)})`;
            ctx.beginPath(); ctx.arc(p[0], p[1], rad, 0, TAU); ctx.fill();
          }
        });
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.globalCompositeOperation = "lighter";
      nodes.forEach(n => {
        if (!n.on) return;
        const q = (t - n.tc) / 0.7;
        if (q < 0 || q > 1) return;
        ctx.lineWidth = 1.6; ctx.strokeStyle = `rgba(${OK[0]},${OK[1]},${OK[2]},${0.5 * (1 - q)})`;
        line(ringPts(n.x, n.z, 0.4 + q * 1.8, 40));
      });
      ctx.globalCompositeOperation = "source-over";

      const items: { z: number; draw: () => void }[] = [];
      nodes.forEach(n => {
        if (!n.on) return;
        const ns = ease3(clamp((t - n.tc) / 0.55, 0, 1)) * (1 - clamp((t - (14.6 + n.ret)) / 0.5, 0, 1));
        if (ns < 0.01) return;
        const lit = Math.exp(-Math.pow((t - n.tc - 0.2) / 0.4, 2));
        const gv = Math.exp(-Math.pow((t - n.tl - 0.15) / 0.3, 2));
        if (n.kind === "cube") {
          items.push({ z: n.z, draw: () => drawBox(n.x, 0, n.z, 1.0, 1.0, n.h * ns, lit, 0.35 + 0.5 * ns, clamp((ns - 0.7) / 0.3, 0, 1), gv) });
        } else {
          const cr = clamp((t - n.tc - 0.2) / 2.2, 0, 1);
          items.push({ z: n.z, draw: () => drawCard(n, ns, lit, cr, t) });
        }
      });
      items.sort((p, q) => q.z - p.z).forEach(o => o.draw());

      ctx.restore();
    }

    // ---------- Ciclo de vida: reproducción, pausa y limpieza ----------
    let rafId: number | null = null;
    let lastTs: number | null = null;
    let elapsed = 0;
    let intersecting = true;

    function tick(now: number) {
      if (lastTs == null) lastTs = now;
      const dt = (now - lastTs) / 1000;
      lastTs = now;
      elapsed = (elapsed + dt) % T;
      frame(elapsed);
      rafId = requestAnimationFrame(tick);
    }
    function play() {
      if (reduce || rafId != null) return;
      lastTs = null;
      rafId = requestAnimationFrame(tick);
    }
    function pause() {
      if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; }
    }
    function syncPlayback() {
      if (intersecting && !document.hidden) play(); else pause();
    }

    resize();
    if (reduce) {
      frame(12.8);
    } else {
      syncPlayback();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) frame(12.8);
    });
    ro.observe(wrap);
    ro.observe(stage);

    const io = new IntersectionObserver(entries => {
      intersecting = entries[0]?.isIntersecting ?? true;
      if (!reduce) syncPlayback();
    }, { threshold: 0 });
    io.observe(wrap);

    const onVisibility = () => { if (!reduce) syncPlayback(); };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [stageRef]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,4,3,.72), rgba(5,4,3,.25) 46%, transparent 62%), radial-gradient(130% 100% at 50% 70%, transparent 45%, rgba(5,4,3,.8) 100%)",
        }}
      />
    </div>
  );
}
