let handler = async function (m) {
  // this.sendContact(m.chat, '6281515860089', 'Nurutomo', m)
  conn.sendContact(m.chat, '62895337278647', 'Owner Kuhong', m)

 await m.reply('Tuhh OwnerKuhh,, Jangan Dispam yaa >_<')
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
