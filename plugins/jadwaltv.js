let axios = require("axios");
let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Harap Masukan Nama Channel', m)

  await m.reply('Searching...')
	axios.get(`https://api.zeks.xyz/api/jadwaltv?channel=${text}&apikey=vinzapi`).then ((res) => {
	 	let hasil = `${res.data.result}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['jadwaltv'].map(v => v + ' <channel>')
handler.tags = ['tools']
handler.command = /^(jadwaltv)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = false

module.exports = handler