import { browser } from 'protractor'

export class CurrencyUtilitiesHomePage {
  navigateTo() {
    return browser.get(browser.baseUrl + '/home') as Promise<any>
  }
  getCurrentUrl() {
    return browser.getCurrentUrl() as Promise<any>
  }
  getHomePageUrl() {
    return browser.baseUrl + 'home'
  }
}
