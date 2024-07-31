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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apkcombo search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apkcombo search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApkcombo(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

🔗 *href:* ${item.href}
📰 *title:* ${item.title}
🖼️ *imgSrc:* ${item.imgSrc}
👤 *name:* ${item.name}
✍️ *author:* ${item.author}
📝 *description:* ${item.description}`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apkcombo app|link")
            try {
                let resl = await getapkcombo(inputs)
                
                let cap = "*Name:* " + resl.downloadLink + "\n" + "*Link:* " + resl.downloadLinkURL + "\n\n" + wait
                await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m)
                await conn.sendFile(m.chat, resl.downloadLinkURL, resl.downloadLink, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apkcombo"]
handler.tags = ["internet"]
handler.command = /^(apkcombo)$/i
export default handler

/* New Line */
async function searchApkcombo(q) {
const url = 'https://apkcombo.com/id/search/' + q; // Ganti dengan URL yang sesuai

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const results = [];

    const contentApps = $('.content.content-apps');
    const itemList = contentApps.find('a.l_item');

    itemList.each((index, element) => {
      const item = {
        href: $(element).attr('href'),
        title: $(element).attr('title'),
        imgSrc: $(element).find('img').attr('data-src'),
        name: $(element).find('.name').text(),
        author: $(element).find('.author').text(),
        description: $(element).find('.description').text()
      };

      results.push(item);
    });

    return results;
  } catch (error) {
    console.log(error);
  }
};