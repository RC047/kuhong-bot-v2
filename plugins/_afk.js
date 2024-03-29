let handler = m => m

handler.before = function (m) {

  let user = global.DATABASE.data.users[m.sender]
  let name = this.getName(m.sender)
  let alasan = user.afkReason
  if (user.afk > -1) {
m.reply(`
*「 STOP AFK 」*

Hai *${name}*!
Selamat Datang kembali,,
udah beres ${alasan}nya kan?

Selamat beraktivitas kembali ^_^
`.trim())
    user.afk = -1
    user.afkReason = ''
  }
  let jids = [...new Set(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])]
  for (let jid of jids) {
    let user = global.DATABASE.data.users[jid]
    if (!user) continue
    let afkTime = user.afk
    if (!afkTime || afkTime < 0) continue
    let reason = user.afkReason || 'AFK'
    m.reply(`
*「 SEDANG AFK 」*

SSHHHHH!

Jangan tag dia! orangnya lagi *${reason}*
Selama ${clockString(new Date - afkTime)}
`.trim())
  }
  return true
}

module.exports = handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}
