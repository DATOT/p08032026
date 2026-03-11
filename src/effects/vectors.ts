export function attachVectorEffect(card: HTMLElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  canvas.style.cssText = `
    position:absolute;
    inset:0;
    pointer-events:none;
    opacity:0.5;
    z-index:1;
  `;
  card.appendChild(canvas);

  function resize() {
    canvas.width = card.clientWidth;
    canvas.height = card.clientHeight;
  }
  resize();

  window.addEventListener("resize", resize);

  const vectors = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    angle: Math.random() * Math.PI * 2,
    speed: 0.2 + Math.random() * 0.6,
    len: 10 + Math.random() * 20,
  }));

  function drawArrow(x: number, y: number, angle: number, len: number) {
    ctx!.save();
    ctx!.translate(x, y);
    ctx!.rotate(angle);

    ctx!.beginPath();
    ctx!.moveTo(0, 0);
    ctx!.lineTo(len, 0);
    ctx!.lineTo(len - 4, -3);
    ctx!.moveTo(len, 0);
    ctx!.lineTo(len - 4, 3);
    ctx!.stroke();

    ctx!.restore();
  }

  let raf = 0;
  function tick() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    ctx!.strokeStyle = "rgba(255,255,255,0.6)";
    ctx!.lineWidth = 1;

    for (const v of vectors) {
      drawArrow(v.x, v.y, v.angle, v.len);
      v.x += Math.cos(v.angle) * v.speed;
      v.y += Math.sin(v.angle) * v.speed;

      if (v.x < -50) v.x = canvas.width + 50;
      if (v.x > canvas.width + 50) v.x = -50;
      if (v.y < -50) v.y = canvas.height + 50;
      if (v.y > canvas.height + 50) v.y = -50;
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
