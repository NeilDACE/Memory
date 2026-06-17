/**
 * Creates a single memory card button markup.
 * @param cardIndex Card index used for class naming.
 * @param currentCardBacksideSrc Card backside image source.
 * @param currentCardFrontsideSrc Card frontside image source.
 * @returns HTML string for one card.
 */
export function createCard(
  cardIndex: number,
  currentCardBacksideSrc: string,
  currentCardFrontsideSrc: string
): string {
  return `<button class="card card--${cardIndex}" data-front-src="${currentCardFrontsideSrc}">
          <div class="card__inner">
            <div class="card__face">
              <img
                src="${currentCardBacksideSrc}"
                alt="Card back icon"
              />
            </div>
            <div class="card__face card__face--back">
              <img
                src="${currentCardFrontsideSrc}"
                alt="Card front icon"
              />
            </div>
          </div>
        </button>`;
}