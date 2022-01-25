const { MessageType } = require('@adiwajshing/baileys')

let handler = async(m, { conn, text, usedPrefix, command, user, participants }) => {

  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'Tag orang yang akan dijadikan premium!'
  if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
  let user = `${who.split("@s.whatsapp.net")[0]}`

   m.reply(`*「 ADD PREMIUM 」*\n\n*Nomor :* wa.me/${who.split("@s.whatsapp.net")[0]}\n*Expired :* Sampai Bot Mati\n\nNote :\nPremium ini hanya sementara!`)
   global.prems.push(user)

  } else m.reply('Ada nomor host disini...')
}
handler.help = ['addprem'].map(v => v + ' <@user>')
handler.tags = ['owner']
handler.command = /^addprem$/i
handler.rowner = true

module.exports = handler
