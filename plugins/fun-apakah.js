let handler = async (m, { conn, text, args, command }) => {
  if (!args[0]) throw `Gunakan contoh .${command} halo`;

  const answers = ['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin'];
  const answer = pickRandom(answers);

  const replyText = `
🔮 *Pertanyaan:* ${args.join(' ')}
💬 *Jawaban:* ${answer} ${answer === 'Ya' ? '👍' : '👎'}
`.trim();

  await conn.reply(m.chat, replyText, m, m.mentionedJid ? {
    mentions: conn.parseMention(m.text)
  } : {});
}

handler.help = ['apakah'].map(v => v + ' <teks>');
handler.tags = ['kerang', 'fun'];
handler.command = /^apakah$/i;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}