import { assetPaths } from "../../main";
import { gameState } from "./state";
import {
  type ExitDialogElements,
  type GameDialogElements,
  type TeamScores,
  type WinnerInfo,
} from "./types";

/**
 * Updates a team score in the score panel.
 * @param team Team number.
 * @param points New score value.
 * @returns Nothing.
 */
export function updateScore(team: number, points: number): void {
  const scoreRef = document.getElementById(`team-${team}-score`) as HTMLSpanElement | null;
  if (scoreRef) {
    scoreRef.textContent = String(points);
  }
}

/**
 * Reads both team scores from the UI.
 * @returns Object with team scores.
 */
function getTeamScores(): TeamScores {
  const teamOne = parseInt(document.getElementById("team-1-score")?.textContent || "0");
  const teamTwo = parseInt(document.getElementById("team-2-score")?.textContent || "0");
  return { teamOne, teamTwo };
}

/**
 * Gets the finished-game dialog element.
 * @returns Dialog element or null.
 */
function getFinishedGameDialog(): HTMLDialogElement | null {
  return document.getElementById("finished-game-dialog") as HTMLDialogElement | null;
}

/**
 * Gets team icon elements from the finished-game dialog.
 * @param dialog Finished-game dialog element.
 * @returns Team icon references.
 */
function getDialogTeamIcons(dialog: HTMLDialogElement | null): Pick<GameDialogElements, "teamOneIcon" | "teamTwoIcon"> {
  return {
    teamOneIcon: dialog?.querySelector(".points-container__team-1__icon") as HTMLImageElement | null,
    teamTwoIcon: dialog?.querySelector(".points-container__team-2__icon") as HTMLImageElement | null,
  };
}

/**
 * Gets winner display elements from the finished-game dialog.
 * @returns Winner-related element references.
 */
function getDialogWinnerElements(): Pick<GameDialogElements, "winnerIcon" | "winnerText" | "title"> {
  return {
    winnerIcon: document.getElementById("winner-icon") as HTMLImageElement | null,
    winnerText: document.getElementById("winner-text") as HTMLSpanElement | null,
    title: document.getElementById("finished-game-dialog-title") as HTMLParagraphElement | null,
  };
}

/**
 * Gets final score elements from the finished-game dialog.
 * @returns Score element references.
 */
function getDialogScoreElements(): Pick<GameDialogElements, "teamOneScore" | "teamTwoScore"> {
  return {
    teamOneScore: document.getElementById("team-1-finished-score") as HTMLSpanElement | null,
    teamTwoScore: document.getElementById("team-2-finished-score") as HTMLSpanElement | null,
  };
}

/**
 * Aggregates all finished-game dialog elements.
 * @returns Structured finished-game dialog elements.
 */
function getGameDialogElements(): GameDialogElements {
  const dialog = getFinishedGameDialog();
  return {
    dialog,
    ...getDialogTeamIcons(dialog),
    ...getDialogWinnerElements(),
    ...getDialogScoreElements(),
  };
}

/**
 * Sets themed team icons in the finished-game dialog.
 * @param teamOneIcon Team one icon element.
 * @param teamTwoIcon Team two icon element.
 * @returns Nothing.
 */
function setTeamIcons(teamOneIcon: HTMLImageElement | null, teamTwoIcon: HTMLImageElement | null): void {
  if (teamOneIcon) teamOneIcon.src = assetPaths.getTeamIcon(gameState.currentTheme, 1);
  if (teamTwoIcon) teamTwoIcon.src = assetPaths.getTeamIcon(gameState.currentTheme, 2);
}

/**
 * Determines winner information from final scores.
 * @param teamOneScore Team one score.
 * @param teamTwoScore Team two score.
 * @returns Winner display data.
 */
function getWinnerInfo(teamOneScore: number, teamTwoScore: number): WinnerInfo {
  if (teamOneScore > teamTwoScore) {
    return { name: "Blue player", cssClass: "blue-text", icon: assetPaths.getWinnerPlayerIcon(gameState.currentTheme, "blue") };
  }
  if (teamTwoScore > teamOneScore) {
    return { name: "Orange player", cssClass: "orange-text", icon: assetPaths.getWinnerPlayerIcon(gameState.currentTheme, "orange") };
  }
  return { name: "It's a", cssClass: "", icon: assetPaths.getDrawIcon(gameState.currentTheme) };
}

/**
 * Writes winner text and icon into finished-game dialog.
 * @param elements Dialog element bundle.
 * @param winnerInfo Winner display data.
 * @returns Nothing.
 */
function displayWinnerInfo(elements: GameDialogElements, winnerInfo: WinnerInfo): void {
  if (elements.winnerText) {
    elements.winnerText.textContent = winnerInfo.name;
    if (winnerInfo.cssClass) elements.winnerText.classList.add(winnerInfo.cssClass);
  }
  if (elements.winnerIcon) elements.winnerIcon.src = winnerInfo.icon;
  if (winnerInfo.name === "It's a" && elements.title) elements.title.innerHTML = "It's a";
}

/**
 * Writes final team scores into finished-game dialog.
 * @param elements Dialog element bundle.
 * @param scores Final team scores.
 * @returns Nothing.
 */
function displayFinalScores(elements: GameDialogElements, scores: TeamScores): void {
  if (elements.teamOneScore) elements.teamOneScore.textContent = String(scores.teamOne);
  if (elements.teamTwoScore) elements.teamTwoScore.textContent = String(scores.teamTwo);
}

/**
 * Checks whether the game is finished and opens result dialog.
 * @returns Nothing.
 */
export function checkForGameEnd(): void {
  const totalPairs = gameState.currentBoardSize / 2;
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

/**
 * Gets all required elements for the exit dialog flow.
 * @returns Exit dialog elements or null when incomplete.
 */
function getExitDialogElements(): ExitDialogElements | null {
  const openButton = document.getElementById("open-exit-dialog") as HTMLButtonElement | null;
  const dialog = document.getElementById("exit-dialog") as HTMLDialogElement | null;
  const confirmButton = document.getElementById("confirm-exit") as HTMLButtonElement | null;
  const cancelButton = document.getElementById("cancel-exit") as HTMLButtonElement | null;
  const panel = document.getElementById("exit-dialog-panel") as HTMLDivElement | null;
  if (!openButton || !dialog || !confirmButton || !cancelButton) {
    return null;
  }
  return { openButton, dialog, confirmButton, cancelButton, panel };
}

/**
 * Binds click stop-propagation for the dialog panel.
 * @param elements Exit dialog elements.
 * @returns Nothing.
 */
function bindExitDialogPanelStop(elements: ExitDialogElements): void {
  if (elements.panel) {
    elements.panel.addEventListener("click", (event) => event.stopPropagation());
  }
}

/**
 * Binds the open action for the exit dialog.
 * @param elements Exit dialog elements.
 * @returns Nothing.
 */
function bindExitDialogOpen(elements: ExitDialogElements): void {
  elements.openButton.addEventListener("click", () => {
    if (!elements.dialog.open) {
      elements.dialog.showModal();
    }
  });
}

/**
 * Binds close actions for the exit dialog.
 * @param elements Exit dialog elements.
 * @returns Nothing.
 */
function bindExitDialogClose(elements: ExitDialogElements): void {
  elements.dialog.addEventListener("click", (event) => {
    if (event.target === elements.dialog) elements.dialog.close("backdrop");
  });
  elements.cancelButton.addEventListener("click", () => elements.dialog.close("cancel"));
  elements.confirmButton.addEventListener("click", () => elements.dialog.close("confirm"));
}

/**
 * Initializes all exit dialog bindings.
 * @returns Nothing.
 */
export function initializeExitDialog(): void {
  const elements = getExitDialogElements();
  if (!elements) {
    return;
  }
  bindExitDialogPanelStop(elements);
  bindExitDialogOpen(elements);
  bindExitDialogClose(elements);
}
