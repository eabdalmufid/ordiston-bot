import { runInNewContext } from 'vm';

const handler = async (m, { conn, text }) => {
  const id = m.chat;
  conn.math = conn.math || {};

  if (id in conn.math) {
    clearTimeout(conn.math[id][3]);
    delete conn.math[id];
    m.reply('🚩 Terdeteksi kamu menggunakan kalkulator saat dalam sesi bermain math.');
    return;
  }

  // Regex dengan karakter spesial yang didukung oleh vm
  const expression = text
    .replace(/[×]/g, '*')
    .replace(/[√]/g, 'Math.sqrt')
    .replace(/(π|pi)/gi, 'Math.PI')
    .replace(/(e)/gi, 'Math.E')
    .replace(/(ln|lg)/gi, match => `Math.${match.toLowerCase()}`)
    .replace(/(sin|cos|tan|asin|acos|atan|atan2)/gi, match => `Math.${match.toLowerCase()}`)
    .replace(/(abs|ceil|floor|round)/gi, match => `Math.${match.toLowerCase()}`)
    .replace(/(min|max)/gi, match => `Math.${match.toLowerCase()}`)
    .replace(/(pow)/gi, match => `Math.${match.toLowerCase()}`)
    .replace(/[!]/g, match => `factorial(${parseInt(match) - 1})`)
    .replace(/[∞]/g, 'Infinity');

  try {
    const result = runInNewContext(expression);
    if (!result) throw result;
    m.reply(`*${text} = ${result}*`);
  } catch (e) {
    if (e === undefined) return m.reply('Isinya?');
    m.reply('🚩 Format salah, hanya simbol + - * / ^ √ π e ln lg sin cos tan asin acos atan atan2 abs ceil floor round min max pow ! ∞ yang disupport.');
  }
};

handler.help = ['kalkulator <soal>'];
handler.tags = ['tools'];
handler.command = /^(calc(ulat(e|or))?|kalk(ulator)?)$/i;

export default handler;