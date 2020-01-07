require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const _ = require("lodash");
// stored messages that can be send by the bot
let data = require("./messages.json");
const consejos = data.mensajes;

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Set response for command start
bot.onText(/\/start/, msg => {
  bot.sendMessage(
    msg.chat.id,
    "Bienvenido, escribe acamica o agregame un grupo y respondere cuando hablen de mi"
  );
});

// Set response for command Acamica
bot.on("message", msg => {
  const consejo = _.sample(consejos);
  var chatId = msg.chat.id;
  var messageId = msg.message_id;
  var user = msg.from.first_name;
  // Set response if acamica is named
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes("acamica")
  ) {
    // send a recomendation
    bot.sendMessage(chatId, "<code>" + consejo + "</code> \u{1F60E}", {
      parse_mode: "HTML"
    });
  } else if (
    msg.text
      .toString()
      .toLowerCase()
      .endsWith("hola")
  ) {
    // reply to 'hi' message in silence
    bot.sendMessage(chatId, `<code>Buenas ${user} </code> \u{1F4BB}`, {
      parse_mode: "HTML",
      disable_notification: true,
      reply_to_message_id: messageId
    });
  }
});

// for debugging errors
bot.on("polling_error", err => console.log(err));
