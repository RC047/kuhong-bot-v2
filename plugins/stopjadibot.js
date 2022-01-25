let handler  = async (m, { conn }) => {
  if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, 'Kenapa nggk langsung ke terminalnya?', m)
  else {
    await conn.reply(m.chat, 'Goodbye Bot :\')', m)
    conn.close()
  }
}
handler.help = ['berhenti','stop']
handler.tags = ['owner']
handler.command = /^(berhenti|stop)$/i
handler.rowner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

