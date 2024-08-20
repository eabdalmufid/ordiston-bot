const handler = async (m, { conn }) => {
    conn.storyData = conn.storyData ? conn.storyData : {};
    
        const list = conn.story || [];
        if (list.length === 0) {
            return await conn.reply(m.chat, `Tidak ada cerita yang tersedia saat ini. Silakan tambahkan cerita dengan mengirim gambar, video, atau pesan suara.`, m, { mentions: [m.sender] });
        }
    
        const formatMessage = (obj, index) => {
      const { type, sender, caption } = obj;
      const messageType = convertMessageType(type);
      const senderUsername = sender.split('@')[0];
      let text = `*${index + 1}.* ${messageType.toUpperCase()} - @${senderUsername}`;
      if (caption) text += `\n${caption}`;
      return text + `\n`;
    };
    
    const formattedMessages = list.map(formatMessage).join('\n');
    
        let { key } = await conn.reply(
            m.chat,
            `🔧 Daftar Story:\n\n${formattedMessages}\n\nBalas pesan ini dengan nomor cerita yang ingin ditampilkan.`,
            m,
            { mentions: [m.sender] }
        );
        conn.storyData[m.chat] = { list, key, timeout: setTimeout(() => { conn.sendMessage(m.chat, { delete: key }); delete conn.storyData[m.chat]; }, 60 * 1000)};
    };
    
    handler.before = async (m, { conn }) => {
    conn.storyData = conn.storyData ? conn.storyData : {};
    if (m.isBaileys || !(m.chat in conn.storyData)) return;
    
        if (!conn.storyData[m.chat]) return;
        const { list, key } = conn.storyData[m.chat];
        if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
        const index = parseInt(m.text.trim());
    
        if (isNaN(index) || index < 1 || index > list.length) {
      await conn.reply(m.chat, "⚠️ Masukkan nomor video yang valid.", m);
      } else {
        const selectedObj = list[index - 1];
        if (selectedObj.type === 'imageMessage' || selectedObj.type === 'videoMessage') {
            const caption = selectedObj.caption ? selectedObj.caption : '';
            await conn.sendFile(m.chat, selectedObj.buffer, '', caption, selectedObj.quoted, false, { mentions: [m.sender] });
        } else if (selectedObj.type === 'audioMessage') {
            await conn.sendFile(m.chat, selectedObj.buffer, '', '', selectedObj.quoted);
        } else if (selectedObj.type === 'extendedTextMessage') {
            const message = selectedObj.message ? selectedObj.message : '';
            await conn.reply(m.chat, message, selectedObj.quoted, { mentions: [m.sender] });
        }
        clearTimeout(conn.storyData[m.chat].timeout);
        delete conn.storyData[m.chat];
        }
    };
    
    handler.help = ["botsw", "listsw"];
    handler.tags = ["search"];
    handler.command = /^(botsw|listsw)$/i;
    handler.limit = true;
    
    export default handler;
    
    function convertMessageType(messageType) {
      const messageTypes = {
        'videoMessage': 'video',
        'imageMessage': 'gambar',
        'audioMessage': 'vn',
        'extendedTextMessage': 'teks',
      };
      return messageTypes[messageType] || 'unknown';
    }