"use client";

import { useRef } from "react";
import { useBreakLogic } from "./useBreakLogic";
import { Card } from "@/components/Card";
import "./styles/base.css";
import "./styles/effects.css";
import "./styles/text_effects.css";
import "./styles/themes.css";

export default function GirlTemplate({ data }: { data: any }) {
  const blockRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useBreakLogic(blockRef, flashRef, data.final.taps);

  return (
    <>
      <section className="hero">
        <h1 className="tx-bold">{data.name}</h1>
        <p>👇👇👇Scroll down👇👇👇</p>
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
          <span className="hint tx-rainbow tx-bold tx-mid">
            {data.final.hint}
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
