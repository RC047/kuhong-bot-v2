let handler = async(m, { conn, args, usedPrefix }) => {

    if (args.length == 0) return conn.reply(m.chat, `Harap masukan Kode Giftmu!`, m)
    if (args[0] == 'RendyGans047' || args[0] == 'YXdvYWtha2FrYWtha2FrYSBrb2RlZ2lmdA' || args[0] == 'a29kZSBnaWZ0IGt1aG9uZyBib3Q' || args[0] == 'giftmecode01183728') {

       conn.reply(m.chat, '*SELAMAT!*\n\nKamu telah mendapatkan\n50000 XP & 100 Limit!', m)
    global.DATABASE._data.users[m.sender].exp += 50000
    global.DATABASE._data.users[m.sender].limit += 100
   } else {
        conn.reply(m.chat, `*「 KODE TIDAK VALID 」*\n\nSilahkan beli kodenya melalui ${usedPrefix}buygift\n\nKode Gift ini hanya dapat digunakan dengan kodegift premium,, gunakan !freegift untuk kodegift gratis!`, m)
    }
}
handler.help = ['gift <kode>']
handler.tags = ['hadiah']
handler.command = /^(gift)$/i

module.exports = handler
