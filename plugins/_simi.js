let fetch = require('node-fetch')

let handler = m => m

handler.before = async (m) => {
    let chat = db.data.chats[m.chat]
    if (chat.simi && !chat.isBanned) {
        if (/^.*false|disable|(turn)?off|0/i.test(m.text)) return
        if (!m.text) return
        let res = await fetch(API('xteam', '/simsimi', { kata: encodeURIComponent(m.text) }, 'APIKEY'))
        if (!res.ok) return false
        let json = await res.json()
        if (!json.status) return m.reply(require('util').format(json))
        this.reply(m.chat, json.jawaban, m)
        return !0
    }
    return !0
}

module.exports = handler