const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;

export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys || !m.isGroup) return false;

  const chat = global.db.data.chats[m.chat];
  const isGroupLink = linkRegex.exec(m.text);
  const kickMessage = isAdmin
    ? `❌ *Tautan Terdeteksi*\nAnda admin grup tidak bisa dikeluarkan dari grup.`
    : `❌ *Tautan Terdeteksi*\nAnda akan dikeluarkan dari grup.`;

  if (chat.antiLink && isGroupLink) {
  	if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return true
        }
    await this.reply(m.chat, kickMessage, null, { mentions: [m.sender] });
    await this.sendMessage(m.chat, { delete: m.key });

    if ((!isBotAdmin && isAdmin) || (isBotAdmin && !isAdmin)) {
      await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      await this.reply(m.chat, kickMessage, null, { mentions: [m.sender] });
      await this.sendMessage(m.chat, { delete: m.key });
    }
  }
  return true;
}

/*const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)
    let hapus = m.key.participant
    let bang = m.key.id

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.reply(m.chat, `*Tautan Terdeteksi* Kami tidak mengizinkan tautan dari grup lain Mohon maaf *@${m.sender.split('@')[0]}* Anda akan dikeluarkan dari grup ${isBotAdmin ? '' : '\n\nSaya bukan admin jadi saya tidak bisa mengeluarkan Anda :"v'}`, null, { mentions: [m.sender] })
        if (isBotAdmin && chat.antiLink) {
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!chat.antiLink) return //m.reply('')
    }
    return !0
}*/