let qrcode = require("qrcode")

let handler  = async (m, { conn, text }) => {

   if (!text) throw 'Teksnya Mana?'

   await m.reply('Sedang membuat...')
  conn.sendFile(m.chat, await qrcode.toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', 'Coba Scan,, dan lihat apa yang terjadi', m)
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <teks>')
handler.tags = ['sticker']
handler.command = /^qr(code)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

