let axios = require("axios");

let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Masukan Teksnya', m)

        axios.get(`https://some-random-api.ml/base64?encode=${text}`).then ((res) => {
                let hasil = `Teks : ${text}\nBase64 : ${res.data.base64}`

    conn.reply(m.chat, hasil, m)
        })
}
handler.help = ['base64'].map(v => v + ' <teks>')
handler.tags = ['tools']
handler.command = /^(base64)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler
