import { browser, logging } from 'protractor';
import { CurrencyConvertorCardPage } from '../../page-objects/currency-converter.po';

describe('Currency Convertor Card', () => {
  let cardPage: CurrencyConvertorCardPage;
  beforeEach(() => {
    cardPage = new CurrencyConvertorCardPage();
  });

  it('should show Currency Convertor Card Title', () => {
    cardPage.navigateTo();
    expect(cardPage.getCardTitleText()).toEqual('Currency Convertor');
  });
  it('should show source amount as 1 on load', () => {
    cardPage.navigateTo();
    expect(cardPage.getSourceAmountElementText()).toEqual('1');
  });

  it('should convert CAD to INR on convert button click', () => {
    cardPage.navigateTo();
    expect(cardPage.getTargetAmountElementText()).toBeFalsy();
    cardPage.clickConvertButton();
    expect(cardPage.getTargetAmountElementText()).toBeTruthy();
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
