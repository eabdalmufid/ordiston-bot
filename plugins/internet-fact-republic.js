import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
            await m.reply(wait)
            try {
                let item = await getRandomFact()
                let cap = `🔍 *[ RESULT ]*

📚 Title: ${item.title}
🔗 Link: ${item.source}
📖 Description: ${item.description}
`
                await conn.sendFile(m.chat, item.image || logo , "", cap, m)
            } catch (e) {
                await m.reply(eror)
            }
}
handler.help = ["factrepublic"]
handler.tags = ["internet"]
handler.command = /^(factrepublic)$/i
export default handler

/* New Line */
async function getRandomFact() {
  try {
  const url = 'https://factrepublic.com/random-facts-generator/';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch the page');
    const html = await response.text();
    const $ = cheerio.load(html);
    const randomIndex = Math.floor(Math.random() * $('.td-item').length);
    const randomFactElement = $('.td-item').eq(randomIndex);
    return {
      title: randomFactElement.find('.td-sml-current-item-title').text(),
      description: randomFactElement.find('.td-sml-description p').text(),
      image: randomFactElement.find('img').attr('src'),
      source: randomFactElement.find('.source').attr('href'),
    };
  } catch (error) {
    throw new Error('An error occurred while fetching or parsing the data');
  }
}