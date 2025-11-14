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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apkfolks search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apkfolks search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApp(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*\n\n` +
                        `📢 *title:* ${item.headline || 'Not available'}\n` +
                        `🌐 *url:* ${item.headlineLink || 'Not available'}\n` +
                        `⏰ *dateModified:* ${item.dateModified || 'Not available'}\n` +
                        `📅 *datePublished:* ${item.datePublished || 'Not available'}\n` +
                        `👤 *author:* ${item.author || 'Not available'}\n`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apkfolks app|link")
            await m.reply(wait)
            try {
                let item = await getApp(inputs)
                let cap = `🔍 *[ RESULT ]*
📌 *title:* ${item.title}
🖼️ *image:* ${item.image}
🔗 *url:* ${item.url}
⬇️ *downloadLink:* ${item.link}
💾 *downloadText:* ${item.description}
🔗 *directLink:*
${Object.entries(item.download)
  .map(([key, value]) => { return key + value.trim() })
  .join('\n')}
📋 *apkTechnicalInfo:*
${Object.entries(item.versionInfo)
  .map(([key, value]) => { return key + value.trim() })
  .join('\n')}
`

                let dlnow = Object.values(item.download).filter(url => url.endsWith('.apk')).map(url => url)[0]
                let ini = Object.entries(item.download)
  .map(([key, value]) => { return key + value.trim() })
  .join('\n')

                if (!Object.keys(item.download).length === 0 && !item.download.constructor === Object) {
                await conn.sendFile(m.chat, item.image || logo, "", cap, m)
                await conn.sendFile(m.chat, dlnow || logo, item.title || 'Tidak diketahui', null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
                await m.reply("Download link: " + ini)
                } else {
                await m.reply("Download link: " + item.link)
                }
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apkfolks"]
handler.tags = ["internet"]
handler.command = /^(apkfolks)$/i
export default handler

/* New Line */
async function searchApp(query) {
    const url = `https://apkfolks.com/?s=${query}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    return $('article').map((index, element) => ({
        articleId: $(element).attr('id'),
        articleClass: $(element).attr('class'),
        headline: $(element).find('h2.entry-title a').text().trim(),
        headlineLink: $(element).find('h2.entry-title a').attr('href'),
        dateModified: $(element).find('time.updated').attr('datetime'),
        datePublished: $(element).find('time.entry-date.published').attr('datetime'),
        author: $(element).find('.author-name').text().trim(),
    })).get();
}

async function getApp(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const link = $('.wp-block-button__link').attr('href');
    const linkdl = await getAppDown(link)
    const description = $('.entry-content p').first().text();

    const versionInfoTable = $('table').first();
    const versionInfo = {};
    versionInfoTable.find('tr').each((index, element) => {
        const key = $(element).find('td').first().text();
        const value = $(element).find('td').last().text();
        versionInfo[key] = ': ' + value;
    });

    const downloadSection = $('h2:contains("Download")').parent();
    const downloadInfo = {};
    downloadSection.find('p').each((index, element) => {
        const key = $(element).find('strong').text().replace(':', '');
        const value = $(element).find('a').attr('href');
        downloadInfo[key] = value;
    });

    return {
        title: $('meta[property="og:title"]').attr('content'),
        image: $('meta[property="og:image"]').attr('content'),
        url: $('meta[property="og:url"]').attr('content'),
        link,
        download: linkdl.downloadInfo,
        description,
        versionInfo
    };
}

async function getAppDown(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const downloadSection = $('.entry-content .su-box.su-box-style-default');

    const image = downloadSection.find('.wp-block-image img').attr('src');

    const versionInfoTable = downloadSection.find('.wp-block-table');
    const versionInfo = {};
    versionInfoTable.find('tr').each((index, element) => {
        const key = $(element).find('td').eq(0).text();
        const value = $(element).find('td').eq(1).text();
        versionInfo[key] = value;
    });

    const downloadInfo = {};
    downloadSection.find('.wp-block-button a').each((index, element) => {
        const key = `${index + 1}`;
        const value = $(element).attr('href');
            downloadInfo[key] = value;
    });

    return {
        image,
        versionInfo,
        downloadInfo
    };
}