let limit = 60
let fetch = require('node-fetch')
let yts = require('yt-search')
let { servers, yta, ytv } = require('../lib/y2mate')

let handler = async (m, { conn, command, text, isPrems, isOwner }) => {

  await m.reply('Searching...')
  if (!text) throw 'Harap masukan query!'
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 7200)
  if (!vid) throw `Hasil Pencarian ${text} tidak ditemukan!`
  let { dl_link, thumb, title, filesize, filesizeF} = await (/2$/.test(command) ? ytv : yta)(vid.url, 'id4')
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  let shorted = await (await fetch('http://zekais-api.herokuapp.com/tinyurl?url=' + dl_link)).json()
  conn.sendFile(m.chat, thumb, 'thumbnail.jpg', `
*Title:* ${title}
*Size:* ${filesizeF}
*Source:* ${vid.url}
*Download:* ${shorted.url}
`.trim(), m)
}
handler.help = ['ytsearch'].map(v => v + ' <query>')
handler.tags = ['search']
handler.command = /^yt(s|search)$/i

handler.exp = 0
handler.limit = true

module.exports = handler
