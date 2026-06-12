interface Settings {
  theme: "code-vibe" | "gaming" | "da-projects" | "foods";
  player: "blue" | "orange";
  size: "16" | "24" | "36";
}

const STORAGE_KEY = "memory-settings";
let themeSelected: boolean = false;
let playerSelected: boolean = false;
let sizeSelected: boolean = false;

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
  document.addEventListener("change", handleSettingsChange);
}

function handleSettingsChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!isRadioInput(target)) return;
  processSelection(target);
  activateStartButtonIfReady();
}

function isRadioInput(target: HTMLInputElement): boolean {
  return target.matches('input[type="radio"]');
}

function processSelection(target: HTMLInputElement) {
  if (target.name === "theme") handleThemeSelection(target.value as Settings["theme"]);
  if (target.name === "player") handlePlayerSelection(target.value as Settings["player"]);
  if (target.name === "size") handleSizeSelection(target.value as Settings["size"]);
}

function handleThemeSelection(theme: Settings["theme"]) {
  saveSettings({ theme });
  themeSelected = true;
  updateText("selected-theme-value", formatThemeLabel(theme));
}

function handlePlayerSelection(player: Settings["player"]) {
  saveSettings({ player });
  playerSelected = true;
  updateText("selected-player-value", formatPlayerLabel(player));
}

function handleSizeSelection(size: Settings["size"]) {
  saveSettings({ size });
  sizeSelected = true;
  updateText("selected-size-value", formatSizeLabel(size));
}

function updateText(elementId: string, value: string) {
  const element = document.getElementById(elementId);
  if (element) element.textContent = value;
}

function activateStartButtonIfReady() {
  if (!(themeSelected && playerSelected && sizeSelected)) return;
  showDividers();
  enableStartButton();
}

function showDividers() {
  const dividers = document.querySelectorAll(".showcase-section__divider") as NodeListOf<HTMLDivElement>;
  dividers.forEach((div) => div.classList.add("display-block", "height-04"));
}

function enableStartButton() {
  const startButton = document.getElementById("start-button") as HTMLAnchorElement;
  if (!startButton) return;
  startButton.classList.remove("unselect");
  startButton.removeAttribute("aria-disabled");
}