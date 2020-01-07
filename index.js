require('dotenv').config()
const TelegramBot = require("node-telegram-bot-api");
const _ = require('lodash');
// stored messages that can be send by the bot
let data = require('./messages.json');
const consejos = data.mensajes;

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Set response for command start
bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id, "Bienvenido, escribe acamica o agregame un grupo y respondere cuando hablen de mi");
});

// Set response for command Acamica
bot.on("message", msg => {
  const consejo = _.sample(consejos);
  // Set response if acamica is named
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes("acamica")
  ) {
    // send a recomendation
    bot.sendMessage(msg.chat.id, "<code>" + consejo + "</code> \u{1F60E}", {parse_mode : "HTML"});
  } else if (
    msg.text
      .toString()
      .toLowerCase().endsWith('hola')
  ) {
    // reply to 'hi' message in silence
    bot.sendMessage(msg.chat.id, `<code>Buenas ${msg.chat.first_name} </code> \u{1F4BB}`, {parse_mode : "HTML", disable_notification: true , reply_to_message_id: msg.id});
  }
});

// for debugging errors
bot.on("polling_error", (err) => console.log(err));
