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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.rexdl search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .rexdl search|vpn")
            await m.reply(wait)
            try {
                let res = await searchRexdl(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

🖼️ *Thumbnail:* ${item.thumbnail}
🏷️ *Categories:* ${item.categories}
📅 *Date:* ${item.date}
👤 *Author:* ${item.author}
📝 *Title:* ${item.title}
🔗 *Url:* ${item.titleUrl}
📖 *About:* ${item.excerpt}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .rexdl app|link")
            try {
                let resl = await getRexdl(inputs)
                
                let cap = `📝 *Title:* ${resl.info.headingTitle}
💡 *Version:* ${resl.download.currentVersion}
🔄 *Update:* ${resl.download.updated}
📦 *Size:* ${resl.download.fileSizeDownload}
🔐 *Password:* ${resl.download.password}

📖 *About:* ${resl.info.headingText}

${wait}`
                await conn.sendFile(m.chat, resl.info.imageData, "", cap, m)
                await conn.sendFile(m.chat, resl.download.apkUrls[resl.download.apkUrls.length - 1], resl.info.headingTitle, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["rexdl"]
handler.tags = ["internet"]
handler.command = /^(rexdl)$/i
export default handler

/* New Line */
async function searchRexdl(query) {
  const url = `https://rexdl.com/?s=${query}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const articles = [];

    $('article').each((index, element) => {
      const $article = $(element);
      const thumbnailSrc = $article.find('.post-thumbnail img').attr('data-src');
      const categories = $article.find('.post-category a').map((index, el) => $(el).text()).get();
      const date = $article.find('.post-date time').attr('datetime');
      const author = $article.find('.post-byline .author a').text();
      const title = $article.find('.post-title a').text();
      const titleUrl = $article.find('.post-title a').attr('href');
      const excerpt = $article.find('.entry p').text().trim();

      const articleData = {
        thumbnail: thumbnailSrc,
        categories,
        date,
        author,
        title,
        titleUrl,
        excerpt
      };

      articles.push(articleData);
    });

    return articles;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function getRexdl(url) {
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  const dlbox = $('#dlbox');
  const headingText = $('.entry-inner').text();
  const headingTitle = $('.entry-inner').text().split(",")[0];
  const downloadLink = $('.readdownload a').attr('href');
  const imageData = dlbox.find('img').attr('data-src');
  const dlList = dlbox.find('.dl-list');
  const version = dlList.find('.dl-version span').text().trim();
  const fileSize = dlList.find('.dl-size span').text().trim();
  const sourceLink = dlList.find('.dl-source a').attr('href');

  const info = {
    imageData,
    headingTitle,
    headingText,
    downloadLink,
    version,
    fileSize,
    sourceLink,
  };

  const resdown = await fetch(info.downloadLink);
  const htmldown = await resdown.text();
  const $down = cheerio.load(htmldown);
  const dlboxdown = $down('#dlbox');
  
  const apkUrls = dlboxdown
    .find('a')
    .map((index, element) => $down(element).attr('href'))
    .get()
    .filter(url => url.endsWith('.apk'));

  const updated = dlboxdown.find('li.dl-update span').eq(1).text();
  const currentVersion = dlboxdown.find('li.dl-version span').eq(1).text();
  const fileSizeDownload = dlboxdown.find('li.dl-size span').eq(1).text();
  const password = dlbox.find('li.dl-key span.txt-dl-list').text();

  const download = {
    apkUrls,
    updated,
    currentVersion,
    fileSizeDownload,
    password,
  };

  return { info, download };
}