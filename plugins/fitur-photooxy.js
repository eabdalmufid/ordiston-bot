import got from 'got';
import cheerio from 'cheerio';
import { Maker } from 'imagemaker.js';

const handler = async (m, { conn, args }) => {
  try {
    const input = args.join(' ');

    if (!input) {
      return conn.reply(m.chat, `❌ Please provide the desired effect and order.\n\nUsage: *photooxy effect|order|object1|object2*`, m);
    }

    const [effect, order, ...objects] = input.split('|');

    if (!order) {
      const searchResults = await searchTheme(effect);
      const itemsList = searchResults.map((result, index) => `${index + 1}. ${result.title}`).join('\n');
      return conn.reply(m.chat, `❌ Please provide a valid order.\n\nAvailable options:\n${itemsList}\n\nUsage: *photooxy effect|order|object1|object2*`, m);
    }

    const searchResults = await searchTheme(effect);

    if (isNaN(order) || order <= 0 || order > searchResults.length) {
      const itemsList = searchResults.map((result, index) => `${index + 1}. ${result.title}`).join('\n');
      return conn.reply(m.chat, `❌ Invalid order format or order out of range. Please provide a valid order.\n\nAvailable options:\n${itemsList}\n\nUsage: *photooxy effect|order|object1|object2*`, m);
    }

    const selectedResult = searchResults[order - 1];
    const maker = new Maker();

    const photooxyResult = await maker.PhotoOxy(selectedResult.link, objects);
    const tag = `@${m.sender.split('@')[0]}`;

    await conn.sendMessage(m.chat, {
      image: {
        url: photooxyResult.imageUrl
      },
      caption: `Nih effect *${selectedResult.title}* nya\nRequest by: ${tag}`,
      mentions: [m.sender]
    }, {
      quoted: m,
      ephemeralExpiration: ephemeral
    });
  } catch (error) {
    conn.reply(m.chat, '❌ Error: ' + error.message, m);
  }
};

handler.help = ['photooxy <effect> <text>'];
handler.tags = ['maker'];
handler.command = /^(photooxy)$/i;
export default handler;

async function searchTheme(q) {
  try {
    const baseUrl = 'https://photooxy.com';
    const response = await got(baseUrl + '/search?q=' + encodeURIComponent(q));
    const html = response.body;
    const $ = cheerio.load(html);

    const items = [];

    $('.row.col-sm-12').each((index, element) => {
      const title = $(element).find('.title-effect-home a').text().trim();
      const link = 'https://photooxy.com' + $(element).find('.title-effect-home a').attr('href');
      
      items.push({ title, link });
    });

    return items;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}