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

export interface TeamScores {
  teamOne: number;
  teamTwo: number;
}

export interface WinnerInfo {
  name: string;
  cssClass: string;
  icon: string;
}

export interface ExitDialogElements {
  openButton: HTMLButtonElement;
  dialog: HTMLDialogElement;
  confirmButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  panel: HTMLDivElement | null;
}
