let fetch = require('node-fetch');
let ftype = require('file-type');
let { getBuffer, succes } = require('/data/data/com.termux/files/home/kuhong/lib/functions.js');

let handler = async(m, { conn, text }) => {
let str = `
╭─「 PERATURAN BOT 」
│
│> PERINGATAN :
│• Telpon/VC
│
│> BANNED SEMENTARA :
│• SpamChat
│• SpamCall
│• Bacot/Hina gak jelas
│
│> BANNED + BLOK PERMANEN! :
│• Merusak nama baik Bot
│• Meniru/Menyalin teks² pesan yang ada pada Bot Tanpa Izin
│• Menyebarkan Kode Gift kepada orang lain
╰────

Note :
> Owner dapat sewaktu-waktu mengubah syarat ketentuan(rules) pada Bot ini,, demi menjaga kualitas Bot ini :)


End..
`.trim()

            let buff = ('https://i.ibb.co/P6Rn6fC/20210312-162834.png');
            let voss = await fetch(buff)
			let vuss = await ftype.fromStream(voss.body)
			if (vuss !== undefined) {

     conn.sendFile(m.chat, await getBuffer(buff), 'rules.jpg', str, m)
     }
}
handler.help = ['rules','snk']
handler.tags = ['info']
handler.command = /^(rules|snk)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 50

module.exports = handler