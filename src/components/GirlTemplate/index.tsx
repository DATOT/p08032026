"use client"

import { useEffect, useRef } from "react";
import { useBreakLogic } from "./useBreakLogic";
import { Card } from "@/components/Card";
import "./styles/base.css";
import "./styles/effects.css";
import "./styles/text_effects.css";
import "./styles/themes.css";

export default function GirlTemplate({ data }: { data: any }) {
  const blockRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useBreakLogic(blockRef, flashRef, data.final.taps);

  useEffect(() => {
    if (!data.startup) return;

    const audio = new Audio(data.startup.sound);
    audio.volume = 0.8;
    audioRef.current = audio;

    const startAudio = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", startAudio);
      window.removeEventListener("scroll", startAudio);
    };

    window.addEventListener("click", startAudio);
    window.addEventListener("scroll", startAudio);

  }, [data.startup]);

  return (
    <>
      <section className="hero">
        <h1 className="tx-bold">{data.name}</h1>
        <p className="tx-mid tx-bold">👇👇👇Scroll down👇👇👇</p>
        <p className="tx-xs">Từ từ thôi nha</p>
      </section>

      <div className="stack">
        {data.cards.map((c: any, i: number) => (
          <div
            key={i}
            className="card-wrap"
            style={{ height: `${c.length ?? 200}vh` }}
          >
            <Card card={c} />
          </div>
        ))}
      </div>

      <div className="white-flash" ref={flashRef} />
      <div className="explosion-layer" />

      <section className="final-card">
        <div
          ref={blockRef}
          className="breakable"
          style={{ backgroundImage: `url(${data.final.blockImage})` }}
        >
          <svg className="crack-layer" viewBox="0 0 100 100" />
          <span className="hint tx-rainbow tx-bold tx-large">
            {"Ấn vào"}
          </span>
          <div className="message">
            <h2>{data.final.title}</h2>
            <p>{data.final.message}</p>
          </div>
        </div>
      </section>
    </>
  );
}
