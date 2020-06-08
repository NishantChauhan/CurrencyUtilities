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
    const homeSideNav = page.getHomeSideNavigationControl()
    browser.wait(ExpectedConditions.visibilityOf(homeSideNav))
    homeSideNav.click()
    browser.wait(ExpectedConditions.visibilityOf(page.getHomePage()))
    expect(page.getCurrentUrl()).toEqual(page.getHomePageUrl())
  })
  it('should navigate to convertor page on clicking Convertor Page navigation link', () => {
    page.navigateTo()
    page.openSideNavDrawer()
    const currencySideNav = page.getCurrencyConvertorSideNavigationControl()
    browser.wait(ExpectedConditions.visibilityOf(currencySideNav))
    currencySideNav.click()
    browser.wait(ExpectedConditions.visibilityOf(page.getCurrencyConvertorPage()))
    expect(page.getCurrentUrl()).toEqual(page.getCurrencyConvertorPageUrl())
  })
  it('should navigate to historical rates page on clicking Historical Rates Page navigation link', () => {
    page.navigateTo()
    page.openSideNavDrawer()
    const historySideNav = page.getHistoricalRatesSideNavigationControl()
    browser.wait(ExpectedConditions.visibilityOf(historySideNav))
    historySideNav.click()
    browser.wait(ExpectedConditions.visibilityOf(page.getHistoricalRatesPage()))
    expect(page.getCurrentUrl()).toEqual(page.getHistoricalRatesPageUrl())
  })
  it('should navigate to alerts page on clicking Alerts Page navigation link', () => {
    page.navigateTo()
    page.openSideNavDrawer()
    const ratesSideNav = page.getRateAlertsSideNavigationControl()
    browser.wait(ExpectedConditions.visibilityOf(ratesSideNav))
    ratesSideNav.click()
    browser.wait(ExpectedConditions.visibilityOf(page.getRateAlertsPage()))
    expect(page.getCurrentUrl()).toEqual(page.getRatesAlertPageUrl())
  })
  it('should navigate to about page on clicking About Page navigation link', () => {
    page.navigateTo()
    page.openSideNavDrawer()
    const aboutSideNav = page.getAboutSideNavigationControl()
    browser.wait(ExpectedConditions.visibilityOf(aboutSideNav))
    aboutSideNav.click()
    browser.wait(ExpectedConditions.visibilityOf(page.getAboutPage()))
    expect(page.getCurrentUrl()).toEqual(page.getAboutPageUrl())
  })
  it('should navigate to page not found page when invalid URL is entered', () => {
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
