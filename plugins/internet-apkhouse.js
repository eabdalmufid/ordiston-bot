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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apkhouse search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apkhouse search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApkhouse(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

🔗 *Url:* ${item.href}
🖼️ *Image:* ${item.imageSrc}
📰 *Title:* ${item.title}
👩‍💻 *Developer:* ${item.developer}
🔢 *Version:* ${item.version}
⭐️ *Rating:* ${item.rating}`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apkhouse app|link")
            try {
                let resl = await getApkhouse(inputs)
                
                let cap = "*Name:* " + resl[0].text + "\n" + "*Link:* " + resl[0].link + "\n\n" + wait
                await conn.sendFile(m.chat, resl[0].ogImageUrl, "", cap, m)
                await conn.sendFile(m.chat, resl[0].link, resl[0].text, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apkhouse"]
handler.tags = ["internet"]
handler.command = /^(apkhouse)$/i
export default handler

/* New Line */
async function searchApkhouse(q) {
	const url = 'https://apk-house.com/?s=' + q;
const response = await fetch(url);
    const html = await response.text();
  const $ = cheerio.load(html);
  const appElements = $('.bloque-app');

  const apps = appElements.map((index, element) => {
    const appElement = $(element);
    const linkElement = appElement.find('a');
    const imageElement = appElement.find('img');
    const titleElement = appElement.find('.title');
    const developerElement = appElement.find('.developer');
    const versionElement = appElement.find('.version');
    const ratingElement = appElement.find('.stars');

    return {
      href: linkElement.attr('href'),
      imageSrc: imageElement.attr('data-src'),
      alt: imageElement.attr('alt'),
      title: titleElement.text().trim(),
      developer: developerElement.text().trim(),
      version: versionElement.text().trim(),
      rating: ratingElement.attr('style').replace('width:', '').replace('%', '').trim(),
    };
  }).get();

  return apps;
}

async function getApkhouse(url) {
	const response = await fetch(url.endsWith('?download=links') ? url : url + '?download=links');
    const html = await response.text();
  const $ = cheerio.load(html);
  const downloadElements = $('.bx-download li');

  const downloads = downloadElements.map((index, element) => {
    const downloadElement = $(element);
    const linkElement = downloadElement.find('a');

    return {
      link: linkElement.attr('href'),
      text: linkElement.text().trim(),
      ogImageUrl: $('meta[property="og:image"]').attr('content')
    };
  }).get();

  return downloads;
}