import got from "got"
import * as cheerio from 'cheerio';
import fetch from "node-fetch"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
    await m.reply(wait)

    if (command == "samehadaurl") {
            let res = await getPlayUrl(text)
            let cap = `🔗 *Short* : ${await shortUrl(res[0].src)}\n🔗 *Full* : ${res[0].src}\n`
            await conn.reply(m.chat, cap, m)
    } else {
        try {
            let res = await getLinks("https://samehada.care/?s=" + text + "&post_type%5B%5D=post&post_type%5B%5D=tv")
            let teks = res.map((v, index ) => {
                return `*[ ${index + 1} ]*
🔖 *Title* : ${v.title}
🔗 *Link* : ${v.url}
   `.trim()
            }).filter(v => v).join("\n\n________________________\n\n")
            await m.reply(teks)
        } catch (e) {
            throw eror
        }
    }
}
handler.help = ["samehada"]
handler.tags = ["internet"]
handler.command = /^samehada|samehadaurl$/i
export default handler

/* New Line */
async function getLinks(url) {
  const response = await got(url);
  const $ = cheerio.load(response.body);
  const links = [];
  $("a.button.gmr-watch-button").each(function() {
    const link = {
      title: $(this).attr("title"),
      url: $(this).attr("href"),
      text: $(this).text().trim()
    };
    links.push(link);
  });
  return links;
}

async function getPlayUrl(url) {
  const response = await got(url);
  const $ = cheerio.load(response.body);
  const iframes = [];
  $('iframe').each(function() {
    const src = $(this).attr('src');
    const iframe = {
      src: src,
      frameborder: $(this).attr('frameborder')
    };
    if (src && !src.includes('a-ads')) { // Tambahkan kondisi untuk memfilter link yang mengandung "ads"
      iframes.push(iframe);
    }
  });
  return iframes;
}

async function shortUrl(url) {
	return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
}