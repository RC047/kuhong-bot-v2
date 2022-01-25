let { MessageType } = require('@adiwajshing/baileys');
let imageToBase64 = require('image-to-base64');
let axios = require("axios");
let limit = 60

let handler = async(m, { conn, text, isPrems, isOwner }) => {

  await m.reply('Searching...')
  if (!text) throw 'Mau cari lagu apa?'
    axios.get(`https://api.xteam.xyz/dl/jooxdl?lagu=${text}&APIKEY=7cac32071f2eb2ff`)
    .then((res) => {
      imageToBase64(res.data.result.album_url)
        .then((ress) => {
        let thumb = Buffer.from(ress, 'base64')
        let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < res.data.result.download_url

  conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
*Title:* ${res.data.result.album}
*Filesize:* ${res.data.result.filesize}
*Duration:* ${res.data.result.duration}
*Singers:* ${res.data.result.singers}
*Source:* https://www.joox.com/id
*${isLimit ? 'Pakai ': ''}Link:* ${res.data.result.download_url}

Lagu Video ${isLimit ? 'tidak akan dikirim,, karna ukuran file terlalu besar anda bisa download via Link': 'sedang dikirim,, harap tunggu sekitar 1 menit.'}
`.trim(), m)

  if (!isLimit) conn.sendFile(m.chat, res.data.result.download_url, 'joox.mp3', 'Nihh', m)
       })
    }).catch(() => {
   m.reply('Lagu tidak ditemukan!')
 })
}
handler.help = ['joox','joox2','playjoox'].map(v => v + ' <lagu>')
handler.tags = ['music']
handler.command = /^(joox|joox2|playjoox)$/i
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
