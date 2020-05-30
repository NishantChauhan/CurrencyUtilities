import { browser, logging } from 'protractor'
import { CurrencyUtilitiesHomePage } from '../../page-objects/home-page.po'

describe('Home Page', () => {
  let homePage: CurrencyUtilitiesHomePage
  beforeEach(() => {
    homePage = new CurrencyUtilitiesHomePage()
  })
  it('should show home page', () => {
    homePage.navigateTo()
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
