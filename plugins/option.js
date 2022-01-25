let handler = async (m, { conn, usedPrefix, command, text, args, isGroup, isAdmin, isOwner, isROwner }) => {

  let isEnable = /true|enable|(turn)?on/i.test(command)
  let chat = global.DATABASE._data.chats[m.chat]
  let user = global.DATABASE._data.users[m.sender]
  let type = (args[0] || '').toLowerCase()
  let isAll = false
  let isUser = false

  switch (type) {
    case 'welcome':
      if (!m.isGroup) {
        global.dfail('group', m, conn)
        throw false
      } else if (m.isGroup && !isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break
    case 'antispam':
      if (!m.isGroup) {
        global.dfail('group', m, conn)
        throw false
      } else if (m.isGroup && !isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antispam = isEnable
      break
    case 'antidelete':
      if (!m.isGroup) {
        global.dfail('group', m, conn)
        throw false
      } else if (m.isGroup && !isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antidelete = isEnable
      break
    case 'self':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = isEnable
      break
    case 'antilink':
      if (!m.isGroup) {
        global.dfail('group', m, conn)
        throw false
      } else if (m.isGroup && !isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antilink = isEnable
      break
    case 'antivirtex':
      if (!m.isGroup) {
        global.dfail('group', m, conn)
        throw false
      } else if (m.isGroup && !isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antivirtex = isEnable
      break
    case 'antitoxic':
      if (!m.isGroup) {
        global.dfail('group', m, conn)
        throw false
      } else if (m.isGroup && !isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antitoxic = isEnable
      break
    case 'levelling':
    case 'leveling':
      isUser = true
      user.autolevelup = isEnable
      break
    case 'simi':
      if (!m.isGroup) {
        global.dfail('group', m, conn)
        throw false
      } else if (m.isGroup && !isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.simi = isEnable
      break
    case 'autoread':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break
    case 'nyimak':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['nyimak'] = isEnable
      break
    case 'restrict':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['restrict'] = isEnable
      break
    case 'viewonce':
      if (!m.isGroup) {
        global.dfail('group', m, conn)
        throw false
      } else if (m.isGroup && !isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.viewonce = isEnable
      break
    default:
      return m.reply(`
╭─「 LIST OPTION 」
│
│• welcome
│• antitoxic
│• antidelete
│• antilink
│• antivirtex
│• levelling
│• simi
│• autoread (owner)
│• self (owner)
│• nyimak (owner)
│• restrict (owner)
│• viewonce (owner)
│
│> Contoh :
│${usedPrefix}enable welcome
│${usedPrefix}disable antilink
╰────
`.trim())
  }
  m.reply(`
*${type}* Berhasil di *${isEnable ? 'nyala' : 'mati'}kan* ${isAll ? 'untuk bot ini' : isUser ? '' : 'untuk chat ini'}
`.trim())
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group']
handler.command = /^((dis|en)able|(fals|tru)e|(turn)?o(ff|n))$/i

module.exports = handler
