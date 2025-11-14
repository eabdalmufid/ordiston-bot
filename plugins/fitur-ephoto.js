import got from 'got';
import * as cheerio from 'cheerio';
import { Maker } from 'imagemaker.js';

const handler = async (m, { conn, args }) => {
  try {
    const input = args.join(' ');

    if (!input) {
      return conn.reply(m.chat, `❌ Please provide the desired effect and order.\n\nUsage: *ephoto effect|order|object1|object2*`, m);
    }

    const [effect, order, ...objects] = input.split('|');

    if (!order) {
      const searchResults = await searchTheme(effect);
      const itemsList = searchResults.map((result, index) => `${index + 1}. ${result.title}`).join('\n');
      return conn.reply(m.chat, `❌ Please provide a valid order.\n\nAvailable options:\n${itemsList}\n\nUsage: *ephoto effect|order|object1|object2*`, m);
    }

    const searchResults = await searchTheme(effect);

    if (isNaN(order) || order <= 0 || order > searchResults.length) {
      const itemsList = searchResults.map((result, index) => `${index + 1}. ${result.title}`).join('\n');
      return conn.reply(m.chat, `❌ Invalid order format or order out of range. Please provide a valid order.\n\nAvailable options:\n${itemsList}\n\nUsage: *ephoto effect|order|object1|object2*`, m);
    }

    const selectedResult = searchResults[order - 1];
    const maker = new Maker();

    const ephotoResult = await maker.Ephoto360(selectedResult.link, objects);
    const tag = `@${m.sender.replace(/@.+/, '')}`;

    await conn.sendMessage(m.chat, {
      image: {
        url: ephotoResult.imageUrl
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

handler.help = ['ephoto'].map(v => v + ' <effect> <text>');
handler.tags = ['maker'];
handler.command = /^(ephoto)$/i;
export default handler;

async function searchTheme(q) {
  try {
    const baseUrl = 'https://en.ephoto360.com';
    const response = await got(baseUrl + '/index/search?q=' + q);
    const $ = cheerio.load(response.body);

    const items = [];

    $('.col-md-4 .title-effect-home').each((index, element) => {
      const title = $(element).text();
      const link = baseUrl + $(element).parent().attr('href');

      items.push({ title, link });
    });

    return items;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}