"use client";

import { useEffect } from "react";
import { applyStoredPreference, getMusicPreference, startMusic, stopMusic } from "@/lib/music";

export default function BackgroundMusic() {
  useEffect(() => {
    applyStoredPreference();

    const handleChange = (e: Event) => {
      if ((e as CustomEvent<boolean>).detail) {
        startMusic();
      } else {
        stopMusic();
      }
    };

    // Resume on first user interaction (browser autoplay policy blocks sound on reload)
    const resume = () => {
      if (getMusicPreference() === true) {
        startMusic();
      }
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
      window.removeEventListener("touchstart", resume);
      window.removeEventListener("click", resume);
    };

    window.addEventListener("digilibra-music-change", handleChange);
    window.addEventListener("pointerdown", resume);
    window.addEventListener("keydown", resume);
    window.addEventListener("touchstart", resume);
    window.addEventListener("click", resume);

    return () => {
      cleanup();
      window.removeEventListener("digilibra-music-change", handleChange);
    };
  }, []);

  return null;
}