export const fixedSourceCurrency: Currency = {
  currencyName: 'CAD',
  currencySymbol: 'CAD',
}
export const fixedTargetCurrency: Currency = {
  currencyName: 'INR',
  currencySymbol: 'INR',
}

export class ResponseStatus {
  status: string
  errorCode?: string
  errorDescription?: string
}
export class ConversionRateAPIResponse {
  from: string
  to: string
  rateAsOf: Date
  amount: number
  conversionRate: number
  result: number
  responseStatus: ResponseStatus
}

export class Currency {
  currencyName: string
  currencySymbol: string
}
