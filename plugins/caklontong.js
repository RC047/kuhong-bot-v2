let fetch = require('node-fetch')
let timeout = 60000
let poin = 10000

let handler  = async (m, { conn, usedPrefix }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.caklontong[id][0])
        throw false
    }
    let res = await fetch('http://zekais-api.herokuapp.com/caklontong')
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    if (!json.status) throw json
    conn.caklontong[id] = [
      await conn.reply(m.chat, `「 CAK LONTONG 」\n\nPertanyaan :\n` + json.soal + `\n\nWaktu : ${(timeout / 1000).toFixed(2)} Detik\nBonus : ${poin} XP`, m),
      json, poin,
      setTimeout(() => {
        if (conn.caklontong[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.caklontong[id][0])
        delete conn.caklontong[id]
      }, timeout)
    ]
  }
handler.help = ['caklontong']
handler.tags = ['game']
handler.command = /^(caklontong)/i

module.exports = handler
