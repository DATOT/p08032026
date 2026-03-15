export function attachNeuronNetworkEffect(card: HTMLElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  canvas.style.cssText = `
    position:absolute;
    inset:0;
    pointer-events:none;
    opacity:0.85;
    z-index:0;
  `;
  card.appendChild(canvas);

  function resize() {
    canvas.width = card.clientWidth;
    canvas.height = card.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const NODE_COUNT = 45;

  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
  }));

  let phase = 0;

  function draw() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < 90) {
          const pulse = 0.5 + Math.sin(phase * 2 + d * 0.05) * 0.5;

          ctx!.strokeStyle = `rgba(200,230,255,${0.15 + pulse * 0.3})`;
          ctx!.lineWidth = 1;

          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx!.fillStyle = "rgba(255,255,255,0.8)";
      ctx!.beginPath();
      ctx!.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
      ctx!.fill();
    }

    phase += 0.02;
    raf = requestAnimationFrame(draw);
  }

  let raf = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };
}
