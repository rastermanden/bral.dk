export const DEVIATION_WINDOW_QUARTERS = 8
export const DEVIATION_WINDOW_MONTHS = DEVIATION_WINDOW_QUARTERS * 3

export function countDeviationEvents(rates, windowQuarters = DEVIATION_WINDOW_QUARTERS) {
  if (!Array.isArray(rates) || windowQuarters <= 0) return 0
  return rates.slice(-windowQuarters).filter(r => Boolean(r && r.note)).length
}

export function formatDeviationStat(rates, windowQuarters = DEVIATION_WINDOW_QUARTERS) {
  const count = countDeviationEvents(rates, windowQuarters)
  const months = windowQuarters * 3
  return `${count} / ${months}m`
}
