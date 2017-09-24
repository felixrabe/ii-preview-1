const fs = require('fs')

module.exports = (sockPath) => {
  if (fs.existsSync(sockPath)) fs.unlinkSync(sockPath)
}
