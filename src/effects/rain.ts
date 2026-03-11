export function attachRainEffect(card: HTMLElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const clouds = document.createElement("img");
  clouds.src = "/assets/clouds.png";
  clouds.alt = "clouds";

  clouds.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    pointer-events: none;
    z-index: 3;
  `;

  card.appendChild(clouds);
  canvas.style.cssText = `
    position:absolute;
    inset:0;
    pointer-events:none;
    z-index:1;
  `;

  card.appendChild(canvas);

  function resize() {
    canvas.width = card.clientWidth;
    canvas.height = card.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const drops = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    v: 3 + Math.random() * 3,
  }));

  function tick() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    ctx!.strokeStyle = "rgba(180,200,255,0.4)";

    for (const d of drops) {
      ctx!.beginPath();
      ctx!.moveTo(d.x, d.y);
      ctx!.lineTo(d.x, d.y + 12);
      ctx!.stroke();

      d.y += d.v;
      if (d.y > canvas.height) d.y = -20;
    }
    requestAnimationFrame(tick);
  }
  tick();
}
