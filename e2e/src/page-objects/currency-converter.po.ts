import { browser, by, element } from 'protractor'
export class CurrencyConvertorCardPage {
  navigateTo() {
    return browser.get(browser.baseUrl + '/currency-convertor') as Promise<any>
  }

  getCardTitle() {
    return element(by.css('mat-card-title')).getText() as Promise<string>
  }

  getSourceAmount() {
    return element(by.css('#cc-source-amount')).getWebElement().getAttribute('value') as Promise<string>
  }
  getSourceCurrency() {
    return element(by.css('#cc-source-currency')).getWebElement().getAttribute('value') as Promise<string>
  }
  getTargetCurrency() {
    return element(by.css('#cc-target-currency')).getWebElement().getAttribute('value') as Promise<string>
  }

  getConvertButton() {
    return element(by.css('#convertCurrency'))
  }
  getSwitchertButton() {
    return element(by.css('#cc-switch-currency'))
  }

  getAlertTargetAmount() {
    return element(by.css('.convertor-alert-success')).getText() as Promise<string>
  }
  getRateFromAlert(): Promise<string> {
    return element(by.css('app-currency-conversion-result > div > div > small:nth-child(7)')).getText() as Promise<
      string
    >
  }
}
