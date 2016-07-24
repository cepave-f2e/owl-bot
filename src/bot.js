const TOKEN = 'ENTER YOUR SLACK TOKEN'
const SlackBot = require('slackbots')

// create a bot
const bot = new SlackBot({
  token: TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
  name: 'cepave-ai-plus'
})

module.exports = bot
