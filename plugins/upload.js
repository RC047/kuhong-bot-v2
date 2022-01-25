const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')
const util = require('util')

let handler = async (m, { conn }) => {

  await m.reply('Sedang mengupload...')
      let q = m.quoted ? m.quoted : m
      let file = await q.download()
      if (!file) throw 'Foto/Video tidak ditemukan!'
      try {
      url = await uploadImage(file)

  conn.reply(m.chat, 'Nihh Link Filenya :\n' + url, m)
} catch (e) {
 m.reply(util.format(e))
   }
}
handler.help = ['upload (caption|reply)']
handler.tags = ['tools']
handler.command = /^(upload)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler
