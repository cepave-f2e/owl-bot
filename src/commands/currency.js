const bot = require('../bot')
const got = require('got')
const cheerio = require('cheerio')


const EMOJI_MOMENY_BAG = '\u{1F4B0}'
const bankCode = 'TSIBTWTP'
const currency = {
  USD: 0,
  EUR: 1,
  JPY: 2,
  HKD: 3,
  GBP: 4,
  CHF: 5,
  CNY: 6,
  AUD: 7,
  NZD: 8,
  SGD: 9,
  THB: 10,
  SEK: 11,
  CAD: 12,
  ZAR: 13
}

const getExchange = (bankCode, currencyNumber, channelName) => {
  got.get(`https://tw.rter.info/json.php?t=bank&q=check&iso=${bankCode}`)
  .then((res) => {
    const data = JSON.parse(res.body).data
    const currency = cheerio.load(data[currencyNumber][0])('.text-primary').text()
    const buying = data[currencyNumber][1]
    const selling = data[currencyNumber][2]
    const updateTime = data[currencyNumber][3]

    bot.postMessageToChannel(channelName, `${currency} ${EMOJI_MOMENY_BAG}\nBuying: ${buying}    Selling: ${selling} \nLast updated: ${updateTime}\nDisclaimer : All information is for reference only.`)
  })
}

module.exports = (channelName, msg, match) => {
  const inputCurrency = msg.split(' ').pop().toUpperCase()
  getExchange(bankCode, currency[inputCurrency], channelName)
}
