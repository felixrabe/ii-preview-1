const {createHash} = require('crypto')

module.exports = (value) => createHash('md5').update(value).digest('hex')
