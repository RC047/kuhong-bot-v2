let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'Harap Masukan Query', m)

  await m.reply('Searching...')
    let res = await fetch(`https://api.zeks.xyz/api/shopee?apikey=apivinz&q=${text}`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = await (await fetch(`http://lolhuman.herokuapp.com/api/gimage?apikey=lolapikey&query=${text}`)).buffer()
    let data = json.data
    let index = Math.floor(Math.random() * data.length)
    let object = data[index]
    let hasil = `*SHOPEE*\n\nProduk: ${object.name}\nHarga: ${object.harga}\nTerjual: ${object.terjual}\nLokasi: ${object.location}\nStock: ${object.stock}\nInfo: ${object.information}\nUrl: ${object.url}\nDesk: ${object.desc}`

    conn.sendFile(m.chat, thumb, 'shopee.jpg', hasil, m)
}
handler.help = ['shopee'].map(v => v + ' <query>')
handler.tags = ['search']
handler.command = /^(shopee)$/i
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
