import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {

    let lister = [
        "search",
        "info"
    ]
    
    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.kompasiana search|adel\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .kompasiana search|hello")
            await m.reply(wait)
            try {
                let res = await searchArticles(inputs)
                let teks = res.map((v, index) => {
                    return `*[ RESULT ${index + 1} ]*

👤 Author: ${v.author}
🔗 Author url: ${v.author_url}
📅 Date: ${v.date}
📝 Title: ${v.title}
🔗 URL: ${v.url}
🏷️ Tags: ${v.tags}
👀 Views: ${v.views}
👍 Likes: ${v.likes}
💬 Comments: ${v.comments}
   `.trim()
                }).filter(v => v).join("\n\n________________________\n\n")
                
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "info") {
            if (!validateURL(inputs)) return m.reply("Input query link\nExample: .kompasiana get|https://www.kompasiana.com/xxxxx")
            await m.reply(wait)
            try {
                let res = await getArticles(inputs)
            let teks = `*[ Title ]*\n${res.title}\n\n*[ Content ]*\n${res.paragraphs}\n\n*[ Image ]*\n${res.image}`
        await conn.sendFile(m.chat, res.image, "", teks, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["kompasiana type query"]
handler.tags = ["internet"]
handler.command = /^(kompasiana)$/i
export default handler

/* New Line */
async function searchArticles(q) {
  try {
    const response = await fetch('https://www.kompasiana.com/search_artikel?q=' + q);
    const body = await response.text();
    const $ = cheerio.load(body);
    const articles = [];

    $('.timeline--item.timeline--artikel').each((index, element) => {
      const article = {};
const artikelCount = $(element).find('.artikel--count');

      // Extract author information
      article.author = $(element).find('.thumb-user a').text();
      article.author_url  = $(element).find('.thumb-user a').attr('href');
      
      // Extract publication date
      article.date = $(element).find('.date-box').text();

      // Extract article title and URL
      article.title = $(element).find('.artikel--content h2 a').text();
      article.url = $(element).find('.artikel--content h2 a').attr('href');

      // Extract article tags
      article.tags = [];
      $(element).find('.artikel--tag span').each((tagIndex, tagElement) => {
        article.tags.push($(tagElement).text().trim());
      });

      // Extract article statistics
        article.views = formatCount(artikelCount.find('.artikel--count__item:nth-child(1)').text().trim())
        article.likes = formatCount(artikelCount.find('.artikel--count__item:nth-child(2)').text().trim())
        article.comments =formatCount(artikelCount.find('.artikel--count__item:nth-child(3)').text().trim())

      articles.push(article);
    });

    return articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function formatCount(count) {
  const number = parseInt(count);

  if (isNaN(number)) {
    return count;
  }

  if (number >= 1e9) {
    return (number / 1e9).toFixed(1) + 'B';
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + 'M';
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}

async function getArticles(url) {
  try {
    const response = await fetch(url);
    const $ = cheerio.load(await response.text());

    const articleParagraphs = $('.read__keyword p').map((_, el) => $(el).text().trim()).get().join('\n');
    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogTitle = $('meta[property="og:title"]').attr('content');

    return { paragraphs: articleParagraphs, image: ogImage, title: ogTitle };
  } catch (error) {
    console.error(error);
  }
};

function validateURL(url) {
  const regex = /^https:\/\/www\.kompasiana\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
  return regex.test(url)
}
