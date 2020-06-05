import { browser, logging } from 'protractor'
import { CurrencyUtilitiesAboutPage } from './../../page-objects/about-page.po'

describe('About Page', () => {
  let page: CurrencyUtilitiesAboutPage
  beforeEach(() => {
    page = new CurrencyUtilitiesAboutPage()
  })

  it('should navigate to about page on opening about page url', async () => {
    page.navigateTo()
    expect(page.getCurrentUrl()).toEqual(page.getAboutPageUrl())
  })
  afterEach(async () => {
    const capabilities = await browser.getCapabilities()
    const browserName = capabilities.get('browserName')
    if (!(browserName === 'chrome')) {
      return
    }
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    )
  })
})
