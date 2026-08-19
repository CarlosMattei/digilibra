"use client";

import { useState } from "react";
import { Scene, GameFeedbackState } from "@/types/game";
import GestureSelector from "./GestureSelector";
import BadgeModal from "./BadgeModal";
import TypewriterText from "./TypewriterText";
import { Button } from "@/components/ui/button";
import { playSound } from "react-sounds";

interface DialogueBoxProps {
  scene: Scene;
  userName: string;
  userSequence: string[];
  feedback: GameFeedbackState;
  errorCount: number;
  onConfirmText: (text: string) => void;
  onSelectOption: (nextSceneId: string) => void;
  onAddGesture: (gesture: string) => void;
  onRemoveGesture: (index: number) => void;
  onClearGestures: () => void;
  onConfirmGestures: () => void;
  onError: () => void;
  onNextDialogue: () => void;
}

export default function DialogueBox({
  scene,
  userName,
  userSequence,
  feedback,
  errorCount,
  onConfirmText,
  onSelectOption,
  onAddGesture,
  onRemoveGesture,
  onClearGestures,
  onConfirmGestures,
  onError,
  onNextDialogue,
}: DialogueBoxProps) {
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  // Substitute {userName} placeholder in dialogue
  const dialogueText = scene.character.dialogue.replace(
    /\{userName\}/g,
    userName || "novato"
  );

  const handleNextClick = () => {
    try {
      playSound("ui/button_hard", { volume: 1 });
    } catch {}

    // If text is still typing, clicking next/continue completes the text reveal immediately
    if (isTyping) {
      // Typing will complete on click via TypewriterText internal event or skip state
      setIsTyping(false);
    } else {
      onNextDialogue();
    }
  };

  const handleOptionClick = (nextSceneId: string) => {
    try {
      playSound("ui/button_medium", { volume: 0.35 });
    } catch {}
    onSelectOption(nextSceneId);
  };

  return (
    <div
      className={`relative z-20 flex w-full flex-col justify-between p-5 sm:p-6 md:p-8 bg-[#262626] transition-all duration-300 shadow-2xl lg:rounded-none lg:h-full lg:max-w-md xl:max-w-lg ${
        feedback === "success"
          ? "ring-2 ring-emerald-500 shadow-emerald-500/20"
          : feedback === "error"
          ? "ring-2 ring-rose-500 shadow-rose-500/20"
          : ""
      }`}
    >
      {/* Top Section: Character Name Badge & Dialogue Text */}
      <div className="flex flex-col items-start w-full min-h-[140px]">
        {/* Character Badge */}
        <div
          className="px-4 py-1.5 rounded-xl font-bold text-base sm:text-lg text-white shadow-md mb-3.5 inline-flex items-center justify-center tracking-wide"
          style={{
            backgroundColor: scene.character.badgeColor || "#EA580C",
          }}
        >
          {scene.character.name}
        </div>

        {/* Dialogue Text with Typewriter Animation */}
        <TypewriterText
          key={scene.id + dialogueText}
          text={dialogueText}
          speed={22}
          onTypingStateChange={setIsTyping}
          className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-6 text-left w-full"
        />
      </div>

      {/* Dynamic Interaction Section */}
      <div className="flex flex-col gap-3.5 w-full mt-auto">
        {/* Text Input Scene */}
        {scene.type === "input_text" && (
          <div className="flex flex-col gap-3.5 w-full">
            <Button
              type="button"
              onClick={() => setIsBadgeModalOpen(true)}
              className="h-16 rounded-full bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-xl sm:text-2xl font-extrabold text-white shadow-lg transition-all duration-200 w-full cursor-pointer"
            >
              {scene.actionText || "Dizer nome"}
            </Button>
          </div>
        )}

        {/* Options Scene */}
        {scene.type === "options" && scene.options && (
          <div className="flex flex-col gap-3 w-full">
            {scene.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option.nextSceneId)}
                className="w-full py-4 px-6 rounded-2xl bg-[#3B3B3B] hover:bg-[#4B4B4B] active:bg-[#16A34A] text-white text-base sm:text-lg font-semibold text-left border border-white/10 shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Gesture Sequence Scene */}
        {scene.type === "gesture_sequence" && (
          <div className="flex flex-col gap-3 w-full">
            <GestureSelector
              gestureBank={scene.gestureBank || ["O", "I"]}
              expectedInput={scene.expectedInput || ["O", "I"]}
              userSequence={userSequence}
              errorCount={errorCount}
              hintLetters={scene.hintLetters}
              onAddGesture={onAddGesture}
              onRemoveGesture={onRemoveGesture}
              onClear={onClearGestures}
              onConfirmGestures={onConfirmGestures}
              onError={onError}
            />
          </div>
        )}

        {/* Simple Dialogue Next Scene */}
        {scene.type === "dialogue" && (
          <Button
            onClick={handleNextClick}
            className="h-16 rounded-full bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-xl sm:text-2xl font-extrabold text-white shadow-lg transition-all duration-200 w-full"
          >
            {isTyping ? "Revelar Texto" : scene.actionText || "Continuar"}
          </Button>
        )}

        {/* Error Feedback Message */}
        {feedback === "error" && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-sm sm:text-base text-center font-medium animate-bounce mt-1">
            Gestos incorretos! Tente selecionar os sinais na ordem certa.
          </div>
        )}

        {/* Success Feedback Message */}
        {feedback === "success" && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-sm sm:text-base text-center font-semibold mt-1">
            Muito bem! Resposta correta! ✨
          </div>
        )}
      </div>

      {/* Badge Modal for Name Entry */}
      <BadgeModal
        isOpen={isBadgeModalOpen}
        initialName={userName}
        onClose={() => setIsBadgeModalOpen(false)}
        onSubmit={(name) => {
          onConfirmText(name);
        }}
      />
    </div>
  );
}

