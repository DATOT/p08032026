"use client";
import { useRef } from "react";
import { useCardEffect } from "./useCardEffect";

export function Card({ card }: { card: any }) {
  const ref = useRef<HTMLElement>(null);
  useCardEffect(ref, card.effectClass);

  return (
    <section
      ref={ref}
      className={`card sticky ${card.theme} ${card.effectClass ?? ""}`}
    >
      {/* Top background image layer */}
      {card.backgroundImage && (
        <div
          className="card-bg-top"
          style={{
            backgroundImage: `url(${card.backgroundImage})`,
          }}
        />
      )}

      {card.topImage && <img className="card-image-top" src={card.topImage} />}

      <div className="card-content">
        <h2 className={card.titleEffect ?? ""} data-text={card.text}>
          {card.title}
        </h2>

        <p className={card.textEffect ?? ""} data-text={card.text}>
          {card.text}
        </p>
      </div>

      {card.bottomImage && (
        <img className="card-image-bottom" src={card.bottomImage} />
      )}
    </section>
  );
}
