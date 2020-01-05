const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on("message", msg => {
  const chatId = msg.chat.id;
  const consejo = "hola";
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes("acamica")
  ) {
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, "<code>" + consejo + "</code>");
  } else {
    bot.sendMessage(chatId, "Solo puedo responder si dices la palabra mágica: acamica");
  }
});
