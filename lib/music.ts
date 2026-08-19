const MUSIC_KEY = "digilibra_music_enabled";

let audio: HTMLAudioElement | null = null;

function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio("/audio/background_music_game.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.6;
  }
  return audio;
}

export function getMusicPreference(): boolean | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(MUSIC_KEY);
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

export function setMusicPreference(enabled: boolean) {
  localStorage.setItem(MUSIC_KEY, String(enabled));
  if (enabled) {
    startMusic();
  } else {
    stopMusic();
  }
  window.dispatchEvent(
    new CustomEvent<boolean>("digilibra-music-change", { detail: enabled })
  );
}

export function startMusic() {
  getAudio()?.play().catch(() => {});
}

export function stopMusic() {
  audio?.pause();
}

export function applyStoredPreference() {
  const preference = getMusicPreference();
  if (preference === true) {
    startMusic();
  } else if (preference === false) {
    stopMusic();
  }
}