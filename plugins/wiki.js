let axios = require("axios");
let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Harap masukan query', m)

  await m.reply('Searching...')
	axios.get(`https://alfians-api.herokuapp.com/api/wiki?q=${text}`).then ((res) => {
	 	let hasil = `Menurut Wikipedia :\n\n${res.data.result}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['wiki'].map(v => v + ' <query>')
handler.tags = ['tools']
handler.command = /^(wiki)$/i
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
