let handler = m => m.reply('Wa`alaikumussalam')

handler.customPrefix = /assalamualaikum|Assalamualaikum|Salam|salam/i
handler.command = new RegExp

handler.register = true

module.exports = handler
