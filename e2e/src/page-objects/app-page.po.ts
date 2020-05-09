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

  clickOnHomeLink() {
    return element(by.css('mat-sidenav > div > mat-nav-list > a:nth-child(1)')).click() as Promise<void>
  }
  clickOnCurrencyConvertorLink() {
    return element(by.css('mat-sidenav > div > mat-nav-list > a:nth-child(2)')).click() as Promise<void>
  }
  clickOnHistoricalRatesLink() {
    return element(by.css('mat-sidenav > div > mat-nav-list > a:nth-child(3)')).click() as Promise<void>
  }
  clickOnRateAlertsLink() {
    return element(by.css('mat-sidenav > div > mat-nav-list > a:nth-child(4)')).click() as Promise<void>
  }
  clickOnAboutLink() {
    return element(by.css('mat-sidenav > div > mat-nav-list > a:nth-child(5)')).click() as Promise<void>
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
