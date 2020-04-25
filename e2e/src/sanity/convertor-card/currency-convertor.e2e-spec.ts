import { browser, logging } from 'protractor'
import { fixedSourceCurrency, fixedTargetCurrency } from '../../../../src/app/common/base-rates'
import { CurrencyConvertorCardPage } from '../../page-objects/currency-converter.po'

describe('Currency Convertor Card', () => {
  let cardPage: CurrencyConvertorCardPage
  beforeEach(() => {
    cardPage = new CurrencyConvertorCardPage()
    cardPage.navigateTo()
  })

  it('should show Currency Convertor Card Title', () => {
    expect(cardPage.getCardTitle()).toEqual('Currency Convertor')
  })
  it('should show source amount as 1 on load', () => {
    expect(cardPage.getSourceAmount()).toEqual('1')
  })

  it(
    'should convert ' +
      fixedSourceCurrency.currencySymbol +
      ' to ' +
      fixedTargetCurrency.currencySymbol +
      ' on convert button click',
    () => {
      expect(cardPage.getTargetAmount()).toBeFalsy()
      cardPage.getConvertButton().click()
      expect(cardPage.getTargetAmount()).toBeTruthy()
    }
  )

  it('should reflect changes in the target amount in the result alert', () => {
    cardPage.getConvertButton().click()
    Promise.all([cardPage.getTargetAmount(), cardPage.getTargetCurrency()]).then(values => {
      expect(Promise.resolve(values.join(' '))).toEqual(cardPage.getAlertTargetAmount())
    })
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser

    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    )
  })
})
