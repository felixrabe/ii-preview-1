const babel = require('babel-core')

module.exports = (code) => babel.transform(code, {plugins: ['transform-react-jsx']}).code
