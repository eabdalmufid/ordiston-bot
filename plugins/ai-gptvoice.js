import fetch from 'node-fetch';

export async function before(m) {
  const { gptvoice } = global.db.data.chats[m.chat] || {};
  if (m.isBaileys || !gptvoice || !m.text) return false;

  const text = m.text.replace(/[^\x00-\x7F]/g, '').trim();
  if (!text) return false;

  const url = `https://api.yanzbotz.my.id/api/ai/gptvoice?query=${encodeURIComponent(text)}`;

  try {
    
    if (url) {
      await this.sendMessage(m.chat, { audio: { url: url }, fileName: 'response.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: m });

      if (text.trim().toUpperCase() === 'gptvoice stop') {
        gptvoice = false;
        await this.reply(m.chat, `*gptvoice stop success*`, m);
      }
      return true;
    }
  } catch {
    // Handle errors here
  }

  await this.reply(m.chat, `*gptvoice error*`, m);
  return true;
}