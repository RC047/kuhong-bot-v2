let imageToBase64 = require('image-to-base64');
let axios = require("axios");

let handler = async(m, { conn, text }) => {
let [l, r, b] = text.split `|`
let str = `
Nihh Quotesmu dah jadi,,

Semoga suka yaa.
`.trim()

    if (!l) return conn.reply(m.chat, 'Silahkan masukan teks quotesnya', m)
    if (!r) return conn.reply(m.chat, 'Silahkan masukan nama authornya', m)
    if (!l) return conn.reply(m.chat, 'Silahkan masukan temanya\n\nMisal : random', m)

    await m.reply('Sedang membuat...')
    axios.get('https://terhambar.com/aw/qts/?kata=' + l + '&author=' + r + '&tipe=' + b)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            let buf = Buffer.from(ress, 'base64')

     conn.sendFile(m.chat, buf, 'foto.jpg', str, m)
        })
    })
}
handler.help = ['quotemaker <teks|wm|bg>']
handler.tags = ['sticker']
handler.command = /^(quotemaker)$/i
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
