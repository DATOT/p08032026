export function attachVeinGrowthEffect(card: HTMLElement) {
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

  type Vein = {
    x: number;
    y: number;
    angle: number;
    life: number;
  };

  const veins: Vein[] = [];

  for (let i = 0; i < 20; i++) {
    veins.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angle: Math.random() * Math.PI * 2,
      life: 800 + Math.random() * 400,
    });
  }

  let frame = 0;

  function step() {
    frame++;
    if (!ctx) return;

    // draw only every 3 frames (slow growth)
    if (frame % 3 !== 0) {
      raf = requestAnimationFrame(step);
      return;
    }

    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(120,0,0,0.55)";

    const newVeins: Vein[] = [];

    for (const v of veins) {
      if (v.life <= 0) continue;

      // smaller movement
      const nx = v.x + Math.cos(v.angle) * 0.8;
      const ny = v.y + Math.sin(v.angle) * 0.8;

      ctx.beginPath();
      ctx.moveTo(v.x, v.y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      v.x = nx;
      v.y = ny;
      v.life--;

      v.angle += (Math.random() - 0.5) * 0.25;

      // slower branching
      if (Math.random() < 0.015) {
        newVeins.push({
          x: nx,
          y: ny,
          angle: v.angle + (Math.random() - 0.5),
          life: v.life * 0.7,
        });
      }
    }

    veins.push(...newVeins);

    if (veins.length < 2000) {
      raf = requestAnimationFrame(step);
    }
  }

  let raf = requestAnimationFrame(step);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };
}
