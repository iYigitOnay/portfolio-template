import { beforeEach, describe, test } from '@e2e-dev/web'
import { expect } from 'e2e'

const linkedInSelector = 'footer a[href="https://www.linkedin.com/in/ihsan-yigit-onay"]'

describe('footer', () => {
  beforeEach(async ({ app, screen }) => {
    await app.open('/')
    await screen.getByText('© 2026 İhsan Yiğit Önay. Tüm hakları saklıdır.').scrollIntoView()
  })

  test('shows the invite, three columns and the bottom row', async ({ screen }) => {
    const footer = screen.getByRole('contentinfo')

    await expect(footer.getByText('Junior backend ve staj pozisyonları için görüşmelere açığım.')).toBeVisible()
    await expect(footer.getByRole('group')).toHaveCount(3)
    await expect(footer.getByText('Geliştiriciler')).toBeVisible()
    await expect(footer.getByRole('link', 'LinkedIn')).toBeVisible()
    await expect(footer.getByText('© 2026 İhsan Yiğit Önay. Tüm hakları saklıdır.')).toBeVisible()
    await expect(footer.getByText('Next.js, Drizzle ve libSQL ile yapıldı')).toBeVisible()
  })

  test('reveals the footer when scrolled into view', async ({ screen }) => {
    const footer = screen.getByRole('contentinfo')

    await expect(footer).toHaveAttribute('data-in')
    await expect(footer.getByRole('group')).toHaveCount(3)
  })

  test('hovering an external link draws the underline and shows the arrow', async ({ screen, browser }) => {
    const readHoverStyles = () =>
      browser.evaluate((selector: string) => {
        const link = document.querySelector(selector)
        const label = link?.querySelector('span')
        const arrow = link?.querySelector('i')
        return label && arrow
          ? { underline: getComputedStyle(label).backgroundSize, arrow: getComputedStyle(arrow).opacity }
          : null
      }, linkedInSelector)
    await expect.poll(readHoverStyles).toEqual({ underline: '0% 1px', arrow: '0' })

    // Sütunlar kayarak belirdiği için hover, giriş animasyonu bitene kadar tekrarlanır.
    const link = screen.getByRole('contentinfo').getByRole('link', 'LinkedIn')
    await expect.poll(async () => { await link.hover(); return readHoverStyles() }, { timeout: 4000 }).toEqual({ underline: '100% 1px', arrow: '1' })
    await expect(screen.getByRole('contentinfo').getByRole('link', 'LinkedIn')).toBeVisible()
  })

  test('the İşler column "Tümü" link goes to the projects section', async ({ screen, browser }) => {
    await screen.getByRole('contentinfo').getByRole('group', 'İşler').getByRole('link', 'Tümü').tap()

    await expect(browser).toHaveURL('/#isler')
    await expect(screen.getByRole('heading', 'Seçili işler')).toBeVisible()
  })

  test('without posts, the footer has no Yazılar column and links both CVs', async ({ screen }) => {
    const footer = screen.getByRole('contentinfo')

    await expect(footer.getByRole('group', 'Yazılar')).toHaveCount(0)
    await expect(footer.getByRole('link', 'CV (TR)')).toHaveAttribute('href', '/cv/ihsanyigitonay_tr.pdf')
    await expect(footer.getByRole('link', 'CV (EN)')).toHaveAttribute('href', '/cv/ihsanyigitonay_en.pdf')
  })
})
