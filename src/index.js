'use strict'
const bot = require('./bot')

bot.on('start', function() {
  bot.on('message', function(data) {
    const msg = data.text
    if (/^\$currency (.+)/.test(msg)) {
      bot.getChannelById(data.channel).then((data) => {
        require('./commands/currency.js')(data.name, msg)
      })
    }
  })
})
