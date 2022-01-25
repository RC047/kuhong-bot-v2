let imageToBase64 = require('image-to-base64')
let axios = require('axios')
let fs = require("fs")

let handler = async(m, { conn, text }) => {

  await m.reply('Searching...')

    let data = fs.readFileSync('/data/data/com.termux/files/home/kuhong/lib/18.js');
    let jsonData = JSON.parse(data);
    let randIndex = Math.floor(Math.random() * jsonData.length);
    let randKey = jsonData[randIndex];
    let randTeks = randKey.teks
  axios.get('https://freerestapi.herokuapp.com/api/v1/randomp')
   .then((res) => {
      imageToBase64(res.data.url)
        .then((ress) => {
          let randBokep = Buffer.from(ress, 'base64')

    conn.sendFile(m.chat, randBokep, 'bokep.jpg', randTeks, m)
     })
  })
}
handler.help = ['bokep']
handler.tags = ['dewasa']
handler.command = /^(bokep)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.off = true
handler.private = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = 10

module.exports = handler
