/** Intro is page 1 of the bound book. */
export const PAGE_ONE_HREF = '/intro';

export function isIntroPath(path: string): boolean {
  return path === PAGE_ONE_HREF || path.endsWith('/intro');
}

export function isCoverEntryPath(path: string): boolean {
  return path === '/' || isIntroPath(path);
}

export type ReopenIntent = 'cover' | 'continue' | 'todays-rule';

/**
 * Closing the book always returns the next cover-open to page 1.
 * Return visits resume only through the explicit Continue control
 * (or Today's Rule), not by auto-restoring the last article.
 */
export function hrefForReopen(
  intent: ReopenIntent,
  options: { lastReadId?: number | null; todaysId?: number | null } = {},
): string {
  if (intent === 'continue' && options.lastReadId != null) {
    return `/article/${options.lastReadId}`;
  }
  if (intent === 'todays-rule' && options.todaysId != null) {
    return `/article/${options.todaysId}`;
  }
  return PAGE_ONE_HREF;
}
