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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apps4 search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apps4 search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApps4(inputs)
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*
*Title:* ${item.title}
*Url:* ${item.href}
*Thumb:* ${item.imageSrc}
*Developer:* ${item.developer}
*Version:* ${item.version}
*Rating:* ${item.rating}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apps4 app|link")
            try {
                let gdl = await getDownloadLinks(inputs)
                let gmd = await getMetaData(gdl[0].downloadLink)
                let scrap = await mediafireDl(gmd.url)
                let cap = `*💌 Name:* ${scrap[0].nama}
*📊 Size:* ${scrap[0].size}
*🗂️ Extension:* ${scrap[0].mime}

${wait}`
                await conn.sendFile(m.chat, gmd.image, "", cap, m)
                await conn.sendFile(m.chat, scrap[0].link, scrap[0].nama, "", m, null, { mimetype: scrap[0].mime, asDocument: true })
                
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apps4"]
handler.tags = ["internet"]
handler.command = /^(apps4)$/i
export default handler

/* New Line */
async function searchApps4(query) {
const url = 'https://www.apps4download.com/?s=' + query; // Ganti dengan URL yang sesuai
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);
    const sections = [];

    $('.bloque-app').each((index, element) => {
      const section = {
        href: $(element).find('a').attr('href'),
        imageSrc: $(element).find('img').attr('data-src'),
        altText: $(element).find('img').attr('alt'),
        title: $(element).find('.title').text().trim(),
        developer: $(element).find('.developer').text().trim(),
        version: $(element).find('.version').text().trim(),
        rating: $(element).find('.stars').attr('style').match(/width:(\d+)%/)[1]
      };

      sections.push(section);
    });

    return sections;
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
  }
}

async function getDownloadLinks(url) {
  try {
    const response = await fetch(url.endsWith('/?download=links') ? url : url + '/?download=links');
    const html = await response.text();

    const $ = cheerio.load(html);
    const downloadLinks = $('ul.show_download_links > li > a').map((index, element) => {
      const downloadLink = $(element).attr('href');
      const title = $(element).text().trim();

      return {
        downloadLink,
        title
      };
    }).get();

    return downloadLinks;
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
  }
}

async function getMetaData(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const metaTags = $('meta[property^="og"]');
    const metaData = {};

    metaTags.each((index, element) => {
      const property = $(element).attr('property');
      const content = $(element).attr('content');
      metaData[property.slice(3)] = content;
    });

    return metaData;
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
    return null;
  }
}

async function mediafireDl(url) {
const res = await fetch(url) 
const $ = cheerio.load(await res.text())
const results = []
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
const seplit = link.split('/')
const nama = seplit[5]
const mimes = nama.split('.')
const mime = mimes[1]
results.push({ nama, mime, size, link })
return results
}