import { browser, logging } from 'protractor'
import { CurrencyUtilitiesAboutPage } from './../../page-objects/about-page.po'

describe('About Page', () => {
  let page: CurrencyUtilitiesAboutPage
  beforeEach(() => {
    page = new CurrencyUtilitiesAboutPage()
  })
  it('should show about page', () => {
    it('should navigate to home page on clicking About Page navigation link', () => {
      page.navigateTo()
      expect(page.getCurrentUrl()).toEqual(page.getAboutPageUrl())
    })
  })
  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    )
  })
})
