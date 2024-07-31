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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apkmaza search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apkmaza search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApkmaza(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
📰 *Title:* ${item.title}
🔗 *Link:* ${item.link}
🖼️ *Image:* ${item.imageSrc}
🔢 *Version:* ${item.version}
🗂️ *Category:* ${item.category}
📝 *Description:* ${item.description}`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apkmaza app|link")
            try {
                let ress = await getApkmaza(inputs)
                let resl = ress[0]
                let cap = `*Title:* ${resl.title}
*Size:* ${resl.fileSize}

${wait}`
                await conn.sendFile(m.chat, logo, "", cap, m)
                await conn.sendFile(m.chat, resl.downloadLink, resl.title, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apkmaza"]
handler.tags = ["internet"]
handler.command = /^(apkmaza)$/i
export default handler

/* New Line */
async function searchApkmaza(query) {
  const response = await fetch(`https://apkmaza.co/?s=${query}`);
  const html = await response.text();

  const $ = cheerio.load(html);
  const objArray = [];

  $('.hentry').each((index, element) => {
    const entry = $(element);
    const link = entry.find('a');
    const image = entry.find('img');
    const title = entry.find('h3');
    const version = entry.find('.small.text-truncate.text-muted.d-flex.align-items-center svg + span');
    const category = entry.find('.small.text-truncate.text-muted.d-flex.align-items-center .text-truncate');
    const description = entry.find('.small.text-muted.d-flex.align-items-center + .small.text-muted.d-flex.align-items-center span');

    const obj = {
      link: link.attr('href'),
      imageSrc: image.attr('src'),
      title: title.text(),
      version: version.text(),
      category: category.text(),
      description: description.text().trim(),
    };

    objArray.push(obj);
  });

  return objArray;
}

async function getApkmaza(url) {
  try {
    const response = await fetch(url.endsWith('/download') ? url : url + '/download');
    const html = await response.text();
    const $ = cheerio.load(html);

    const sections = [];

    $('.accordion-downloads .toggle').each((index, element) => {
      const section = {
        title: $(element).text().trim(),
        link: $(element).attr('href'),
        downloadLink: $(element).next('.collapse').find('a').attr('href'),
        fileSize: $(element).next('.collapse').find('a .whites').text().trim()
      };

      sections.push(section);
    });

    return sections;
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
  }
}