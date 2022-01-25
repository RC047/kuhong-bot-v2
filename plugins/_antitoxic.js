let handler = m => m

let toxic = /(a(s[uw]|nj(([ie])?ng|([ie])r)?)|me?me?k|ko?nto?l|ba?bi|fu?ce?k|ta(e|i)k?|ba?ngsa?(t|d)|(ba?)?ji?nga?n|g([iueo])?bl([iueo])?(k|g)|col(i|ay)|an?jg|nge?nto?d|tod|tolol|(ng)?ewe(an)?|jemb(u|o)(d|t))/i

handler.before = function (m, { user, text }) {

  if (m.isBaileys && m.fromMe) return
  let chat = global.DATABASE.data.chats[m.chat]
  let name = this.getName(m.sender)
  let isToxic = toxic.exec(m.text)

  if (chat.antitoxic && isToxic) {
    conn.reply(m.chat, `*「 ANTI TOXIC 」*\n\nPengirim : ${name}\nDenda : -250 XP\nPesan :\n${m.text}`, m)
   global.DATABASE.data.users[m.sender].exp -= 250

  } else return false
}
handler.register = true
handler.group = true

module.exports = handler
