let { WAConnection: _WAConnection, WA_MESSAGE_STUB_TYPES } = require('@adiwajshing/baileys')
let file = require.resolve(__filename)
let express = require('express')
let { generate } = require('qrcode-terminal')
let qrcode = require('qrcode')
let simple = require('./lib/simple')
let logs = require('./lib/logs')
let yargs = require('yargs/yargs')
let syntaxerror = require('syntax-error')
let fetch = require('node-fetch')
let chalk = require('chalk')
let fs = require('fs')
let path = require('path')
let util = require('util')
let { spawn, spawnSync } = require('child_process')
let Database = require('./lib/database')
let Readline = require('readline')
let rl = Readline.createInterface(process.stdin, process.stdout)
let WAConnection = simple.WAConnection(_WAConnection)


global.owner = ['62895337278647'] // Put your number here
global.mods = [] // Moderator number
global.prems = ['6285806157712'] // Premium user has unlimited limit
global.VIP = ['6285806157712'] // VIP user is premium user forever
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  xteam: 'https://api.xteam.xyz',
  kuhong: 'https://kuhong-api.herokuapp.com',
  zahirr: 'https://zahirr-web.herokuapp.com',
  zeks: 'https://api.zeks.xyz',
  pencarikode: 'https://pencarikode.xyz',
  leyscoders: 'https://leyscoders-api.herokuapp.com'
}
global.APIKeys = { // APIKey Here
   // 'https://website': 'apikey'
  'https://api.xteam.xyz': '7cac32071f2eb2ff',
  'https://kuhong-api.herokuapp.com': '8RiU6O-yrLpgVep',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.xyz': 'MIMINGANZ',
  'https://pencarikode.xyz': 'pais',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll'
}

// Sticker WM
global.packname = 'Sticker Maker'
global.author = 'Kuhong Bot'

global.multiplier = 100 // The higher, The harder levelup

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '')
global.timestamp = {
  start: new Date
}
// global.LOGGER = logs()
let PORT = process.env.PORT || 3000
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎‎xzXZ\\/!#$%*,()[]@1234567890¡¿\\-+£¢€¥§^°=¶∆×÷π√✓©®:;?&._') + ']')

global.DATABASE = new Database(`${opts._[0] ? opts._[0] + '_' : ''}database.json`, null, 2)
if (!global.DATABASE.data.users) global.DATABASE.data.users = {}
if (!global.DATABASE.data.groups) global.DATABASE.data.groups = {}
if (!global.DATABASE.data.chats) global.DATABASE.data.chats = {}
if (!global.DATABASE.data.stats) global.DATABASE.data.stats = {}
if (!global.DATABASE.data.msgs) global.DATABASE.data.msgs = {}

if (opts['server']) {
  global.app = express()
  app.use(express.static('views'))
  app.all('*', async (req, res, next) => {
    await global.conn.connect().catch(console.log)
    res.end(await qrcode.toBuffer(global.qr))
  })
  app.listen(PORT, () => console.log('App listened on port', PORT))
}
global.conn = new WAConnection()
let authFile = `${opts._[0] || 'session'}.data.json`
if (fs.existsSync(authFile)) conn.loadAuthInfo(authFile)
if (opts['big-qr'] || opts['server']) conn.on('qr', qr => generate(qr, { small: false }))
if (opts['server']) conn.on('qr', qr => { global.qr = qr })
conn.on('credentials-updated', () => fs.writeFileSync(authFile, JSON.stringify(conn.base64EncodedAuthInfo())))
let lastJSON = JSON.stringify(global.DATABASE.data)
if (!opts['test']) setInterval(() => {
  conn.logger.info('Saving database . . .')
  if (JSON.stringify(global.DATABASE.data) == lastJSON) conn.logger.info('Database is up to date')
  else {
    global.DATABASE.save()
    conn.logger.info('Done saving database!')
    lastJSON = JSON.stringify(global.DATABASE.data)
  }
}, 60 * 1000) // Save every minute

let isNumber = x => typeof x === 'number' && !isNaN(x)
conn.handler = async function (m) {
  try {
    simple.smsg(this, m)
    m.exp = 0
    m.limit = false
    try {
      let user
        if (user = global.DATABASE._data.users[m.sender]) {
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.limit)) user.limit = 10
        if (!isNumber(user.lastclaim)) user.lastclaim = 0
        if (!'registered' in user) user.registered = false
        if (!user.registered) {
          if (!'name' in user) user.name = this.getName(m.sender)
          if (!isNumber(user.age)) user.age = -1
          if (!isNumber(user.regTime)) user.regTime = -1
        }
        if (!isNumber(user.afk)) user.afk = -1
        if (!'afkReason' in user) user.afkReason = ''
        if (!'banned' in user) user.banned = false
        if (!isNumber(user.level)) user.level = 1
        if (!user.role) user.role = 'Bronze'
        if (!'autolevelup' in user) user.autolevelup = true
      } else global.DATABASE._data.users[m.sender] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: false,
        name: this.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 1,
        role: 'Bronze',
        autolevelup: true
      }

      let chat
        if (chat = global.DATABASE._data.chats[m.chat]) {
        if (!'isBanned' in chat) chat.isBanned = false
        if (!'welcome' in chat) chat.welcome = true
        if (!'sWelcome' in chat) chat.sWelcome = ''
        if (!'sBye' in chat) chat.sBye = ''
        if (!'antidelete' in chat) chat.antidelete = false
        if (!'antispam' in chat) chat.antidelete = false
        if (!'antilink' in chat) chat.antilink = false
        if (!'antivirtex' in chat) chat.antivirtex = false
        if (!'antitoxic' in chat) chat.antitoxic = false
        if (!('simi' in chat)) chat.simi = false
        if (!('viewonce' in chat)) chat.viewonce = false
      } else global.DATABASE._data.chats[m.chat] = {
        isBanned: false,
        welcome: true,
        sWelcome: '',
        sBye: '',
        antidelete: false,
        antispam: false,
        antilink: false,
        antivirtex: false,
        antitoxic: false,
        simi: false,
        viewonce: false
      }
    } catch (e) {
      console.log(e, global.DATABASE.data)
    }
    if (!m.fromMe && opts['self']) return
    if (!m.text) return
    if (m.isBaileys) return
    m.exp += 1

    let usedPrefix
    let _user = global.DATABASE._data.users[m.sender]
    let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    let isOwner = isROwner || m.fromMe
    let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    let isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    let isVIP = isROwner || global.VIP.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    let groupMetadata = m.isGroup ? await this.groupMetadata(m.chat) : {}
    let participants = m.isGroup ? groupMetadata.participants : []
    let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {} // User Data
    let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {} // Your Data
    let isAdmin = user.isAdmin || user.isSuperAdmin || false // Is User Admin?
    let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false // Are you Admin?
    let isBlocked = this.blocklist.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != this.user.jid).includes(m.sender) // Is User Blocked?
  	for (let name in global.plugins) {
  	let plugin = global.plugins[name]
      if (!plugin) continue
      if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) continue
      let str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
      let match = (_prefix instanceof RegExp ? // RegExp Mode?
          [[_prefix.exec(m.text), _prefix]] :
          Array.isArray(_prefix) ? // Array?
            _prefix.map(p => {
              let re = p instanceof RegExp ? // RegExp in Array?
                p :
                new RegExp(str2Regex(p))
              return [re.exec(m.text), re]
            }) :
            typeof _prefix === 'string' ? // String?
              [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
              [[[], new RegExp]]
      ).find(p => p[1])
      if (typeof plugin.before == 'function') if (await plugin.before.call(this, m, {
          match,
          conn: this,
          participants,
          groupMetadata,
          user,
          bot,
          isROwner,
          isOwner,
          isMods,
          isPrems,
          isVIP,
          isAdmin,
          isBotAdmin,
          isBlocked
      })) continue
      if ((usedPrefix = (_prefix.exec(m.text) || '')[0])) {
      let noPrefix = m.text.replace(usedPrefix, '')
  	let [command, ...args] = noPrefix.trim().split(' ').filter(v=>v)
            args = args || []
      let _args = noPrefix.trim().split(' ').slice(1)
      let text = _args.join(' ')
           command = (command || '').toLowerCase()
      let fail = plugin.fail || global.dfail // When failed
  	let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
           plugin.command.test(command) :
           Array.isArray(plugin.command) ? // Array?
              plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
              cmd.test(command) :
              cmd === command
            ) :
            typeof plugin.command === 'string' ? // String?
              plugin.command === command :
              false

  	if (!isAccept) continue
          m.plugin = name
      if (m.chat in global.DATABASE._data.chats) {
          let chat = global.DATABASE._data.chats[m.chat]
          let user = global.DATABASE._data.users[m.sender]
          if (name !== 'unbanchat.js' && chat && chat.isBanned) return // Ban Chats
          if (name !== 'unbanuser.js' && user && user.banned) return // Ban Users
        }
        if (plugin.rowner && !isROwner) { // Real Owner Number
          fail('rowner', m, this)
          continue
        }
        if (plugin.owner && !isOwner) { // Owner Number
          fail('owner', m, this)
          continue
        }
        if (plugin.mods && !isMods) { // Moderator User
          fail('mods', m, this)
          continue
        }
        if (plugin.premium && !isPrems) { // Premium User
          fail('premium', m, this)
          continue
        }
        if (plugin.vip && !isVIP) { // VIP User
          fail('vip', m, this)
          continue
        }
    	if (plugin.group && !m.isGroup) { // Group Only
          fail('group', m, this)
          continue
        } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
          fail('botAdmin', m, this)
          continue
        } else if (plugin.admin && !isAdmin) { // User Admin
          fail('admin', m, this)
          continue
        }
    	if (plugin.private && m.isGroup) { // Private Chat Only
          fail('private', m, this)
          continue
        }
        if (plugin.register == undefined && _user.registered == false && !isROwner) { // Need Register
          fail('unreg', m, this)
          continue
        }
        if (plugin.off) { // Features Non Active
          fail('off', m, this)
          continue
        }
        if (plugin.maintenance) { // Features Maintenance
          fail('maintenance', m, this)
          continue
        }

        m.isCommand = true
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10 // XP Earning per command
        if (xp > 999) m.reply('*「 CHEAT DETECTED 」*\n\nPenggunaan _cheat_ terdeteksi saat melakukan perintah!') // Hehehe
        else m.exp += xp
        if (!isPrems && !isVIP && global.DATABASE._data.users[m.sender].limit < m.limit * 1 && plugin.limit) {
          this.reply(m.chat, `*「 LIMIT HABIS 」*\n\nLimit anda habis!\nSilahkan beli melalui *${usedPrefix}buy*`, m)
          continue // Limit habis
        }

        try {
          await plugin.call(this, m, {
            match,
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            conn: this,
            participants,
            groupMetadata,
            isROwner,
            isOwner,
            isMods,
            isPrems,
            isVIP,
            isAdmin,
            isBotAdmin,
            isBlocked
          })
          if (!isPrems && !isVIP) m.limit = m.limit || plugin.limit || false
        } catch (e) {
          // Error occured
          m.error = e
          console.error(e)
          if (e) {
              let text = util.format(e.message ? e.message : e)
              for (let key of Object.values(global.APIKeys))
              text = text.replace(new RegExp(key, 'g'), 'HIDDEN')
              m.reply(text)
            }
        } finally {
          // m.reply(util.format(_user))
          if (m.limit) m.reply(+ m.limit + ' Limit terpakai')
        }
                        break
        }
     }
  } finally {
    // console.log(global.DATABASE._data.users[m.sender])
    let user, stats = global.DATABASE._data.stats
    if (m) {
      if (m.sender && (user = global.DATABASE._data.users[m.sender])) {
        user.exp += m.exp
        user.limit -= m.limit * 1
      }

      let stat
      if (m.plugin) {
        let now = + new Date
        if (m.plugin in stats) {
          stat = stats[m.plugin]
          if (!isNumber(stat.total)) stat.total = 1
          if (!isNumber(stat.success)) stat.success = m.error ? 0 : 1
          if (!isNumber(stat.last)) stat.last = now
          if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error ? 0 : now
        } else stat = stats[m.plugin] = {
          total: 1,
          success: m.error ? 0 : 1,
          last: now,
          lastSuccess: m.error ? 0 : now
        }
        stat.total += 1
        stat.last = now
        if (!m.error) {
          stat.success += 1
          stat.lastSuccess = now
        }
      }
    }

    try {
      require('./lib/print')(m, this)
    } catch (e) {
      console.log(m, m.quoted, e)
    }
    if (opts['autoread']) await this.chatRead(m.chat).catch(() => {})
  }
}

conn.welcome = '*「 WELCOME 」*\n\nHalo @user!\nSelamat datang di grup\n*@subject*\n\n@desc'
conn.bye = '*「 GOOD BYE 」*\n\nAl-Fatihah kepada @user\nyang telah keluar dari grup!'
conn.onAdd = async function ({ m, participants }) {
  let chat = global.DATABASE._data.chats[m.key.remoteJid]
  if (!chat.welcome) return
  for (let user of participants) {
    let pp = './src/avatar_contact.png'
    try {
      pp = await this.getProfilePicture(user)
    } catch (e) {
    } finally {
      let text = (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@user', '@' + user.split('@')[0]).replace('@subject', this.getName(m.key.remoteJid).replace('@desc', await this.groupMetadata(m.key.remoteJid).desc))
      this.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
        contextInfo: {
          mentionedJid: [user]
        }
      })
    }
  }
}

conn.onLeave = async function ({ m, participants }) {
  let chat = global.DATABASE._data.chats[m.key.remoteJid]
  if (!chat.welcome) return
  for (let user of participants) {
    if (this.user.jid == user) continue
    let pp = './src/avatar_contact.png'
    try {
      pp = await this.getProfilePicture(user)
    } catch (e) {
    } finally {
      let text = (chat.sBye || this.bye || conn.bye || 'Bye, @user!').replace('@user', '@' + user.split('@')[0])
      this.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, false, {
        contextInfo: {
          mentionedJid: [user]
        }
      })
    }
  }
}

conn.onDelete = async function (m) {
  if (m.key.fromMe) return
  let chat = global.DATABASE._data.chats[m.key.remoteJid]
  if (chat.antidelete) return
  await this.reply(m.key.remoteJid, `
*「 ANTI DELETE 」*

Terdeteksi @${m.participant.split`@`[0]} telah menghapus pesan!
`.trim(), m.message, {
    contextInfo: {
      mentionedJid: [m.participant]
    }
  })
  this.copyNForward(m.key.remoteJid, m.message).catch(e => console.log(e, m))
}

conn.on('message-new', conn.handler)
conn.on('message-delete', conn.onDelete)
conn.on('group-add', conn.onAdd)
conn.on('group-leave', conn.onLeave)
conn.on('error', conn.logger.error)
conn.on('close', () => {
  setTimeout(async () => {
    try {
      if (conn.state === 'close') {
        await conn.loadAuthInfo(authFile)
        await conn.connect()
        global.timestamp.connect = new Date
      }
    } catch (e) {
      conn.logger.error(e)
    }
  }, 5000)
})

global.dfail = (type, m, conn) => {
  let msg = {
    rowner: `*「 KHUSUS KUHONG 」*\n\nPerintah ini hanya dapat digunakan oleh _*Owner Kuhong*_!`,
    owner: `*「 KHUSUS OWNER 」*\n\nPerintah ini hanya dapat digunakan oleh _*Owner Bot*_!`,
    mods: `*「 KHUSUS MODERATOR 」*\n\nPerintah ini hanya dapat digunakan oleh _*Moderator*_!`,
    premium: `*「 KHUSUS PREMIUM 」*\n\nPerintah ini hanya untuk member _*Premium*_!\n\nKetik !premium untuk beli premium`,
    vip: `*「 KHUSUS VIP 」*\n\nPerintah ini hanya untuk member _*VIP*_!\n\nKetik !premium untuk beli premium VIP`,
    group: `*「 KHUSUS GROUP 」*\n\nPerintah ini hanya dapat digunakan di *Grup*!`,
    private: `*「 KHUSUS PRIBADI 」*\n\nPerintah ini hanya dapat digunakan di *Chat Pribadi*!`,
    admin: `*「 KHUSUS ADMIN 」*\n\nPerintah ini hanya untuk *Admin* grup!`,
    botAdmin: `*「 BOT HARUS ADMIN 」*\n\nJadikan bot sebagai *Admin* untuk menggunakan perintah ini!`,
    unreg: `*「 BELUM DAFTAR 」*\n\nSilahkan Daftar terlebih dahulu untuk menggunakan fitur ini dengan cara ketik :\n\n*!daftar nama|umur|kota*\n\nContoh : *!daftar Kuhong|17|Jakarta*`,
    off: `*「 TIDAK DIAKTIFKAN 」*\n\nPerintah ini dinonaktifkan oleh _*Owner Bot*_!`,
    maintenance: `*「 MAINTENANCE 」*\n\nFitur ini sedang dalam _*Perbaikan*_!`
  }[type]
  if (msg) m.reply(msg)
}

if (opts['test']) {
  conn.user = {
    jid: '2219191@s.whatsapp.net',
    name: 'test',
    phone: {}
  }
  conn.chats
  conn.prepareMessageMedia = (buffer, mediaType, options = {}) => {
    return {
      [mediaType]: {
        url: '',
        mediaKey: '',
        mimetype: options.mimetype,
        fileEncSha256: '',
        fileSha256: '',
        fileLength: buffer.length,
        seconds: options.duration,
        fileName: options.filename || 'file',
        gifPlayback: options.mimetype == 'image/gif' || undefined,
        caption: options.caption,
        ptt: options.ptt
      }
    }
  }
  conn.sendMessage = async (chatId, content, type, opts = {}) => {
    let message = await conn.prepareMessageContent(content, type, opts)
    let waMessage = conn.prepareMessageFromCntent(chatId, message, opts)
    if (type == 'conversation') waMessage.key.id = require('crypto').randomBytes(16).toString('hex').toUpperCase()
    conn.emit('message-new', waMessage)
  }
  rl.on('line', line => conn.sendMessage('123@s.whatsapp.net', line.trim(), 'conversation'))
} else {
  rl.on('line', line => {
    global.DATABASE.save()
    process.send(line.trim())
  })
  conn.connect().then(() => {
    global.timestamp.connect = new Date
  })
}
process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    conn.logger.error(e)
    delete global.plugins[filename]
  }
}
console.log(Object.keys(global.plugins))
global.reload = (event, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(fs.readFileSync(dir), filename)
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      conn.logger.error(e)
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.relod)

process.on('exit', () => global.DATABASE.save())


// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm
  }
  require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
.then(() => conn.logger.info('Quick Test Done'))
.catch(console.error)


fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'main.js'"))
  delete require.cache[file]
  require(file)
})
