import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, text, command }) => {
  if (!text || !text.includes('|')) {
    const [query, num] = text.split('|');
    if (!query) throw '❌ Masukkan query untuk mencari gambar di 500px.\nContoh penggunaan: 500px dog';
    const res = await fetchData(query);
    if (res.length === 0) throw `❌ Tidak ada hasil untuk query '${query}'.`;
    const listMessage = res.map((v, index) => `*${index + 1}.* ${v.name}\n🖼️ *Gambar:* ${v.images[0].https_url}\n⌚ *Waktu:* ${v.times_viewed} Views\n🔗 *Link:* https://500px.com${v.url}\n⏳ *Rating:* ${v.rating}`).join('\n\n');
    const message = `⚡ 500px Search 🔎\n*Teks yang Anda kirim:* ${query}\n\nKetik ulang *${usedPrefix + command}* untuk memilih list urutan.\n\n${listMessage}`;
    return conn.reply(m.chat, message, m);
  } else {
    const [query, num] = text.split('|');
    const res = await fetchData(query);
    const index = parseInt(num.trim());
    if (index <= 0 || index > res.length) throw `❌ Indeks list tidak valid. Harap pilih indeks list yang valid.`;
    const selectedResult = res[index - 1];
    const image = selectedResult.images.sort((a, b) => b.size - a.size)[0];
    const caption = `🖼️ *Gambar:* ${image.https_url}\n⌚ *Waktu:* ${selectedResult.times_viewed} Views\n🔗 *Link:* https://500px.com${selectedResult.url}\n⏳ *Rating:* ${selectedResult.rating}`;
    return conn.sendFile(m.chat, image.https_url, "", caption, m);
  }
};

handler.help = ['500px'];
handler.tags = ['internet'];
handler.command = /^500px$/i;

export default handler;

/* New Line */
async function fetchData(query) {
  const response = await fetch(`https://api.500px.com/v1/photos/search?type=photos&q=${encodeURIComponent(query)}&image_size=3&rpp=5`);
  const data = await response.json();
  return data.photos;
}