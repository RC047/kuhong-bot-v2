const { sticker } = require('../lib/sticker.js')
const imageToBase64 = require('image-to-base64')
const fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {

 await m.reply('Sedang membuat...')

 if (text) {
  let img = await imageToBase64(`https://api.xteam.xyz/attp?file&text=${text}`)
  let buffer = Buffer.from(img, 'base64')
  let hasil = await sticker(buffer, false, 'ATTP', 'Kuhong Bot')

 conn.sendFile(m.chat, hasil, 'attp.webp', '', m, false, { asSticker: true })
  } else throw 'Uhm...Teksnya?'
}
handler.help = ['attp <teks>']
handler.tags = ['sticker']
handler.command = /^attp$/i
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
