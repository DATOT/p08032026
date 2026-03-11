"use client"

import { useEffect } from "react"
import { useSearchParams, notFound } from "next/navigation"
import { initPage } from "../(website)/shared/engine"
import dataMap from "../(website)/shared/data-map"

export default function Page() {
  const params = useSearchParams()
  const girl = params.get("girl")

  if (!girl || !(girl in dataMap)) {
    notFound()
  }

  const data = dataMap[girl]

  useEffect(() => {
    initPage(data)
  }, [girl])

  return (
    <>
      <div className="white-flash" id="white-flash" />

      <section className="hero">
        <h1 id="girl-name" />
        <p>Scroll slowly 👇</p>
      </section>

      <div className="stack" id="stack" />

      <section className="final-card">
        <div className="breakable" id="breakable">
          <svg className="crack-layer" id="crack-svg" />
          <span className="hint" id="break-hint" />
          <div className="message">
            <h2 id="final-title" />
            <p id="final-message" />
          </div>
        </div>
      </section>
    </>
  )
}
