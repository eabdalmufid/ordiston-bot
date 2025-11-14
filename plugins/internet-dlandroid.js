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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.dlandroid search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .dlandroid search|vpn")
            await m.reply(wait)
            try {
                let res = await searchDlandroid(inputs)
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*

📚 *Title:* ${item.title}
📝 *Description:* ${item.description}
📅 *Date:* ${item.date}
🔖 *Categories:* ${item.categories}
🔗 *Link:* ${item.downloadLink}`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .dlandroid app|link")
            try {
                let resl = await getDlandroid(inputs)
                
                let cap = `🌟 *Title:* ${resl.title}
⭐️ *Rating:* ${resl.rating}
📱 *Requires:* ${resl.requiresAndroid}
💾 *Size:* ${resl.fileSize}

${wait}`

                await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m)
                await conn.sendFile(m.chat, resl.downloadLink, resl.title, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["dlandroid"]
handler.tags = ["internet"]
handler.command = /^(dlandroid)$/i
export default handler

/* New Line */
async function searchDlandroid(query) {
  const url = `https://dlandroid.com/?s=${encodeURIComponent(query)}`; // Ganti dengan URL pencarian yang sesuai
  const proxyurl = "https://corsproxy.io/?";
  try {
    const response = await fetch(proxyurl + url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const posts = $('div.post').map((index, element) => {
      const postElement = $(element);
      return {
        title: postElement.find('a.onvan > h2').eq(0).text().trim(),
        description: postElement.find('div.matn-post > p').text(),
        date: postElement.find('span.info').eq(0).text().trim(),
        categories: postElement.find('span.info').eq(1).find('a').map((index, el) => $(el).text()).get(),
        downloadLink: postElement.find('a.more').attr('href')
      };
    }).get();

    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getDlandroid(url) {
const proxyurl = "https://corsproxy.io/?";
  try {
    const response = await fetch(proxyurl + url.endsWith('/download') ? proxyurl + url : proxyurl + url + '/download');
    const html = await response.text();
    const $ = cheerio.load(html);
    
    return {
      rating: $('span.rateshow').text(),
      title: $('a.img-n').attr('title'),
      ogImageUrl: $('meta[property="og:image"]').attr('content'),
      downloadLink: $('div.bilorda a#dllink').attr('href'),
      requiresAndroid: $('ul.infodl li:nth-child(1)').text().trim().split(':')[1].trim(),
      fileSize: $('ul.infodl li:nth-child(2)').text().trim().split(':')[1].trim(),
      help: $('div.help a').map((index, element) => ({
        buttonText: $(element).find('button').text(),
        link: $(element).attr('href')
      })).get()
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}