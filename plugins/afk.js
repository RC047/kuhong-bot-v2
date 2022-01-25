let handler = (m, { text }) => {
  let user = global.DATABASE.data.users[m.sender]
  if (!text) throw 'Teksnya Gak Boleh Kosong!'
  user.afk = + new Date
  user.afkReason = text
  let aefka = `
*「 AFK NOW 」*

Nama : ${conn.getName(m.sender)}
Alasan : ${text ? text : 'No Reason'}
`.trim()

  m.reply(aefka)
}
handler.help = ['afk <alasan>']
handler.tags = ['group']
handler.command = /^afk$/i

handler.group = true

module.exports = handler
