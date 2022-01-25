let fetch = require('node-fetch');
let ftype = require('file-type');
let { getBuffer, succes } = require('/data/data/com.termux/files/home/kuhong/lib/functions.js');

let handler = async(m, { conn, text }) => {
let str = `
Saya Mencium Bau Kpopers
`.trim()

    if (!text) return conn.reply(m.chat, 'Silahkan masukan teksnya', m)

  await m.reply('Sedang membuat...')

  let hasil = await (await fetch('https://api.zeks.xyz/api/logobp?text=' + text + '&apikey=vinzapi')).buffer()

     conn.sendFile(m.chat, hasil, 'foto.jpg', str, m)
}
handler.help = ['bplogo <teks>']
handler.tags = ['sticker']
handler.command = /^(bplogo)$/i
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
