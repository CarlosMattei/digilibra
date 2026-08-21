"use client";

import { useEffect, useRef } from "react";

interface DigiLibraSVGProps {
  className?: string;
  /** Duração da animação SVG em ms. Após este tempo, a animação é pausada no último frame. */
  animationDurationMs?: number;
}

/**
 * Renders the DIGILIBRA.svg animation and freezes it on the last frame
 * after the animation completes, serving as the game title logo.
 *
 * Uses an <object> tag to load the SVG so we can call
 * pauseAnimations() on the embedded SVG DOM after the animation finishes.
 */
export default function DigiLibraSVG({
  className,
  animationDurationMs = 6283,
}: DigiLibraSVGProps) {
  const objectRef = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const objectEl = objectRef.current;
      if (!objectEl) return;

      const svgDoc =
        objectEl.contentDocument ?? objectEl.getSVGDocument?.();

      if (svgDoc) {
        const svgEl = svgDoc.querySelector("svg");
        if (svgEl) {
          // pauseAnimations() freezes all SMIL animations at the current time.
          // Since we wait for the full animation duration, it will freeze at the last frame.
          (svgEl as SVGSVGElement).pauseAnimations();
        }
      }
    }, animationDurationMs);

    return () => clearTimeout(timer);
  }, [animationDurationMs]);

  return (
    <object
      ref={objectRef}
      type="image/svg+xml"
      data="/characters/DIGILIBRA.svg"
      className={className}
      aria-label="DIGILIBRA logo animation"
    />
  );
}
