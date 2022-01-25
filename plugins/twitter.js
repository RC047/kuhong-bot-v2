let axios = require('axios')

let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, 'Uhm... urlnya mana?', m)
    conn.reply(m.chat, 'Searching...', m)
        axios.get(`http://zekais-api.herokuapp.com/twtdl?url=` + text)
            .then((res) => {
                let dl_link = `${res.data.url}`
                conn.sendFile(m.chat, dl_link, 'video.mp4', `Nih :3\n\n*Link:* ${dl_link}`, m)

            })
}
handler.help = ['twitter <link>','twt <link>']
handler.tags = ['downloader']
handler.command = /^(twitter|twt)$/i
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
