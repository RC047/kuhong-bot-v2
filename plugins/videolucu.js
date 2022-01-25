let fs = require('fs');

let handler = async(m, { conn, text, args }) => {

  await m.reply('Searching...\nMohon tunggu sekitar 1 menit.')
let caption = `
Nihh :v
`.trim()

 let bufferg = fs.readFileSync(`./src/lucu/${Math.floor(Math.random() * 47)}.mp4`)

     conn.sendFile(m.chat, bufferg, 'video.mp4', caption, m)
}
handler.help = ['videolucu', 'clipclaps']
handler.tags = ['video']
handler.command = /^(videolucu|clipclaps)$/i
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

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
