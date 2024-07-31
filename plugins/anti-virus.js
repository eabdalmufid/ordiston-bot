
export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    let hapus = m.key.participant
    let bang = m.key.id
    let regVirtex = /(PLHIPS|৭৭|๑๑|๒๒|[Đৡดผ๖⃝-⃟⃢-⃤㜸])/i
    let isVirtexOn = regVirtex.exec(m.text)
    if (chat.antiVirtex && isVirtexOn && !m.fromMe) {
        await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus } })
        await this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
        await this.reply(m.chat, `*Font Virtext detect!*${isBotAdmin ? '' : '\n\n_Bot bukan admin_'}`, m)
        if (isBotAdmin && bot.restrict) {
            return m.reply('Kick!')
            await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!bot.restrict) return m.reply('Mungkin dia atmin!')
    }
    return !0
}