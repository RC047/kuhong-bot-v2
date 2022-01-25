let handler = async (m, { text, usedPrefix }) => {

    let info = `Pilihan yang tersedia :\n\ngunting, kertas, batu\n\nContoh :\n${usedPrefix}suit gunting`
    if (!text) throw info
    var bot = Math.random()

    if (bot < 0.34) {
        bot = 'batu'
    } else if (bot > 0.34 && bot < 0.67) {
        bot = 'gunting'
    } else {
        bot = 'kertas'
    }

    if (text == bot) {
        m.reply(`*「 SUIT 」*\n\nSeri!\nKamu : ${text}\nBot : ${bot}`)
    } else if (text == 'batu') {
        if (bot == 'gunting') {
            global.DATABASE._data.users[m.sender].exp += 1000
            m.reply(`*「 SUIT 」*\n\nKamu Menang!\n\nKamu: ${text}\nBot: ${bot}\n\n*+1000 XP!*`)
        } else {
            m.reply(`*「 SUIT 」*\n\nKamu Kalah!\n\nKamu : ${text}\nBot : ${bot}\n\n`)
        }
    } else if (text == 'gunting') {
        if (bot == 'kertas') {
            global.DATABASE._data.users[m.sender].exp += 1000
            m.reply(`*「 SUIT 」*\n\nKamu Menang!\n\nKamu : ${text}\nBot : ${bot}\n\n*+1000 XP!*`)
        } else {
            m.reply(`*「 SUIT 」*\n\nKamu Kalah!\n\nKamu : ${text}\nBot : ${bot}`)
        }
    } else if (text == 'kertas') {
        if (bot == 'batu') {
            global.DATABASE._data.users[m.sender].exp += 1000
            m.reply(`*「 SUIT 」*\n\nKamu Menang!\n\nKamu: ${text}\nBot: ${bot}\n\n*+1000 XP!*`)
        } else {
            m.reply(`*「 SUIT 」*\n\nKamu Kalah!\n\nKamu: ${text}\nBot: ${bot}`)
        }
    } else {
        throw info
    }
}
handler.help = ['suit']
handler.tags = ['game']
handler.command = /^(suit)$/i

module.exports = handler
