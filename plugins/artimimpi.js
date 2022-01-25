let axios = require("axios");
let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Silahkan masukan mimpi yang akan diartikan', m)

  await m.reply('Searching...')
	axios.get(`https://videfikri.com/api/primbon/artimimpi?mimpi=${text}`).then ((res) => {
	 	let hasil = `Arti Mimpimu Adalah\n\n${res.data.result.artimimpi}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['artimimpi'].map(v => v + ' <mimpi>')
handler.tags = ['primbon']
handler.command = /^(artimimpi)$/i
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