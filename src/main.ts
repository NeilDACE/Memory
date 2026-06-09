import "/src/styles/components/_card.scss";
import { createCard } from "./scripts/templates/card-template";
let currentTheme: string = "code-vibe-theme";
let boardSize: number[] = [16, 24, 36];
let currentBoardSize: number = boardSize[0];
let currentCardBacksideSrc: string = "";
let currentCardFrontsideSrc: string = "";

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
  const currentPlayerIconRef = document.getElementById("current-player-icon") as HTMLImageElement | null;
  if (teamOneIconRef) {
    teamOneIconRef.src = `/public/assets/imgs/themes/${currentTheme}/team-1-icon.svg`;
  }
  if (teamTwoIconRef) {
    teamTwoIconRef.src = `/public/assets/imgs/themes/${currentTheme}/team-2-icon.svg`;
  }
  if (currentPlayerIconRef) {
    currentPlayerIconRef.src = `/public/assets/imgs/themes/${currentTheme}/current-player-icon.svg`;
  }
}

function initializeThemeLoading(): void {
  applyCurrentThemeFromBodyData();
  updateGameFeedbackIconSourcesByCurrentTheme();
}

function init() {
  initializeThemeLoading();
  const fieldRef = document.getElementById("field");
  if (fieldRef){
    applyInitialFieldSizeClass(fieldRef, currentBoardSize);
    fieldRef.innerHTML = "";
    fieldRef.innerHTML = createCards(currentBoardSize);
    fieldRef.addEventListener("click", (event) => {
      const card = (event.target as HTMLElement).closest(".card") as HTMLButtonElement;
      if (card) {
        card.classList.toggle("is-flipped");
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