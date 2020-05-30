import { browser, ExpectedConditions, logging } from 'protractor'
import { CurrencyUtilitiesAppPage } from '../../page-objects/app-page.po'

describe('Currency Utilities App Page', () => {
  let page: CurrencyUtilitiesAppPage

  beforeEach(() => {
    page = new CurrencyUtilitiesAppPage()
  })

  it('should display Currency Utilities as title', async () => {
    page.navigateTo()
    await page.getTitleText()
    page.getTitleText().then(title => {
      expect(title.trim()).toEqual('Currency Utilities')
    })
  })

  it('should navigate to home page on clicking Home Page navigation link', () => {
    page.navigateTo()
    page.openSideNavDrawer()
    page.clickOnHomeLink()
    browser.wait(ExpectedConditions.visibilityOf(page.getHomePage()))
    expect(page.getCurrentUrl()).toEqual(page.getHomePageUrl())
  })
  it('should navigate to home page on clicking Convertor Page navigation link', () => {
    page.navigateTo()
    page.openSideNavDrawer()
    page.clickOnCurrencyConvertorLink()
    browser.wait(ExpectedConditions.visibilityOf(page.getCurrencyConvertorPage()))
    expect(page.getCurrentUrl()).toEqual(page.getCurrencyConvertorPageUrl())
  })
  it('should navigate to home page on clicking Historical Rates Page navigation link', () => {
    page.navigateTo()
    page.openSideNavDrawer()
    page.clickOnHistoricalRatesLink()
    browser.wait(ExpectedConditions.visibilityOf(page.getHistoricalRatesPage()))
    expect(page.getCurrentUrl()).toEqual(page.getHistoricalRatesPageUrl())
  })
  it('should navigate to home page on clicking Alerts Page navigation link', () => {
    page.navigateTo()
    page.openSideNavDrawer()
    page.clickOnRateAlertsLink()
    browser.wait(ExpectedConditions.visibilityOf(page.getRateAlertsPage()))
    expect(page.getCurrentUrl()).toEqual(page.getRatesAlertPageUrl())
  })
  it('should navigate to home page on clicking About Page navigation link', () => {
    page.navigateTo()
    page.openSideNavDrawer()
    page.clickOnAboutLink()
    browser.wait(ExpectedConditions.visibilityOf(page.getAboutPage()))
    expect(page.getCurrentUrl()).toEqual(page.getAboutPageUrl())
  })
  it('should navigate to Page not found when invalid URL is entered', () => {
    page.navigateToNonExistingPage()
    browser.wait(ExpectedConditions.visibilityOf(page.getPageNotFoundPage()))
    expect(page.getCardTitle()).toBe('Oops! Wrong Way')
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
