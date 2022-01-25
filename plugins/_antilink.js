let handler = m => m

let linkRegex = /(http(s)?:\/\/)?chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

handler.before = function (m, { user, text }) {

  if (m.isBaileys && m.fromMe) return
  let chat = global.DATABASE.data.chats[m.chat]
  let name = this.getName(m.sender)
  let isLink = linkRegex.exec(m.text)

 if (chat.antilink && isLink) {
 m.reply(`*「 ANTI LINK 」*\n\nTerdeteksi *${name}* telah mengirim link group!\n\nMaaf Kamu akan dikick dari grup ini!`)
   this.groupRemove(m.chat, [m.sender])
  } else return false
}
handler.group = true
handler.register = true

module.exports = handler
