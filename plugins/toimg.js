const { spawn } = require('child_process')
const util = require('util')
const { MessageType } = require('@adiwajshing/baileys')

let handler  = async (m, { conn }) => {
let caption = `Sticker Berhasil Dikonversi ke Gambar!`

  await m.reply('Sedang mengonversi...')
  if (!m.quoted) return conn.reply(m.chat, 'Tag Stickernya!', m)
  let q = { message: { [m.quoted.mtype]: m.quoted }}
  if (/sticker/.test(m.quoted.mtype)) {
    let sticker = await conn.downloadM(q)
    if (!sticker) throw sticker
    let bufs = []
    let im = spawn('convert', ['webp:-', 'png:-'])
    im.on('error',e =>  conn.reply(m.chat, util.format(e), m))
    im.stdout.on('data', chunk => bufs.push(chunk))
    im.stdin.write(sticker)
    im.stdin.end()
    im.on('exit', () => {
      conn.sendFile(m.chat, Buffer.concat(bufs), 'toimg.jpg', caption, m)
    })
  }
}
handler.help = ['toimg (reply)','toimage (reply)']
handler.tags = ['convert']
handler.command = /^to(img|image)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

