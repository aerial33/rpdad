/**
 * Calculate responsive number of items to display based on window width
 *
 * @param windowWidth - Current window width in pixels
 * @param itemPerRow - Desired number of items per row on desktop
 * @returns Number of items to display at current viewport
 *
 * Breakpoints:
 * - ≤ 320px: 1 item (very small mobile)
 * - < 500px: itemPerRow - 3 (min 2) (mobile)
 * - < 1024px: itemPerRow - 2 (min 3) (tablet)
 * - < 1280px: itemPerRow - 1 (small desktop)
 * - ≥ 1280px: itemPerRow (large desktop)
 */
export function getResponsiveItems(windowWidth: number, itemPerRow: number): number {
  if (windowWidth <= 320) {
    return 1
  }

  if (windowWidth < 500) {
    return Math.max(2, itemPerRow - 3)
  }

  if (windowWidth < 1024) {
    return Math.max(3, itemPerRow - 2)
  }

  if (windowWidth < 1280) {
    return itemPerRow - 1
  }

  return itemPerRow
}