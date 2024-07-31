
export async function before(m, { isAdmin, isBotAdmin }) {
    let name = await this.getName(m.sender)
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let caption = `👋 Anti Bule ${name} @${m.sender.split("@")[0]}, Thanks!`.trim()
   if (chat.antibule) {
   if (!m.sender.startsWith('62' || '1')) {
   	user.banned = true
   	this.reply(m.chat, caption, m, { mentions: this.parseMention(caption) })
   	return this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
   }
  }
 }
