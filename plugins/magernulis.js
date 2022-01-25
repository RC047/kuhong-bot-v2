let fetch = require('node-fetch');
let ftype = require('file-type');
let { getBuffer, succes } = require('/data/data/com.termux/files/home/kuhong/lib/functions.js');

let handler = async(m, { conn, text }) => {
let [nama, kelas, teks] = text.split `|`
let str = `
Bener2 Mager lu ya :v
`.trim()

    if (!nama) return conn.reply(m.chat, 'Silahkan masukan namanya', m)

  await m.reply('Sedang menulis...')

            let buff = ('https://api.zeks.xyz/api/magernulis?nama=' + nama + '&kelas=' + kelas + '&text=' + teks + '&tinta=4&apikey=apivinz');
            let voss = await fetch(buff)
			let vuss = await ftype.fromStream(voss.body)
			if (vuss !== undefined) {

     conn.sendFile(m.chat, await getBuffer(buff), 'nulis.jpg', str, m)
     }
}
handler.help = ['magernulis <nama|kls|teks>']
handler.tags = ['sticker']
handler.command = /^(magernulis)$/i
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
