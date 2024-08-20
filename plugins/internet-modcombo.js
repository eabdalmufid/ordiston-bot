import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "ori",
        "mod"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.modcombo search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .modcombo search|vpn")
            await m.reply(wait)
            try {
                let res = await Search(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📝 *Title:* ${item.title} ( ${item.alt} )
🔗 *Url:* ${item.href}
🖼️ *Thumb:* ${item.image}
⌚ *Time:* ${item.datetime}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "ori") {
            if (!inputs) return m.reply("Input query link\nExample: .modcombo ori|link")
            try {
                let data = await getInformation(inputs)
                const infoData = data.info;
const formattedInfo = `
ℹ️ *Game Info:*
📖 *Name:* ${infoData.Name}
🔄 *Updated:* ${infoData.Updated}
📱 *Compatible with:* ${infoData['Compatible with']}
🔍 *Last version:* ${infoData['Last version']}
📏 *Size:* ${infoData.Size}
🎮 *Category:* ${infoData.Category}
👨‍💻 *Developer:* ${infoData.Developer}
💰 *Price:* ${infoData.Price}
🔗 *Google Play Link:* ${infoData['Google Play Link']}
🛡️ *MOD:* ${infoData.MOD}
`;
await conn.sendFile(m.chat, data.ogImageUrl, "", formattedInfo, m)
                await conn.sendFile(m.chat, data.downloadInfo.data.link, data.title, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "mod") {
            if (!inputs) return m.reply("Input query link\nExample: .modcombo mod|link")
            try {
                let resl = await getLinks(inputs)
                let res = await getResult(resl.downloadLink)
                let apkname = res.endsWith('APK') ? res.slice(0, -4) : res
                let urls = "https://dlnew.gamestoremobi.com/" + apkname + "-ModCombo.Com.apk"
                let cap = "*Name:* " + resl.downloadText + "\n" + "*Link:* " + resl.downloadLink + "\n\n" + wait
                await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m)
                await conn.sendFile(m.chat, urls, resl.downloadText, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
        
    }
}
handler.help = ["modcombo"]
handler.tags = ["internet"]
handler.command = /^(modcombo)$/i
export default handler

/* New Line */
async function Search(input) {
    const url = 'https://modcombo.com/?s=' + input;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    return $('.blogs.w3 li').map((index, element) => ({
        title: $(element).find('a .title').text(),
        href: $(element).find('a').attr('href'),
        image: $(element).find('img').attr('data-src'),
        alt: $(element).find('img').attr('alt'),
        datetime: $(element).find('time').attr('datetime'),
    })).get();
}

async function getInformation(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const ogImageUrl = $('meta[property="og:image"]').attr('content');
    const [pid, appid] = [$('#ApkOriginal').attr('data-id'), $('#ApkOriginal').attr('data-name')];
    const googlePlayLink = `https://play.google.com/store/apps/details?id=${appid}`;
    const downloadLink = $('.entry-download a.btn-download').attr('href');
    const downloadInfo = await getAPK(pid, appid);

    const info = {};
    $('.apk-info-table tbody tr').each((index, element) => {
      const key = $(element).find('th').text().trim();
      const value = $(element).find('td').text().trim();
      info[key] = value;
    });

    const title = $('.page-title').text().trim();
    const rating = $('.box-stars span.score').text().trim();
    const ratingPercentage = $('.box-stars span.over').attr('style');
    const additionalInfo = `${$('.sbhTitle h2 span').text().trim()}\n${$('#content-desc').text().trim()}`;

    return {
      pid,
      appid,
      title,
      rating,
      ratingPercentage,
      googlePlayLink,
      originalUrl: url,
      downloadLink,
      info,
      additionalInfo,
      downloadInfo,
      ogImageUrl
    };
  } catch (error) {
    throw new Error(`Terjadi kesalahan: ${error}`);
  }
}

async function getAPK(pid, appid) {
  try {
    const response = await axios.post("https://modcombo.com/getapk", JSON.stringify({ pid, appid }), {
      headers: { 'Content-Type': 'application/json' }
    });
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

const fetchHTML = async (url) => {
  const response = await fetch(url);
  return await response.text();
};

const getLinks = async (url) => {
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);
  const ogImageUrl = $('meta[property="og:image"]').attr('content');
  const contentDownload = $('#content-download');
  const downloadLink = contentDownload.find('a').attr('href');
  const downloadText = contentDownload.find('span').text();
  return {
    downloadLink,
    downloadText,
    ogImageUrl
  };
};

const getResult = async (input) => {
  const html = await fetchHTML(input);
  const $ = cheerio.load(html);
  const originalText = $('.bc-title').map((index, element) => {
    const words = $(element).text().trim().split(' ');
    const version = words[words.length - 2];
    const appName = words.slice(0, words.length - 2).join('-');
    return `${appName}-${version}`;
  }).get();
  return originalText[0];
};