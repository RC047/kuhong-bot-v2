const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')

let handler  = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  try {
    await m.reply('Sedang membuat...')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image|video/.test(mime)) {
      let img = await q.download()
      if (!img) throw 'Kirim perintah ${usedPrefix + command} dengan caption/reply media gambar/video yang tersedia'
      stiker = await sticker(img, false, 'Sticker Creator', 'Kuhong Bot')
    } else if (args[0]) stiker = await sticker(false, args[0], 'Sticker Creator', 'Kuhong Bot')
  } catch (e) {
 m.reply('Gagal!\n\nPastikan Kirimkan Media Gambar/Videonya!')
  } finally {
    await m.reply('Nihh Stickernya')
    if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  }
}
handler.help = ['sticker','stickergif','sgif']
handler.tags = ['sticker']
handler.command = /^(stic?ker|stic?kergif|sgif)$/i

handler.limit = false

module.exports = handler
