let { getBuffer } = require('../lib/functions')
let axios = require('axios')

let handler = async function(m, { conn, text }) {

 await m.reply('Searching...')
 if (!text) return conn.reply(m.chat, 'Harap masukan nama pokemon!', m)

  axios.get(`http://zekais-api.herokuapp.com/pokemon?query=${text}`).then((res) => {
    let caption = `*「 POKEMON 」*\n\nNama : ${res.data.title}\nSpesies : ${res.data.species}\nBerat : ${res.data.weight}\nTinggi : ${res.data.height}\nKelamin : ${res.data.gender}\nBase Exp : ${res.data.baseExp}\n\n*「 STATS 」*\n\nHP : ${res.data.stats.hp}\nAttack : ${res.data.stats.attack}\nDefense : ${res.data.stats.defense}\nSpecialAtk : ${res.data.stats.specialAtk}\nSpecialDeff : ${res.data.stats.specialDeff}\nSpeed : ${res.data.stats.speed}\nTotal : ${res.data.stats.total}`

 conn.sendFile(m.chat, res.data.image, 'pokemon.jpg', caption, m)

   }).catch(() => { m.reply('Pokemon tidak ditemukan!') })
}
handler.help = ['pokemon'].map(v => v + ' <query>')
handler.tags = ['game']
handler.command = /^(pokemon)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = false

module.exports = handler
