import { browser, logging } from 'protractor';
import { CurrencyUtilitiesHomePage } from '../../page-objects/currency-home.po';

describe('Currency Utilities Home Page', () => {
  let page: CurrencyUtilitiesHomePage;

  beforeEach(() => {
    page = new CurrencyUtilitiesHomePage();
  });

  it('should display Currency Utilities as title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Currency Utilities');
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
