export interface GameState {
  currentTheme: string;
  currentPlayerColor: string;
  currentBoardSize: number;
  currentCardBacksideSrc: string;
  currentPlayer: 1 | 2;
  currentDraw: HTMLButtonElement[];
  isResolvingDraw: boolean;
}

export const gameState: GameState = {
  currentTheme: "code-vibe-theme",
  currentPlayerColor: "blue",
  currentBoardSize: 16,
  currentCardBacksideSrc: "",
  currentPlayer: 1,
  currentDraw: [],
  isResolvingDraw: false,
};
