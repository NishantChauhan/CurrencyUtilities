import { browser } from 'protractor'

export class CurrencyUtilitiesHomePage {
  navigateTo() {
    return browser.get(browser.baseUrl + '/home') as Promise<any>
  }
}
