// eslint-disable-next-line @typescript-eslint/no-var-requires
const { writeFile } = require('fs')
require('dotenv').config()
const targetPath = './src/environments/environment.standalone.ts'

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `export const environment = {
  production: true,
  standalone: true,
  supportedCurrencyURL: 'http://api.exchangeratesapi.io/latest',
  convertCurrencyURL: 'http://api.exchangeratesapi.io/latest',
  cacheExpiryTimeout: 1000 * 60,
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
