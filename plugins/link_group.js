let handler = async (m, { conn, args }) => {
  conn.reply(m.chat, 'Link Group ini\nhttps://chat.whatsapp.com/' + (await conn.groupInviteCode(m.chat)), m)
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = true

handler.fail = null

module.exports = handler

