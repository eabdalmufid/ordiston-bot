let handler = async (m, { conn, isBotAdmin }) => {
  try {
    const mtype = m.quoted.mtype;
    const settings = {
      'audioMessage': { viewOnce: true },
      'videoMessage': { viewOnce: true },
      'imageMessage': { viewOnce: true },
      'stickerMessage': { isAvatar: true },
      'documentMessage': { viewOnce: true }
    };

    if (settings[mtype]) {
      let doc = m.quoted.mediaMessage;
      Object.assign(doc[mtype], settings[mtype]);
      await conn.relayMessage(m.chat, doc, { quoted: m });
      
      const hapus = m.quoted.sender ? m.message.extendedTextMessage.contextInfo.participant : m.key.participant;
      const bang = m.quoted.id ? m.message.extendedTextMessage.contextInfo.stanzaId : m.key.id;

      if (isBotAdmin) {
        return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }});
      } else {
        return conn.sendMessage(m.chat, { delete: m.quoted.vM.key });
      }
    } else {
      throw "❌ Media type tidak valid!";
    }
  } catch {
    throw 'Terjadi kesalahan';
  }
};

handler.help = ['1time *[reply media]*'];
handler.tags = ['main'];
handler.command = /^(1time)$/i;
export default handler;