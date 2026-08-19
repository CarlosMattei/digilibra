"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getMusicPreference, setMusicPreference } from "@/lib/music";

export default function MusicPreferenceModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (getMusicPreference() === null) {
      const timer = setTimeout(() => setIsOpen(true), 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (enabled: boolean) => {
    setMusicPreference(enabled);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop overlay listener */}
      <div
        className="absolute inset-0"
        onClick={() => handleChoice(false)}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] rounded-[32px] bg-[#16171B] border border-white/10 p-6 sm:p-8 shadow-2xl shadow-black/90 text-white flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
      >
        {/* Header Icon Circle */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#12265C] border border-[#2563EB]/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] shadow-inner">
            {/* Music Note Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18V5l12-2v13"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="18" r="3" stroke="#fff" strokeWidth="2" />
              <circle cx="18" cy="16" r="3" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Modal Title */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
          Quer ouvir música?
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 px-2 font-normal">
          Deseja utilizar músicas no jogo para tornar a experiência mais imersiva?
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          <Button
            type="button"
            onClick={() => handleChoice(true)}
            className="w-full h-13 sm:h-14 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-[0.98] font-extrabold text-base sm:text-lg text-white shadow-lg shadow-blue-950/40 transition-all cursor-pointer border-none"
          >
            Sim
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => handleChoice(false)}
            className="w-full h-12 rounded-full bg-transparent hover:bg-white/5 active:scale-[0.98] font-semibold text-base text-zinc-300 hover:text-white transition-all cursor-pointer border-none"
          >
            Não
          </Button>
        </div>
      </div>
    </div>
  );
}
