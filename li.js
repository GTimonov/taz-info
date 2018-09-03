const os = require("os");
const dbWorker = require('./utils/dbWorker');
const jsonUtil = require('./utils/jsonUtil');
const stringUtil = require('./utils/stringUtils');
const messages = require('./utils/messages');
const pool = require('./utils/pool');
const tokens = require('./tokens');

const years = ['2018', '2017', '2016', '2015', '2014', '2013'];
const TelegramBot = require('node-telegram-bot-api');
const token = tokens.LI_TOKEN;
const bot = new TelegramBot(token, {polling: true});

pool.startPool();

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, messages.MESSAGE.WELCOME, {parse_mode:'HTML'});
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const from = msg.from.id;
    console.log(msg)

    if (msg.isBot)
        return;
    if (msg.text === undefined || msg.text === "/start")
        return;
    if (pool.userIndex(from) !== -1)
    {
        bot.sendMessage(chatId, messages.MESSAGE.WAIT);
        return;
    }
    else{
        pool.addUser(from);
    }

    let text = msg.text;
    const check = stringUtil.checkString(text);
    if (!check){
        bot.sendMessage(chatId, messages.MESSAGE.NOT_VALID);
        pool.removeUser(from);
        return;
    }

    text = stringUtil.validateString(msg.text);
        
    dbWorker.getInfoInMany(text, years,  (res)=>{
        if (res.length === 0){
            bot.sendMessage(chatId, messages.MESSAGE.NOT_FINDED);
            pool.removeUser(from);
            return;
        }
        
        res.forEach(element => {
                bot.sendMessage(chatId, jsonUtil.jsonToTelega(element), 
                {parse_mode:'HTML'});
                pool.removeUser(from);
        });
        
    });   
    
});