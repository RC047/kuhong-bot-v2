let axios = require("axios");
let handler = async(m, { conn, text }) => {

	axios.get(`https://leyscoders-api.herokuapp.com/api/skak?apikey=demo`).then ((res) => {
	 	let hasil = `${res.data.result}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['sindiran']
handler.tags = ['quotes']
handler.command = /^(sindiran)$/i
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
