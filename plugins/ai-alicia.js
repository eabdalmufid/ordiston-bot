import fetch from 'node-fetch';

export async function before(m) {
  const { alicia } = global.db.data.chats[m.chat] || {};
  if (m.isBaileys || !alicia || !m.text) return false;

  const text = m.text.replace(/[^\x00-\x7F]/g, '').trim();
  if (!text) return false;

  const url = `https://api.azz.biz.id/api/alicia?q=${encodeURIComponent(text)}&user=${m.name}&key=global`;

  try {
    const api = await fetch(url);
    const res = await api.json();

    if (res.respon) {
      await this.reply(m.chat, `*alicia says:*\n${res.respon || ''}`, m);

      if (text.trim().toUpperCase() === 'ALICIA STOP') {
        alicia = false;
        await this.reply(m.chat, `*alicia stop success*`, m);
      }
      return true;
    }
  } catch {
    // Handle errors here
  }

  await this.reply(m.chat, `*alicia error*`, m);
  return true;
}