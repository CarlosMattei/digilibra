"use client";

import { useCallback, useRef } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  /** Play once and freeze on the last frame */
  freezeOnComplete?: boolean;
}

export default function LottieAnimation({
  src,
  className,
  loop = false,
  autoplay = true,
  freezeOnComplete = false,
}: LottieAnimationProps) {
  const instanceRef = useRef<DotLottie | null>(null);

  const handleRef = useCallback(
    (dotLottie: DotLottie | null) => {
      instanceRef.current = dotLottie;

      if (!dotLottie || !freezeOnComplete) return;

      const onComplete = () => {
        dotLottie.pause(); // Garante que para no último frame
      };

      dotLottie.addEventListener("complete", onComplete);
    },
    [freezeOnComplete]
  );

  return (
    <DotLottieReact
      src={src}
      loop={loop}
      autoplay={autoplay}
      className={className}
      dotLottieRefCallback={handleRef}
    />
  );
}