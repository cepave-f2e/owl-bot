'use strict'
const echo = require('./echo')

require('./next430')()

module.exports = (channelName, match) => {
  echo(channelName, false)
}
