let util = require('util')
let path = require('path')
let { spawn } = require('child_process')

let handler  = async (m, { conn, text }) => {

 await m.reply('Sedang menulis...')
  let inputPath ='src/kertas/nulis.jpg'
  let outputPath = 'tmp/hasil.jpg'
  let fontPath = 'src/font/Zahraaa.ttf'
  let d = new Date
  let tgl = d.toLocaleDateString('id-Id')
  let hari = d.toLocaleDateString('id-Id', { weekday: 'long' })
  if (!text) throw 'Teksnya Mana Udin!'
  spawn('convert', [
    inputPath,
    '-font',
    fontPath,
    '-size',
    '1024x784',
    '-pointsize',
    '20',
    '-interline-spacing',
    '1',
    '-annotate',
    '+806+78',
    hari,
    '-font',
    fontPath,
    '-size',
    '1024x784',
    '-pointsize',
    '18',
    '-interline-spacing',
    '1',
    '-annotate',
    '+806+102',
    tgl,
    '-font',
    fontPath,
    '-size',
    '1024x784',
    '-pointsize',
    '20',
    '-interline-spacing',
    '-7.5',
    '-annotate',
    '+344+142',
    text,
    outputPath
  ])
  .on('error', e => conn.reply(m.chat, util.format(e), m))
  .on('exit', () => {
    conn.sendFile(m.chat, outputPath, 'nulis.jpg', 'Nihh,, Dasar Pemalas', m)
  })
}
handler.help = ['nulis'].map(v => v + ' <teks>')
handler.tags = ['nulis']
handler.command = /^nulis$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.limit = true
handler.fail = null

module.exports = handler

// BY MFARELS NJEENK
// https://GitHub.com/MFarelS/
