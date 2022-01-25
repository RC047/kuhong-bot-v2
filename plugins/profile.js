let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')

let handler = async (m, { conn, usedPrefix }) => {

  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { name, limit, exp, banned, lastclaim, registered, regTime, age, level } = global.DATABASE.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let str = `
╭─「 USER PROFILE 」
│
│• Nama :
│${username}
│• Umur :
│${registered ? '' + age : ''}
│• Tag :
│(@${who.replace(/@.+/, '')})
│• Bio :
│${about ? '' + about : ''}
│• Nomor :
│${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
│• Link Direct :
│https://wa.me/${who.split`@`[0]}
│
│• Exp : ${exp}
│[${max - exp} lagi untuk levelup]
│• Limit : ${limit}
│• Level : ${level}
│• Premium : No
│• Banned : ${banned}
│• Terdaftar :
│${registered ? 'Yes': 'No'}
│• Banned : ${banned}
│• Terdaftar : ${registered ? 'Yes': 'No'}
│• Pada :
│${new Date(regTime)}
│• Last Claim :
│${lastclaim > 0 ? '' + new Date(lastclaim) : ''}
╰────

Ketik ${usedPrefix}levelup jika expmu sudah banyak!
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'pp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['profile']
handler.tags = ['tools']
handler.command = /^profile$/i

module.exports = handler
