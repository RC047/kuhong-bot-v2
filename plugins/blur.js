let { getBuffer, succes } = require('/data/data/com.termux/files/home/kuhong/lib/functions.js')
let imgbb = require('imgbb-uploader')
let { MessageType, Presence, MimeType } = require('@adiwajshing/baileys')
let ffmpeg = require('fluent-ffmpeg')
let fetch = require('node-fetch')
let ftype = require('file-type')
let fs = require('fs')
let { exec } = require('child_process')

let handler = async(m, { conn, text, args, usedPrefix }) => {
let caption = `
Kok Burem yaa?
`.trim()

 try {
  await m.reply('Sedang membuat...')
    let type = Object.keys(m.message)[0]
    let content = JSON.stringify(m.message)
    let isMedia = (type === 'imageMessage' || type === 'videoMessage')
    let isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    let isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
    if ((isMedia && !m.message.videoMessage || !isQuotedImage || isQuotedImage) && args.length == 0) {
    let ger = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM','m')).message.extendedTextMessage.contextInfo : m
        let owgi = await conn.downloadAndSaveMediaMessage(ger)
        let anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
        let teks = `${anu.display_url}`
        let buff = `https://leyscoders-api.herokuapp.com/api/img/blur?url=${teks}&level=5&apikey=demo`
          let voss = await fetch(buff)
          let vuss = await ftype.fromStream(voss.body)
          if (vuss !== undefined) {

         conn.sendFile(m.chat, await getBuffer(buff), 'blur.jpg', caption,  m)

     }  } else {
    m.reply(`Kirim perintah ${usedPrefix}blur dengan caption digambar atau reply gambar yang tersedia`)
     }
 } catch (e) {
  m.reply('Fotonya Mana?')
 }
}
handler.help = ['blur']
handler.tags = ['editor']
handler.command = /^(blur)$/i
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
