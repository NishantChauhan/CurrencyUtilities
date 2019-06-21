import { browser, by, element } from 'protractor';

export class CurrencyUtilitiesAppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
  clickOnHomeLink() {
    return element(by.css('app-root nav a:nth-child(1)')).click() as Promise<void>;
  }
  clickOnCurrencyConvertorLink() {
    return element(by.css('app-root nav a:nth-child(2)')).click() as Promise<void>;
  }
  clickOnHistoricalRatesLink() {
    return element(by.css('app-root nav a:nth-child(3)')).click() as Promise<void>;
  }
  clickOnRateAlertsLink() {
    return element(by.css('app-root nav a:nth-child(4)')).click() as Promise<void>;
  }
  clickOnAboutLink() {
    return element(by.css('app-root nav a:nth-child(5)')).click() as Promise<void>;
  }

  getHomePageUrl() {
    return browser.baseUrl + 'home';
  }
  getCurrencyConvertorPageUrl() {
    return browser.baseUrl + 'currency-convertor';
  }
  getHistoricalRatesPageUrl() {
    return browser.baseUrl + 'historical-rates';
  }
  getRatesAlertPageUrl() {
    return browser.baseUrl + 'rate-alerts';
  }
  getAboutPageUrl() {
    return browser.baseUrl + 'about';
  }

  getCurrentUrl() {
    return browser.getCurrentUrl() as Promise<any>;
  }
}
