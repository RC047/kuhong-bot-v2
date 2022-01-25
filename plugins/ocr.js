let { MessageType } = require('@adiwajshing/baileys')
let { recognize } = require('../lib/ocr')
let fs = require('fs')

let handler = async(m, { conn, text, args, usedPrefix }) => {

  await m.reply('Sedang membaca...')
    let type = Object.keys(m.message)[0]
    let content = JSON.stringify(m.message)
    let isMedia = (type === 'imageMessage' || type === 'videoMessage')
    let isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    let isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
    if ((isMedia && !m.message.videoMessage || !isQuotedImage || isQuotedImage) && args.length == 0) {
     let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM','m')).message.extendedTextMessage.contextInfo : m
     let media = await conn.downloadAndSaveMediaMessage(encmedia)
	await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
	.then(teks => {
	conn.reply(m.chat, 'Hasil Pembacaan OCR :\n\n' + teks.trim(), m)
	fs.unlinkSync(media)
	    })
		.catch(err => {
		m.reply('Ada yang Erorr!\n\nPastikan Fotonya berisi teks')
		fs.unlinkSync(media)
	})
   }
}
handler.help = ['ocr']
handler.tags = ['tools']
handler.command = /^(ocr)$/i
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
