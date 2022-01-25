let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `
╭─「 INFO BOT 」
│
│> Bot Recoded By :
│• RC047
│
│> Bot Dibuat Dengan :
│• JavaScript via NodeJS
│• FFmpeg
│
│> Thanks To :
│• Nurutomo
│• M Farel S
│• ArifFB25
│• FarhanXCode7
│• Ibnu Syawal
│• Drawl Nag
│
│> Donasi :
│• SAWERIA :
│https://saweria.co/RC047
│• OVO [+62895337278647]
│• TRI [+62895337278647]
│• DANA [+62895337278647]
│• GOPAY [+62895337278647]
╰────

LeaderBoard Donasi :
Silahkan Ketik ${_p}ld
`.trim()

 conn.fakeReply(m.chat, info, '0@s.whatsapp.net', '*BOT TERVERIFIKASI!*')
}
handler.help = ['info']
handler.tags = ['info']
handler.command = /^(info)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
