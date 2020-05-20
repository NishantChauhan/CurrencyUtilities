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
    async () => {
      cardPage.getConvertButton().click()
      await cardPage.getAlertTargetAmount()
      cardPage.getAlertTargetAmount().then(result => {
        expect(result).toContain(fixedTargetCurrency.currencySymbol)
        cardPage.getRateFromAlert().then(rate => {
          expect(result).toBe(parseFloat(rate).toFixed(10) + ' ' + fixedTargetCurrency.currencySymbol)
        })
      })
    }
  )
  it(
    'should switch currency making ' +
      fixedSourceCurrency.currencySymbol +
      ' as To  and  ' +
      fixedTargetCurrency.currencySymbol +
      ' as From on switcher button click',
    () => {
      cardPage.getSwitcherButton().click()
      expect(cardPage.getSourceCurrency()).toBe(fixedTargetCurrency.currencySymbol)
      expect(cardPage.getTargetCurrency()).toBe(fixedSourceCurrency.currencySymbol)
    }
  )
  it('should reset form on reset button click', () => {
    cardPage.getResetButton().click()
    expect(cardPage.getSourceCurrency()).toBe('')
    expect(cardPage.getTargetCurrency()).toBe('')
    expect(cardPage.getSourceAmount()).toBe('')
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
