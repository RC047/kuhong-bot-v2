let { MessageType, Presence, mimetype } = require('@adiwajshing/baileys')
let ffmpeg = require('fluent-ffmpeg');
let fetch = require('node-fetch');
let ftype = require('file-type');
let fs = require('fs');
let { exec } = require('child_process');

let handler = async(m, { conn, text, args }) => {

 try {
     await m.reply('Sedang mengonversi...')
          conn.updatePresence(m.chat, Presence.recording)
          let type = Object.keys(m.message)[0]
          let content = JSON.stringify(m.message)
          let isMedia = (type === 'imageMessage' || type === 'videoMessage')
          let isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
          let isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
                  if ((isMedia && m.message.videoMessage || isQuotedVideo || !isQuotedVideo) && args.length == 0) {
		  let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(m).replace('quotedM','m')).message.extendedTextMessage.contextInfo : m
		      let media = await conn.downloadAndSaveMediaMessage(encmedia)
			       let ran = getRandom('.mp4')
                               let ranw = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran} ${ranw}`, (err) => {
					fs.unlinkSync(ran)
					if (err) return m.reply('Gagal, pada saat mengkonversi video ke mp3')
					let hasil = fs.readFileSync(ranw)
                                      m.reply('Nihh')
					conn.sendFile(m.chat, hasil, MessageType.audio, m)
					fs.unlinkSync(ranw)
                                   })
                       }
   } catch (e) {
 m.reply('Tag Videonya!')
 }
}
handler.help = ['tomp3 (reply)']
handler.tags = ['convert']
handler.command = /^(tomp3)$/i
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

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`
}
