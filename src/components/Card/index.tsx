"use client";
import "./baseStyles.css";
import { useEffect, useRef } from "react";
import { useCardEffect } from "./useCardEffect";

const bounce = (e: React.MouseEvent<HTMLImageElement>) => {
  const el = e.currentTarget;
  console.log(el)

  el.classList.remove("img-bounce");
  void el.offsetWidth;
  el.classList.add("img-bounce");
};

export function Card({ card }: { card: any }) {
  const ref = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useCardEffect(ref, card.effectClass);

  useEffect(() => {
    if (!card.firstClick || !ref.current) return;

    const audio = new Audio(card.firstClick.sound);
    audio.volume = 0.5;
    audioRef.current = audio;

    const startAudio = () => {
      audio.play().catch(() => {});
      ref.current?.removeEventListener("click", startAudio);
      ref.current?.removeEventListener("wheel", startAudio);
      ref.current?.removeEventListener("touchmove", startAudio);
    };

    const el = ref.current;

    el.addEventListener("click", startAudio);
    el.addEventListener("wheel", startAudio);      // mouse scroll
    el.addEventListener("touchmove", startAudio);  // mobile scroll

    return () => {
      el.removeEventListener("click", startAudio);
      el.removeEventListener("wheel", startAudio);
      el.removeEventListener("touchmove", startAudio);
    };
  }, [card.firstClick]);

  return (
    <section
      ref={ref}
      className={`card sticky ${card.theme} ${card.effectClass ?? ""}`}
    >
      {card.backgroundImage && (
        <div
          className="card-bg-top"
          style={{
            backgroundImage: `url(${card.backgroundImage})`,
          }}
        />
      )}

      {card.topImage && <img className="card-image-top" src={card.topImage} onClick={bounce}/>}

      <div className="card-content">
        <h2 className={card.titleEffect ?? ""} data-text={card.text}>
          {card.title}
        </h2>

        <p className={card.textEffect ?? ""} data-text={card.text}>
          {card.text}
        </p>
      </div>

      {card.bottomImage && (
        <img className="card-image-bottom" src={card.bottomImage} onClick={bounce}/>
      )}
    </section>
  );
}
