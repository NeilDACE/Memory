import { initializeField } from "./board";
import { initializeExitDialog } from "./dialogs";
import { applyStoredSettings, initializeThemeLoading } from "./settings";

/**
 * Initializes the game flow before field setup.
 * @returns Nothing.
 */
function initializeGameFlow(): void {
  applyStoredSettings();
  initializeThemeLoading();
  initializeExitDialog();
}

/**
 * Initializes the game page flow and field setup.
 * @returns Nothing.
 */
export function init(): void {
  initializeGameFlow();
  const fieldRef = document.getElementById("field");
  if (fieldRef) {
    initializeField(fieldRef);
  }
}
