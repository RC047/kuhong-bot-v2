let levelling = require('../lib/levelling')

let handler = m => {
  let user = global.DATABASE.data.users[m.sender]
  if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    throw `
*「 LEVELING 」*

Level *${user.level} (${user.exp - min}/${xp})*
Kurang *${max - user.exp} Exp* lagi!
`.trim()
  }
  user.level++
  m.reply(`
*「 LEVEl UP 」*

Selamat, anda telah naik level!

*${user.level - 1}* => *${user.level}*
  `.trim())
}

handler.help = ['levelup']
handler.tags = ['xp']

handler.command = /^levelup$/i

module.exports = handler
