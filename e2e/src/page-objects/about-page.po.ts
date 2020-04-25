import { browser } from 'protractor'

export class CurrencyUtilitiesAboutPage {
  navigateTo() {
    return browser.get(browser.baseUrl + '/about') as Promise<any>
  }
  getCurrentUrl() {
    return browser.getCurrentUrl() as Promise<any>
  }
  getAboutPageUrl() {
    return browser.baseUrl + 'about'
  }
}
