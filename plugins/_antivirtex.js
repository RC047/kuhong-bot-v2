let handler = m => m

let virtexRegex = //i

handler.before = function (m, { user, text }) {

  if (m.isBaileys && m.fromMe) return
  let chat = global.DATABASE.data.chats[m.chat]
  let name = this.getName(m.sender)
  let isVirtex = virtexRegex.exec(m.text)

 if (chat.antivirtex && isVirtex) {
 m.reply(`*「 ANTI VIRTEX 」*\n\nTerdeteksi *${name}* telah mengirim virtex!\n\nMaaf Kamu akan dikick dari grup ini!`)
   this.groupRemove(m.chat, [m.sender])
  } else return false
}
handler.group = true
handler.register = true

module.exports = handler
