/* eslint-disable @typescript-eslint/no-var-requires */
function replaceProdEnv() {
  const { writeFile } = require('fs')
  require('dotenv').config()
  const targetPath = './src/environments/environment.prod.ts'

  // we have access to our environment variables
  // in the process.env object thanks to dotenv
  const environmentFileContent = `export const environment = {
  production: true,
  standalone: false,
  supportedCurrencyURL: '${process.env.BACK_END_API_ENDPOINT}/currency/rates/supportedCurrencies',
  convertCurrencyURL: '${process.env.BACK_END_API_ENDPOINT}/currency/converter/convert',
  cacheExpiryTimeout: 12 * 60 * 60 * 1000,
}
`

  // write the content to the respective file
  // tslint:disable-next-line: space-before-function-paren
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err)
    }
    console.log(`Wrote variables to ${targetPath}`)
  })
}
replaceProdEnv()
