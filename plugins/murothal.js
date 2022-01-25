let { MessageType } = require('@adiwajshing/baileys');
let imageToBase64 = require('image-to-base64');
let axios = require("axios");

let handler = async(m, { conn, text }) => {

    await m.reply('Searching...')
  axios.get(`https://api.zeks.xyz/api/randomquran?apikey=apivinz`).then((res) => {
   imageToBase64(res.data.result.audio)
    .then((ress) => {
     let audio = Buffer.from(ress, 'base64')

    conn.sendFile(m.chat, audio, 'murothal.mp3', '', m, false, { ptt: true })
	})
   })
}
handler.help = ['murothal']
handler.tags = ['quotes']
handler.command = /^(murothal)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 100
handler.limit = false

module.exports = handler
