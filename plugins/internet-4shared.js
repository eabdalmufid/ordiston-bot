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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.4shared search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .4shared search|vpn")
            await m.reply(wait)
            try {
            let url = 'https://www.4shared.com/web/q/?query=' + inputs;
                let res = await scrapeWebsite(url)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📚 *Title:* ${item.title || 'Tidak diketahui'}
🌐 *Link:* ${item.link || 'Tidak diketahui'}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .4shared app|link")
            await m.reply(wait)
            try {
                let item = await getApp(inputs)
                let cap = `🔍 *[ RESULT ]*

📚 *title:* ${item.title || 'Tidak diketahui'}
🆕 *version:* ${item.info.version || 'Tidak diketahui'}
🗂️ *category:* ${item.info.category || 'Tidak diketahui'}
🔄 *lastUpdated:* ${item.info.lastUpdated || 'Tidak diketahui'}
💾 *installs:* ${item.info.installs || 'Tidak diketahui'}
👩‍💻 *developer:* ${item.info.developer || 'Tidak diketahui'}
📱 *requires:* ${item.info.requires || 'Tidak diketahui'}
⭐️ *rating:* ${item.info.rating || 'Tidak diketahui'}
🌐 *googlePlay:* ${item.info.googlePlay || 'Tidak diketahui'}
📥 *apkLink:* ${item.info.apkLink || 'Tidak diketahui'}
`
                await conn.sendFile(m.chat, item.info.ogImageUrl || logo, "", cap, m)
                await conn.sendFile(m.chat, item.link || logo, item.title || 'Tidak diketahui', null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["4shared"]
handler.tags = ["internet"]
handler.command = /^(4shared)$/i
export default handler

/* New Line */
async function scrapeWebsite(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const results = $('.col-xs-12.jsSearchItemColumn.jsVisibleItemColumn').map((index, element) => {
      const $element = $(element);

      return {
        author: $element.find('.author a').text(),
        title: $element.find('.namePlus a').text(),
        link: $element.find('.namePlus a').attr('href'),
        date: $element.find('.date').text(),
        time: $element.find('.time').text(),
        size: $element.find('.meta-info span:contains("Size")').text().replace('Size', '').trim(),
        bitrate: $element.find('.meta-info span:contains("Bitrate")').text().replace('Bitrate', '').trim(),
        tags: $element.find('.meta-tags div').map((index, tagElement) => $(tagElement).text()).get(),
      };
    }).get();

    return results;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}