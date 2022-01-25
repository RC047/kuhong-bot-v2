let axios = require("axios");
let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Lagunya?', m)

  await m.reply('Searching...')
	axios.get(`http://scrap.terhambar.com/lirik?word=${text}`).then ((res) => {
	 	let hasil = `Lirik lagu *${text}*\n\n${res.data.result.lirik}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['lirik'].map(v => v + ' <lagu>')
handler.tags = ['music']
handler.command = /^(lirik)$/i
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