let handler = async (m, { conn, text }) => {
  const answers = ['Iya', 'Sudah pasti', 'Sudah pasti bisa', 'Tidak', 'Tentu tidak', 'Sudah pasti tidak'];
  const answer = pickRandom(answers);

  const replyText = `
🔮 *Pertanyaan:* ${m.text}
💬 *Jawaban:* ${answer} ${answer === 'Iya' ? '👍' : '👎'}
`.trim();

  await conn.reply(m.chat, replyText, m, m.mentionedJid ? {
    mentions: conn.parseMention(m.text)
  } : {});
}

handler.help = ['benarkah'].map(v => v + ' <text>');
handler.tags = ['kerang'];
handler.command = /^benarkah/i;
handler.owner = false;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}