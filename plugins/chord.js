let axios = require("axios");
let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Lagunya?', m)

  await m.reply('Searching...')
	axios.get(`https://st4rz.herokuapp.com/api/chord?q=${text}`).then ((res) => {
	 	let hasil = `Chord lagu *${text}*\n\n${res.data.result}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['chord'].map(v => v + ' <lagu>')
handler.tags = ['music']
handler.command = /^(chord)$/i
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