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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.appvn search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .appvn search|vpn")
            await m.reply(wait)
            try {
                let res = await searchAppVn(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
📢 *title:* ${item.title}
🌐 *url:* ${item.url}
🖼️ *image:* ${item.image}
🔖 *version:* ${item.version}
📅 *date:* ${item.date}
👤 *author:* ${item.author}
🔗 *detailLink:* ${item.detailLink}
`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .appvn app|link")
            await m.reply(wait)
            try {
                let item = await getAppVn(inputs)
                let cap = `🔍 *[ RESULT ]*
📢 *version:* ${item.about.version}
🔒 *req:* ${item.about.req}
📅 *latestUpdate:* ${item.about.latestUpdate}
⬇️ *downloadLink:* ${item.about.downloadLink}
📝 *descriptionTitle:* ${item.about.descriptionTitle}
💬 *descriptionShort:* ${item.about.descriptionShort}
✒️ *descriptionFull:* ${item.about.descriptionFull}
📸 *screenshots:*\n• ${item.about.screenshots.join('\n• ')}
`
                await conn.sendFile(m.chat, item.about.ogImage || logo, "", cap, m)
                await conn.sendFile(m.chat, item.download.url || logo, item.about.ogTitle || 'Tidak diketahui', null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["appvn"]
handler.tags = ["internet"]
handler.command = /^(appvn)$/i
export default handler

/* New Line */
async function searchAppVn(query) {
const link = "https://appvn.com"
  const response = await fetch(link + "/android/search?keyword=" + query); // Ganti URL dengan URL yang sesuai
  const body = await response.text();

  const $ = cheerio.load(body);
  const resultArray = [];

  $("div.section-content li.item").each((index, element) => {
    const item = {
      title: $(element).find("div.info > a").text().trim(),
      url: link + $(element).find("div.info > a").attr("href"),
      image: $(element).find("img.lazy").attr("data-src"),
      version: $(element).find("div.vol-chap.ver.text-left > p:first-child").text().trim(),
      date: $(element).find("div.vol-chap.ver.text-left > p.new-chap").text().trim(),
      author: $(element).find("div.new-chap.author > a").text().trim(),
      detailLink: link + $(element).find("div.btn.btn-download > a").attr("href"),
    };

    resultArray.push(item);
  });

  return resultArray;
}

async function infoAppVn(url) {
const link = "https://appvn.com"
  try {
    const response = await fetch(url); // Ganti URL dengan URL sumber data Anda
    const html = await response.text();
    const $ = cheerio.load(html);

    const infoTab = $('#info');

    const data = {
      version: infoTab.find('p:nth-child(1)').text().trim().replace('Version: ', ''),
      req: infoTab.find('p:nth-child(2)').text().trim().replace('Req: ', ''),
      latestUpdate: infoTab.find('p:nth-child(3)').text().trim().replace('Latest update: ', ''),
      downloadLink: link + $('.btn-download a').attr('href'),
      descriptionTitle: $('#des h2').text().trim(),
      descriptionShort: $('#des span._without_desc').text().trim(),
      descriptionFull: $('#des span._full_desc div').text().trim(),
      screenshots: $('#screenshots img').map((_, element) => $(element).attr('src')).get(),
      ogTitle: $('meta[property="og:title"]').attr('content'),
      ogImage: $('meta[property="og:image"]').attr('content')
    };

    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getAppVn(url) {
const data = await infoAppVn(url)

  try {
    const response = await fetch(data.downloadLink); // Ganti URL dengan URL sumber data Anda
    const html = await response.text();
    const $ = cheerio.load(html);

    const infoDiv = $('#info');

    const onclickValue = infoDiv.find('.btn-download a').attr('onclick');
    const matches = onclickValue.match(/dowload\('([^']*)', '([^']*)', '([^']*)', '([^']*)'\);return false;/);
    const downloadArgs = matches.slice(1);

    const get_app = await downloadApk(downloadArgs[0], downloadArgs[1], downloadArgs[2], downloadArgs[3])

    const downloadObj = {
      versionId: downloadArgs[0],
      sopcastId: downloadArgs[1],
      packageName: downloadArgs[2],
      versionCode: downloadArgs[3],
      about: data,
      download: get_app
    };

    return downloadObj;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function downloadApk(latestVersion, sopcastId, package_name, version_code = 0) {
try {
    const response = await fetch('https://appvn.com/link-download-direct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latest: latestVersion,
        sopcast_id: sopcastId,
        package_name: package_name,
        version_code: version_code,
      }),
    });

    const data = await response.json();
    return data;
    } catch (error) {
    console.error('Error:', error);
  }
}