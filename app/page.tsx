"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import DigiLibraSVG from "@/components/DigiLibraSVG";
import BackgroundMusic from "@/components/BackgroundMusic";
import MusicPreferenceModal from "@/components/MusicPreferenceModal";
import MusicToggle from "@/components/MusicToggle";


export default function Home() {
  return (
    
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0e43b8] via-[#000] to-[#000] px-6 py-6 sm:px-8 sm:py-10 md:px-12 lg:px-20">
      {/* Music Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-30">
        <MusicToggle />
      </div>

      {/* Background Subtle Glow / Ambience */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl lg:h-[500px] lg:w-[500px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-72 w-full max-w-lg rounded-full bg-blue-600/10 blur-2xl lg:max-w-4xl" />

      {/* Main Container - Mobile First & Desktop Responsive */}
      <div className="relative z-10 flex w-full max-w-md md:max-w-3xl lg:max-w-6xl flex-1 flex-col items-center justify-between lg:flex-row lg:items-center lg:justify-center lg:gap-16">
        
        {/* Character Card / Banner Area */}
        <div className="relative flex flex-1 w-full h-auto items-center justify-center lg:h-auto lg:flex-1 lg:max-w-xl">
          <div className="relative flex h-[480px] sm:h-[560px] lg:h-[520px] w-full max-w-[640px] items-center justify-center overflow-hidden">
            <DigiLibraSVG className="absolute inset-0 z-10 w-full h-full object-contain" />
          </div>
        </div>

        {/* Content & Action Buttons Section */}
        <div className="w-full flex flex-col items-center gap-2 pb-4 lg:mt-0 lg:flex-1 lg:max-w-md lg:items-start lg:gap-8 lg:pb-0">
          <p className="text-lg sm:text-xl md:text-2xl font-normal text-white text-center lg:text-left leading-relaxed mb-2">
            Uma experiência imersiva sobre Libras e acessibilidade
          </p>

          {/* Action Buttons Box */}
          <div className="flex w-full flex-col gap-3.5 rounded-[28px] p-3 bg-[#2D2D2D] shadow-2xl backdrop-blur-sm">
            <Button
              asChild
              className="h-16 rounded-full bg-[#2563EB] text-2xl sm:text-3xl font-bold text-white transition-all duration-200 hover:bg-[#1d4ed8] active:scale-[0.98]"
            >
              <Link href="/game">Iniciar</Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="h-16 rounded-full bg-[#4F4F4F] text-2xl sm:text-3xl font-bold text-white shadow-md transition-all duration-200 hover:bg-[#3d3d3d] active:scale-[0.98]"
            >
              <Link href="/about">Conheça o Projeto</Link>
            </Button>
          </div>
        </div>

        <BackgroundMusic />

      </div>

      <MusicPreferenceModal />
    </main>
  );
}
