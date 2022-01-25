let { getBuffer } = require('../lib/functions')

let handler  = async (m, { conn, text }) => {

  if (!text) throw 'Teksnya Mana?'

  await m.reply('Sedang membuat...')
   let hasil = await getBuffer(`https://api.zeks.xyz/api/hartatahta?text=${text}&apikey=apivinz`)

   conn.sendFile(m.chat, hasil, 'tahta2.png', `Harta Tahta ${text}`, m)
}
handler.help = ['tahta2'].map(v => v + '<teks>')
handler.tags = ['sticker']
handler.command = /^((harta)?tahta2)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler
