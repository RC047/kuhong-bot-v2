let axios = require("axios");
let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Harap masukan query', m)

    await m.reply('Searching...')
	axios.get(`https://videfikri.com/api/religi/kisahnabi/?nabi=${text}`).then ((res) => {
	 	let hasil = `Kisah Nabi *${text}*\n\n${res.data.result.description}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['kisahnabi'].map(v => v + ' <query>')
handler.tags = ['belajar']
handler.command = /^(kisahnabi)$/i
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