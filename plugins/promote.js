let handler = async (m, { conn, text }) => {
  let users = m.mentionedJid
  if (!text) throw 'Tag orang yang mau promote!'
  conn.groupMakeAdmin(m.chat, users)

  conn.reply(m.chat, 'Done!', m)
}
handler.help = ['promote','admin','↑'].map(v => v + ' @user')
handler.tags = ['group']
handler.command = /^(promote|admin|↑)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler
