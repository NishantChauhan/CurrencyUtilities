import { browser, by, element } from 'protractor';
export class CurrencyConvertorCardPage {
  navigateTo() {
    return browser.get(browser.baseUrl + '/currency-convertor') as Promise<any>;
  }

  getCardTitle() {
    return element(by.css('app-convertor-card h4')).getText() as Promise<string>;
  }


  getSourceAmount() {
    return element(by.css('#cc-source-amount'))
      .getWebElement()
      .getAttribute('value') as Promise<string>;
  }
  getTargetCurrency() {
    return element(by.css('#cc-target-currency'))
      .getWebElement()
      .getAttribute('value') as Promise<string>;
  }
  getTargetAmount() {
    return element(by.css('#cc-target-amount'))
      .getWebElement()
      .getAttribute('value') as Promise<string>;
  }

  getConvertButton() {
    return element(by.css('app-convertor-card button'));
  }
  getAlertTargetAmount() {
    return element(by.css('app-currency-conversion-result span:nth-child(4)')).getText() as Promise<string>;
  }
}
