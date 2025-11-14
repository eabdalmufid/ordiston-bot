import * as cheerio from 'cheerio';
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
        "app"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.revdl search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .revdl search|vpn")
            await m.reply(wait)
            try {
                let res = await searchRevdl(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📝 *title:* ${item.title}
🔗 *titleUrl:* ${item.titleUrl}
🖼️ *imageUrl:* ${item.imageUrl}
🏷️ *categoryTags:* ${item.categoryTags}
👤 *postedBy:* ${item.postedBy}
📅 *postDate:* ${item.postDate}
📖 *excerpt:* ${item.excerpt}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .revdl app|link")
            try {
                await m.reply("Not features")
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["revdl"]
handler.tags = ["internet"]
handler.command = /^(revdl)$/i
export default handler

/* New Line */

async function searchRevdl(query) {
  const url = `https://www.revdl.com/?s=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const results = $('.full-left').map((index, element) => {
      const $element = $(element);
      const titleLink = $element.find('.post-title a');
      
      return {
        title: titleLink.text().trim(),
        titleUrl: titleLink.attr('href'),
        imageUrl: $element.find('img').attr('src'),
        categoryTags: $element.find('.entry_categories a').map((index, el) => $(el).text()).get(),
        postedBy: $element.find('.vcard .fn').text().trim(),
        postDate: $element.find('.post-date').text().trim(),
        excerpt: $element.find('.maga-excerpt p').text().trim()
      };
    }).get();

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}