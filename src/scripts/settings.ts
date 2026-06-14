import { assetPaths } from "../main";

interface Settings {
  theme: "code-vibe" | "gaming" | "projects" | "foods";
  player: "blue" | "orange";
  size: "16" | "24" | "36";
}

const STORAGE_KEY = "memory-settings";
let themeSelected: boolean = false;
let playerSelected: boolean = false;
let sizeSelected: boolean = false;

/**
 * Initializes settings flow and resets persisted state.
 * @returns Nothing.
 */
export function initializeSettings() {
  clearSettingsStorage();
  bindSettingsRadios();
}

/**
 * Clears stored settings from local storage.
 * @returns Nothing.
 */
function clearSettingsStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Loads persisted settings from local storage.
 * @returns Partial settings object.
 */
export function loadSettings(): Partial<Settings> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return { ...JSON.parse(raw) };
  } catch {
    return {};
  }
}

/**
 * Saves merged settings into local storage.
 * @param next Partial settings to persist.
 * @returns Nothing.
 */
function saveSettings(next: Partial<Settings>) {
  const current = loadSettings();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...next }));
}

/**
 * Formats the selected theme label for UI output.
 * @param theme Selected theme key.
 * @returns Display label.
 */
function formatThemeLabel(theme: Settings["theme"]): string {
  if (theme === "code-vibe") return "Code Vibe";
  if (theme === "projects") return "DA Projects";
  if (theme === "gaming") return "Gaming";
  if (theme === "foods") return "Foods";
  return "";
}

/**
 * Formats the selected player label for UI output.
 * @param player Selected player key.
 * @returns Display label.
 */
function formatPlayerLabel(player: Settings["player"]): string {
  return player.charAt(0).toUpperCase() + player.slice(1);
}

/**
 * Formats the selected board size label for UI output.
 * @param size Selected size key.
 * @returns Display label.
 */
function formatSizeLabel(size: Settings["size"]): string {
  return `-${size} Cards`;
}

/**
 * Binds radio change handling for the settings page.
 * @returns Nothing.
 */
function bindSettingsRadios() {
  document.addEventListener("change", handleSettingsChange);
}

/**
 * Handles settings radio changes and updates selection state.
 * @param e Change event.
 * @returns Nothing.
 */
function handleSettingsChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!isRadioInput(target)) return;
  processSelection(target);
  activateStartButtonIfReady();
}

/**
 * Checks if the event target is a radio input element.
 * @param target Event target input.
 * @returns True when target is a radio input.
 */
function isRadioInput(target: HTMLInputElement): boolean {
  return target.matches('input[type="radio"]');
}

/**
 * Routes selected radio value to the matching settings handler.
 * @param target Selected radio input.
 * @returns Nothing.
 */
function processSelection(target: HTMLInputElement) {
  if (target.name === "theme") handleThemeSelection(target.value as Settings["theme"]);
  if (target.name === "player") handlePlayerSelection(target.value as Settings["player"]);
  if (target.name === "size") handleSizeSelection(target.value as Settings["size"]);
}

/**
 * Handles theme selection updates.
 * @param theme Selected theme.
 * @returns Nothing.
 */
function handleThemeSelection(theme: Settings["theme"]) {
  saveSettings({ theme });
  themeSelected = true;
  updateText("selected-theme-value", formatThemeLabel(theme));
  updateThemePreview(theme);
}

/**
 * Handles player selection updates.
 * @param player Selected player.
 * @returns Nothing.
 */
function handlePlayerSelection(player: Settings["player"]) {
  saveSettings({ player });
  playerSelected = true;
  updateText("selected-player-value", formatPlayerLabel(player));
}

/**
 * Handles board size selection updates.
 * @param size Selected board size.
 * @returns Nothing.
 */
function handleSizeSelection(size: Settings["size"]) {
  saveSettings({ size });
  sizeSelected = true;
  updateText("selected-size-value", formatSizeLabel(size));
}

/**
 * Writes text content into a target element when present.
 * @param elementId Target element id.
 * @param value Text value.
 * @returns Nothing.
 */
function updateText(elementId: string, value: string) {
  const element = document.getElementById(elementId);
  if (element) element.textContent = value;
}

function updateThemePreview(theme: Settings["theme"]) {
  const preview = document.getElementById("theme-preview") as HTMLImageElement | null;
  const normalizedTheme = theme.endsWith("-theme") ? theme : `${theme}-theme`;
  if (preview) preview.src = assetPaths.getThemeVisual(normalizedTheme);
}

/**
 * Enables start button flow when all selections are complete.
 * @returns Nothing.
 */
function activateStartButtonIfReady() {
  if (!(themeSelected && playerSelected && sizeSelected)) return;
  showDividers();
  enableStartButton();
}

/**
 * Shows UI divider elements after full configuration.
 * @returns Nothing.
 */
function showDividers() {
  const dividers = document.querySelectorAll(".showcase-section__divider") as NodeListOf<HTMLDivElement>;
  dividers.forEach((div) => div.classList.add("display-block", "height-04"));
}

/**
 * Enables the start button interaction state.
 * @returns Nothing.
 */
function enableStartButton() {
  const startButton = document.getElementById("start-button") as HTMLAnchorElement;
  if (!startButton) return;
  startButton.classList.remove("unselect");
}