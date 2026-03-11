const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

function randomFireColor() {
  const t = Math.random();

  if (t < 0.2) return "#ffffff"; // white
  if (t < 0.45) return "#fff3a0"; // pale yellow
  if (t < 0.7) return "#ffb703"; // yellow-orange
  if (t < 0.9) return "#fb8500"; // orange
  return "#e63946"; // red
}
const PARTICLE_LIMIT = 1000;
let currentParticles = 0;
export function spawnExplosion(x: number, y: number, hits: number) {
  const layer = document.querySelector(".explosion-layer");
  if (!layer) return;

  hits = clamp(hits, 0, 4);

  const count = Math.min(20 + hits * 25, PARTICLE_LIMIT - currentParticles);
  currentParticles += count;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";

    const angle = Math.random() * Math.PI * 2;

    const force = (40 + Math.random() * 50) * (hits + 1);

    const dy = Math.sin(angle) * force - force * 0.25;
    const dx = Math.cos(angle) * force;

    const size = 3 + Math.random() * 20;
    const color = randomFireColor();

    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.background = color;

    p.style.setProperty("--dx", `${dx}px`);
    p.style.setProperty("--dy", `${dy}px`);
    const lifetime = 7500 + Math.random() * 3000;
    p.style.animation = `explode ${lifetime}ms cubic-bezier(0.1, 0.7, 0.3, 1) forwards`;

    layer.appendChild(p);
    setTimeout(() => {
      p.remove();
      currentParticles -= 1;
    }, lifetime);
  }
}
