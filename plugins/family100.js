let fetch = require('node-fetch')
let timeout = 60000
let poin = 10000

let handler  = async (m, { conn, usedPrefix }) => {
    conn.family100 = conn.family100 ? conn.family100 : {}
    let id = m.chat
    if (id in conn.family100) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.family100[id][0])
        throw false
    }
    let res = await fetch('https://leyscoders-api.herokuapp.com/api/family100?apikey=TJBLJOVB')
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    if (!json.status) throw json
    conn.family100[id] = [
      await conn.reply(m.chat, `「 FAMILY 100 」\n\nPertanyaan :\n` + json.result.soal + `\n\nWaktu : ${(timeout / 1000).toFixed(2)} Detik\nBonus : ${poin} XP`, m),
      json, poin,
      setTimeout(() => {
        if (conn.family100[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.result.jawaban}*`, conn.family100[id][0])
        delete conn.family100[id]
      }, timeout)
    ]
  }
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^(family100)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler
