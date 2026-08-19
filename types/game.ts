export type Character = {
  name: string;
  dialogue: string;
  image: string;
  background?: string;
  badgeColor?: string;
};

export type SceneType = 'dialogue' | 'input_text' | 'gesture_sequence' | 'options';

export type SceneOption = {
  label: string;
  nextSceneId: string;
};

export type Scene = {
  id: string;
  character: Character;
  type: SceneType;
  actionText?: string;
  inputPlaceholder?: string;
  expectedInput?: string | string[];
  options?: SceneOption[];
  gestureBank?: string[];
  /** Pre-filled hint letters at specific positions (0-indexed). User only fills the remaining slots. */
  hintLetters?: { position: number; letter: string }[];
  nextScene: {
    success: string;
    error?: string;
  };
};

export type GameFeedbackState = 'idle' | 'success' | 'error';
