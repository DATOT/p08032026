document.querySelectorAll(".scroll-footage").forEach((el) => {
  const frames = Number(el.dataset.frames);
  const base = el.dataset.path;
  const ext = el.dataset.ext || "png";

  function update() {
    const rect = el.getBoundingClientRect();
    const progress =
      1 - Math.min(Math.max(rect.top / window.innerHeight, 0), 1);

    const frame = Math.min(frames, Math.max(1, Math.floor(progress * frames)));
    console.log(frame);

    el.style.backgroundImage = `url(${base}${String(frame).padStart(4, "0")}.${ext})`;
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
});
