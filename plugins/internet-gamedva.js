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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.gamedva search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .gamedva search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApp(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 [ RESULT ${index + 1} ]
📌 *Title:* ${item.title}
🖼️ *Image:* ${item.image}
🔗 *Link:* ${item.link}
📝 *Detail:* ${item.version}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .gamedva app|link")
            try {
                let item = await getDownloadInfo(inputs)
                let cap = `🔍 [ RESULT ]
📌 *Title:* ${item.detail.title} ${item.info}
🔗 *Link:* ${item.detail.links}
📝 *Detail:* ${item.detail.description}
`
                await conn.sendFile(m.chat, item.detail.image, "", cap, m)
                await conn.sendFile(m.chat, item.link, item.detail.title, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["gamedva"]
handler.tags = ["internet"]
handler.command = /^(gamedva)$/i
export default handler

/* New Line */
async function searchApp(query) {
  const response = await fetch('https://gamedva.com/?s=' + query + '&asl_active=1&p_asl_data=1&customset[]=post&asl_gen[]=title&polylang_lang=en&qtranslate_lang=0&filters_initial=1&filters_changed=0'); // Ganti URL dengan URL yang sesuai
  const html = await response.text();

  const $ = cheerio.load(html);
  const results = [];

  $('article.ap-post.ap-lay-c').each((index, element) => {
    const title = $(element).find('.entry-title').text();
    const link = $(element).find('a').attr('href');
    const image = $(element).find('.meta-image img').attr('src');
    const version = $(element).find('.entry-excerpt').text();

    const result = {
      title: title,
      link: link,
      image: image,
      version: version
    };

    results.push(result);
  });

  return results;
}

async function getDownloadInfo(url) {
	const hasQueryString = url.includes('?');
const hasDownloadFileParam = url.includes('?download&file=0');
url = !hasQueryString ? url + '?download&file=0' : (!hasDownloadFileParam ? url + '&download&file=0' : url);
  const response = await fetch(url); // Ganti URL dengan URL yang sesuai
  const html = await response.text();

  const $ = cheerio.load(html);
  let title, links, image, description, author;

  $('meta[property]').each((index, element) => {
    const property = $(element).attr('property');
    const content = $(element).attr('content');

    switch (property) {
      case 'og:title':
        title = content;
        break;
      case 'og:url':
        links = content;
        break;
      case 'og:image':
        image = content;
        break;
      case 'og:description':
        description = content;
        break;
      case 'article:author':
        author = content;
        break;
    }
  });

  const metaData = {
    title,
    links,
    image,
    description,
    author
  };

  const linkElement = $('a#download-now');
  const link = linkElement.attr('href');
  const info = linkElement.find('.progress-text').text().trim();

  const downloadInfo = {
    link: link,
    info: info,
    detail: metaData
  };

  return downloadInfo;
}