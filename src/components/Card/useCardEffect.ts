import { useEffect } from "react";
import { attachVectorEffect } from "@/effects/vectors";
import { attachRainEffect } from "@/effects/rain";
import { attachNeuronNetworkEffect } from "@/effects/neuronnetwork";
import {
  attachFlowerParticlesEffect,
  attachWhiteTulipEffect,
} from "@/effects/flowers";
import { attachDNAEffect } from "@/effects/dna";
import { attachVeinGrowthEffect } from "@/effects/vein";

export function useCardEffect(
  ref: React.RefObject<HTMLElement | null>,
  effect?: string,
) {
  useEffect(() => {
    if (!ref.current || !effect) return;

    let cleanup: (() => void) | undefined;

    if (effect === "fx-vectors") {
      cleanup = attachVectorEffect(ref.current);
    }
    if (effect === "fx-rain") {
      cleanup = attachRainEffect(ref.current);
    }
    if (effect === "fx-flower-particles") {
      cleanup = attachFlowerParticlesEffect(ref.current);
    }
    if (effect === "fx-white-tulips") {
      cleanup = attachWhiteTulipEffect(ref.current);
    }
    if (effect === "fx-dna") {
      cleanup = attachDNAEffect(ref.current!);
    }
    if (effect === "fx-neuron-network") {
      cleanup = attachNeuronNetworkEffect(ref.current!);
    }
    if (effect === "fx-vein-growth") {
      cleanup = attachVeinGrowthEffect(ref.current!);
    }

    return () => cleanup?.();
  }, [effect]);
}
