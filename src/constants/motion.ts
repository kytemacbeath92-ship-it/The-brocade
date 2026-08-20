/** Page-turn timing: 600ms baseline, 30% slower as requested. */
export const PAGE_TURN_MS = Math.round(600 * 1.3);

export const PAGE_TURN_EASING = [0.42, 0.02, 0.18, 1] as const;

/** Heavier ease so the cover swings like a rigid board, not paper. */
export const COVER_EASING = [0.55, 0.02, 0.12, 1] as const;
