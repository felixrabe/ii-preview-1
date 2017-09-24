const connect = require('connect')
const morgan = require('morgan')

const blankFavicon = require('ii-blank-favicon')

module.exports = () => {
  const app = connect()

  app.use(blankFavicon)
  app.use(morgan('tiny'))

  return app
}
