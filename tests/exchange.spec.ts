import { test, expect } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
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

const rates: RatePoint[] = JSON.parse(
  fs.readFileSync(path.resolve('src/data/rates.json'), 'utf8')
)

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

test.describe('exchange section UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.locator('#rate').scrollIntoViewIfNeeded()
  })

  test('exchange chart: shows Q4 26 can shortage across all viewports', async ({ page }) => {
    const last = rates[rates.length - 1]
    expect(last.period).toBe('Q4 26')
    expect(last.note).toBe('can shortage')
    expect(last.rate).toBeLessThan(1)

    await expect(page.locator('#rate .chart-dot')).toHaveCount(rates.length)

    const q4Period = page.locator('#rate .chart-period[data-period="Q4 26"]')
    const q4Note = page.locator('#rate .chart-note[data-period="Q4 26"]')
    await expect(q4Period).toBeVisible()
    await expect(q4Period).toHaveText('Q4 26')
    await expect(q4Note).toBeVisible()
    await expect(q4Note).toHaveText('can shortage')

    // Every point with a note keeps both its period label and note visible
    for (const pt of rates.filter(r => Boolean(r.note))) {
      await expect(page.locator(`#rate .chart-period[data-period="${pt.period}"]`)).toBeVisible()
      await expect(page.locator(`#rate .chart-note[data-period="${pt.period}"]`)).toBeVisible()
    }
  })

  test('exchange footnote & stat: mentions Q3 25 + Q4 26 and shows literal 2 / 24m', async ({ page }) => {
    const footnote = page.locator('#rate .exchange-footnote')
    await expect(footnote).toBeVisible()
    await expect(footnote).toContainText('Q3 25')
    await expect(footnote).toContainText('Q4 26')
    await expect(footnote).toContainText(/shortage/i)

    const deviationStat = page
      .locator('#rate .exchange-stat')
      .filter({ hasText: 'DEVIATION EVENTS' })
      .locator('.exchange-stat-value')

    await expect(deviationStat).toHaveText('2 / 24m')
  })

  test('exchange chart: no horizontal overflow, clipping, or overlapping labels', async ({ page }) => {
    const viewport = page.viewportSize()!
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 1)

    const sectionOverflow = await page.locator('#rate').evaluate(el => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }))
    expect(sectionOverflow.scrollWidth).toBeLessThanOrEqual(sectionOverflow.clientWidth + 1)

    const layout = await page.evaluate(() => {
      const svg = document.querySelector('#rate .exchange-chart-svg')!
      const svgRect = svg.getBoundingClientRect()

      const visibleBoxes = (selector: string) =>
        Array.from(svg.querySelectorAll(selector))
          .filter(el => getComputedStyle(el).display !== 'none')
          .map(el => {
            const r = el.getBoundingClientRect()
            return {
              text: el.textContent?.trim() ?? '',
              period: el.getAttribute('data-period') ?? '',
              left: r.left,
              right: r.right,
              top: r.top,
              bottom: r.bottom,
              width: r.width,
              height: r.height,
            }
          })
          .filter(b => b.width > 0 && b.height > 0)

      return {
        svg: { left: svgRect.left, right: svgRect.right, top: svgRect.top, bottom: svgRect.bottom },
        periods: visibleBoxes('.chart-period'),
        notes: visibleBoxes('.chart-note'),
      }
    })

    expect(layout.periods.length).toBeGreaterThanOrEqual(3)
    expect(layout.notes.length).toBe(rates.filter(r => Boolean(r.note)).length)

    // All visible labels stay inside the SVG bounds (no horizontal clipping)
    for (const label of [...layout.periods, ...layout.notes]) {
      expect(label.left, `${label.text} clipped on left`).toBeGreaterThanOrEqual(layout.svg.left - 1)
      expect(label.right, `${label.text} clipped on right`).toBeLessThanOrEqual(layout.svg.right + 1)
    }

    // Visible period labels do not overlap each other
    const sortedPeriods = [...layout.periods].sort((a, b) => a.left - b.left)
    for (let i = 1; i < sortedPeriods.length; i++) {
      const prev = sortedPeriods[i - 1]
      const curr = sortedPeriods[i]
      expect(prev.right, `${prev.text} overlaps ${curr.text}`).toBeLessThan(curr.left)
    }

    // Visible notes do not overlap each other or any visible period label
    const boxesOverlap = (a: typeof layout.notes[number], b: typeof layout.notes[number]) =>
      a.right > b.left && a.left < b.right && a.bottom > b.top && a.top < b.bottom

    for (let i = 0; i < layout.notes.length; i++) {
      for (let j = i + 1; j < layout.notes.length; j++) {
        expect(
          boxesOverlap(layout.notes[i], layout.notes[j]),
          `note ${layout.notes[i].period} overlaps note ${layout.notes[j].period}`
        ).toBe(false)
      }
      for (const period of layout.periods) {
        expect(
          boxesOverlap(layout.notes[i], period),
          `note ${layout.notes[i].period} overlaps period ${period.period}`
        ).toBe(false)
      }
    }

    if (viewport.width <= 640) {
      await page.locator('#rate .exchange-chart').screenshot({
        path: 'tests/screenshots/exchange-chart-mobile.png',
      })
    }
  })
})

test('exchange stat: reacts to mocked rates.json instead of hard-coding 2 / 24m', async ({ page }) => {
  const mockedRates: RatePoint[] = [
    { period: 'Q4 24', rate: 1.02, note: 'outside window' },
    { period: 'Q1 25', rate: 1.00 },
    { period: 'Q2 25', rate: 1.00 },
    { period: 'Q3 25', rate: 1.00 },
    { period: 'Q4 25', rate: 1.00 },
    { period: 'Q1 26', rate: 1.00 },
    { period: 'Q2 26', rate: 1.00 },
    { period: 'Q3 26', rate: 1.00 },
    { period: 'Q4 26', rate: 0.97, note: 'only one inside' },
  ]
  await page.route('**/src/data/rates.json*', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: `export default ${JSON.stringify(mockedRates)};`,
    })
  )
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.locator('#rate').scrollIntoViewIfNeeded()

  const deviationStat = page
    .locator('#rate .exchange-stat')
    .filter({ hasText: 'DEVIATION EVENTS' })
    .locator('.exchange-stat-value')

  await expect(deviationStat).toHaveText('1 / 24m')
})
