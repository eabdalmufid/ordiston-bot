let handler = async (m, { conn }) => {
    try {
      const chatIdsToDelete = Object.values(conn.chats).filter(item => /@g\.us$/.test(item.id)).map(item => item.id);
      const deletedGroupCount = chatIdsToDelete.length;
      for (const id of chatIdsToDelete) {
        await conn.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, id);
      }
      await conn.reply(m.chat, `*Jumlah grup:* ${deletedGroupCount}`, m);
    } catch (error) {
      console.error(error);
      await conn.reply(m.chat, 'Terjadi kesalahan dalam menghapus grup.', m);
    }
  }
  handler.help = ['clearchat']
  handler.tags = ['owner']
  handler.owner = false
  handler.command = /^(clearcha?t)$/i;
  
  export default handler;