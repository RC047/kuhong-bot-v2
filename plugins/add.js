let handler = async (m, { conn, text }) => {
try {
  let users = text.split`,`.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v.length > 20)
  if (!text) throw 'Tag orang yang mau diadd!'
  await conn.groupAdd(m.chat, users)

  conn.reply(m.chat, 'Done!', m)
} catch (e) {
 m.reply('Tidak dapat menambahkan member,, mungkin karna diprivate')
  }
}
handler.help = ['add', '+'].map(v => v + ' <nomor>')
handler.tags = ['group']
handler.command = /^(add|\+)$/i
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

