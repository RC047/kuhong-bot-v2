let fetch = require('node-fetch');
let ftype = require('file-type');
let { getBuffer, succes } = require('/data/data/com.termux/files/home/kuhong/lib/functions.js');

let handler = async(m, { conn, text }) => {
let [t1, t2] = text.split `|`
let str = `
Nihh Cuyy
`.trim()

    if (!t1) return conn.reply(m.chat, 'Silahkan masukan parameter text1', m)
    if (!t2) return conn.reply(m.chat, 'Silahkan masukan parameter text2', m)

  await m.reply('Sedang membuat...')

          let buff = ('https://some-random-api.ml/canvas/youtube-comment?avatar=https://i.ibb.co/wpWpVNd/avatar-contact.png&comment=' + t2 + '&username=' + t1)
          let voss = await fetch(buff)
          let vuss = await ftype.fromStream(voss.body)
          if (vuss !== undefined) {

     conn.sendFile(m.chat, await getBuffer(buff), 'foto.jpg', str, m)
     }
}
handler.help = ['ytcomment <nama|teks>']
handler.tags = ['sticker']
handler.command = /^(ytcomment)$/i

handler.fail = null
handler.limit = true

module.exports = handler
