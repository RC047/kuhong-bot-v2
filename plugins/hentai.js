let { getBuffer } = require('../lib/functions')

let handler = async(m, { conn, text }) => {

  await m.reply('Searching...')
let str = `
TOBAT BODO
`.trim()

   let buf = await getBuffer('http://lolhuman.herokuapp.com/api/random/nsfw/hentai?apikey=lolapikey')

     conn.sendFile(m.chat, buf, 'foto.jpg', str, m)
}
handler.help = ['hentai']
handler.tags = ['dewasa']
handler.command = /^(hentai)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.off = true
handler.private = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = 10

module.exports = handler
