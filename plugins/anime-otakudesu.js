
import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { conn, text }) => {
  const [subcommand, query] = text.split('|').map(str => str.trim().toLowerCase());

  if (!subcommand || !query) {
    return m.reply('Masukkan command dengan benar. Contoh: .otakudesu search|nama_anime');
  }

  let reply = '';

  const searchHeader = 'Hasil pencarian:';
  const episodeHeader = 'Daftar episode:';
  const downloadHeader = 'Download link:';

  const separator = '========================';

  if (subcommand === 'search') {
    const searchResults = await searchData(query);
    if (searchResults && searchResults.length > 0) {
      reply = searchResults
        .map(result => `✨ *${result.title}*\n🔗 Link: ${result.link}\n🎭 Genre: ${result.genres.join(', ')}\n⚖️ Status: ${result.status}\n⭐️ Rating: ${result.rating}\n`)
        .join(`\n${separator}\n`);
      reply = searchHeader + '\n' + separator + '\n' + reply;
    } else {
      reply = 'Maaf, tidak ditemukan hasil pencarian.';
    }
  } else if (subcommand === 'episode') {
    const episodeResults = await episodeData(query);
    if (episodeResults && episodeResults.episodes.length > 0) {
      reply = episodeResults.episodes
        .map(episode => `📺 Episode: ${episode.title}\n🔗 Link: ${episode.url}\n📅 Tanggal: ${episode.date}\n`)
        .join(`\n${separator}\n`);
      reply = episodeHeader + ' ' + `untuk *${episodeResults.title}*\n` + separator + '\n' + reply;
    } else {
      reply = 'Maaf, tidak ditemukan informasi episode.';
    }
  } else if (subcommand === 'download') {
    const downloadResults = await linkDownloadData(query);
    if (downloadResults) {
      reply = downloadResults.episodes
        .map(episode => {
          const links = episode.links.map(link => `🔗 ${link.text}: ${link.url}`).join('\n');
          return `📺 Episode: ${episode.title}\n${links}\n💾 Size: ${episode.size}\n`;
        })
        .join(`\n${separator}\n`);
      reply = downloadHeader + ' ' + `untuk *${downloadResults.title}*\n🔗 Stream: ${downloadResults.frame}\n` + separator + '\n' + reply;
    } else {
      reply = 'Maaf, tidak ditemukan link download.';
    }
  } else if (subcommand === 'video') {
    const videoLink = await videoData(query);
      let doc = {
            video: {
                url: videoLink
            },
            mimetype: "video/mp4",
            caption: "*[ Result ]*"
        }

        await conn.sendMessage(m.chat, doc, {
            quoted: m,
            ephemeralExpiration: ephemeral
        })
  } else {
    reply = 'Subcommand tidak valid.';
  }

  m.reply(reply);
};

handler.help = ['otakudesu'];
handler.tags = ['anime'];
handler.command = /^(otakudesu)$/i;

export default handler;

// Existing searchData, linkDownloadData, and episodeData functions are the same.

async function searchData(q) {
  const url = 'https://otakudesu.asia/?s=' + q; // Ganti URL dengan URL Anda
  
  try {
    const response = await fetch(url);
    const htmlData = await response.text();
    const $ = cheerio.load(htmlData);

    const results = $('.chivsrc li').map((index, element) => {
      const genres = $(element).find('.set a[rel="tag"]').map((i, el) => $(el).text()).get();
      const status = $(element).find('.set:contains("Status")').text()?.replace('Status : ', '');
      const rating = parseFloat($(element).find('.set:contains("Rating")').text()?.replace('Rating : ', ''));

      return {
        title: $(element).find('h2 a').text() || 'Tidak diketahui',
        link: $(element).find('h2 a').attr('href') || 'Tidak diketahui',
        genres: genres.length ? genres : ['Tidak diketahui'],
        status: status || 'Tidak diketahui',
        rating: isNaN(rating) ? 'Tidak diketahui' : rating,
      };
    }).get();

    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function linkDownloadData(url) {
  //const url = 'https://otakudesu.lol/episode/wpoiec-episode-1057-sub-indo/';

  try {
    const response = await fetch(url);
    const htmlData = await response.text();
    const $ = cheerio.load(htmlData);
    const iframeSrc = $('#lightsVideo iframe').attr('src');
    const episodes = $('.download li').map((index, element) => {
      const title = $(element).find('strong').text();
      const links = $(element).find('a').map((index, linkElement) => ({
        text: $(linkElement).text().trim(),
        url: $(linkElement).attr('href'),
      })).get();
      const size = $(element).find('i').text().trim();

      return { title, links, size };
    }).get();

    const details = {
      title: $('h4').text().trim(),
      frame: iframeSrc,
      episodes,
    };

    console.log(JSON.stringify(details, null, 2));
    return details;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function episodeData(url) {
  //const url = 'https://otakudesu.lol/anime/op-sub-indo/';

  try {
    const response = await fetch(url);
    const htmlData = await response.text();
    const $ = cheerio.load(htmlData);
const episodes = [];

    $('.episodelist ul li').each((index, element) => {
      const title = $(element).find('a').text().trim();
      const url = $(element).find('a').attr('href');
      const date = $(element).find('.zeebr').text().trim();

      episodes.push({
        title,
        url,
        date,
      });
    });

    const details = {
      title: $('.monktit').text().trim(),
      episodes,
    };

    console.log(JSON.stringify(details, null, 2));
    return details;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function videoData(url) {
//const url = 'https://desustream.me/beta/stream/?id=b3JuTHFFWkJGMG8ybnF4WFBCTXczdz09';

  try {
    const response = await fetch(url);
    const html = await response.text();
    const regex = /sources:\s*(\[.*?\])/;
    const matches = html.match(regex);
    if (matches) {
      const jsonObject = JSON.parse(matches[1].replace(/'/g, '"'));
      return jsonObject[0].file;
    } else {
      throw new Error('Data not found');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
    throw error;
  }
}