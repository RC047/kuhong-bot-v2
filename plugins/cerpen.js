let axios = require("axios");

let handler = async(m, { conn, text }) => {

    await m.reply('Searching...')
	axios.get(`http://zekais-api.herokuapp.com/cerpen`).then ((res) => {
	 	let hasil = `*${res.data.title}*\n\nPengarang : ${res.data.pengarang}\nKategori : ${res.data.category}\n\n${res.data.post}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['cerpen']
handler.tags = ['quotes']
handler.command = /^(cerpen)$/i
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
