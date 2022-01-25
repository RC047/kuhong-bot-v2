let { spawn }  = require('child_process');

let handler  = async (m, { conn }) => {
  if (!process.send) throw 'Gunakan node RendyGans.js untuk mereset Bot!'
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply('Sedang Merestart Bot...')
    await global.DATABASE.save()
    process.send('reset')

 await m.reply('Bot telah direstart ulang!')
  } else throw 'Eiiittsss'
}
handler.help = ['restart']
handler.tags = ['host']
handler.command = /^restart$/i
handler.rowner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

