"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Character } from "@/types/game";
import MusicToggle from "@/components/MusicToggle";

interface CharacterViewProps {
  character: Character;
  onBack?: () => void;
}

export default function CharacterView({ character, onBack }: CharacterViewProps) {
  return (
    <div className="relative flex flex-1 w-full min-h-[50vh] lg:min-h-full items-end justify-center overflow-hidden bg-slate-900 select-none">
      {/* Background Image */}
      {character.background ? (
        <Image
          src={character.background}
          alt="Cenário do jogo"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center opacity-85"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-slate-900 to-black" />
      )}

      {/* Top Overlay Controls (Voltar + Music Toggle) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white/90 hover:text-white text-sm font-semibold backdrop-blur-md transition-all active:scale-95 border border-white/10 shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white/90 hover:text-white text-sm font-semibold backdrop-blur-md transition-all active:scale-95 border border-white/10 shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Link>
        )}
        <MusicToggle />
      </div>

      {/* Character Image */}
      <div className="relative z-10 flex h-[85%] max-h-[580px] lg:max-h-[700px] w-full items-end justify-center">
        <Image
          src={character.image}
          alt={character.name}
          width={500}
          height={750}
          priority
          className="h-full w-auto object-contain object-bottom drop-shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>

      {/* Bottom overlay gradient for smooth transition to DialogueBox */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#262626] to-transparent lg:hidden z-15" />
    </div>
  );
}
