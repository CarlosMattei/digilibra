"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { playSound } from "react-sounds";

interface HintLetter {
  position: number;
  letter: string;
}

interface GestureSelectorProps {
  gestureBank: string[];
  expectedInput?: string | string[];
  userSequence: string[];
  errorCount: number;
  hintLetters?: HintLetter[];
  onAddGesture: (gesture: string) => void;
  onRemoveGesture: (index: number) => void;
  onClear: () => void;
  onConfirmGestures: () => void;
  onError: () => void;
}

function getRevealedPositions(errorCount: number, totalLength: number): Set<number> {
  if (errorCount === 0 || totalLength === 0) return new Set();
  const count = Math.min(errorCount, totalLength);
  const positions = new Set<number>();
  for (let i = 0; i < count; i++) {
    positions.add(i);
  }
  return positions;
}

export default function GestureSelector({
  gestureBank,
  expectedInput = ["O", "I"],
  userSequence,
  errorCount,
  hintLetters = [],
  onAddGesture,
  onRemoveGesture,
  onClear,
  onConfirmGestures,
  onError,
}: GestureSelectorProps) {
  const [isError, setIsError] = useState(false);
  const [isMergedSuccess, setIsMergedSuccess] = useState(false);

  const prevRevealedRef = useRef<Set<number>>(new Set());
  const [newlyRevealedPositions, setNewlyRevealedPositions] = useState<Set<number>>(new Set());

  const validationEnabled = useRef(true);

  const expectedArray = Array.isArray(expectedInput)
    ? expectedInput
    : typeof expectedInput === "string"
    ? expectedInput.split("")
    : ["O", "I"];

  const targetLength = expectedArray.length;

  // Build a Map of hint positions — used only on gesture bank buttons
  const hintMap = new Map(hintLetters.map((h) => [h.position, h.letter]));

  // Track which positions have been revealed via errors (for bank button hints)
  const revealedPositions = getRevealedPositions(errorCount, targetLength);

  useEffect(() => {
    const prev = prevRevealedRef.current;
    const newOnes = new Set<number>();
    revealedPositions.forEach((pos) => {
      if (!prev.has(pos)) newOnes.add(pos);
    });

    if (newOnes.size > 0) {
      setNewlyRevealedPositions(newOnes);
      const t = setTimeout(() => setNewlyRevealedPositions(new Set()), 1200);
      prevRevealedRef.current = revealedPositions;
      return () => clearTimeout(t);
    }

    prevRevealedRef.current = revealedPositions;
  }, [errorCount, revealedPositions]);

  useEffect(() => {
    if (userSequence.length === 0 && errorCount === 0) {
      setIsError(false);
      setIsMergedSuccess(false);
      validationEnabled.current = true;
      prevRevealedRef.current = new Set();
      setNewlyRevealedPositions(new Set());
    }
  }, [userSequence, errorCount]);

  useEffect(() => {
    if (userSequence.length === 0) {
      validationEnabled.current = true;
      setIsError(false);
      setIsMergedSuccess(false);
    }
  }, [userSequence]);

  // Auto-validate when all slots are filled
  useEffect(() => {
    if (!validationEnabled.current) return;

    if (userSequence.length === 0) {
      setIsError(false);
      setIsMergedSuccess(false);
      return;
    }

    if (userSequence.length === targetLength) {
      const isCorrect = userSequence.every(
        (val, idx) => val === expectedArray[idx]
      );

      if (isCorrect) {
        setIsError(false);
        setIsMergedSuccess(true);

        try {
          playSound("notification/success", { volume: 0.5 });
          confetti({
            particleCount: 80,
            spread: 75,
            origin: { y: 0.65 },
            zIndex: 9999,
          });
        } catch {}

        const timer = setTimeout(() => {
          onConfirmGestures();
        }, 1200);

        return () => clearTimeout(timer);
      } else {
        validationEnabled.current = false;
        setIsError(true);
        onError();
        try {
          playSound("notification/error", { volume: 0.4 });
        } catch {}

        const timer = setTimeout(() => {
          setIsError(false);
          onClear();
        }, 800);

        return () => clearTimeout(timer);
      }
    }
  }, [userSequence, targetLength, expectedArray, onConfirmGestures, onClear, onError]);

  const handleGestureClick = (gesture: string) => {
    if (isMergedSuccess || isError) return;

    if (userSequence.length < targetLength) {
      try {
        playSound("ui/item_select", { volume: 0.4 });
      } catch {}
      onAddGesture(gesture);
    } else {
      const lastIndex = userSequence.lastIndexOf(gesture);
      if (lastIndex !== -1) {
        try {
          playSound("ui/item_deselect", { volume: 0.3 });
        } catch {}
        onRemoveGesture(lastIndex);
      }
    }
  };

  if (isMergedSuccess) {
    return (
      <div className="w-full my-2 flex items-center justify-center">
        <div className="w-full h-16 sm:h-20 rounded-2xl bg-[#292B28] text-[#0ef161] text-xl sm:text-2xl font-extrabold flex items-center justify-center gap-3 shadow-xl border-2 animate-merge-success cursor-default tracking-wide border-b-8 border-[#15803D]">
          <span>Correto!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full my-2 flex flex-col gap-3">
      {/* Sequence Slots — always empty, filled left-to-right by user */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-[#1C1C1C] border border-white/10 w-full min-h-[60px]">
        {Array.from({ length: targetLength }).map((_, idx) => {
          const gesture = userSequence[idx] ?? null;

          return (
            <button
              key={idx}
              type="button"
              disabled={!gesture || isError}
              onClick={() => {
                if (gesture && !isError) {
                  try {
                    playSound("ui/item_deselect", { volume: 0.3 });
                  } catch {}
                  onRemoveGesture(idx);
                }
              }}
              title={gesture ? `Remover gesto ${gesture}` : `Espaço ${idx + 1}`}
              className={`flex flex-col items-center justify-center w-10 h-11 sm:w-12 sm:h-13 rounded-xl transition-all ${
                isError && gesture
                  ? "bg-rose-900/60 border-2 border-rose-500 text-rose-200 animate-shake"
                  : gesture
                  ? "bg-[#333333] border-2 border-emerald-500 text-white cursor-pointer hover:bg-rose-950/80 hover:border-rose-500 scale-105 shadow-md"
                  : "bg-[#252525] border border-dashed border-white/20 text-white/30"
              }`}
            >
              {gesture ? (
                <>
                  <Image
                    src={`/gestures/${gesture === "B" ? "b" : gesture}.svg`}
                    alt={gesture}
                    width={26}
                    height={26}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain brightness-0 invert"
                  />
                  <span className="text-[10px] font-extrabold leading-none text-emerald-400 mt-0.5">
                    {gesture}
                  </span>
                </>
              ) : (
                <span className="text-xs font-bold text-white/20">{idx + 1}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Gesture Bank Buttons */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-2.5 w-full">
        {gestureBank.map((gesture, bankIdx) => {
          const selectedCount = userSequence.filter((g) => g === gesture).length;
          const firstSelectedIndex = userSequence.indexOf(gesture);
          const isSelected = selectedCount > 0;

          // Hint: reveal letter label on bank button when this position is revealed
          const isLetterRevealedHere =
            !isSelected &&
            expectedArray.includes(gesture) &&
            revealedPositions.has(expectedArray.indexOf(gesture));

          const isNewlyRevealedHere =
            !isSelected &&
            expectedArray.includes(gesture) &&
            newlyRevealedPositions.has(expectedArray.indexOf(gesture));

          return (
            <button
              key={`${gesture}-${bankIdx}`}
              type="button"
              onClick={() => handleGestureClick(gesture)}
              className={`relative flex flex-col items-center justify-center h-20 sm:h-24 p-2 rounded-2xl transition-all duration-200 cursor-pointer select-none ${
                isError && isSelected
                  ? "bg-rose-900 border-2 border-rose-500 border-b-[5px] text-rose-200 animate-shake"
                  : isSelected
                  ? "bg-[#333333] border-2 border-emerald-500 border-b-[5px] scale-[1.02] -translate-y-0.5"
                  : isLetterRevealedHere
                  ? "bg-[#1E2A1A] border-2 border-amber-500 border-b-[5px] border-b-[#996D00] scale-[1.02]"
                  : "bg-[#242424] hover:bg-[#2F2F2F] active:bg-[#1C1C1C] border border-white/10 border-b-[5px] border-b-[#141414]"
              }`}
            >
              <Image
                src={`/gestures/${gesture === "B" ? "b" : gesture}.svg`}
                alt={`Gesto ${gesture}`}
                width={44}
                height={44}
                className={`w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform duration-200 brightness-0 invert ${
                  isSelected ? "scale-110" : ""
                }`}
              />
              <span
                className={`text-xs sm:text-sm font-bold mt-1 transition-all duration-300 ${
                  isLetterRevealedHere
                    ? `text-amber-400 ${isNewlyRevealedHere ? "animate-slot-reveal" : ""}`
                    : "text-transparent"
                }`}
              >
                {gesture}
              </span>

              {isSelected && !isError && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] sm:text-xs font-black text-white shadow-md ring-2 ring-[#262626] animate-in zoom-in-50">
                  {selectedCount > 1 ? `${selectedCount}x` : firstSelectedIndex + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {errorCount > 0 && revealedPositions.size > 0 && (
        <div className="flex items-center gap-2 px-1">
          <span className="text-amber-500/70 text-xs font-medium">
            💡 {revealedPositions.size} letra{revealedPositions.size > 1 ? "s" : ""} revelada{revealedPositions.size > 1 ? "s" : ""} ({revealedPositions.size}/{targetLength})
          </span>
        </div>
      )}
    </div>
  );
}
