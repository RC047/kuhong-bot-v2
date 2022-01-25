let axios = require("axios");
let handler = async(m, { conn, text }) => {

 try {
    if (!text) return conn.reply(m.chat, 'Silahkan masukan Nomor Telpon untuk di SpamCall!\n\nMisal : !spamcall 895337278647', m)
    if (text.startsWith('+')) return m.reply('[!] Tolong masukan Nomor dengan awalan 8')
    if (text.startsWith('62')) return m.reply('[!] Tolong masukan Nomor dengan awalan 8')

	axios.get(`https://mhankbarbar.herokuapp.com/api/spamcall?no=${text}`).then((res) => {
	let hasil = `${res.data.logs}`

 conn.reply(m.chat, hasil, m)

   })
 } catch (e) {
  conn.reply(m.chat, 'Ada yang Erorr!', m)
   }
}
handler.help = ['spamcall'].map(v => v + ' <no hp>')
handler.tags = ['spam']
handler.command = /^(spamcall)$/i
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
