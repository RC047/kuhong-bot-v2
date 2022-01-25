let fetch = require('node-fetch');
let ftype = require('file-type');
let { getBuffer, succes } = require('/data/data/com.termux/files/home/kuhong/lib/functions.js');

let handler = async(m, { conn, text }) => {
let str = `
Love is Blind!
`.trim()

    if (!text) return conn.reply(m.chat, 'Silahkan masukan nama pacar ehh,, teksnya', m)

  await m.reply('Sedang membuat...')

  let hasil = await (await fetch('https://videfikri.com/api/textmaker/burnpaper/?text=' + text)).buffer()

     conn.sendFile(m.chat, hasil, 'foto.jpg', str, m)
}
handler.help = ['burnpaper <teks>']
handler.tags = ['sticker']
handler.command = /^(burnpaper)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler
