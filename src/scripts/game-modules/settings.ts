import { assetPaths, loadSettings } from "../../main";
import { gameState } from "./state";

/**
 * Updates card image sources based on the active theme.
 * @returns Nothing.
 */
function updateCardSourcesByCurrentTheme(): void {
  gameState.currentCardBacksideSrc = assetPaths.getCardBackside(gameState.currentTheme);
}

/**
 * Applies the body data theme and refreshes card sources.
 * @returns Nothing.
 */
function applyCurrentThemeFromBodyData(): void {
  const bodyTheme = document.body.dataset.theme?.trim();
  if (bodyTheme) {
    gameState.currentTheme = bodyTheme.endsWith("-theme") ? bodyTheme : `${bodyTheme}-theme`;
  }
  updateCardSourcesByCurrentTheme();
}

/**
 * Updates score panel team icons for the active theme.
 * @returns Nothing.
 */
function updateGameFeedbackIconSourcesByCurrentTheme(): void {
  const teamOneIconRef = document.getElementById("team-1-icon") as HTMLImageElement | null;
  const teamTwoIconRef = document.getElementById("team-2-icon") as HTMLImageElement | null;
  if (teamOneIconRef) {
    teamOneIconRef.src = assetPaths.getTeamIcon(gameState.currentTheme, 1);
  }
  if (teamTwoIconRef) {
    teamTwoIconRef.src = assetPaths.getTeamIcon(gameState.currentTheme, 2);
  }
}

/**
 * Updates the current player indicator icon.
 * @returns Nothing.
 */
export function updateCurrentPlayerIndicator(): void {
  const currentPlayerIconRef = document.getElementById("current-player-icon") as HTMLImageElement | null;
  if (currentPlayerIconRef) {
    currentPlayerIconRef.src = assetPaths.getCurrentPlayerIcon(gameState.currentTheme, gameState.currentPlayer);
  }
}

/**
 * Switches active player and updates the indicator.
 * @returns Nothing.
 */
export function switchCurrentPlayer(): void {
  gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
  gameState.currentPlayerColor = gameState.currentPlayer === 1 ? "blue" : "orange";
  updateCurrentPlayerIndicator();
}

/**
 * Maps a player color string to a player number.
 * @param playerColor Player color.
 * @returns Player number.
 */
function getPlayerNumberByColor(playerColor: string): 1 | 2 {
  return playerColor === "orange" ? 2 : 1;
}

/**
 * Resets turn-specific state for a new game.
 * @returns Nothing.
 */
export function resetTurnStateForNewGame(): void {
  gameState.currentPlayer = getPlayerNumberByColor(gameState.currentPlayerColor);
  gameState.currentDraw = [];
  gameState.isResolvingDraw = false;
  updateCurrentPlayerIndicator();
}

/**
 * Normalizes a theme name to the internal suffix format.
 * @param theme Raw theme value.
 * @returns Theme with -theme suffix.
 */
function toThemeName(theme: string): string {
  return theme.endsWith("-theme") ? theme : `${theme}-theme`;
}

/**
 * Parses and validates a board size value.
 * @param size Raw size value.
 * @returns Valid board size or null.
 */
function toBoardSize(size: string): number | null {
  const parsedSize = Number(size);
  return parsedSize === 16 || parsedSize === 24 || parsedSize === 36
    ? parsedSize
    : null;
}

/**
 * Applies persisted theme settings to state and body data.
 * @param settings Partial persisted settings.
 * @returns Nothing.
 */
function applyStoredTheme(settings: Partial<ReturnType<typeof loadSettings>>): void {
  if (!settings.theme) {
    return;
  }
  gameState.currentTheme = toThemeName(settings.theme);
  document.body.dataset.theme = gameState.currentTheme.replace(/-theme$/, "");
}

/**
 * Applies persisted player settings to state.
 * @param settings Partial persisted settings.
 * @returns Nothing.
 */
function applyStoredPlayer(settings: Partial<ReturnType<typeof loadSettings>>): void {
  if (!settings.player) {
    return;
  }
  gameState.currentPlayerColor = settings.player;
}

/**
 * Applies persisted board size settings to state.
 * @param settings Partial persisted settings.
 * @returns Nothing.
 */
function applyStoredSize(settings: Partial<ReturnType<typeof loadSettings>>): void {
  if (!settings.size) {
    return;
  }
  const parsedSize = toBoardSize(settings.size);
  if (parsedSize) {
    gameState.currentBoardSize = parsedSize;
  }
}

/**
 * Loads and applies all persisted game settings.
 * @returns Nothing.
 */
export function applyStoredSettings(): void {
  const settings = loadSettings();
  applyStoredTheme(settings);
  applyStoredPlayer(settings);
  applyStoredSize(settings);
  gameState.currentPlayer = getPlayerNumberByColor(gameState.currentPlayerColor);
  updateCardSourcesByCurrentTheme();
}

/**
 * Initializes theme-dependent game visuals.
 * @returns Nothing.
 */
export function initializeThemeLoading(): void {
  applyCurrentThemeFromBodyData();
  updateGameFeedbackIconSourcesByCurrentTheme();
  updateCurrentPlayerIndicator();
}
