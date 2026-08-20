const STORAGE_KEY = "digilibra_game_progress";

export type GameProgress = {
  sceneId: string;
  userName: string;
};

export function saveGameProgress(sceneId: string, userName: string): void {
  if (typeof window === "undefined") return;
  try {
    const data: GameProgress = { sceneId, userName };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function loadGameProgress(): GameProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as GameProgress;
    if (data.sceneId && data.userName) return data;
    return null;
  } catch {
    return null;
  }
}

export function clearGameProgress(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
