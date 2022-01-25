let { MessageType, Presence } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text, participants }) => {

	await conn.updatePresence(m.chat, Presence.composing)
	let users = participants.map(u => u.jid)
	if(!text) {
		var pesan = `Halo Member ${conn.getName(m.chat)}`
	} else {
		var pesan = text
	} conn.reply(m.chat, `╭─「 TAG ALL MEMBER 」\n│\n│• ${pesan}\n${users.map(v => '│• @' + v.replace(/@.+/, '')).join('\n')}\n╰────`, null, { contextInfo: { mentionedJid: users } })
}
handler.help = ['tagall','mentionall'].map(v => v + ' <pesan>')
handler.tags = ['group']
handler.command = /^(tagall|mentionall)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = true

handler.botAdmin = false
handler.fail = null

module.exports = handler
