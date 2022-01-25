let handler = async (m, { conn, text, args }) => {
try {
  let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
  let users = m.mentionedJid.filter(u => !(u == ownerGroup || u.includes(conn.user.jid)))
  if (!text) throw 'Tag orang yang mau dikick!'
  for (let user of users) if (user.endsWith('@s.whatsapp.net')) await conn.groupRemove(m.chat, [user])

  conn.reply(m.chat, 'Done!', m)
} catch (e) {
 m.reply('Tidak dapat mengeluarkan member,, mungkin karna dia adalah Owner Grup')
  }
}
handler.help = ['kick', '-'].map(v => v + ' @user')
handler.tags = ['group']
handler.command = /^(kick|\-)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null
handler.limit = true

module.exports = handler

