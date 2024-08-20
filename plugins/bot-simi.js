import fetch from 'node-fetch';

export async function before(m) {
  if (m.isBaileys || !global.db.data.chats[m.chat]?.simi || !m.text) return false;

  const text = m.text.replace(/[^\x00-\x7F]/g, '').trim();
  if (!text) return false;

  const urls = [
    `https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=id`,
    `http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=${encodeURIComponent(text)}`
  ];

  for (const url of urls) {
    try {
      const api = await fetch(url);
      const res = await api.json();

      if (res.success || res.cnt) {
        await this.reply(m.chat, `*Simi says:*\n${res.success || res.cnt}`, m);

        // Check if the command exactly matches 'SIMI STOP' (case-insensitive)
        if (text.trim().toUpperCase() === 'SIMI STOP') {
          global.db.data.chats[m.chat].simi = false;
          await this.reply(m.chat, `*Simi stop success*`, m);
        }
        return true;
      }
    } catch {
      continue;
    }
  }

  await this.reply(m.chat, `*Simi error*`, m);
  return true;
}