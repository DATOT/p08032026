"use client";

import "./normalize.css";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.pointerEvents = "none";

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const particles: any[] = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 5 + 2,
        v: Math.random() * 2 + 1
      });
    }

    function animate() {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${Math.random() * 360},80%,70%)`;
        ctx.fill();

        p.y += p.v;

        if (p.y > canvas.height) {
          p.y = -10;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="birthday">
      <h1 className="title">🎂 Happy Birthday Lê Triệu Vỹ 🎉</h1>

      <img
        className="cake"
        src="https://teakandthyme.com/wp-content/uploads/2022/08/matcha-crepe-cake-DSC_2026-1x1-1200.jpg"
      />

      <div className="reaction">
        <img src="/assets/yay.png" />
        <p>Honest reaction của tui</p>
      </div>
    </div>
  );
}
