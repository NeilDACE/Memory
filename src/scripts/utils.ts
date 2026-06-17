/**
 * Fades an image out, swaps its src at the midpoint, then fades it back in.
 * Requires `transition: opacity 300ms` on the element via CSS.
 * @param img Image element.
 * @param newSrc New source path.
 */
export function fadeSwapSrc(img: HTMLImageElement, newSrc: string): void {
  img.style.opacity = "0";
  window.setTimeout(() => {
    img.src = newSrc;
    img.style.opacity = "";
  }, 150);
}
