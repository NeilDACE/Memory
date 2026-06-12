import { assetPaths, createCard } from "../../main";
import { gameState } from "./state";

/**
 * Builds a themed card front image path by image number.
 * @param imageNumber Image index.
 * @returns The themed image path.
 */
function buildThemeFrontImagePath(imageNumber: number): string {
  return assetPaths.getCardFront(gameState.currentTheme, imageNumber);
}

/**
 * Returns a shuffled copy of an array.
 * @param items Input items.
 * @returns Shuffled array copy.
 */
function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

/**
 * Creates a shuffled list of available front image numbers.
 * @param maxFrontImages Maximum number of front images.
 * @returns Shuffled image numbers.
 */
function getAvailableFrontImageNumbers(maxFrontImages: number): number[] {
  const numbers = Array.from({ length: maxFrontImages }, (_, index) => index + 1);
  return shuffleArray(numbers);
}

/**
 * Selects random image numbers needed for all pairs.
 * @param amount Total number of cards.
 * @param maxFrontImages Maximum number of front images.
 * @returns Selected image numbers.
 */
function selectImageNumbers(amount: number, maxFrontImages: number): number[] {
  const pairCount = Math.floor(amount / 2);
  const availableImageNumbers = getAvailableFrontImageNumbers(maxFrontImages);
  return availableImageNumbers.slice(0, pairCount);
}

/**
 * Creates paired front source paths from selected image numbers.
 * @param selectedImageNumbers Selected front image numbers.
 * @returns Paired source paths.
 */
function createPairedFrontSources(selectedImageNumbers: number[]): string[] {
  const pairedFrontSources: string[] = [];
  for (const imageNumber of selectedImageNumbers) {
    const imagePath = buildThemeFrontImagePath(imageNumber);
    pairedFrontSources.push(imagePath, imagePath);
  }
  return pairedFrontSources;
}

/**
 * Creates randomized card front sources for a board size.
 * @param amount Total number of cards.
 * @returns Randomized paired front sources.
 */
function createRandomCardFrontSources(amount: number): string[] {
  const maxFrontImages = 18;
  const selectedImageNumbers = selectImageNumbers(amount, maxFrontImages);
  const pairedFrontSources = createPairedFrontSources(selectedImageNumbers);
  return shuffleArray(pairedFrontSources);
}

/**
 * Creates all card markup for the current board.
 * @param amount Total number of cards.
 * @returns HTML string for all cards.
 */
export function createCards(amount: number): string {
  const randomizedCardFrontSources = createRandomCardFrontSources(amount);
  let cards: string = "";
  for (let i = 0; i < amount; i++) {
    cards += createCard(
      i,
      gameState.currentCardBacksideSrc,
      randomizedCardFrontSources[i]
    );
  }
  return cards;
}
