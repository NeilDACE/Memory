
const ASSET_BASE = "/assets";

export const assetPaths = {
  icons: {
    palette: `${ASSET_BASE}/imgs/palette.svg`,
    chessPawn: `${ASSET_BASE}/imgs/chess_pawn.svg`,
    style: `${ASSET_BASE}/imgs/style.svg`,
    smartDisplay: `${ASSET_BASE}/imgs/smart-display.svg`,
    moveItem: `${ASSET_BASE}/imgs/move_item.svg`,
    stadiaController: `${ASSET_BASE}/imgs/stadia-controller.svg`,
    stadiaControllerLarge: `${ASSET_BASE}/imgs/stadia-controller-large.svg`,
    arrow: `${ASSET_BASE}/imgs/arrow.svg`,
    arrowHover: `${ASSET_BASE}/imgs/arrow-hover.svg`,
  },

  getThemePath: (theme: string): string => `${ASSET_BASE}/imgs/themes/${theme}`,

  getThemeVisual: (theme: string): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/theme-visual.svg`,

  getCardBackside: (theme: string): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/cards/back/${theme}-card-icon-backside.svg`,

  getCardFront: (theme: string, cardNumber: number): string => {
    const padded = String(cardNumber).padStart(2, "0");
    return `${ASSET_BASE}/imgs/themes/${theme}/cards/front/${theme}-card-icon-${padded}.svg`;
  },

  getTeamIcon: (theme: string, teamNumber: 1 | 2): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/team-${teamNumber}-icon.svg`,

  getCurrentPlayerIcon: (theme: string, playerNumber: 1 | 2): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/current-player-icon-player-${playerNumber}.svg`,

  getWinnerIcon: (theme: string): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/winner.svg`,

  getWinnerPlayerIcon: (theme: string, playerColor: "blue" | "orange"): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/winner-${playerColor}-player.svg`,

  getDrawIcon: (theme: string): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/draw.svg`,
};
