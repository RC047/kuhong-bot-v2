let imageToBase64 = require('image-to-base64');
let axios = require("axios");
let handler = async(m, { conn, text }) => {
  await m.reply('Searching...')
let str = `
Lampu mana lampu??
`.trim()

    axios.get('https://api.zeks.xyz/api/darkjokes?apikey=apivinz')
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            let buf = Buffer.from(ress, 'base64')

     conn.sendFile(m.chat, buf, 'foto.jpg', str, m)
        })
    })
}
handler.help = ['darkjokes']
handler.tags = ['image']
handler.command = /^(darkjokes)$/i
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
