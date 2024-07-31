import fetch from "node-fetch";
import cheerio from 'cheerio';

const handler = async (m, { text }) => {
  if (!text) return m.reply('🎵 *Penggunaan:* .laguplus query|num');
  
  const args = text.split('|');
  const query = args[0].trim();
  const num = parseInt(args[1]) || 1;
  
  const data = await songSearch(query);
  
  if (!data || num < 1 || num > data.length) {
    if (!data) {
      return m.reply('❌ Tidak ada hasil untuk pencarian tersebut.');
    } else {
      const songList = data.map((song, index) => `*${index + 1}.* ${song.title} - ${song.author}`).join('\n');
      return m.reply(`🎵 *Daftar lagu:*\n\n${songList}`);
    }
  }
  
  const lyrics = await songLyrics(data[num - 1].link);
  if (!lyrics) return m.reply('❌ Tidak dapat mengambil lirik lagu.');
  
  await m.reply(lyrics.lirik);
};

handler.help = ['laguplus query|num'];
handler.tags = ['internet'];
handler.command = /^(laguplus)$/i;

export default handler;

async function songSearch(q) {
  try {
  	const url = 'https://www.liriklaguplus.com/search?q=' + q + '&m=1'; // Ganti dengan URL yang sesuai
    const html = await (await fetch(url)).text();
    const $ = cheerio.load(html);

    return $('article.post').map((index, article) => ({
      title: $(article).find('h2.post-title a').text(),
      link: $(article).find('h2.post-title a').attr('href'),
      snippet: $(article).find('.post-snippet').text(),
      author: $(article).find('.post-info1 .vcard .fn').text(),
      publishedDate: $(article).find('.post-info1 time.published').attr('datetime')
    })).get();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function songLyrics(url) {
  try {
    const html = await (await fetch(url)).text();
    const $ = cheerio.load(html);
    const [judulLagu, penyanyi, pencipta, album, lirik] = [
      $('h2').text(), $('Penyanyi').text(), $('Pencipta').text(), $('Album').text(), $('blockquote').text()
    ];
    return { judulLagu, penyanyi, pencipta, album, lirik };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}