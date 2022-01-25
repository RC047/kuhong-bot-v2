let handler = async (m, { conn, args }) => {

  let sortedExp = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].exp - a[1].exp)
  let sortedLim = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].limit - a[1].limit)
  let sortedLevel = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].level - a[1].level)
  let usersExp = sortedExp.map(v => v[0])
  let usersLim = sortedLim.map(v => v[0])
  let usersLevel = sortedLevel.map(v => v[0])
  let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(50, sortedExp.length)
  let text = `
*「 TOP ${len} EXP LEADERBOARD 」*
Kamu : *${usersExp.indexOf(m.sender) + 1}* dari *${usersExp.length}*

${sortedExp.slice(0, len).map(([user, data], i) => (i + 1) + '. @' + user.split`@`[0] + ' :\n*' + data.exp + ' Exp*').join`\n`}

*「 TOP ${len} LIMIT LEADERBOARD 」*
Kamu : *${usersLim.indexOf(m.sender) + 1}* dari *${usersLim.length}*

${sortedLim.slice(0, len).map(([user, data], i) => (i + 1) + '. @' + user.split`@`[0] + ' :\n*' + data.limit + ' Limit*').join`\n`}

*「 TOP ${len} LEVEL LEADERBOARD 」*
Kamu : *${usersExp.indexOf(m.sender) + 1}* dari *${usersExp.length}*

${sortedLevel.slice(0, len).map(([user, data], i) => (i + 1) + '. @' + user.split`@`[0] + ' :\n*Level ' + data.level + '*').join`\n`}
`.trim()
  conn.reply(m.chat, text, m, {
    contextInfo: {
      mentionedJid: [...usersExp.slice(0, len), ...usersLim.slice(0, len)]
    }
  })
}
handler.help = ['leaderboard', 'lb', 'rank']
handler.tags = ['rank']
handler.command = /^(leaderboard|lb|rank)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

