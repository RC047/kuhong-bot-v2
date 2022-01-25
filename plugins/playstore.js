let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'Harap Masukan Query', m)

  await m.reply('Searching...')
    let res = await fetch(`http://zekais-api.herokuapp.com/playstore?query=${text}`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = await (await fetch(json.logo)).buffer()
    let hasil = `*PLAY STORE*\n\nTitle: ${json.title}\nDeveloper: ${json.developer.name}\nSize: ${json.size}\nRating: ${json.star}\nRate For : ${json.contentRating}\nViewers: ${json.total_review}\nUpdated: ${json.updated}\nDownloads: ${json.installs}\nCompatible: ${json.requires}\nVersion: ${json.currentVersion}\nUrl: ${json.url}\nDesk: ${json.whats_new}`

    conn.sendFile(m.chat, thumb, 'playstore.jpg', hasil, m)
}
handler.help = ['playstore'].map(v => v + ' <query>')
handler.tags = ['search']
handler.command = /^(playstore)$/i
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
