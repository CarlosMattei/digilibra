"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { playSound } from "react-sounds";

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
  onComplete?: () => void;
  onTypingStateChange?: (isTyping: boolean) => void;
  soundEnabled?: boolean;
  showCursor?: boolean;
}

export default function TypewriterText({
  text,
  speed = 25,
  className = "",
  onComplete,
  onTypingStateChange,
  soundEnabled = true,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const textIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play react-sounds typing keystroke sound
  const playTypingSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      playSound("ui/keystroke_soft", { volume: 0.12 });
    } catch {
      // Ignore audio errors if blocked before interaction
    }
  }, [soundEnabled]);

  // Complete typing instantly when clicked or skip requested
  const skipTyping = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDisplayedText(text);
    setIsTyping(false);
    onTypingStateChange?.(false);
    onComplete?.();
  }, [text, onComplete, onTypingStateChange]);

  // Reset and run typewriter animation when text changes
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    onTypingStateChange?.(true);
    textIndexRef.current = 0;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (!text) {
      setIsTyping(false);
      onTypingStateChange?.(false);
      onComplete?.();
      return;
    }

    timerRef.current = setInterval(() => {
      textIndexRef.current += 1;
      const nextText = text.slice(0, textIndexRef.current);
      setDisplayedText(nextText);

      // Sound feedback on character reveal (skip spaces)
      if (text[textIndexRef.current - 1] !== " ") {
        playTypingSound();
      }

      if (textIndexRef.current >= text.length) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsTyping(false);
        onTypingStateChange?.(false);
        onComplete?.();
      }
    }, speed);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [text, speed, playTypingSound, onComplete, onTypingStateChange]);

  return (
    <div
      onClick={isTyping ? skipTyping : undefined}
      className={`relative cursor-pointer select-none group ${className}`}
      title={isTyping ? "Clique para revelar tudo imediatamente" : undefined}
    >
      <span>{displayedText}</span>

    </div>
  );
}
