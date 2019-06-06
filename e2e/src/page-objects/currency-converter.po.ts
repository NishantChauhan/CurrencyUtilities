import { browser, by, element } from 'protractor';
export class CurrencyConvertorCardPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getCardTitleText() {
    return element(by.css('app-convertor-card h4')).getText() as Promise<string>;
  }

  getSourceAmountElementText() {
    return element(by.css('#cc-source-amount'))
      .getWebElement()
      .getAttribute('value') as Promise<string>;
  }

  getTargetAmountElementText() {
    return element(by.css('#cc-target-amount'))
      .getWebElement()
      .getAttribute('value') as Promise<string>;
  }

  clickConvertButton() {
    return element(by.css('app-convertor-card button')).click() as Promise<void>;
  }
}
