import fetch from "node-fetch";
import * as cheerio from 'cheerio';

const handler = async (m, { text }) => {
  if (!text) return m.reply('🎵 *Penggunaan:* .songlyrics query|num');
  
  const args = text.split('|');
  const query = args[0].trim();
  const num = parseInt(args[1]) || 1;
  
  const url = `https://www.songlyrics.com/index.php?section=search&searchW=${query}&submit=Search`;
  const data = await songSearch(url);
  
  if (!data || num < 1 || num > data.songs.length) {
    if (!data) {
      return m.reply('❌ Tidak ada hasil untuk pencarian tersebut.');
    } else {
      const songList = data.songs.map((song, index) => `*${index + 1}.* ${song.title} - ${song.artist}`).join('\n');
      return m.reply(`🎵 *Daftar lagu:*\n\n${songList}`);
    }
  }
  
  const lyrics = await songLyrics(data.songs[num - 1].link);
  if (!lyrics) return m.reply('❌ Tidak dapat mengambil lirik lagu.');
  
  await m.reply(lyrics.lyrics);
};

handler.help = ['songlyrics query|num'];
handler.tags = ['internet'];
handler.command = /^(songlyrics)$/i;

export default handler;

async function songSearch(url) {
  try {
    const response = await fetch(url);
    const $ = cheerio.load(await response.text());
    const totalResults = parseInt($('.search-results').text().match(/\d+/)[0]);
    const pageLinks = $('.li_pagination a[href]').map((_, el) => 'https://www.songlyrics.com' + $(el).attr('href')).get();
    const songs = $('.serpresult').map((_, el) => {
      const title = $(el).find('h3 a').text();
      const link = $(el).find('h3 a').attr('href');
      const [artist, album] = $(el).find('.serpdesc-2 p a').map((_, el) => $(el).text()).get();
      const description = $(el).find('.serpdesc-2 p:eq(1)').text();
      return { title, link, artist, album, description };
    }).get();
    return { totalResults, pageLinks, songs };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function songLyrics(url) {
  try {
    const response = await fetch(url);
    const $ = cheerio.load(await response.text());
    return {
      lyrics: $('#songLyricsDiv').text().trim()
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}