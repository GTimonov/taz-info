const tokens = require('../tokens');
const TelegramBot = require('node-telegram-bot-api');
const token = tokens.LI_TOKEN;

var chatId;
var bot;

exports.startBot = function (){
    bot = new TelegramBot(token, {polling: true});

    bot.onText(/\/start/, setChatId);

    function setChatId(msg){
        this.chatId = msg.chat.id;
    }
}

exports.sendMessage = function (m){
    if (this.chatId === undefined)
        return;
    bot.sendMessage(this.chatId, m);
}

