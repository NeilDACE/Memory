interface Settings {
  theme: "code-vibe" | "gaming" | "da-projects" | "foods";
  player: "blue" | "orange";
  size: "16" | "24" | "36";
}

const STORAGE_KEY = "memory-settings";

export function initializeSettings() {
  clearSettingsStorage();
  bindSettingsRadios();
}

function clearSettingsStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

export function loadSettings(): Partial<Settings> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return { ...JSON.parse(raw) };
  } catch {
    return {};
  }
}

function saveSettings(next: Partial<Settings>) {
  const current = loadSettings();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...next }));
}

function formatThemeLabel(theme: Settings["theme"]): string {
  if (theme === "code-vibe") return "Code Vibe";
  if (theme === "da-projects") return "DA Projects";
  if (theme === "gaming") return "Gaming";
  if (theme === "foods") return "Foods";
  return "";
}

function formatPlayerLabel(player: Settings["player"]): string {
  return player.charAt(0).toUpperCase() + player.slice(1);
}

function formatSizeLabel(size: Settings["size"]): string {
  return `-${size} Cards`;
}

function bindSettingsRadios() {
  document.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (!target.matches('input[type="radio"]')) return;
    if (target.name === "theme") {
      const theme = target.value as Settings["theme"];
      saveSettings({ theme });
      const themeValue = document.getElementById("selected-theme-value");
      if (themeValue) themeValue.textContent = formatThemeLabel(theme);
    }
    if (target.name === "player") {
      const player = target.value as Settings["player"];
      saveSettings({ player });
      const playerValue = document.getElementById("selected-player-value");
      if (playerValue) playerValue.textContent = formatPlayerLabel(player);
    }
    if (target.name === "size") {
      const size = target.value as Settings["size"];
      saveSettings({ size });
      const sizeValue = document.getElementById("selected-size-value");
      if (sizeValue) sizeValue.textContent = formatSizeLabel(size);
    }
  });
}