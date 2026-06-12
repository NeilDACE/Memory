/**
 * Mutable runtime state for the game flow.
 */
export interface GameState {
  currentTheme: string;
  currentPlayerColor: string;
  currentBoardSize: number;
  currentCardBacksideSrc: string;
  currentPlayer: 1 | 2;
  currentDraw: HTMLButtonElement[];
  isResolvingDraw: boolean;
}

/**
 * Default in-memory state values used by game modules.
 */
export const gameState: GameState = {
  currentTheme: "code-vibe-theme",
  currentPlayerColor: "blue",
  currentBoardSize: 16,
  currentCardBacksideSrc: "",
  currentPlayer: 1,
  currentDraw: [],
  isResolvingDraw: false,
};
