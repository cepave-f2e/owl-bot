'use strict'
const bot = require('./bot')

bot.on('start', function() {
  bot.on('message', function(data) {
    if (/^\/\/duty/.test(data.text)) {
      bot.getChannelById(data.channel).then((data) => {
        require('./commands/duty')(data.name)
      })
    }
  })
})
