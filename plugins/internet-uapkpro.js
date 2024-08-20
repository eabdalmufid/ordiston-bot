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
        "app"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.uapkpro search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .uapkpro search|vpn")
            await m.reply(wait)
            try {
                let res = await searchUapkpro(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

🔗 *Url:* ${item.url}
📝 *Title:* ${item.title}
📥 *Downloads:* ${item.downloadUrl}
🏷️ *Category:* ${item.category}
⭐ *Rating:* ${item.rating}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .uapkpro app|link")
            try {
                let resl = await getUapkpro(inputs)
                
                let cap = "*Name:* " + resl.supportedAndroid + "\n" + "*Link:* " + resl.downloadLink + "\n\n" + wait
                await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m)
                await conn.sendFile(m.chat, resl.downloadLink, resl.supportedAndroid, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["uapkpro"]
handler.tags = ["internet"]
handler.command = /^(uapkpro)$/i
export default handler

/* New Line */
async function searchUapkpro(q) {
const url = 'https://uapk.pro/?s=' + q; // Ganti dengan URL yang sesuai
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const result = [];

  $('.col-md-2.col-sm-4.col-xs-6').each((index, element) => {
    const obj = {
      title: $(element).find('.inner-box a[href]').text().trim(),
      url: $(element).find('.inner-box a[href]').attr('href'),
      category: $(element).find('.detail .sub-detail a').text().trim(),
      rating: $(element).find('.detail .display-rating').text().trim(),
      downloadUrl: $(element).find('a[href].anchor-hover').attr('href')
    };

    result.push(obj);
  });

  return result;
}

async function getUapkpro(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const ogImageUrl = $('meta[property="og:image"]').attr('content');

  const supportedAndroid = $('p strong').text();
  const title = $('h1').text();
  const downloadLink = $('p a').attr('href');

  const obj = {
    supportedAndroid,
    title,
    downloadLink,
    ogImageUrl
  };

  return obj;
}