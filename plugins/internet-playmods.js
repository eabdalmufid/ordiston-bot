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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.playmods search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .playmods search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApp(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 [ RESULT ${index + 1} ]
🔗 *link:* ${item.link}
📌 *title:* ${item.title}
📋 *menu:* ${item.menu}
📝 *detail:* ${item.detail.replace(/\n/g, ' ')}
🖼️ *image:* ${item.image}
⬇️ *downloadText:* ${item.downloadText}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .playmods app|link")
            try {
                let item = await getApp(inputs)
                let cap = `🔍 [ RESULT ]
📌 *Title:* ${item.title}
🖼️ *Image:* ${item.image}
👤 *Name:* ${item.name}
⭐ *Score:* ${item.score}
📅 *Edisi:* ${item.edisi}
📏 *Size:* ${item.size}
🎨 *Create:* ${item.create}
🔗 *Link:* ${item.link}
📝 *Detail:* ${item.detail}
📷 *Screenshots:* \n${generateList(item.screenshots)}
🔍 *Describe:* \n${addNewline(item.describe)}
`
                await conn.sendFile(m.chat, item.screenshots[0], "", cap, m)
                await conn.sendFile(m.chat, item.link, item.title, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["playmods"]
handler.tags = ["internet"]
handler.command = /^(playmods)$/i
export default handler

/* New Line */
async function searchApp(q) {
  try {
    const url = 'https://m.playmods.net/id/search/' + q; // Ganti dengan URL sumber HTML

    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const dataArray = [];

    $('a.beautify.ajax-a-1').each((index, element) => {
      const $element = $(element);

      const data = {
        link: 'https://m.playmods.net' + $element.attr('href'),
        title: $element.find('.common-exhibition-list-detail-name').text().trim(),
        menu: $element.find('.common-exhibition-list-detail-menu').text().trim(),
        detail: $element.find('.common-exhibition-list-detail-txt').text().trim(),
        image: $element.find('.common-exhibition-list-icon img').attr('data-src'),
        downloadText: $element.find('.common-exhibition-line-download').text().trim(),
      };

      dataArray.push(data);
    });
    return dataArray;
  } catch (error) {
    console.log(error);
  }
}

async function getApp(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const data = {
      title: $('h1.name').text().trim(),
      image: $('.icon').attr('src'),
      name: $('.app-name span').text().trim(),
      score: $('.score').text().trim(),
      edisi: $('.edition').text().trim(),
      size: $('.size .operate-cstTime').text().trim(),
      create: $('.size span').text().trim(),
      link: $('a.a_download').attr('href'),
      detail: $('.game-describe-gs').text().trim(),
      screenshots: $('.swiper-slide img').map((index, element) => $(element).attr('data-src')).get(),
      describe: $('.datail-describe-pre div').text().trim(),
    };

    return data;
  } catch (error) {
    console.log(error);
  }
}

function generateList(array) {
  const list = array.map((item, index) => `${index + 1}. ${item}`).join('\n');
  return list;
}

function addNewline(text) {
  const newText = text.replace(/•/g, '\n•');
  return newText;
}