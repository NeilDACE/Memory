import confetti from "canvas-confetti";

var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

interface ConfettiOptions {
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
}

type ConfettiFn = (options: ConfettiOptions & { particleCount: number; origin: { y: number } }) => void;

/**
 * Creates a confetti launcher for a target canvas or falls back to the default launcher.
 * @param canvas Optional canvas inside the winner dialog.
 * @returns Confetti launcher function.
 */
function getLauncher(canvas: HTMLCanvasElement | null): ConfettiFn {
  if (canvas) {
    return confetti.create(canvas, { resize: true }) as unknown as ConfettiFn;
  }
  return confetti as unknown as ConfettiFn;
}

/**
 * Fires one confetti burst with the configured base options.
 * @param launcher Prepared confetti launcher.
 * @param particleRatio Ratio of total particles to emit.
 * @param opts Burst specific confetti options.
 * @returns Nothing.
 */
function fire(launcher: ConfettiFn, particleRatio: number, opts: ConfettiOptions) {
  launcher({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

/**
 * Plays the complete win confetti sequence.
 * @param canvas Optional canvas inside the winner dialog.
 * @returns Nothing.
 */
export function playWinAnimation(canvas: HTMLCanvasElement | null) {
  const launcher = getLauncher(canvas);
  fire(launcher, 0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(launcher, 0.2, {
    spread: 60,
  });
  fire(launcher, 0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(launcher, 0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(launcher, 0.1, {
    spread: 120,
    startVelocity: 45,
  });
}