/* =========================
   DATA
========================= */
const DEFAULT_LENGHT = 200;
const GIRL = {
  name: "Bùi Phạm Khánh An",
  colorTheme: "card-red",
  cards: [
    {
      title: "Mathematical Vectors",
      text: "Direction. Magnitude. Precision.",
      theme: "card-red",
      effectClass: "fx-vectors",
    },
    {
      title: "Minecraft",
      text: "Building worlds, one block at a time.",
      theme: "card-dark",
      bottomImage: "./assets/minecraft.png",
      footage: {
        video: "./assets/footage/minecraft/minecraft.mp4",
        position: "top", // or bottom
      },
      length: 300,
    },
    {
      title: "Physics",
      text: "Understanding how the universe moves.",
      theme: "card-light",
    },
  ],
  final: {
    taps: 4,
    hint: "Tap it",
    title: "08 / 03 / 2026",
    message: "You’re stronger than you think 💖",
    blockImage: "./assets/dirt.png",
  },
};

/* =========================
   BASIC INFO
========================= */

document.getElementById("page-title").textContent = GIRL.name;
document.getElementById("girl-name").textContent = GIRL.name;

/* =========================
   CREATE STACK CARDS
========================= */

const stack = document.getElementById("stack");

GIRL.cards.forEach((c) => {
  const wrap = document.createElement("div");
  wrap.className = "card-wrap";
  wrap.style.width = "100%";
  wrap.style.height = c.length ? `${c.length}vh` : `${DEFAULT_LENGHT}vh`;

  const section = document.createElement("section");
  section.className = `card sticky ${c.theme} ${c.effectClass || ""}`;
  if (c.footage) {
    section.dataset.hasFootage = "true";
  }

  const footageHTML = c.footage
    ? `<video
        class="scroll-video"
        src="${c.footage.video}"
        muted
        playsinline
        preload="auto"
     ></video>`
    : "";

  const footageTop =
    c.footage && c.footage.position === "top" ? footageHTML : "";

  const footageBottom =
    c.footage && c.footage.position === "bottom" ? footageHTML : "";
  section.innerHTML = `
  ${c.topImage ? `<img class="card-image-top" src="${c.topImage}">` : ""}

  ${footageTop}

  <div class="card-content">
    <h2>${c.title}</h2>
    <p>${c.text}</p>
  </div>

  ${footageBottom}

  ${c.bottomImage ? `<img class="card-image-bottom" src="${c.bottomImage}">` : ""}
`;

  wrap.appendChild(section);
  stack.appendChild(wrap);
});

/* =========================
   FINAL BLOCK SETUP
========================= */

const block = document.getElementById("breakable");
const flash = document.getElementById("white-flash");

block.style.backgroundImage = `url(${GIRL.final.blockImage})`;

document.getElementById("break-hint").textContent = GIRL.final.hint;
document.getElementById("final-title").textContent = GIRL.final.title;
document.getElementById("final-message").textContent = GIRL.final.message;

/* =========================
   BREAK LOGIC
========================= */

let hits = 0;
const tapSound = new Audio("../assets/sounds/tap.mp3");
const bangSound = new Audio("../assets/sounds/flashbang-cs_qoRhxLn.mp3");
function playSound(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
// Optional polish
tapSound.volume = 0.1;
bangSound.volume = 0.015;
block.addEventListener("click", () => {
  hits++;

  /* --- SOUND --- */
  playSound(tapSound);
  if (hits === GIRL.final.taps) playSound(bangSound);

  /* --- FULLSCREEN FLASH --- */
  flash.classList.remove("smallActive", "active");
  void flash.offsetWidth;

  if (hits < GIRL.final.taps) {
    flash.classList.add("smallActive");
  } else if (hits === GIRL.final.taps) {
    flash.classList.add("active");
  }

  /* --- BREAK STAGES --- */
  if (hits === 1) block.classList.add("break-1");
  if (hits === 2) block.classList.add("break-2");
  if (hits === 3) block.classList.add("break-3");

  if (hits === GIRL.final.taps) {
    block.classList.add("broken");
    block.style.backgroundImage = null;
  }
});
document.querySelectorAll(".scroll-video").forEach((video) => {
  const wrap = video.closest(".card-wrap");
  if (!wrap) return;

  let ticking = false;

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function update() {
    ticking = false;

    const wrapRect = wrap.getBoundingClientRect();
    const vh = window.innerHeight;

    // Progress based on wrapper scroll, not sticky card
    const progress = clamp((vh - wrapRect.top) / (wrapRect.height - vh), 0, 1);

    if (video.duration) {
      video.currentTime = progress * video.duration;
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  video.addEventListener("loadedmetadata", update);
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
});
