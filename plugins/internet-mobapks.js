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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.mobapks search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .mobapks search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApp(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 [ RESULT ${index + 1} ]
🔗 *link:* ${item.link}
📌 *title:* ${item.title}
📝 *detail:* ${item.category}
🖼️ *image:* ${item.image}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .mobapks app|link")
            try {
                let item = await getApp(inputs)
                let cap = `🔍 [ RESULT ]
📌 *title:* ${item.caption}
✨ *version:* ${item.info.version}
⭐️ *ratings:* ${item.info.ratings}
🔧 *require:* ${item.info.require}
📦 *size:* ${item.info.size}
⬇️ *download:* ${item.info.download}
🔄 *update:* ${item.info.update}
🗂️ *category:* ${item.info.category}
${wait}
`
                await m.reply(cap)
                await conn.sendFile(m.chat, item.downloadLink, item.caption, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["mobapks"]
handler.tags = ["internet"]
handler.command = /^(mobapks)$/i
export default handler

/* New Line */
async function searchApp(q) {
  const url = 'https://mobapks.com/?s=' + q; // Ganti dengan URL yang sesuai

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const articles = [];

    $('.vce-post').each((index, element) => {
      const $element = $(element);

      const title = $element.find('.entry-title a').text().trim();
      const image = $element.find('.meta-image img').attr('src');
      const category = $element.find('.meta-category a').text().trim();
      const link = $element.find('.entry-title a').attr('href');

      articles.push({ title, image, category, link });
    });

    return articles;
  } catch (error) {
    console.error(error);
  }
}

async function getApp(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('h2 span').first().text();
    const caption = $('p.wp-caption-text').first().text();
    const infoTable = $('table').eq(0);
    const infoRows = infoTable.find('tr');
    const downloadLink = await getLink(url);
    const ogImage = $('meta[property="og:image"]').attr('content');

    const info = {
      version: infoRows.eq(0).find('td').eq(1).text(),
      ratings: infoRows.eq(1).find('td').eq(1).text(),
      require: infoRows.eq(2).find('td').eq(1).text(),
      size: infoRows.eq(3).find('td').eq(1).text(),
      download: infoRows.eq(4).find('td').eq(1).text(),
      update: infoRows.eq(5).find('td').eq(1).text(),
      category: infoRows.eq(6).find('td').eq(1).find('a').text()
    };

    const aboutFeatures = $('h2 span').last().parent().nextAll('p');

    const features = aboutFeatures.map((index, element) => $(element).text()).get();

    const data = {
      title,
      caption,
      downloadLink,
      ogImage,
      info,
      features
    };

    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

async function getLink(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const scriptTag = $('.entry-content script');

    const scriptText = scriptTag.html();
    const regex = /<form([^>]*)>(.*?)<\/form>/; // Pola regex untuk mencocokkan tag <form>
    const match = regex.exec(scriptText);

    if (match && match[2]) {
      const formContent = match[2];
      const $form = cheerio.load(formContent);
      const urlInput = $form('input[name="url"]');
      const urlValue = urlInput.val();
      return urlValue;
    }
  } catch (error) {
    console.error(error);
  }
}