import { test, expect } from '@playwright/test'
import {
  DEVIATION_WINDOW_QUARTERS,
  DEVIATION_WINDOW_MONTHS,
  countDeviationEvents,
  formatDeviationStat,
} from '../src/utils/exchangeStats.js'

interface RatePoint {
  period: string
  rate: number
  note?: string
}

test.describe('countDeviationEvents unit tests', () => {
  test('uses a single 8-quarter (24m) window constant', () => {
    expect(DEVIATION_WINDOW_QUARTERS).toBe(8)
    expect(DEVIATION_WINDOW_MONTHS).toBe(24)
  })

  test('counts 0, 1, and 2 noted entries within the window', () => {
    const base = Array.from({ length: 8 }, (_, i) => ({ period: `Q${(i % 4) + 1}`, rate: 1.0 }))
    expect(countDeviationEvents(base)).toBe(0)
    expect(formatDeviationStat(base)).toBe('0 / 24m')

    const withOne = base.map((pt, i) => (i === 5 ? { ...pt, rate: 0.98, note: 'can shortage' } : pt))
    expect(countDeviationEvents(withOne)).toBe(1)
    expect(formatDeviationStat(withOne)).toBe('1 / 24m')

    const withTwo = withOne.map((pt, i) => (i === 7 ? { ...pt, rate: 0.97, note: 'can shortage' } : pt))
    expect(countDeviationEvents(withTwo)).toBe(2)
    expect(formatDeviationStat(withTwo)).toBe('2 / 24m')
  })

  test('excludes a note just outside the window and includes the exact window boundary', () => {
    const nineQuarters: RatePoint[] = [
      { period: 'Q4 24', rate: 1.02, note: 'festive dev.' }, // index 0: 9th quarter back (outside 8q window)
      { period: 'Q1 25', rate: 1.00 },
      { period: 'Q2 25', rate: 1.00 },
      { period: 'Q3 25', rate: 1.00 },
      { period: 'Q4 25', rate: 1.00 },
      { period: 'Q1 26', rate: 1.00 },
      { period: 'Q2 26', rate: 1.00 },
      { period: 'Q3 26', rate: 1.00 },
      { period: 'Q4 26', rate: 1.00 },
    ]
    expect(countDeviationEvents(nineQuarters, 8)).toBe(0)
    expect(formatDeviationStat(nineQuarters, 8)).toBe('0 / 24m')

    // Moving the note to index 1 (8th quarter back) places it inside the 8q window
    const atBoundary = nineQuarters.map((pt, i) =>
      i === 0 ? { period: pt.period, rate: 1.00 } : i === 1 ? { ...pt, rate: 0.98, note: 'boundary' } : pt
    )
    expect(countDeviationEvents(atBoundary, 8)).toBe(1)
    expect(formatDeviationStat(atBoundary, 8)).toBe('1 / 24m')

    // Changing windowQuarters updates both the count and the months label together
    expect(formatDeviationStat(atBoundary, 4)).toBe('0 / 12m')
  })
})
