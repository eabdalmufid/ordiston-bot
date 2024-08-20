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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apkdone search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apkdone search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApkdone(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

🔗 *Url:* ${item.href}
📰 *Title:* ${item.title}
🖼️ *Image:* ${item.imageSrc}
📱 *App:* ${item.appName}
🔢 *Version:* ${item.version}
⬇️ *Downloads:* ${item.downloads}
🗂️ *Category:* ${item.category}`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apkdone app|link")
            try {
                let resl = await getApkdone(inputs)
                
                let cap = "*Name:* " + inputs.split('/')[3] + "\n" + "*Link:* " + resl.links[0] + "\n\n" + wait
                await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m)
                await conn.sendFile(m.chat, resl.links[0], inputs.split('/')[3], null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apkdone"]
handler.tags = ["internet"]
handler.command = /^(apkdone)$/i
export default handler

/* New Line */
async function searchApkdone(q) {
const url = 'https://apkdone.com/?s=' + q + '&post_type=post'; // Ganti dengan URL yang sesuai
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const result = [];

    $('a.column.app').each((index, element) => {
      const item = {
        href: $(element).attr('href'),
        title: $(element).attr('title'),
        imageSrc: $(element).find('img').attr('src'),
        appName: $(element).find('b').text(),
        version: $(element).find('.tag.vs').text(),
        downloads: $(element).find('.tag').eq(1).text().trim(),
        category: $(element).find('span').last().text(),
      };

      result.push(item);
    });

    return result;
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
}

async function getApkdone(url) {
  const response = await fetch(url.endsWith('/download') ? url : url + '/download');
  const html = await response.text();
  const $ = cheerio.load(html);
  const imgElement = $('article.column.app.is-large img');
  const imageLink = imgElement.attr('src');
  
  return {
    links: $('script[type="text/javascript"]')
      .map((index, element) => $(element).html())
      .get()
      .filter(scriptText => scriptText.includes('hole.apkdone.download'))
      .map(scriptText => scriptText.match(/https?:\/\/hole\.apkdone\.download\/[^\s]+/g))
      .filter(matches => matches !== null)
      .flat()
      .map(link => link.replace(/"$/, '')),
    ogImageUrl: imageLink
  };
}