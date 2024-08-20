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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apkgk search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apkgk search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApp(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
📚 *Title:* ${item.title || 'Tidak diketahui'}
🌐 *Url:* ${item.href || 'Tidak diketahui'}
🖼️ *Image:* ${item.imageSrc || 'Tidak diketahui'}
📅 *Date:* ${item.date || 'Tidak diketahui'}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apkgk app|link")
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
handler.help = ["apkgk"]
handler.tags = ["internet"]
handler.command = /^(apkgk)$/i
export default handler

/* New Line */
async function searchApp(query) {
  const proxyurl = 'https://files.xianqiao.wang/';
  const response = await fetch(proxyurl + `https://apkgk.com/search/?keyword=${query}`);
  const html = await response.text();

  const $ = cheerio.load(html);
  const items = [];

  $('li').each((index, element) => {
    const item = {
      href: "https://apkgk.com" + $('a', element).attr('href'),
      title: $('a', element).attr('title'),
      imageSrc: "https:" + $('img', element).attr('data-src'),
      date: $('.info-img-dt', element).text().trim(),
    };

    if (Object.values(item).every(value => value !== undefined)) {
      items.push(item);
    }
  });

  return items;
};

async function infoApp(url) {
const proxyurl = 'https://files.xianqiao.wang/';
  try {
    const response = await fetch(proxyurl + url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const data = {
      version: $('div.version span').text().trim(),
      category: $('div.Category span').text().trim(),
      lastUpdated: $('div.last-updated time').text().trim(),
      installs: $('div.Installs a').text().trim(),
      developer: $('div.developer span').text().trim(),
      requires: $('div.Requirements div.item').text().trim(),
      rating: $('div.Content-Rating div.item').text().trim(),
      googlePlay: $('div.Get-it-on a').attr('href'),
      apkLink: 'https://apkgk.com' + $('div.detail-box-download a').attr('href'),
      ogImageUrl: $('meta[property="og:image"]').attr('content')
    };

    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}

async function getApp(url) {
const proxyurl = 'https://files.xianqiao.wang/';
  try {
    const response = await fetch(proxyurl + (url.endsWith('/download') ? url : url + '/download'));
    const html = await response.text();

    const $ = cheerio.load(html);
    const info = await infoApp(proxyurl + (url.replace(/\/download$/, '')));
    const data = {
      title: $('div.program-title h1').text().trim(),
      info: info,
      link: proxyurl + "https:" + $('div.c-download a').attr('href'),
    };

    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}