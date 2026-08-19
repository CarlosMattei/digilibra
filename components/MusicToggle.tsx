"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getMusicPreference, setMusicPreference } from "@/lib/music";

interface MusicToggleProps {
  className?: string;
}

export default function MusicToggle({ className = "" }: MusicToggleProps) {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    setEnabled(getMusicPreference() ?? false);

    const handleChange = (e: Event) => {
      setEnabled((e as CustomEvent<boolean>).detail);
    };
    window.addEventListener("digilibra-music-change", handleChange);
    return () =>
      window.removeEventListener("digilibra-music-change", handleChange);
  }, []);

  const toggle = () => setMusicPreference(!enabled);

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white/90 hover:text-white text-sm font-semibold backdrop-blur-md transition-all active:scale-95 border border-white/10 shadow-lg cursor-pointer ${className}`}
      aria-label={enabled ? "Desativar música" : "Ativar música"}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
    </button>
  );
}
