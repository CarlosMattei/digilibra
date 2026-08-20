"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createStoryData } from "@/data/story";
import CharacterView from "@/components/CharacterView";
import DialogueBox from "@/components/DialogueBox";
import ConfirmExitModal from "@/components/ConfirmExitModal";
import BackgroundMusic from "@/components/BackgroundMusic";
import { GameFeedbackState } from "@/types/game";
import { saveGameProgress, loadGameProgress, clearGameProgress } from "@/lib/game-progress";

export default function GamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentSceneId, setCurrentSceneId] = useState<string>("scene_welcome");
  const [userName, setUserName] = useState<string>("");
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<GameFeedbackState>("idle");
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [errorCount, setErrorCount] = useState<number>(0);

  // Load saved progress on mount (skip if restart=true)
  useEffect(() => {
    if (searchParams.get("restart") === "true") {
      clearGameProgress();
      return;
    }
    const saved = loadGameProgress();
    if (saved) {
      setUserName(saved.userName);
      setCurrentSceneId(saved.sceneId);
    }
  }, [searchParams]);

  // Save progress whenever scene changes (skip initial welcome)
  useEffect(() => {
    if (currentSceneId === "scene_welcome" && !userName) return;
    // Game looped back to start — clear saved progress
    if (currentSceneId === "scene_welcome" && userName) {
      clearGameProgress();
      return;
    }
    saveGameProgress(currentSceneId, userName);
  }, [currentSceneId, userName]);

  const storyData = createStoryData(userName);
  const currentScene = storyData[currentSceneId] || storyData["scene_welcome"] || Object.values(storyData)[0];

  // Intercept browser back button (popstate)
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
      setIsExitModalOpen(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Handle Text Input Submission (e.g. "Dizer nome")
  const handleConfirmText = (name: string) => {
  setUserName(name);
  setUserSequence([]);
  setFeedback("success");

  setTimeout(() => {
    setFeedback("idle");
    setErrorCount(0);
    setCurrentSceneId(currentScene.nextScene.success);
  }, 600);
};

  // Handle Option Selection
  const handleSelectOption = (nextSceneId: string) => {
  setUserSequence([]);
  setFeedback("idle");
  setErrorCount(0);
  setCurrentSceneId(nextSceneId);
};
  // Gesture Sequence Handlers
  const handleAddGesture = (gesture: string) => {
  setUserSequence((prev) => {
    if (prev.length >= (currentScene.expectedInput?.length ?? 0)) {
      return prev;
    }

    return [...prev, gesture];
  });
};

  const handleRemoveGesture = (index: number) => {
    setUserSequence((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearGestures = useCallback(() => {
    setUserSequence([]);
  }, []);

  // Increment error count so hints (revealed letter labels) appear
  const handleErrorGestures = useCallback(() => {
  setErrorCount((prev) => prev + 1);
  setFeedback("error");

  setUserSequence([]);

  setTimeout(() => {
    setFeedback("idle");
  }, 1000);
}, []);

  // Validate Gesture Sequence against expected input
  const handleConfirmGestures = useCallback(() => {
  const expected = currentScene.expectedInput;

  const isCorrect =
    Array.isArray(expected)
      ? userSequence.length === expected.length &&
        userSequence.every((val, idx) => val === expected[idx])
      : userSequence.join("") === expected;

  if (isCorrect) {
    setFeedback("success");

    setTimeout(() => {
      setFeedback("idle");
      setUserSequence([]);
      setErrorCount(0);
      setCurrentSceneId(currentScene.nextScene.success);
    }, 1200);

    return;
  }

  setErrorCount((prev) => prev + 1);
  setFeedback("error");
  setUserSequence([]);

  setTimeout(() => {
    setFeedback("idle");
  }, 1000);
}, [currentScene, userSequence]);

  // Simple Dialogue Next Action
  const handleNextDialogue = () => {
    setUserSequence([]);
    setFeedback("idle");
    setErrorCount(0);
    setCurrentSceneId(currentScene.nextScene.success);
  };

  const handleExitConfirm = () => {
    setIsExitModalOpen(false);
    router.push("/");
  };

  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center bg-[#121212] lg:p-6 select-none overflow-hidden">
      {/* Background Ambience for Desktop */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-blue-600/10 blur-[120px] hidden lg:block" />

      {/* Main Game Screen Container: Mobile Fullscreen / Desktop Card */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full h-dvh lg:h-[88vh] lg:max-h-[860px] lg:max-w-6xl lg:rounded-[32px] overflow-hidden bg-[#1A1A1A] lg:border lg:border-white/10 lg:shadow-2xl">
        {/* Character & Environment Display (Top on Mobile / Left on Desktop) */}
        <CharacterView
          character={currentScene.character}
          onBack={() => setIsExitModalOpen(true)}
        />

        {/* Dialogue & Interaction Box (Bottom on Mobile / Right on Desktop) */}
        <DialogueBox
          scene={currentScene}
          userName={userName}
          userSequence={userSequence}
          feedback={feedback}
          errorCount={errorCount}
          onConfirmText={handleConfirmText}
          onSelectOption={handleSelectOption}
          onAddGesture={handleAddGesture}
          onRemoveGesture={handleRemoveGesture}
          onClearGestures={handleClearGestures}
          onConfirmGestures={handleConfirmGestures}
          onError={handleErrorGestures}
          onNextDialogue={handleNextDialogue}
        />
      </div>

      {/* Exit Confirmation Modal */}
      <ConfirmExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={handleExitConfirm}
      />

      <BackgroundMusic />
    </main>
  );
}

