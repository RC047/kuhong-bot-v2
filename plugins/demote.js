let handler = async (m, { conn, text, args }) => {
  let users = m.mentionedJid
  if (!text) throw 'Tag orang yang mau didemote!'
  conn.groupDemoteAdmin(m.chat, users)

  conn.reply(m.chat, 'Done!', m)
}
handler.help = ['demote','member','↓'].map(v => v + ' @user')
handler.tags = ['group']
handler.command = /^(demote|member|↓)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler
