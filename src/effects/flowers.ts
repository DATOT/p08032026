export function attachFlowerParticlesEffect(card: HTMLElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  canvas.style.cssText = `
    position:absolute;
    inset:0;
    pointer-events:none;
    opacity:0.75;
    z-index:1;
  `;
  card.appendChild(canvas);

  function resize() {
    canvas.width = card.clientWidth;
    canvas.height = card.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COLORS = [
    "rgba(255,183,197,0.85)", // sakura pink
    "rgba(255,200,210,0.75)",
    "rgba(255,220,230,0.7)",
  ];

  const petals = Array.from({ length: 70 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 6 + Math.random() * 6,
    angle: Math.random() * Math.PI * 2,
    rotation: (Math.random() - 0.5) * 0.02,
    sway: Math.random() * Math.PI * 2,
    swaySpeed: 0.01 + Math.random() * 0.02,
    speedY: 0.3 + Math.random() * 0.6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  function drawPetal(
    x: number,
    y: number,
    size: number,
    angle: number,
    color: string,
  ) {
    ctx!.save();
    ctx!.translate(x, y);
    ctx!.rotate(angle);
    ctx!.fillStyle = color;

    ctx!.beginPath();
    ctx!.moveTo(0, 0);
    ctx!.quadraticCurveTo(size * 0.8, -size * 0.6, size, 0);
    ctx!.quadraticCurveTo(size * 0.8, size * 0.6, 0, size * 0.3);
    ctx!.quadraticCurveTo(-size * 0.2, size * 0.15, 0, 0);
    ctx!.fill();

    ctx!.restore();
  }

  let raf = 0;
  function tick() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of petals) {
      drawPetal(p.x, p.y, p.size, p.angle, p.color);

      p.sway += p.swaySpeed;
      p.x += Math.sin(p.sway) * 0.3;
      p.y += p.speedY;
      p.angle += p.rotation;

      if (p.y > canvas.height + 40) {
        p.y = -40;
        p.x = Math.random() * canvas.width;
      }
    }

    raf = requestAnimationFrame(tick);
  }

  tick();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };
}
export function attachWhiteTulipEffect(card: HTMLElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  canvas.style.cssText = `
    position:absolute;
    inset:0;
    pointer-events:none;
    opacity:0.9;
    z-index:1;
  `;
  card.appendChild(canvas);

  function resize() {
    canvas.width = card.clientWidth;
    canvas.height = card.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const PETAL_COLORS = [
    "rgba(255,255,255,0.95)",
    "rgba(245,245,245,0.9)",
    "rgba(235,235,235,0.85)",
  ];

  const COUNT = 40;

  const tulips = Array.from({ length: COUNT }, (_, i) => {
    const depth = Math.random(); // 0 = far, 1 = near
    return {
      baseX: ((i + Math.random()) / COUNT) * canvas.width,
      height: 55 + depth * 55,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.002 + depth * 0.004,
      petalColor: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      depth,
    };
  });

  function drawTulip(
    x: number,
    baseY: number,
    height: number,
    sway: number,
    petalColor: string,
    depth: number,
  ) {
    const bend = Math.sin(sway) * (4 + depth * 6);

    // stem
    ctx!.strokeStyle = `rgba(60,140,90,${0.4 + depth * 0.4})`;
    ctx!.lineWidth = 1 + depth;
    ctx!.beginPath();
    ctx!.moveTo(x, baseY);
    ctx!.quadraticCurveTo(
      x + bend,
      baseY - height * 0.6,
      x + bend,
      baseY - height,
    );
    ctx!.stroke();

    // leaf
    ctx!.fillStyle = `rgba(80,160,110,${0.15 + depth * 0.25})`;
    ctx!.beginPath();
    ctx!.ellipse(
      x + bend - 6,
      baseY - height * 0.5,
      2 + depth * 2,
      10 + depth * 6,
      -0.4,
      0,
      Math.PI * 2,
    );
    ctx!.fill();

    // flower head
    ctx!.save();
    ctx!.translate(x + bend, baseY - height);
    ctx!.fillStyle = petalColor;

    ctx!.beginPath();
    ctx!.moveTo(0, 0);
    ctx!.quadraticCurveTo(-6 - depth * 2, -10 - depth * 6, 0, -18 - depth * 6);
    ctx!.quadraticCurveTo(6 + depth * 2, -10 - depth * 6, 0, 0);
    ctx!.fill();

    // highlight
    ctx!.fillStyle = "rgba(255,255,255,0.5)";
    ctx!.beginPath();
    ctx!.ellipse(0, -10, 2, 5 + depth * 3, 0, 0, Math.PI * 2);
    ctx!.fill();

    ctx!.restore();
  }

  let raf = 0;
  function tick() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    const ground = canvas.height - 6;

    for (const t of tulips) {
      drawTulip(t.baseX, ground, t.height, t.sway, t.petalColor, t.depth);
      t.sway += t.swaySpeed;
    }

    raf = requestAnimationFrame(tick);
  }

  tick();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };
}
