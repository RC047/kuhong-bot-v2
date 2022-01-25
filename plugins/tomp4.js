let imgbb = require('imgbb-uploader')
let cheerio = require('cheerio')
let FormData = require('form-data')
let { getBuffer } = require('../lib/functions')
let axios = require('axios')
let fs = require('fs')

let handler = async (m, { conn, text, args }) => {
let caption = `StickerGif Berhasil Dikonversi ke Video!`

await m.reply('Sedang mengonversi...')
  if (!m.quoted) return conn.reply(m.chat, 'Tag StickerGifnya!', m)
  let type = Object.keys(m.message)[0]
  let content = JSON.stringify(m.message)
  let isMedia = (type === 'imageMessage' || type === 'videoMessage')
  let isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
  let isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
  let isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
  let isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
     if (!isQuotedSticker) return conn.reply(m.chat, 'Tag StickerGifnya!', m)
     if ((isMedia && !m.message.videoMessage || isQuotedSticker) && args.length == 0) {
     let ger = isQuotedSticker ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
     let owgi = await conn.downloadAndSaveMediaMessage(ger)
     let data = await imgbb("acf1ad5f22ad5822dc163cce74aedfd4", owgi)
        axios.get(`https://ezgif.com/webp-to-mp4?url=${data.display_url}`).then(({ data }) => {
           let $ = cheerio.load(data)
           let bodyFormThen = new FormData()
           let file = $('input[name="file"]').attr('value')
           let token = $('input[name="token"]').attr('value')
           let convert = $('input[name="file"]').attr('value')
           let gotdata = {
                         file: file,
                         token: token,
                         convert: convert
                         }
                         bodyFormThen.append('file', gotdata.file)
                         bodyFormThen.append('token', gotdata.token)
                         bodyFormThen.append('convert', gotdata.convert)
                         axios({
                         method: 'post',
                         url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                         data: bodyFormThen,
                         headers: {
                         'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                         }}).then(({ data }) => {
                         let $ = cheerio.load(data)
                         let result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                            getBuffer(result).then(tog => {

    conn.sendFile(m.chat, tog, 'video.mp4', caption, m)
                     })
                })
           })
 } else {
  m.reply('Tag StikerGifnya')
   }
}
handler.help = ['tomp4 (reply)']
handler.tags = ['convert']
handler.command = /^(tomp4)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler
