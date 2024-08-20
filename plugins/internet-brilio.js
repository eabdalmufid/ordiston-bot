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
        "get"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.brilio search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .brilio search|vpn")
            await m.reply(wait)
            try {
                let article = await searchBrilio(inputs)
                let res = filterByBrilioLink(article)
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*
*Title:* ${item.title}
*Url:* ${item.url}
*Image:* ${item.image}
*Date:* ${item.date}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "get") {
            if (!inputs.startsWith('https://m.brilio.net')) return m.reply("Input query link\nExample: .brilio app|link")
            try {
                let item = await getBrilio(inputs)
                
                let cap = `*[ RESULT ]*
*Title:* ${item.title}
*Image:* ${item.image.src}
*Source:* ${item.source}
*Date:* ${item.date}

*Description:*
${item.description}

*Article:*
${item.articleBody}
`
                await conn.sendFile(m.chat, item.image.src, "", cap, m)
                
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["brilio"]
handler.tags = ["internet"]
handler.command = /^(brilio)$/i
export default handler

/* New Line */
async function searchBrilio(query) {
  const url = 'https://m.brilio.net'; // Ganti dengan URL yang sesuai
  const response = await fetch(`${url}/search-result/${query}`);
  const html = await response.text();

  const $ = cheerio.load(html);
  const results = [];

  $('ul.article-berita li').each((index, element) => {
    const $element = $(element);

    const articleTitle = $element.find('.text-article a').text().trim();
    const articleUrl = $element.find('.text-article a').attr('href');
    const articleImage = $element.find('.article-img-index').attr('src');
    const articleDate = $element.find('.index-date').text().trim();

    const articleData = {
      title: articleTitle,
      url: articleUrl.startsWith('https://') ? articleUrl : url + articleUrl,
      image: articleImage,
      date: articleDate
    };

    results.push(articleData);
  });

  return results;
}

async function getBrilio(url) {
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  const articleBody = $('.news-content .main-content')
    .find('p')
    .map((_, el) => $(el).text().trim())
    .get()
    .join('\n\n');

  return {
    date: $('.date-detail').text().trim(),
    title: $('.title-detail').text().trim(),
    description: $('.desc-title-detail').text().trim(),
    image: {
      src: $('figure.headline-index img').attr('data-src'),
      alt: $('figure.headline-index img').attr('alt')
    },
    source: $('.source').text().trim(),
    articleBody: articleBody
  };
}

function filterByBrilioLink(results) {
  return results.filter(article => article.url.startsWith('https://m.brilio.net'));
}