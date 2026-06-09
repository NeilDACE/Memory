import "/src/styles/components/_card.scss";
import { createCard } from "./scripts/templates/card-template";
let currentTheme: string = "code-vibe-theme";
let boardSize: number[] = [16, 24, 36];
let currentBoardSize: number = boardSize[0];
let currentCardBacksideSrc: string = "";
let currentCardFrontsideSrc: string = "";
let currentPlayer: number = 1;
let currentDraw: HTMLButtonElement[] = [];
let isResolvingDraw: boolean = false;

init();

function applyInitialFieldSizeClass(fieldRef: HTMLElement, boardSize: number): void {
  fieldRef.classList.remove("game-field--sm");
  if (boardSize === 16) {
    fieldRef.classList.add("game-field--sm");
  }
}

function updateCardSourcesByCurrentTheme(): void {
  currentCardBacksideSrc = `/public/assets/imgs/themes/${currentTheme}/cards/back/${currentTheme}-card-icon-backside.svg`;
  currentCardFrontsideSrc = `/public/assets/imgs/themes/${currentTheme}/cards/front/${currentTheme}-card-icon-01.svg`;
}

function applyCurrentThemeFromBodyData(): void {
  const bodyTheme = document.body.dataset.theme?.trim();
  if (bodyTheme) {
    currentTheme = bodyTheme.endsWith("-theme") ? bodyTheme : `${bodyTheme}-theme`;
  }
  updateCardSourcesByCurrentTheme();
}

function updateGameFeedbackIconSourcesByCurrentTheme(): void {
  const teamOneIconRef = document.getElementById("team-1-icon") as HTMLImageElement | null;
  const teamTwoIconRef = document.getElementById("team-2-icon") as HTMLImageElement | null;
  if (teamOneIconRef) {
    teamOneIconRef.src = `/public/assets/imgs/themes/${currentTheme}/team-1-icon.svg`;
  }
  if (teamTwoIconRef) {
    teamTwoIconRef.src = `/public/assets/imgs/themes/${currentTheme}/team-2-icon.svg`;
  }
}

function updateCurrentPlayerIndicator(): void {
  const currentPlayerIconRef = document.getElementById("current-player-icon") as HTMLImageElement | null;
  if (currentPlayerIconRef) {
    currentPlayerIconRef.src = `/public/assets/imgs/themes/${currentTheme}/current-player-icon-player-${currentPlayer}.svg`;
  }
}

function switchCurrentPlayer(): void {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateCurrentPlayerIndicator();
}

function resetTurnStateForNewGame(): void {
  currentPlayer = 1;
  currentDraw = [];
  isResolvingDraw = false;
  updateCurrentPlayerIndicator();
}

function areDrawnCardsMatching(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): boolean {
  return firstCard.dataset.frontSrc === secondCard.dataset.frontSrc;
}

function markCardsAsMatched(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): void {
  firstCard.dataset.matched = "true";
  secondCard.dataset.matched = "true";
}

function resolveCurrentDraw(): void {
  if (currentDraw.length < 2) {
    return;
  }
  const [firstCard, secondCard] = currentDraw;
  if (areDrawnCardsMatching(firstCard, secondCard)) {
    markCardsAsMatched(firstCard, secondCard);
    updateScore(currentPlayer, parseInt(document.getElementById(`team-${currentPlayer}-score`)?.textContent || "0") + 1);
    currentDraw = [];
    isResolvingDraw = false;
    return;
  }
  window.setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
    currentDraw = [];
    isResolvingDraw = false;
    switchCurrentPlayer();
  }, 650);
}

function updateScore(team: number, points: number): void {
  const scoreRef = document.getElementById(`team-${team}-score`) as HTMLSpanElement | null;
  if (scoreRef) {
    scoreRef.textContent = String(points);
  }
}

function handleCardClick(card: HTMLButtonElement): void {
  if (
    isResolvingDraw ||
    card.classList.contains("is-flipped") ||
    card.dataset.matched === "true"
  ) {
    return;
  }
  card.classList.add("is-flipped");
  currentDraw.push(card);
  if (currentDraw.length === 2) {
    isResolvingDraw = true;
    resolveCurrentDraw();
  }
}

function initializeThemeLoading(): void {
  applyCurrentThemeFromBodyData();
  updateGameFeedbackIconSourcesByCurrentTheme();
  updateCurrentPlayerIndicator();
}

function init() {
  initializeThemeLoading();
  const fieldRef = document.getElementById("field");
  if (fieldRef){
    resetTurnStateForNewGame();
    applyInitialFieldSizeClass(fieldRef, currentBoardSize);
    fieldRef.innerHTML = "";
    fieldRef.innerHTML = createCards(currentBoardSize);
    fieldRef.addEventListener("click", (event) => {
      const card = (event.target as HTMLElement).closest(".card") as HTMLButtonElement;
      if (card) {
        handleCardClick(card);
      }
    });
  }
}

function buildThemeFrontImagePath(imageNumber: number): string {
  const imageNumberPadded = String(imageNumber).padStart(2, "0");
  return `/public/assets/imgs/themes/${currentTheme}/cards/front/${currentTheme}-card-icon-${imageNumberPadded}.svg`;
}

function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

function createRandomCardFrontSources(amount: number): string[] {
  const maxFrontImages = 18;
  const pairCount = Math.floor(amount / 2);
  const availableImageNumbers = shuffleArray(
    Array.from({ length: maxFrontImages }, (_, index) => index + 1)
  );
  const selectedImageNumbers = availableImageNumbers.slice(0, pairCount);
  const pairedFrontSources: string[] = [];
  for (const imageNumber of selectedImageNumbers) {
    const imagePath = buildThemeFrontImagePath(imageNumber);
    pairedFrontSources.push(imagePath, imagePath);
  }
  return shuffleArray(pairedFrontSources);
}

function createCards( amount: number ): string {
  const randomizedCardFrontSources = createRandomCardFrontSources(amount);
  let cards: string = "";
  for (let i = 0; i < amount; i++) {
    cards += createCard(
      i,
      currentCardBacksideSrc,
      randomizedCardFrontSources[i]
    );
  }
  return cards;
}

