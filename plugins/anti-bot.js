export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true
    let chat = global.db.data.chats[m.chat]
    let sender = global.db.data.chats[m.sender]
    let hapus = m.key.participant
    let bang = m.key.id
    if (chat.antiBot) {
      if (m.isBaileys && m.fromMe == false){
          if (isAdmin || !isBotAdmin){		  
          } else {
            m.reply(`*Bot Lain Terdeteksi*\n\nMaaf Kak Harus Saya Keluarkan, Karna Admin Mengaktifkan Anti Bot :)`)
      return await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
          }return true
      }
    }
    return true
  }