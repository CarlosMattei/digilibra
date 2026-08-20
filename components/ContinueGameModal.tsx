"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { playSound } from "react-sounds";

interface ContinueGameModalProps {
  isOpen: boolean;
  onContinue: () => void;
  onRestart: () => void;
}

export default function ContinueGameModal({
  isOpen,
  onContinue,
  onRestart,
}: ContinueGameModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onRestart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onRestart]);

  if (!isOpen) return null;

  const handleContinue = () => {
    try {
      playSound("ui/button_hard", { volume: 0.8 });
    } catch {}
    onContinue();
  };

  const handleRestart = () => {
    try {
      playSound("ui/button_medium", { volume: 0.4 });
    } catch {}
    onRestart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="absolute inset-0"
        onClick={handleRestart}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] rounded-[32px] bg-[#16171B] border border-white/10 p-6 sm:p-8 shadow-2xl shadow-black/90 text-white flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
      >
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1C2D1A] border border-[#2A5C26]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#243D22] shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ADE80"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
          Progresso encontrado!
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 px-2 font-normal">
          Você tem um jogo salvo. O que deseja fazer?
        </p>

        <div className="w-full flex flex-col gap-3">
          <Button
            type="button"
            onClick={handleContinue}
            className="w-full h-13 sm:h-14 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-[0.98] font-extrabold text-base sm:text-lg text-white shadow-lg shadow-blue-950/40 transition-all cursor-pointer border-none"
          >
            Continuar de onde parou
          </Button>

          <Button
            type="button"
            onClick={handleRestart}
            variant="ghost"
            className="w-full h-12 rounded-full bg-transparent hover:bg-white/5 active:scale-[0.98] font-semibold text-base text-zinc-300 hover:text-white transition-all cursor-pointer border-none"
          >
            Jogar do começo
          </Button>
        </div>
      </div>
    </div>
  );
}
