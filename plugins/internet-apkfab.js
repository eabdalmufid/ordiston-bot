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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apkfab search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apkfab search|vpn")
            await m.reply(wait)
            try {
                let res = await fetchSearchResults(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 [ RESULT ${index + 1} ]
📚 *title:* ${item.title}
🔗 *link:* ${item.link}
🖼️ *image:* ${item.image}
⭐ *rating:* ${item.rating}
📝 *review:* ${item.review}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apkfab app|link")
            try {
                let resl = await fetchDownloadDetails(inputs)
                let cap = "*Name:* " + resl.title + "\n" + "*Link:* " + resl.link + "\n\n" + wait
                await conn.sendFile(m.chat, logo, "", cap, m)
                await conn.sendFile(m.chat, resl.downloadURL, resl.title, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apkfab"]
handler.tags = ["internet"]
handler.command = /^(apkfab)$/i
export default handler

/* New Line */
async function fetchSearchResults(q) {
  try {
    const url = 'https://apkfab.com/search?q=' + q; // Ganti dengan URL yang sesuai

    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);

    const results = $('.list-template.lists .list').map((index, element) => {
      return {
        title: $(element).find('.title').text().trim(),
        link: $(element).find('a').attr('href'),
        image: $(element).find('.icon img').attr('data-src'),
        rating: $(element).find('.other .rating').text().trim(),
        review: $(element).find('.other .review').text().trim(),
      };
    }).get();

    return results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

async function fetchDownloadDetails(url) {
  try {
    const response = await fetch(url.endsWith('/download') ? url : url + '/download');
    const body = await response.text();

    const $ = cheerio.load(body);

    const title = $('.download_button_box a.down_btn').attr('title');
    const link = $('.download_button_box a.down_btn').attr('href');
    const downloadURL = `https://d.apkpure.com/b/APK/${link.split("/")[4]}?version=latest`;

    return { title, link, downloadURL}
  } catch (error) {
    console.error('Error fetching download details:', error);
  }
}