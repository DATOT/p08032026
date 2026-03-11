"use client";

import "./styles.css";
import { useEffect } from "react";
import { initPage } from "./script";

export default function Page() {
  useEffect(() => {
    initPage();
  }, []);

  return (
    <>
      <div className="white-flash" id="white-flash"></div>

      <section className="hero">
        <h1 id="girl-name"></h1>
        <p>Scroll slowly 👇</p>
      </section>

      <div className="stack" id="stack"></div>

      <section className="final-card">
        <div className="breakable" id="breakable">
          <svg className="crack-layer" id="crack-svg"></svg>
          <span className="hint" id="break-hint"></span>

          <div className="message">
            <h2 id="final-title"></h2>
            <p id="final-message"></p>
          </div>
        </div>
      </section>
    </>
  );
}
