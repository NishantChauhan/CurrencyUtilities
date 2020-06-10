const config = require('./protractor-ci.conf').config
config.baseUrl = process.env.APP_URL
exports.config = config
