import { useEffect } from "react"
import { generateCracks } from "@/effects/cracks"
import { spawnExplosion } from "@/effects/explosion"

export function useBreakLogic(
  blockRef: React.RefObject<HTMLDivElement | null>,
  flashRef: React.RefObject<HTMLDivElement | null>,
  taps: number
) {
  /*useEffect(() => {
    if (!blockRef.current) return

    const svg = blockRef.current.querySelector("svg") as SVGSVGElement
    if (svg) generateCracks(svg) // APPLY CRACKS BY DEFAULT

    let hits = 0
    const tap = new Audio("/assets/shared/sounds/tap.mp3")
    tap.volume = 0.1;
    const bang = new Audio("/assets/shared/sounds/flashbang-cs_qoRhxLn.mp3")
    bang.volume = 0.015;

    const onClick = () => {
      hits++

      tap.currentTime = 0
      tap.play().catch(() => { })

      if (hits === taps) {
        bang.currentTime = 0
        bang.play().catch(() => { })
      }

      if (flashRef.current) {
        const el = flashRef.current
        el.style.animation = "none"
        void el.offsetHeight
        el.style.animation =
          hits < taps ? "whiteFlashSmall .5s" : "whiteFlashBig 3s"
      }

      blockRef.current?.classList.add(`break-${hits}`)
      if (hits === taps) blockRef.current?.classList.add("broken")
    }

    blockRef.current.addEventListener("click", onClick)
    const rect = blockRef.current!.getBoundingClientRect()

    spawnExplosion(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      hits
    )
    return () => blockRef.current?.removeEventListener("click", onClick)
  }, [taps])*/
  useEffect(() => {
    if (!blockRef.current) return

    const svg = blockRef.current.querySelector("svg") as SVGSVGElement
    if (svg) generateCracks(svg)

    let hits = 0

    const tap = new Audio("/assets/shared/sounds/tap.mp3")
    tap.volume = 0.1

    const bang = new Audio("/assets/shared/sounds/flashbang-cs_qoRhxLn.mp3")
    bang.volume = 0.015

    const onClick = () => {
      hits++

      tap.currentTime = 0
      tap.play().catch(() => { })

      if (hits === taps) {
        bang.currentTime = 0
        bang.play().catch(() => { })
      }

      if (flashRef.current) {
        const el = flashRef.current
        el.style.animation = "none"
        void el.offsetHeight
        if (hits < taps) {
          el.style.animation = "whiteFlashSmall .5s"
        } else if (hits == taps) {
          el.style.animation = "whiteFlashBig 3s"
        }
      }

      blockRef.current?.classList.add(`break-${hits}`)
      if (hits === taps) blockRef.current?.classList.add("broken")

      const rect = blockRef.current!.getBoundingClientRect()
      spawnExplosion(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        hits
      )
    }

    blockRef.current.addEventListener("click", onClick)
    return () => blockRef.current?.removeEventListener("click", onClick)
  }, [taps])
}

