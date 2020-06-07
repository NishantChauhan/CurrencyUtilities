import { browser, by, element, ElementFinder } from 'protractor'

export class CurrencyUtilitiesAppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>
  }
  navigateToNonExistingPage() {
    return browser.get(browser.baseUrl + 'page-not-found/not-found') as Promise<any>
  }

  getTitleText() {
    return element(by.css('mat-toolbar > a > span > span')).getText() as Promise<string>
  }
  openSideNavDrawer() {
    return element(by.css('mat-toolbar > button')).click() as Promise<void>
  }

  getHomeSideNavigationControl(): ElementFinder {
    return element(by.css('mat-sidenav > div > mat-nav-list > a:nth-child(1)'))
  }
  getCurrencyConvertorSideNavigationControl(): ElementFinder {
    return element(by.css('mat-sidenav > div > mat-nav-list > a:nth-child(2)'))
  }
  getHistoricalRatesSideNavigationControl(): ElementFinder {
    return element(by.css('mat-sidenav > div > mat-nav-list > a:nth-child(3)'))
  }
  getRateAlertsSideNavigationControl(): ElementFinder {
    return element(by.css('mat-sidenav > div > mat-nav-list > a:nth-child(4)'))
  }
  getAboutSideNavigationControl(): ElementFinder {
    return element(by.css('mat-sidenav > div > mat-nav-list > a:nth-child(5)'))
  }

  getHomePage(): ElementFinder {
    return element(by.css('app-home'))
  }
  getCurrencyConvertorPage(): ElementFinder {
    return element(by.css('app-convertor-card'))
  }
  getRateAlertsPage(): ElementFinder {
    return element(by.css('app-under-construction'))
  }
  getHistoricalRatesPage(): ElementFinder {
    return element(by.css('app-under-construction'))
  }
  getAboutPage(): ElementFinder {
    return element(by.css('app-about'))
  }
  getPageNotFoundPage(): ElementFinder {
    return element(by.css('app-page-not-found'))
  }
  getCardTitle(): Promise<string> {
    return element(by.css('mat-card-title')).getText() as Promise<string>
  }
  getHomePageUrl() {
    return browser.baseUrl + 'home'
  }
  getCurrencyConvertorPageUrl() {
    return browser.baseUrl + 'currency-convertor'
  }
  getHistoricalRatesPageUrl() {
    return browser.baseUrl + 'historical-rates'
  }
  getRatesAlertPageUrl() {
    return browser.baseUrl + 'rate-alerts'
  }
  getAboutPageUrl() {
    return browser.baseUrl + 'about'
  }

  getCurrentUrl() {
    return browser.getCurrentUrl() as Promise<any>
  }
}
