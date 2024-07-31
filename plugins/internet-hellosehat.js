import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "detail"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.hellosehat search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .hellosehat search|vpn")
            await m.reply(wait)
            try {
                let res = await searchhellosehat(inputs)
                let teks = res.result.map((item, index) => {
  return `🔍 *[ RESULT ${index + 1} ]*

📚 Title: ${item.title}
🔗 Link: ${item.link}
📅 Date: ${item.time}
📖 Description: ${item.desc}
👤 Author: ${item.author}
`;
}).join("\n\n________________________\n\n");
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "detail") {
            if (!inputs) return m.reply("Input query link\nExample: .hellosehat search|group")
            await m.reply(wait)
            try {
                let item = await detailhellosehat(inputs)
                let cap = `🔍 *[ RESULT ]*

${item}
`
                await m.reply(item)
                
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["hellosehat"]
handler.tags = ["internet"]
handler.command = /^(hellosehat)$/i
export default handler

/* New Line */
async function searchhellosehat(query) {
  try {
    const encodedQuery = encodeURIComponent(query); // Encode the query parameter
    const url = `https://wp.hellosehat.com/?s=${encodedQuery}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const $ = cheerio.load(await response.text());

    const results = $('.card.article--card')
      .map((index, element) => {
        const article = $(element);
        const title = article.find('h2.entry-title a').text().trim();
        const link = article.find('h2.entry-title a').attr('href');
        const desc = article.find('.entry-summary p').text().trim();
        const author = article.find('.author.vcard a').text().trim();
        const time = article.find('time.entry-date.published').attr('datetime');
        return title && desc ? { title, link, desc, author, time } : null;
      })
      .get()
      .filter(Boolean);

    if (!results.length) throw new Error('No matching results found.');

    const total = parseInt($('.search--result-count').text()) || 0;
    return { total, result: results };
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

async function detailhellosehat(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const $ = cheerio.load(await response.text());
    $('style, script, frame').remove();
    const validTags = ['p', 'h2'];
    let result = '';

    const processElement = (element) => {
      if (element.type === 'text') {
        const text = element.data && element.data.trim();
        if (text) {
          result += text + '\n';
        }
      } else if (element.type === 'tag') {
        const tagName = element.name && element.name.toLowerCase();
        if (validTags.includes(tagName)) {
          const text = $(element).text().trim();
          if (text) {
            result += text + '\n\n';
          }
        }
      }
    };

    $('body *').each((index, element) => {
      const tagName = element.name && element.name.toLowerCase();
      if (validTags.includes(tagName)) {
        processElement(element);
      }
    });

    $('img').remove();
    result = result.replace(/<img.*?>/g, '');

    return result.trim();
  } catch (error) {
    throw new Error('Error fetching the page: ' + error.message);
  }
}