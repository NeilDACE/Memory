
/**
 * Base public path prefix for all static assets.
 */
const ASSET_BASE = "/assets";

export const assetPaths = {
  /**
   * Shared UI icon paths.
   */
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

  /**
   * Returns the base path for a theme folder.
   * @param theme Theme folder name.
   * @returns Theme base path.
   */
  getThemePath: (theme: string): string => `${ASSET_BASE}/imgs/themes/${theme}`,

  /**
   * Returns the theme visual preview asset path.
   * @param theme Theme folder name.
   * @returns Theme visual path.
   */
  getThemeVisual: (theme: string): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/theme-visual.svg`,

  /**
   * Returns the backside card icon path for a theme.
   * @param theme Theme folder name.
   * @returns Card backside icon path.
   */
  getCardBackside: (theme: string): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/cards/back/${theme}-card-icon-backside.svg`,

  /**
   * Returns the front card icon path for a theme and card number.
   * @param theme Theme folder name.
   * @param cardNumber Card number.
   * @returns Card front icon path.
   */
  getCardFront: (theme: string, cardNumber: number): string => {
    const padded = String(cardNumber).padStart(2, "0");
    return `${ASSET_BASE}/imgs/themes/${theme}/cards/front/${theme}-card-icon-${padded}.svg`;
  },

  /**
   * Returns the team icon path for a theme.
   * @param theme Theme folder name.
   * @param teamNumber Team number.
   * @returns Team icon path.
   */
  getTeamIcon: (theme: string, teamNumber: 1 | 2): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/team-${teamNumber}-icon.svg`,

  /**
   * Returns the current-player indicator icon path.
   * @param theme Theme folder name.
   * @param playerNumber Player number.
   * @returns Current player icon path.
   */
  getCurrentPlayerIcon: (theme: string, playerNumber: 1 | 2): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/current-player-icon-player-${playerNumber}.svg`,

  /**
   * Returns the generic winner icon path.
   * @param theme Theme folder name.
   * @returns Winner icon path.
   */
  getWinnerIcon: (theme: string): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/winner.svg`,

  /**
   * Returns the winner icon path for a specific player color.
   * @param theme Theme folder name.
   * @param playerColor Winner player color.
   * @returns Winner player icon path.
   */
  getWinnerPlayerIcon: (theme: string, playerColor: "blue" | "orange"): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/winner-${playerColor}-player.svg`,

  /**
   * Returns the draw icon path for a theme.
   * @param theme Theme folder name.
   * @returns Draw icon path.
   */
  getDrawIcon: (theme: string): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/draw.svg`,

  /**
   * Returns the game over icon path for a theme.
   * @param theme Theme folder name.
   * @returns Game over icon path.
   */
  getGameOverIcon: (theme: string): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/game-over.svg`,

  /**
   * Returns the scale icon path for a theme.
   * @param theme Theme folder name.
   * @returns Scale icon path.
   */
  getScaleIcon: (theme: string): string =>
    `${ASSET_BASE}/imgs/themes/${theme}/scale-icon.svg`,
  };