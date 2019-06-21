import { browser, logging } from 'protractor';
import { CurrencyUtilitiesAppPage } from '../../page-objects/app-page.po';

describe('Currency Utilities App Page', () => {
  let page: CurrencyUtilitiesAppPage;

  beforeEach(() => {
    page = new CurrencyUtilitiesAppPage();
  });

  it('should display Currency Utilities as title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Currency Utilities');
  });

  it('should navigate to home page on clicking Home Page navigation link', () => {
    page.navigateTo();
    page.clickOnHomeLink();
    expect(page.getCurrentUrl()).toEqual(page.getHomePageUrl());
  });
  it('should navigate to home page on clicking Convertor Page navigation link', () => {
    page.navigateTo();
    page.clickOnCurrencyConvertorLink();
    expect(page.getCurrentUrl()).toEqual(page.getCurrencyConvertorPageUrl());
  });
  it('should navigate to home page on clicking Historical Rates Page navigation link', () => {
    page.navigateTo();
    page.clickOnHistoricalRatesLink();
    expect(page.getCurrentUrl()).toEqual(page.getHistoricalRatesPageUrl());
  });
  it('should navigate to home page on clicking Alerts Page navigation link', () => {
    page.navigateTo();
    page.clickOnRateAlertsLink();
    expect(page.getCurrentUrl()).toEqual(page.getRatesAlertPageUrl());
  });
  it('should navigate to home page on clicking About Page navigation link', () => {
    page.navigateTo();
    page.clickOnAboutLink();
    expect(page.getCurrentUrl()).toEqual(page.getAboutPageUrl());
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
