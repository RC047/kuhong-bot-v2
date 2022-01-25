let fs = require('fs')

let handler = async(m, { conn, text }) => {

try {
let caption = `Nihh Intromu Dah Jadi..`
  if (!text) return conn.reply(m.chat, 'Teksnya Mana?', m)
  await m.reply('Sedang membuat...\nMohon tunggu sekitar 1 menit.')
  if (text) {
     let intro = await fs.readFileSync(`./src/intro/${text.toLowerCase()}.webm`)
    conn.sendFile(m.chat, intro, 'intro.mp4', caption, m)
   }
} catch (e) {
   m.reply(`Ada yang Erorr!\n\nNama *${text}* sepertinya tidak tersedia,, Pastikan Namamu tidak menggunakan simbol aneh/angka`)
  }
}
handler.help = ['intro <teks>']
handler.tags = ['sticker']
handler.command = /^(intro)$/i
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
