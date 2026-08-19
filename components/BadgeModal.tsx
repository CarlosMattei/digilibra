"use client";

import { useState, useEffect } from "react";
import { User, X, IdCard, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playSound } from "react-sounds";

interface BadgeModalProps {
  isOpen: boolean;
  initialName?: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function BadgeModal({
  isOpen,
  initialName = "",
  onClose,
  onSubmit,
}: BadgeModalProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      try {
        playSound("ui/submit", { volume: 0.4 });
      } catch {}
      onSubmit(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Container wrapper for Badge */}
      <div className="relative flex flex-col items-center w-full max-w-sm sm:max-w-md">
        
        {/* Lanyard Strap Visual */}
        <div className="w-16 h-12 bg-gradient-to-b from-orange-600 to-orange-700 rounded-t-lg shadow-md border-x border-t border-orange-400/40 flex items-center justify-center relative -mb-2 z-10">
          <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-orange-300 shadow-inner flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-orange-500/80" />
          </div>
        </div>

        {/* Metal Clip connecting strap to badge */}
        <div className="w-10 h-4 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-sm shadow-md border border-white/40 z-20 -mb-2" />

        {/* Badge Card */}
        <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#2A2D34] via-[#1E2128] to-[#14161B] p-6 shadow-2xl shadow-orange-500/15 text-white flex flex-col items-center text-center">
          
          {/* Badge Punch Hole */}
          <div className="w-12 h-3.5 rounded-full bg-[#111317] border border-white/10 shadow-inner mb-4 flex items-center justify-center">
            <div className="w-8 h-1 bg-black/60 rounded-full" />
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Avatar Photo Slot */}
          <div className="relative mb-5 group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#181A20] to-[#0F1014]  shadow-inner flex flex-col items-center justify-center p-2 relative overflow-hidden">
              {name.trim() ? (
                <div className="flex flex-col items-center justify-center animate-in zoom-in-95">
                  <User className="w-12 h-12 sm:w-14 sm:h-14 stroke-[1.5]" />
                  <span className="text-[10px] font-semibold text-gray-300 max-w-[90px] truncate mt-1">
                    {name.trim()}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <User className="w-12 h-12 sm:w-14 sm:h-14 stroke-[1.2]" />
                  <span className="text-[10px] font-medium text-gray-500 mt-1">
                    Sua Foto
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col items-start gap-1.5 w-full">
              <label htmlFor="badgeName" className="text-xs font-bold text-gray-300 tracking-wide uppercase flex items-center gap-1.5">
                <span>Nome para a identificação</span>
              </label>
              <input
                id="badgeName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carlos"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl bg-[#121418] border border-orange-500/40 text-white placeholder-gray-500 text-center font-extrabold text-lg focus:outline-none focus:border-transparent focus:border transition-all shadow-inner"
              />
            </div>

            {/* Action Submit Button */}
            <Button
              type="submit"
              disabled={!name.trim()}
              className="w-full h-14 rounded-2xl bg-[#16A34A] text-white font-extrabold text-lg disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirmar Crachá</span>
            </Button>
          </form>

          {/* Badge Bottom Barcode Graphic */}
          <div className="w-full mt-6 pt-4 border-t border-white/10 flex flex-col items-center gap-1">
            <div className="flex gap-1 items-center opacity-40">
              <div className="w-1 h-6 bg-white" />
              <div className="w-2 h-6 bg-white" />
              <div className="w-0.5 h-6 bg-white" />
              <div className="w-3 h-6 bg-white" />
              <div className="w-1 h-6 bg-white" />
              <div className="w-2.5 h-6 bg-white" />
              <div className="w-1 h-6 bg-white" />
              <div className="w-3 h-6 bg-white" />
              <div className="w-0.5 h-6 bg-white" />
              <div className="w-2 h-6 bg-white" />
            </div>
            <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">
              DIGILIBRA • ACCESS LEVEL 1
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
