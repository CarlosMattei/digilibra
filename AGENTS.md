<!-- BEGIN:nextjs-agent-rules -->

---
name: LIBRAS Web-Game (DIGILIBRA)
description: Technical structure and development guide for the LIBRAS web-game in Next.js.
---

# LIBRAS Web-Game (DIGILIBRA)

This document defines the technical architecture and a quick implementation guide for the "DIGILIBRA" game, a text-adventure style web-game developed with **Next.js (App Router)**.

## 1. Directory Structure
Recommended organization for an scalable project:
```text
src/
 ┣ app/
 ┃ ┣ page.tsx              # Home Screen
 ┃ ┣ loading/              # Loading Screen
 ┃ ┗ game/
 ┃   ┗ page.tsx            # Main Game Screen (Manages scenes)
 ┣ components/
 ┃ ┣ DialogueBox.tsx       # Bottom dialogue box component
 ┃ ┣ GestureSelector.tsx   # Sign selection buttons
 ┃ ┗ CharacterView.tsx     # Character display (Sandra)
 ┣ data/
 ┃ ┗ story.ts              # Scene data structure
 ┗ types/
   ┗ game.ts               # TypeScript types
```

## 2. Data Model (`data/story.ts`)
The game logic is based on a scene manager. Example structure:

```typescript
export type Scene = {
  id: string;
  character: {
    name: string;
    dialogue: string;
    image: string;
  };
  type: 'dialogue' | 'input_text' | 'gesture_sequence';
  expectedInput?: string | string[]; 
  options?: string[]; 
  nextScene: {
    success: string;
    error: string;
  };
};
```

## 3. Game Logic (`app/game/page.tsx`)
The main component should manage the current scene state and player feedback:
- **Scene State**: `currentSceneId` controls navigation between dialogues and challenges.
- **Visual Feedback**: Uses `success` or `error` states to change the UI style and story progress.
- **Validation**: Compares the user's selected sequence (`userSequence`) with the answer key defined in the scene (`expectedInput`).

## 4. Quick Implementation Tips
- **Styling**: Use **Tailwind CSS** to ensure immediate mobile responsiveness.
- **Interaction**: Use `setTimeout` to control the display time of feedback before advancing to the next scene.
- **Deployment**: Use **Vercel** for rapid testing on mobile devices during development.

<!-- END:nextjs-agent-rules -->
