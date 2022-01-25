let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'Harap Masukan Query', m)

  await m.reply('Searching...')
    let res = await fetch(`http://zekais-api.herokuapp.com/happymod?query=${text}`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = await (await fetch(json.thumb)).buffer()
    let data = json.result
    let index = Math.floor(Math.random() * data.length)
    let object = data[index]
    let dl_link = object.dl_url
    let hasil = `*HAPPY MOD*\n\nJudul: ${json.title}\nVersi: ${json.version}\nFilesize: ${json.size}\nPrice: ${json.price}\n${json.Root_needed}\n${json.purchase}\nLink: ${dl_link}`

    conn.sendFile(m.chat, thumb, 'happymod.jpg', hasil, m)
}
handler.help = ['happymod'].map(v => v + ' <query>')
handler.tags = ['search']
handler.command = /^(happymod)$/i
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
