const translate = require('translate-google-api')

// By Arfiffb225
let handler = async (m, { conn, text, usedPrefix }) => {
let [to, trans] = text.split`|`

 await m.reply('Searching...')
    if (!to) return conn.reply(m.chat, `Silahkan masukan parameter bahasa\nContoh:\n\n${usedPrefix}translate id|thankyou`, m)
    if (!trans) return conn.reply(m.chat, `Silahkan masukan parameter text\nContoh:\n\n${usedPrefix}translate id|thankyou`, m)

    try {
        const result = await translate(`${trans}`, {
            tld: "cn",
            to: `${to}`,
        })
        conn.reply(m.chat, `Teks :\n${trans}\n\nTerjemahan :\n` + result[0], m)
    } catch (e) {
        m.reply('Ada yang Error!\n\nPastikan Gunakan teks biasa')
    }

}
handler.help = ['translate', 'tr'].map(v => v + ' <lang|teks>')
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler
