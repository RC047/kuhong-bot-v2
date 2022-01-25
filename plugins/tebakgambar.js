let fetch = require('node-fetch')
let timeout = 60000
let poin = 10000

let handler  = async (m, { conn, usedPrefix }) => {

 conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
 let id = m.chat
 if (id in conn.tebakgambar) {
   conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0])
     throw false
 }
    let res = await fetch(global.API('xteam', '/game/tebakgambar', {}, 'APIKEY'))
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    if (!json.status) throw json
    let caption = `「 TEBAK GAMBAR 」\n\nWaktu : ${(timeout / 1000).toFixed(2)} Detik\nBonus : ${poin} XP\n\nKetik ${usedPrefix}hint jika butuh bantuan jawaban`
    conn.tebakgambar[id] = [
      await conn.sendFile(m.chat, json.url, 'tebakgambar.jpg', caption, m),
      json, poin,
      setTimeout(() => {
        if (conn.tebakgambar[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakgambar[id][0])
        delete conn.tebakgambar[id]
      }, timeout)
   ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar$/i

module.exports = handler
