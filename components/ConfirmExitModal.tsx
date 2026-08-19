"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { playSound } from "react-sounds";

interface ConfirmExitModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmExitModal({
  isOpen,
  title = "Já vai embora?",
  description = "Ao sair, você irá perder seu progresso atual e voltará para o Menu Principal.",
  confirmText = "Sim, quero sair",
  cancelText = "Não, vou ficar",
  onClose,
  onConfirm,
}: ConfirmExitModalProps) {

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    try {
      playSound("ui/button_hard", { volume: 0.8 });
    } catch {}
    onConfirm();
  };

  const handleCancel = () => {
    try {
      playSound("ui/button_medium", { volume: 0.4 });
    } catch {}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop overlay listener */}
      <div
        className="absolute inset-0"
        onClick={handleCancel}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] rounded-[32px] bg-[#16171B] border border-white/10 p-6 sm:p-8 shadow-2xl shadow-black/90 text-white flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
      >
        {/* Header Icon Circle */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#33181C] border border-[#522227]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4A1D23] shadow-inner">
            {/* Custom Exit Door Icon matching screenshot */}
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<g fill="#E5484D">
		<path d="M9.052 4.5C9 5.078 9 5.804 9 6.722v10.556c0 .918 0 1.644.052 2.222H8c-2.357 0-3.536 0-4.268-.732C3 18.035 3 16.857 3 14.5v-5c0-2.357 0-3.536.732-4.268S5.643 4.5 8 4.5z" opacity=".5" />
		<path fillRule="evenodd" d="M9.707 2.409C9 3.036 9 4.183 9 6.476v11.048c0 2.293 0 3.44.707 4.067s1.788.439 3.95.062l2.33-.406c2.394-.418 3.591-.627 4.302-1.505c.711-.879.711-2.149.711-4.69V8.948c0-2.54 0-3.81-.71-4.689c-.712-.878-1.91-1.087-4.304-1.504l-2.328-.407c-2.162-.377-3.243-.565-3.95.062m3.043 8.545c0-.434-.336-.785-.75-.785s-.75.351-.75.784v2.094c0 .433.336.784.75.784s.75-.351.75-.784z" clipRule="evenodd" />
	</g>
</svg>

          </div>
        </div>

        {/* Modal Title */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
          {title}
        </h2>

        {/* Subtitle / Warning Description */}
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 px-2 font-normal">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          {/* Confirm Exit Button (Red Pill) */}
          <Button
            type="button"
            onClick={handleConfirm}
            className="w-full h-13 sm:h-14 rounded-full bg-[#E5484D] hover:bg-[#D93D42] active:scale-[0.98] font-extrabold text-base sm:text-lg text-white shadow-lg shadow-red-950/40 transition-all cursor-pointer border-none"
          >
            {confirmText}
          </Button>

          {/* Cancel Button (Transparent / Text Pill) */}
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
            className="w-full h-12 rounded-full bg-transparent hover:bg-white/5 active:scale-[0.98] font-semibold text-base text-zinc-300 hover:text-white transition-all cursor-pointer border-none"
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
}
