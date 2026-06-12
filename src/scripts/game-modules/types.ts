/**
 * Element references used by the finished-game dialog flow.
 */
export interface GameDialogElements {
  dialog: HTMLDialogElement | null;
  teamOneIcon: HTMLImageElement | null;
  teamTwoIcon: HTMLImageElement | null;
  winnerIcon: HTMLImageElement | null;
  winnerText: HTMLSpanElement | null;
  title: HTMLParagraphElement | null;
  teamOneScore: HTMLSpanElement | null;
  teamTwoScore: HTMLSpanElement | null;
}

/**
 * Final points for both teams.
 */
export interface TeamScores {
  teamOne: number;
  teamTwo: number;
}

/**
 * Winner display payload for the finished-game dialog.
 */
export interface WinnerInfo {
  name: string;
  cssClass: string;
  icon: string;
}

/**
 * Required element references for the exit dialog interactions.
 */
export interface ExitDialogElements {
  openButton: HTMLButtonElement;
  dialog: HTMLDialogElement;
  confirmButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  panel: HTMLDivElement | null;
}
