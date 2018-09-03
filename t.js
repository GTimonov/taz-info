const os = require("os");
const dbWorker = require('./utils/dbWorker');
const jsonUtil = require('./utils/jsonUtil');
const stringUtil = require('./utils/stringUtils');
const messages = require('./utils/messages');
const pool = require('./utils/pool');
const tokens = require('./tokens');
const TelegramBot = require('node-telegram-bot-api');
//const BotHepler = require('./botHelper/BotHelper');
const years = ['2018', '2017', '2016', '2015', '2014', '2013'];

const token = tokens.TAZS_TOKEN;
const bot = new TelegramBot(token, {polling: true});

let db;
//BotHepler.startBot();
pool.startPool();

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, messages.MESSAGE.WELCOME, {parse_mode:'HTML'});
});

let timerID;
let adminEnabled = false;
bot.onText(/\/admin/, enableAdmin.bind(this));
bot.onText(/\/noadmin/, disableAdmin.bind(this));
bot.onText(/\/reset/, onReset.bind(this));

function onReset(msg){
    if (msg.from.id !== 328082572)
        return;
    this.requestsCount = 0;
}

function enableAdmin(msg) {
    if (msg.from.id !== 328082572 || adminEnabled)
        return;
    adminEnabled = true;
    if(this.requestsCount == undefined)
        this.requestsCount = 0;
    this.timerID = setInterval(update.bind(this), 300000);
    function update() {
        const message = "Pool Length: " + pool.poolLength() + '\n' + 'Requests all: ' + this.requestsCount;
        bot.sendMessage(msg.chat.id, message, {parse_mode:'HTML'});
    }
}



function disableAdmin(msg){
    if (msg.from.id !== 328082572)
        return;
    adminEnabled = false;
    if (this.timerID !== undefined)
        clearInterval(timerID);
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const from = msg.from.id;
    console.log(msg)
    //BotHepler.sendMessage(msg);

    if (msg.isBot)
        return;
    if (msg.text === undefined || msg.text === "/start" || msg.text === "/admin"|| msg.text === "/reset" || msg.text === "/noadmin")
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
    this.requestsCount++;

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