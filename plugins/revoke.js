let handler = async (m, { conn, args, usedPrefix }) => {

let revoke = await conn.query({
  json: ["action", "inviteReset", m.chat]
    })
  await conn.reply(m.chat, 'Link Group Berhasil Direset!\n\nLink Baru :\nhttps://chat.whatsapp.com/' + revoke.code, m)
}
handler.help = ['revoke','resetlink']
handler.tags = ['group']
handler.command = /^(revoke|resetlink)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler
