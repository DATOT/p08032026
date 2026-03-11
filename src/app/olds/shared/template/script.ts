/* =========================
   TYPES
========================= */

type FootagePosition = "top" | "bottom";

interface CardFootage {
  video: string;
  position: FootagePosition;
}

interface CardData {
  title: string;
  text: string;
  theme: string;
  effectClass?: string;
  length?: number;
  topImage?: string;
  bottomImage?: string;
  footage?: CardFootage;
}

interface FinalBlock {
  taps: number;
  hint: string;
  title: string;
  message: string;
  blockImage: string;
}

interface GirlData {
  name: string;
  colorTheme: string;
  cards: CardData[];
  final: FinalBlock;
}

/* =========================
   DATA
========================= */

const DEFAULT_LENGTH = 200;

import girlData from "./data.json";

const GIRL = girlData as GirlData;

/* =========================
   HELPERS
========================= */

function $(id: string) {
  return document.getElementById(id);
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/* =========================
   INIT
========================= */

export function initPage() {
  setupBasicInfo();
  createStack();
  setupFinalBlock();
  setupScrollVideos();
}

/* =========================
   BASIC INFO
========================= */

function setupBasicInfo() {
  document.title = GIRL.name;

  const nameEl = $("girl-name");
  if (nameEl) nameEl.textContent = GIRL.name;
}

/* =========================
   STACK CARDS
========================= */

function createStack() {
  const stack = $("stack");
  if (!stack) return;

  GIRL.cards.forEach((card) => {
    const wrap = document.createElement("div");
    wrap.className = "card-wrap";
    wrap.style.width = "100%";
    wrap.style.height = `${card.length ?? DEFAULT_LENGTH}vh`;

    const section = document.createElement("section");
    section.className = `card sticky ${card.theme} ${card.effectClass ?? ""}`;

    if (card.footage) {
      section.dataset.hasFootage = "true";
    }

    const footageHTML = card.footage
      ? `<video
          class="scroll-video"
          src="${card.footage.video}"
          muted
          playsinline
          preload="auto"
        ></video>`
      : "";

    const footageTop = card.footage?.position === "top" ? footageHTML : "";

    const footageBottom =
      card.footage?.position === "bottom" ? footageHTML : "";

    section.innerHTML = `
      ${card.topImage ? `<img class="card-image-top" src="${card.topImage}">` : ""}
      ${footageTop}

      <div class="card-content">
        <h2>${card.title}</h2>
        <p>${card.text}</p>
      </div>

      ${footageBottom}
      ${card.bottomImage ? `<img class="card-image-bottom" src="${card.bottomImage}">` : ""}
    `;

    wrap.appendChild(section);
    stack.appendChild(wrap);
  });
}

/* =========================
   FINAL BLOCK
========================= */

function setupFinalBlock() {
  const block = $("breakable");
  const flash = $("white-flash");

  if (!block || !flash) return;

  block.style.backgroundImage = `url(${GIRL.final.blockImage})`;

  $("break-hint")!.textContent = GIRL.final.hint;
  $("final-title")!.textContent = GIRL.final.title;
  $("final-message")!.textContent = GIRL.final.message;

  let hits = 0;

  const tapSound = new Audio("/website/sounds/tap.mp3");
  const bangSound = new Audio("/website/sounds/flashbang-cs_qoRhxLn.mp3");

  tapSound.volume = 0.1;
  bangSound.volume = 0.015;

  function playSound(a: HTMLAudioElement) {
    a.currentTime = 0;
    a.play().catch(() => {});
  }

  block.addEventListener("click", () => {
    hits++;

    playSound(tapSound);
    if (hits === GIRL.final.taps) playSound(bangSound);

    flash.classList.remove("smallActive", "active");
    void flash.offsetWidth;

    if (hits < GIRL.final.taps) flash.classList.add("smallActive");
    else flash.classList.add("active");

    if (hits === 1) block.classList.add("break-1");
    if (hits === 2) block.classList.add("break-2");
    if (hits === 3) block.classList.add("break-3");

    if (hits === GIRL.final.taps) {
      block.classList.add("broken");
      block.style.backgroundImage = "";
    }
  });
}

/* =========================
   SCROLL VIDEO SYNC
========================= */

function setupScrollVideos() {
  document
    .querySelectorAll<HTMLVideoElement>(".scroll-video")
    .forEach((video) => {
      const wrap = video.closest(".card-wrap") as HTMLElement | null;
      if (!wrap) return;

      let ticking = false;

      function update() {
        ticking = false;

        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;

        const progress = clamp((vh - rect.top) / (rect.height - vh), 0, 1);

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
}
