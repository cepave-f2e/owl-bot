const Botkit = require('botkit')
const { CEPAVE_SLACK_OWL_BOT_TOKEN, CEPAVE_SLACK_OWL_BOT_WEBHOOK } = process.env

const controller = Botkit.slackbot({
})

const bot = controller.spawn({
  token: CEPAVE_SLACK_OWL_BOT_TOKEN,
  incoming_webhook: {
    url: `https://hooks.slack.com/services/${CEPAVE_SLACK_OWL_BOT_WEBHOOK}`
  }
})

module.exports = { controller, bot }
