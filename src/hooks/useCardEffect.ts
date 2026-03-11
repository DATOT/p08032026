import { useEffect } from "react"
import { attachVectorEffect } from "@/effects/vectors"
// later: rain, particles, etc

export function useCardEffect(
  ref: React.RefObject<HTMLElement>,
  effect?: string
) {
  useEffect(() => {
    if (!ref.current || !effect) return

    let cleanup: (() => void) | undefined

    if (effect === "fx-vectors") {
      cleanup = attachVectorEffect(ref.current)
    }

    return () => cleanup?.()
  }, [effect, ref])
}
