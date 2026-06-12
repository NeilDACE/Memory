import "/src/styles/components/_card.scss";
import { createCard, loadSettings, assetPaths } from "../main";

let currentTheme: string = "code-vibe-theme";
let currentPlayerColor: string = "blue";
let currentBoardSize: number = 16;
let currentCardBacksideSrc: string = "";
let currentCardFrontsideSrc: string = "";
let currentPlayer: number = 1;
let currentDraw: HTMLButtonElement[] = [];
let isResolvingDraw: boolean = false;

function applyInitialFieldSizeClass(fieldRef: HTMLElement, boardSize: number): void {
  fieldRef.classList.remove("game-field--sm");
  if (boardSize === 16) {
    fieldRef.classList.add("game-field--sm");
  }
}

function updateCardSourcesByCurrentTheme(): void {
  currentCardBacksideSrc = assetPaths.getCardBackside(currentTheme);
  currentCardFrontsideSrc = assetPaths.getCardFront(currentTheme, 1);
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
    teamOneIconRef.src = assetPaths.getTeamIcon(currentTheme, 1);
  }
  if (teamTwoIconRef) {
    teamTwoIconRef.src = assetPaths.getTeamIcon(currentTheme, 2);
  }
}

function updateCurrentPlayerIndicator(): void {
  const currentPlayerIconRef = document.getElementById("current-player-icon") as HTMLImageElement | null;
  if (currentPlayerIconRef) {
    currentPlayerIconRef.src = assetPaths.getCurrentPlayerIcon(currentTheme, currentPlayer as 1 | 2);
  }
}

function switchCurrentPlayer(): void {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  currentPlayerColor = currentPlayer === 1 ? "blue" : "orange";
  updateCurrentPlayerIndicator();
}

function getPlayerNumberByColor(playerColor: string): number {
  return playerColor === "orange" ? 2 : 1;
}

function resetTurnStateForNewGame(): void {
  currentPlayer = getPlayerNumberByColor(currentPlayerColor);
  currentDraw = [];
  isResolvingDraw = false;
  updateCurrentPlayerIndicator();
}

function toThemeName(theme: string): string {
  return theme.endsWith("-theme") ? theme : `${theme}-theme`;
}

function toBoardSize(size: string): number | null {
  const parsedSize = Number(size);
  return parsedSize === 16 || parsedSize === 24 || parsedSize === 36
    ? parsedSize
    : null;
}

function applyStoredSettings(): void {
  const settings = loadSettings();
  if (settings.theme) {
    currentTheme = toThemeName(settings.theme);
    document.body.dataset.theme = currentTheme.replace(/-theme$/, "");
  }
  if (settings.player) {
    currentPlayerColor = settings.player;
  }
  if (settings.size) {
    const parsedSize = toBoardSize(settings.size);
    if (parsedSize) {
      currentBoardSize = parsedSize;
    }
  }
  currentPlayer = getPlayerNumberByColor(currentPlayerColor);
  updateCardSourcesByCurrentTheme();
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
    checkForGameEnd();
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

interface GameDialogElements {
  dialog: HTMLDialogElement | null;
  teamOneIcon: HTMLImageElement | null;
  teamTwoIcon: HTMLImageElement | null;
  winnerIcon: HTMLImageElement | null;
  winnerText: HTMLSpanElement | null;
  title: HTMLParagraphElement | null;
  teamOneScore: HTMLSpanElement | null;
  teamTwoScore: HTMLSpanElement | null;
}
interface TeamScores {
  teamOne: number;
  teamTwo: number;
}
interface WinnerInfo {
  name: string;
  cssClass: string;
  icon: string;
}

function getTeamScores(): TeamScores {
  const teamOne = parseInt(document.getElementById("team-1-score")?.textContent || "0");
  const teamTwo = parseInt(document.getElementById("team-2-score")?.textContent || "0");
  return { teamOne, teamTwo };
}

function getGameDialogElements(): GameDialogElements {
  const dialog = document.getElementById("finished-game-dialog") as HTMLDialogElement | null;
  return {
    dialog,
    teamOneIcon: dialog?.querySelector(".points-container__team-1__icon") as HTMLImageElement | null,
    teamTwoIcon: dialog?.querySelector(".points-container__team-2__icon") as HTMLImageElement | null,
    winnerIcon: document.getElementById("winner-icon") as HTMLImageElement | null,
    winnerText: document.getElementById("winner-text") as HTMLSpanElement | null,
    title: document.getElementById("finished-game-dialog-title") as HTMLParagraphElement | null,
    teamOneScore: document.getElementById("team-1-finished-score") as HTMLSpanElement | null,
    teamTwoScore: document.getElementById("team-2-finished-score") as HTMLSpanElement | null,
  };
}

function setTeamIcons(teamOneIcon: HTMLImageElement | null, teamTwoIcon: HTMLImageElement | null): void {
  if (teamOneIcon) teamOneIcon.src = assetPaths.getTeamIcon(currentTheme, 1);
  if (teamTwoIcon) teamTwoIcon.src = assetPaths.getTeamIcon(currentTheme, 2);
}

function getWinnerInfo(teamOneScore: number, teamTwoScore: number): WinnerInfo {
  if (teamOneScore > teamTwoScore) {
    return { name: "Blue player", cssClass: "blue-text", icon: assetPaths.getWinnerPlayerIcon(currentTheme, "blue") };
  }
  if (teamTwoScore > teamOneScore) {
    return { name: "Orange player", cssClass: "orange-text", icon: assetPaths.getWinnerPlayerIcon(currentTheme, "orange") };
  }
  return { name: "It's a", cssClass: "", icon: assetPaths.getDrawIcon(currentTheme) };
}

function displayWinnerInfo(elements: GameDialogElements, winnerInfo: WinnerInfo): void {
  if (elements.winnerText) {
    elements.winnerText.textContent = winnerInfo.name;
    if (winnerInfo.cssClass) elements.winnerText.classList.add(winnerInfo.cssClass);
  }
  if (elements.winnerIcon) elements.winnerIcon.src = winnerInfo.icon;
  if (winnerInfo.name === "It's a" && elements.title) elements.title.innerHTML = `It's a`;
}

function displayFinalScores(elements: GameDialogElements, scores: TeamScores): void {
  if (elements.teamOneScore) elements.teamOneScore.textContent = String(scores.teamOne);
  if (elements.teamTwoScore) elements.teamTwoScore.textContent = String(scores.teamTwo);
}

function checkForGameEnd(): void {
  const totalPairs = currentBoardSize / 2;
  const scores = getTeamScores();
  if (scores.teamOne + scores.teamTwo !== totalPairs) return;
  const elements = getGameDialogElements();
  if (!elements.dialog || !elements.winnerText || !elements.title || !elements.teamOneScore || !elements.teamTwoScore) return;
  setTeamIcons(elements.teamOneIcon, elements.teamTwoIcon);
  const winnerInfo = getWinnerInfo(scores.teamOne, scores.teamTwo);
  displayWinnerInfo(elements, winnerInfo);
  displayFinalScores(elements, scores);
  elements.dialog.showModal();
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

function initializeExitDialog(): void {
  const openExitDialogButtonRef = document.getElementById("open-exit-dialog") as HTMLButtonElement | null;
  const exitDialogRef = document.getElementById("exit-dialog") as HTMLDialogElement | null;
  const confirmExitButtonRef = document.getElementById("confirm-exit") as HTMLButtonElement | null;
  const cancelExitButtonRef = document.getElementById("cancel-exit") as HTMLButtonElement | null;
  const exitDialogPanelRef = document.getElementById("exit-dialog-panel") as HTMLDivElement | null;
  if (!openExitDialogButtonRef || !exitDialogRef || !confirmExitButtonRef || !cancelExitButtonRef) {
    return;
  }
  if (exitDialogPanelRef) {
    exitDialogPanelRef.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
  openExitDialogButtonRef.addEventListener("click", () => {
    if (!exitDialogRef.open) {
      exitDialogRef.showModal();
    }
  });
  exitDialogRef.addEventListener("click", (event) => {
    if (event.target === exitDialogRef) {
      exitDialogRef.close("backdrop");
    }
  });
  cancelExitButtonRef.addEventListener("click", () => {
    exitDialogRef.close("cancel");
  });
  confirmExitButtonRef.addEventListener("click", () => {
    exitDialogRef.close("confirm");
  });
}

export function init() {
  applyStoredSettings();
  initializeThemeLoading();
  initializeExitDialog();
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
  return assetPaths.getCardFront(currentTheme, imageNumber);
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

function createCards(amount: number): string {
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