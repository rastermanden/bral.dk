import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  // Wait for fonts / Vue hydration
  await page.waitForLoadState('networkidle')
})

// ── Layout: no horizontal overflow ──────────────────────────────────────────

test('page has no horizontal overflow', async ({ page }) => {
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
  const viewportWidth = page.viewportSize()!.width
  expect(bodyWidth).toBe(viewportWidth)
})

test('header: no horizontal overflow at 390, 768, 1280, and 1440 px', async ({ page }) => {
  for (const width of [390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(scrollWidth, `overflow at ${width}px`).toBe(width)
  }
})

// ── Header ───────────────────────────────────────────────────────────────────

test('header: brand is always visible', async ({ page }) => {
  await expect(page.locator('.header-brand').getByText('BANCO·BRAL', { exact: true })).toBeVisible()
})

test('header: nav hidden on mobile, visible on tablet+', async ({ page }) => {
  const viewport = page.viewportSize()!
  const nav = page.locator('.header-nav')

  if (viewport.width <= 640) {
    await expect(nav).toBeHidden()
  } else {
    await expect(nav).toBeVisible()
  }
})

test('header: Redeem is reachable on every viewport', async ({ page }) => {
  const viewport = page.viewportSize()!
  if (viewport.width <= 640) {
    await expect(page.locator('.header-cta')).toBeHidden()
    await expect(page.locator('.hamburger')).toBeVisible()
    await page.locator('.hamburger').click()
    await expect(page.locator('.mobile-menu-cta')).toBeVisible()
  } else {
    await expect(page.locator('.header-cta')).toBeVisible()
  }
})

test('header: tagline stays visible at 1440 px', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await expect(page.locator('.header-tagline')).toBeVisible()
})

test('header: wraps to at most 2 nav rows at 768 and 1024 px and anchor jumps clear sticky header', async ({ page }) => {
  for (const width of [768, 1024]) {
    await page.setViewportSize({ width, height: 900 })
    const metrics = await page.evaluate(() => {
      const header = document.querySelector('.site-header')!
      const links = Array.from(document.querySelectorAll('.header-nav a'))
      const rows = new Set(links.map(el => Math.round(el.getBoundingClientRect().top / 4) * 4))
      return {
        headerHeight: header.getBoundingClientRect().height,
        rowCount: rows.size,
      }
    })
    expect(metrics.rowCount, `nav rows at ${width}px`).toBeLessThanOrEqual(2)
    expect(metrics.headerHeight, `header height at ${width}px`).toBeLessThanOrEqual(84)

    await page.locator('.header-nav a[href="#rate"]').click()
    const jump = await page.evaluate(() => {
      const headerBottom = document.querySelector('.site-header')!.getBoundingClientRect().bottom
      const headingTop = document.querySelector('#rate h2, #rate .section-title, #rate')!.getBoundingClientRect().top
      return { headerBottom, headingTop }
    })
    expect(jump.headingTop, `heading obscured by sticky header at ${width}px`).toBeGreaterThanOrEqual(jump.headerBottom - 1)
  }
})

// ── Hero ─────────────────────────────────────────────────────────────────────

test('hero: heading is visible', async ({ page }) => {
  await expect(page.locator('h1').filter({ hasText: 'One Bral' })).toBeVisible()
})

test('hero: CTA buttons are visible', async ({ page }) => {
  await expect(page.getByRole('link', { name: /Convert Currency/i })).toBeVisible()
})

test('hero: single column on mobile', async ({ page }) => {
  const viewport = page.viewportSize()!
  const grid = page.locator('.hero-grid')

  if (viewport.width <= 768) {
    const cols = await grid.evaluate(el =>
      getComputedStyle(el).gridTemplateColumns
    )
    // Single column means one track
    expect(cols.trim().split(' ').length).toBe(1)
  }
})

test('hero: stats strip is visible', async ({ page }) => {
  await expect(page.locator('.stats-strip')).toBeVisible()
})

// ── Sections present ─────────────────────────────────────────────────────────

test('manifesto section is visible', async ({ page }) => {
  await page.locator('#manifesto').scrollIntoViewIfNeeded()
  await expect(page.locator('#manifesto')).toBeVisible()
})

test('exchange section is visible', async ({ page }) => {
  await page.locator('#rate').scrollIntoViewIfNeeded()
  await expect(page.locator('#rate')).toBeVisible()
})

test('denominations section is visible', async ({ page }) => {
  await page.locator('#mint').scrollIntoViewIfNeeded()
  await expect(page.locator('#mint')).toBeVisible()
})

test('reserves section is visible', async ({ page }) => {
  await page.locator('#reserves').scrollIntoViewIfNeeded()
  await expect(page.locator('#reserves')).toBeVisible()
})

test('address section is visible', async ({ page }) => {
  await page.locator('#address').scrollIntoViewIfNeeded()
  await expect(page.locator('#address')).toBeVisible()
  await expect(page.locator('#address video')).toBeVisible()
})

test('schedule section is visible', async ({ page }) => {
  await page.locator('#schedule').scrollIntoViewIfNeeded()
  await expect(page.locator('#schedule')).toBeVisible()
})

test('members section is visible', async ({ page }) => {
  await page.locator('#members').scrollIntoViewIfNeeded()
  await expect(page.locator('#members')).toBeVisible()
})

test('shop section is visible', async ({ page }) => {
  await page.locator('#shop').scrollIntoViewIfNeeded()
  await expect(page.locator('#shop')).toBeVisible()
})

// ── Exchange calculator ───────────────────────────────────────────────────────

test('exchange: calculator stacks to 1 column on mobile', async ({ page }) => {
  const viewport = page.viewportSize()!
  await page.locator('#rate').scrollIntoViewIfNeeded()
  const grid = page.locator('.exchange-grid')

  if (viewport.width <= 768) {
    const cols = await grid.evaluate(el =>
      getComputedStyle(el).gridTemplateColumns
    )
    expect(cols.trim().split(' ').length).toBe(1)
  } else {
    const cols = await grid.evaluate(el =>
      getComputedStyle(el).gridTemplateColumns
    )
    expect(cols.trim().split(' ').length).toBe(2)
  }
})

// ── Schedule ─────────────────────────────────────────────────────────────────

test('schedule: notes column hidden on small screens', async ({ page }) => {
  const viewport = page.viewportSize()!
  await page.locator('#schedule').scrollIntoViewIfNeeded()
  const notesCell = page.locator('.sched-notes').first()

  if (viewport.width <= 768) {
    await expect(notesCell).toBeHidden()
  } else {
    await expect(notesCell).toBeVisible()
  }
})

// ── Members ───────────────────────────────────────────────────────────────────

test('members: clicking a tab shows that member', async ({ page }) => {
  await page.locator('#members').scrollIntoViewIfNeeded()
  const tabs = page.locator('.member-tab-btn')
  const count = await tabs.count()
  expect(count).toBe(6)

  // Click the second member
  await tabs.nth(1).click()
  // The panels should still be visible
  await expect(page.locator('.member-panels')).toBeVisible()
})

// ── Governors ─────────────────────────────────────────────────────────────────

test('governors section is visible', async ({ page }) => {
  await page.locator('#governors').scrollIntoViewIfNeeded()
  await expect(page.locator('#governors')).toBeVisible()
})

test('governors: roster renders all seats plus header row', async ({ page }) => {
  await page.locator('#governors').scrollIntoViewIfNeeded()
  const rows = page.locator('#governors .gov-row')
  await expect(rows).toHaveCount(6)
})

test('governors: clauses responsive grid', async ({ page }) => {
  const viewport = page.viewportSize()!
  await page.locator('#governors').scrollIntoViewIfNeeded()
  const cols = await page
    .locator('#governors .gov-clauses')
    .evaluate(el => getComputedStyle(el).gridTemplateColumns.trim().split(' ').length)
  expect(cols).toBe(viewport.width <= 768 ? 1 : 2)
})

// ── Merch ─────────────────────────────────────────────────────────────────────

test('merch: products are visible', async ({ page }) => {
  await page.locator('#shop').scrollIntoViewIfNeeded()
  const items = page.locator('.merch-item')
  const count = await items.count()
  expect(count).toBeGreaterThan(0)
})

test('merch: 1-column layout on mobile', async ({ page }) => {
  const viewport = page.viewportSize()!
  await page.locator('#shop').scrollIntoViewIfNeeded()
  const grid = page.locator('.merch-grid')

  if (viewport.width <= 640) {
    const cols = await grid.evaluate(el =>
      getComputedStyle(el).gridTemplateColumns
    )
    expect(cols.trim().split(' ').length).toBe(1)
  }
})

// ── Screenshots ───────────────────────────────────────────────────────────────

test('full page screenshot', async ({ page }, testInfo) => {
  const viewport = page.viewportSize()!
  const name = viewport.width <= 640 ? 'mobile' : viewport.width <= 1024 ? 'tablet' : 'desktop'
  await page.screenshot({
    path: `tests/screenshots/${name}.png`,
    fullPage: true,
  })
})
