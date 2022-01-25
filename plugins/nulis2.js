const { spawn } = require('child_process')
const fs = require('fs')

let handler = async (m, { conn, text, command }) => {

 await m.reply('Sedang menulis...')

  if (!text) throw 'Teksnya Mana?'
  let fontPath = 'src/font/Zahraaa.ttf'
  let inputPath ='src/kertas/nulis2.jpg'
  let outputPath = 'tmp/hasil.jpg'
  let fixedHeight = text
  if (text.toLowerCase() > 47) fixedHeight = text + '\n'
      spawn('convert', [
            inputPath,
            '-font',
            fontPath,
            '-size',
            '700x960',
            '-pointsize',
            '30',
            '-interline-spacing',
            '-7',
            '-annotate',
            '+170+222',
            fixedHeight,
            outputPath
         ])
         .on('error', () => console.log('error'))
         .on('exit', () =>
         {

  conn.sendFile(m.chat, outputPath, 'nulis.jpg', 'Nihh Mhank', m)
   })
}
handler.help = ['nulis2'].map(v => v + ' <teks>')
handler.tags = ['sticker']
handler.command = /^(nulis2)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler
