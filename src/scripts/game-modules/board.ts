import { createCards } from "./cards";
import { checkForGameEnd, updateScore } from "./dialogs";
import { gameState } from "./state";
import { resetTurnStateForNewGame, switchCurrentPlayer } from "./settings";

/**
 * Applies the small field class for the configured board size.
 * @param fieldRef Target game field element.
 * @param boardSize Number of cards on the board.
 * @returns Nothing.
 */
function applyInitialFieldSizeClass(fieldRef: HTMLElement, boardSize: number): void {
  fieldRef.classList.remove("game-field--sm");
  if (boardSize === 16) {
    fieldRef.classList.add("game-field--sm");
  }
}

/**
 * Checks whether two drawn cards match.
 * @param firstCard First drawn card.
 * @param secondCard Second drawn card.
 * @returns True if both fronts match.
 */
function areDrawnCardsMatching(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): boolean {
  return firstCard.dataset.frontSrc === secondCard.dataset.frontSrc;
}

/**
 * Marks both cards as matched in dataset state.
 * @param firstCard First matched card.
 * @param secondCard Second matched card.
 * @returns Nothing.
 */
function markCardsAsMatched(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): void {
  firstCard.dataset.matched = "true";
  secondCard.dataset.matched = "true";
}

/**
 * Reads the current score for a team from the UI.
 * @param team Team number.
 * @returns Team score.
 */
function getCurrentTeamScore(team: number): number {
  return parseInt(document.getElementById(`team-${team}-score`)?.textContent || "0");
}

/**
 * Resets draw state after resolution.
 * @returns Nothing.
 */
function resetCurrentDrawState(): void {
  gameState.currentDraw = [];
  gameState.isResolvingDraw = false;
}

/**
 * Flips two cards face down.
 * @param firstCard First card.
 * @param secondCard Second card.
 * @returns Nothing.
 */
function flipBackCards(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): void {
  firstCard.classList.remove("is-flipped");
  secondCard.classList.remove("is-flipped");
}

/**
 * Resolves a matched draw by scoring and resetting state.
 * @param firstCard First card.
 * @param secondCard Second card.
 * @returns Nothing.
 */
function resolveMatchedDraw(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): void {
  markCardsAsMatched(firstCard, secondCard);
  updateScore(gameState.currentPlayer, getCurrentTeamScore(gameState.currentPlayer) + 1);
  checkForGameEnd();
  resetCurrentDrawState();
}

/**
 * Resolves a mismatched draw with delayed flip and player switch.
 * @param firstCard First card.
 * @param secondCard Second card.
 * @returns Nothing.
 */
function resolveMismatchedDraw(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): void {
  window.setTimeout(() => {
    flipBackCards(firstCard, secondCard);
    resetCurrentDrawState();
    switchCurrentPlayer();
  }, 650);
}

/**
 * Resolves the current draw if two cards are selected.
 * @returns Nothing.
 */
function resolveCurrentDraw(): void {
  if (gameState.currentDraw.length < 2) {
    return;
  }
  const [firstCard, secondCard] = gameState.currentDraw;
  if (areDrawnCardsMatching(firstCard, secondCard)) {
    resolveMatchedDraw(firstCard, secondCard);
    return;
  }
  resolveMismatchedDraw(firstCard, secondCard);
}

/**
 * Determines whether a clicked card should be ignored.
 * @param card Clicked card element.
 * @returns True when click should be ignored.
 */
function isCardClickIgnored(card: HTMLButtonElement): boolean {
  return (
    gameState.isResolvingDraw ||
    card.classList.contains("is-flipped") ||
    card.dataset.matched === "true"
  );
}

/**
 * Handles card click interactions and draw state.
 * @param card Clicked card element.
 * @returns Nothing.
 */
function handleCardClick(card: HTMLButtonElement): void {
  if (isCardClickIgnored(card)) {
    return;
  }
  card.classList.add("is-flipped");
  gameState.currentDraw.push(card);
  if (gameState.currentDraw.length === 2) {
    gameState.isResolvingDraw = true;
    resolveCurrentDraw();
  }
}

/**
 * Renders all cards into the game field.
 * @param fieldRef Game field element.
 * @returns Nothing.
 */
function renderCards(fieldRef: HTMLElement): void {
  fieldRef.innerHTML = "";
  fieldRef.innerHTML = createCards(gameState.currentBoardSize);
}

/**
 * Binds card click handling to the game field.
 * @param fieldRef Game field element.
 * @returns Nothing.
 */
function bindCardClickHandler(fieldRef: HTMLElement): void {
  fieldRef.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const card = target.closest(".card") as HTMLButtonElement | null;
    if (card) handleCardClick(card);
  });
}

/**
 * Initializes board state and event bindings for the field.
 * @param fieldRef Game field element.
 * @returns Nothing.
 */
export function initializeField(fieldRef: HTMLElement): void {
  resetTurnStateForNewGame();
  applyInitialFieldSizeClass(fieldRef, gameState.currentBoardSize);
  renderCards(fieldRef);
  bindCardClickHandler(fieldRef);
}
