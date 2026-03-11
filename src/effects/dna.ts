export function attachDNAEffect(card: HTMLElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  canvas.style.cssText = `
    position:absolute;
    inset:0;
    pointer-events:none;
    opacity:0.9;
    z-index:0;
  `;
  card.appendChild(canvas);

  function resize() {
    canvas.width = card.clientWidth;
    canvas.height = card.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  /* =========================
     CONFIG
  ========================= */
  const HELIX_COUNT = 10;
  const AMPLITUDE = 9; // ↓ was 14 (less separation)
  const WAVE_LENGTH = 48; // ↓ was 60 (tighter twist)
  const SPEED = 0.02;
  const STEPS = 140; // ↑ smoother curves
  const LINK_STEP = 1; // ↓ denser base pairs

  const COLOR_A = "rgba(180,220,255,0.9)";
  const COLOR_B = "rgba(255,200,220,0.9)";
  const LINK_COLOR = "rgba(255,255,255,0.35)";

  let phase = 0;

  const helices = Array.from({ length: HELIX_COUNT }, (_, i) => ({
    // evenly spaced across width, with tiny natural offset
    x: (i + 0.5) / HELIX_COUNT + (Math.random() - 0.5) * 0.03,
    scale: 0.7 + Math.random() * 0.5,
    speed: SPEED * (0.6 + Math.random() * 0.6),
  }));

  function drawHelix(baseX: number, scale: number, localPhase: number) {
    const top = -40;
    const bottom = canvas.height + 40;

    ctx!.lineWidth = 1.4 * scale;

    /* strand A */
    ctx!.strokeStyle = COLOR_A;
    ctx!.beginPath();

    for (let i = 0; i <= STEPS; i++) {
      const t = i / STEPS;
      const y = top + t * (bottom - top);
      const x =
        baseX +
        Math.sin((y / WAVE_LENGTH) * Math.PI * 2 + localPhase) *
          AMPLITUDE *
          scale;

      i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
    }
    ctx!.stroke();

    /* strand B */
    ctx!.strokeStyle = COLOR_B;
    ctx!.beginPath();

    for (let i = 0; i <= STEPS; i++) {
      const t = i / STEPS;
      const y = top + t * (bottom - top);
      const x =
        baseX +
        Math.sin((y / WAVE_LENGTH) * Math.PI * 2 + localPhase + Math.PI) *
          AMPLITUDE *
          scale;

      i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
    }
    ctx!.stroke();

    /* base-pair links */
    ctx!.strokeStyle = LINK_COLOR;
    ctx!.lineWidth = 1;

    for (let i = 0; i <= STEPS; i += LINK_STEP) {
      const t = i / STEPS;
      const y = top + t * (bottom - top);

      const x1 =
        baseX +
        Math.sin((y / WAVE_LENGTH) * Math.PI * 2 + localPhase) *
          AMPLITUDE *
          scale;

      const x2 =
        baseX +
        Math.sin((y / WAVE_LENGTH) * Math.PI * 2 + localPhase + Math.PI) *
          AMPLITUDE *
          scale;

      ctx!.beginPath();
      ctx!.moveTo(x1, y);
      ctx!.lineTo(x2, y);
      ctx!.stroke();
    }
  }

  let raf = 0;
  function tick() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    for (const h of helices) {
      drawHelix(h.x * canvas.width, h.scale, phase * h.speed * 60);
    }

    phase += SPEED;
    raf = requestAnimationFrame(tick);
  }

  tick();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };
}
