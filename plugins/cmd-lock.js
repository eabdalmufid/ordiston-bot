let handler = async (m, { conn, command }) => {
      if (!m.quoted) throw 'Harap reply pesan!'
      if (!m.quoted.fileSha256) throw 'SHA256 Hash Tidak Ditemukan'
      
      let sticker = global.db.data.sticker;
      let hash = m.quoted.fileSha256.toString('hex');
      
      if (!(hash in sticker)) throw 'Hash tidak ditemukan dalam database';
      
      if (command === 'lockcmd') {
          sticker[hash].locked = true;
          conn.reply(m.chat, 'Perintah stiker berhasil dikunci! 🔒', m);
      } else if (command === 'unlockcmd') {
          sticker[hash].locked = false;
          conn.reply(m.chat, 'Perintah stiker berhasil dibuka kunci! 🔓', m);
      } else {
          throw `Perintah tidak valid. Gunakan *${command}cmd* untuk mengunci atau membuka kunci perintah.`;
      }
  };
  
  handler.help = ['lockcmd', 'unlockcmd'];
  handler.tags = ['database'];
  handler.command = /^(un)?lockcmd$/i;
  handler.premium = true;
  
  export default handler;