import { browser, logging } from 'protractor';
import { CurrencyUtilitiesHomePage } from '../../page-objects/home-page.po';

describe('About Page', () => {
  let homePage: CurrencyUtilitiesHomePage;
  beforeEach(() => {
    homePage = new CurrencyUtilitiesHomePage();
  });
  it('should show about page', () => {
    homePage.navigateTo();
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
