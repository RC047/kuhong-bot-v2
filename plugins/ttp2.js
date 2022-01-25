const fetch = require('node-fetch')
const { sticker } = require('../lib/sticker.js')
const { MessageType } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, text }) => {

 try {
  if (!text) throw 'Uhm... Teksnya?'
  if (text) {
   await m.reply('Sedang membuat...')
    let img = await (await fetch('http://lolhuman.herokuapp.com/api/ttp?apikey=lolapikey&text=' + encodeURIComponent(text))).buffer()
    if (!img) throw img
    let stiker = await sticker(img, false, 'TTP', 'Kuhong Bot')
    conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  }
 } catch (e) {
   m.reply('Ada yang Erorr!')
  }
}
handler.help = ['ttp2 <teks>']
handler.tags = ['sticker']
handler.command = /^ttp2$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
