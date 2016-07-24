'use strict'

const db = require('./db')
const getNow = require('../../utils/now')
const bot = require('../../bot')
const personList = require('./person-list')
const holiday2016 = require('./holiday-2016')
const personSize = Object.keys(personList).length

module.exports = (channelName, hasUpdateDB) => {
  const params = {
    icon_emoji: ':secret:'
  }
  const now = getNow()
  const days = now.days()
  if (days === 6) {
    bot.postMessageToChannel(channelName, `:mike: 今天是星期六，不需要值日生`, params)
  } else if (days === 0) {
    bot.postMessageToChannel(channelName, `:mike: 今天是星期日，不需要值日生`, params)
  } else if (holiday2016[now.format('MMDD')]) {
    bot.postMessageToChannel(channelName, `:mike: 今天是${holiday2016[now.format('MMDD')]}節日，不需要值日生`, params)
  } else {
    db.findOne({}, (er, doc) => {
      const dutyID = doc.dutyID
      const nextDutyID = dutyID + 1
      const who = personList[dutyID]

      let msg = `:dart: 今天的值日生是: ${who.name} (${who.en})\n`
      if (days === 3) msg += `:mike: 今天是星期三，垃圾整理一下先放在廚房即可`

      bot.postMessageToChannel(channelName, msg, params)

      if (hasUpdateDB) {
        db.update(doc, {dutyID: nextDutyID > personSize ? 1 : nextDutyID})
      }
    })
  }
}
