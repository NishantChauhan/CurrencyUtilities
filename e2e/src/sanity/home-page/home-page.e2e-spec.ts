import { browser, logging } from 'protractor'
import { CurrencyUtilitiesHomePage } from '../../page-objects/home-page.po'

describe('Home Page', () => {
  let page: CurrencyUtilitiesHomePage
  beforeEach(() => {
    page = new CurrencyUtilitiesHomePage()
  })
  it('should navigate to about page on opening home page', async () => {
    page.navigateTo()
    expect(page.getCurrentUrl()).toEqual(page.getHomePageUrl())
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
