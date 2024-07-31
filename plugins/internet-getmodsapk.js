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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.modsapk search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .modsapk search|vpn")
            await m.reply(wait)
            try {
                let res = await searchGetmodsapk(inputs)
                let teks = res.map((item, index) => {
                  return `🔍 *[ RESULT ${index + 1} ]*
                  
📰 *Title:* ${item.title}
🔗 *Url:* ${item.url}
🖼️ *Image:* ${item.image}
🏷️ *Label:* ${item.label}
🗂️ *Category:* ${item.category}
🔢 *Version:* ${item.version}
📏 *Size:* ${item.size}`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .modsapk app|link")
            try {
                let res = await getLinks(inputs);
    let lis = await getLinkList(res.link);
    let resl = await getDown(lis[0].link);
                let cap = `*Title:* ${resl.ogTitle}
*Size:* ${resl.size}
${wait}`
                await conn.sendFile(m.chat, logo, "", cap, m)
                await conn.sendFile(m.chat, resl.link, resl.ogTitle, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["modsapk"]
handler.tags = ["internet"]
handler.command = /^(modsapk)$/i
export default handler

/* New Line */
async function searchGetmodsapk(query) {
  const searchUrl = `https://getmodsapk.com/search/${query}`; // Ganti dengan URL pencarian yang sesuai

  try {
    const response = await fetch(searchUrl);
    const html = await response.text();

    const $ = cheerio.load(html);
    const data = [];

    $('.post-item').each((index, element) => {
      const post = {};

      post.title = $(element).find('.post-content h3 a').text().trim().replace(/\s+/g, ' ');
      post.url = $(element).find('.post-content h3 a').attr('href');
      post.image = encodeURI($(element).find('.post-content img').attr('src').trim().replace(/\s+/g, ' '));
      post.label = $(element).find('.post-content .label').text().trim().replace(/\s+/g, ' ');
      post.category = $(element).find('.post-content p').text().trim().replace(/\s+/g, ' ');
      post.version = $(element).find('li:nth-child(2) .text-gray-500').text().trim().replace(/\s+/g, ' ');
      post.size = $(element).find('li:nth-child(3) .text-gray-500').text().trim().replace(/\s+/g, ' ');

      data.push(post);
    });

    return data;
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
    return null;
  }
}

async function getLinks(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const downloadElement = $('#download a');
    const downloadLink = downloadElement.attr('href');
    const downloadText = downloadElement.text().trim();

    const downloadSizeMatch = downloadText.match(/\((\d+)\sMB\)/);
    const downloadSize = downloadSizeMatch ? downloadSizeMatch[1] : '';

    return {
      link: downloadLink,
      text: downloadText,
      size: downloadSize
    };
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
    return null;
  }
}

async function getLinkList(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const downloadItems = [];

    $('li.mb-2').each((index, element) => {
      const spanElement = $(element).find('span.closed');
      const downloadLinkElement = $(element).find('div a');
      const downloadSizeMatch = downloadLinkElement.text().match(/APK (\d+.\d+) MB/);

      downloadItems.push({
        title: spanElement.text().trim(),
        link: downloadLinkElement.attr('href'),
        size: downloadSizeMatch ? downloadSizeMatch[1] : ''
      });
    });

    return downloadItems;
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
    return null;
  }
}

async function getDown(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const ogImageElement = $('meta[property="og:image"]');
    const ogTitleElement = $('meta[property="og:title"]');
    const downloadDiv = $('div[download-process-box]');
    const downloadLinkElement = downloadDiv.next('a[download-button]');
    const downloadSizeMatch = downloadLinkElement.text().match(/APK (\d+.\d+) MB/);

    return {
      ogImage: ogImageElement.attr('content'),
      ogTitle: ogTitleElement.attr('content'),
      link: encodeURI(downloadLinkElement.attr('href')),
      size: downloadSizeMatch ? downloadSizeMatch[1] : ''
    };
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
    return null;
  }
}