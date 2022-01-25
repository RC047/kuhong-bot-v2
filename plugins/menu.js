let fs = require('fs')
let util = require('util')
let path = require('path')
let fetch = require('node-fetch')
let levelling = require('../lib/levelling')
let tags = {
      'main': 'Start Bot',
      'daftar': 'Daftar',
      'xp': 'Exp & Limit',
      'hadiah': 'Hadiah',
      'dewasa': '18+ Menu (Closed)',
      'group': 'Group Menu',
      'sticker': 'Creator Menu',
      'editor': 'Editor Menu',
      'convert': 'Converter Menu',
      'game': 'Fun Menu',
      'video': 'Video Menu',
      'image': 'Image Menu',
      'sound': 'Sound Menu',
      'quotes': 'Random Menu',
      'primbon': 'Primbon Menu',
      'belajar': 'Education Menu',
      'music': 'Music Menu',
      'simi': 'Simsimi Menu',
      'kerang': 'Kerang Menu',
      'downloader': 'Downloader Menu',
      'news': 'News Menu',
      'spam': 'Spammer Menu',
      'search': 'Search Menu',
      'tools': 'Tools Menu',
      'premium': 'Premium & VIP Menu',
      'owner': 'Owner Menu',
      'host': 'Host Menu',
      'info': 'Information'
}
const defaultMenu = {
  before: `
╭─ *「 %me 」*
│
│• Nama: %name
│• Exp: %exp
│• Limit: %limit
│• Level: %level
│• Role: %role
│• Prefix: [ %p ]
╰────

╭─ *「 TIME 」*
│• Hari: %week
│• Weton: %weton
│• Islamic: %dateIslamic
│• Tanggal: %date
│• Waktu: %time
│• Online: %uptime
╰────

╭─ *「 TOTAL 」*
│• User: %rtotalreg / %totalreg
│• Chat: %totalchat
│• Grup: %totalgc
│• Fitur: %totalfitur
│• Balasan: %totalsend
│• Module: %totalmodule
╰────

╭─ *「 SOSMED 」*
│• YouTube: youtube.com/c/RC047
│• Telegram: t.me/RC047
│• GitHub: github.com/RC047
│• Rest API:
│kuhong-api.herokuapp.com
│• Nomor Bot:
│wa.me/62895337278647
╰────

╭─ *「 Jadwal Aktif 」*
│• 07:00 - 21:00
╰────

╭─ *「 Changelog 」*
│• Reset Fitur
╰────

╭─ *「 Join Group 」*
│chat.whatsapp.com/HDOZX7OoFYK1bTwftkY5Si
╰────
%readmore`.trimStart(),
  header: '╭─ *「 %category 」*',
  body: '│ • %cmd %islimit %isPremium',
  footer: '╰────\n',
  after: `
*%npmname@^%version*
${'```%npmdesc```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p }) => {

  try {
    await conn.fakeReply(m.chat, 'Loading...', '0@s.whatsapp.net', `*Baca Rules Dulu Sebelum Make Bot!*\n\n*Ketik ${_p}rules*`)
    let me = await conn.getProfilePicture(conn.user.jid).catch(() => 'https://i.ibb.co/wpWpVNd/avatar-contact.png')
    let pp = await conn.getProfilePicture(m.sender).catch(() => 'https://i.ibb.co/wpWpVNd/avatar-contact.png')
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let totalchat = conn.chats.all().length
    let totalgc = Object.keys(global.db.data.chats).length
    let totalfitur = fs.readdirSync('./plugins').length
    let totalsend = global.db.data.stats['menu.js'].total
    let totalmodule = fs.readdirSync('./node_modules').length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, totalchat, totalgc, totalfitur, totalsend, totalmodule, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    conn.sendFile(m.chat, me, 'pp.jpg', text.trim(), { key: { remoteJid: '0@s.whatsapp.net' }, message: { imageMessage: { caption: '*BOT TERVERIFIKASI!*', jpegThumbnail: await (await fetch(pp)).buffer() }}})
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', util.format(e))
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}