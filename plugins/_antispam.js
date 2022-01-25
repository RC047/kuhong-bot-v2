module.exports = {
    async all(m) {
        if (!m.message) return
        this.spam = this.spam ? this.spam : {}
        let chat = global.DATABASE.data.chats[m.chat]
        if (m.sender in this.spam) {
            this.spam[m.sender].count++
            if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 10) {
                if (chat.antispam && this.spam[m.sender].count > 10) {
                    m.reply(`*「 ANTI SPAM 」*\n\nPengirim: ${this.getName(m.sender)}\nDenda: -250 XP`)
                    global.DATABASE.data.users[m.sender].exp -= 250
                }
                this.spam[m.sender].count = 0
                this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
            }
        }
        else this.spam[m.sender] = {
            jid: m.sender,
            count: 0,
            lastspam: 0
        }
    }
}