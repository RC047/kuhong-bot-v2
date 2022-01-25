let fetch = require('node-fetch')

let handler = async (m, { conn, args }) => {

  await m.reply('Searching...')
  if (!args[0]) throw 'Uhm...url nya mana?'
  let res = await fetch(global.API('xteam', '/dl/tiktok', {
    url: args[0]
  }, 'APIKEY'))
  let json = await res.json()
  conn.reply(m.chat, `
Link Server1 :
${json.server_1}

Link Server2 :
${json.server_2}

Video sedang dikirim,, harap tunggu sekitar 1 menit.
`.trim(), m)

  await conn.sendFile(m.chat, json.server_1, 'tiktok.mp4', `
Nihh Videonya :3
`.trim(), m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok(dl)?)$/i

handler.limit = true

module.exports = handler
