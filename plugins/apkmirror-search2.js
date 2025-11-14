
import fetch from "node-fetch"
import * as cheerio from 'cheerio';

let handler = async (m, { conn, args, text }) => {
  await m.reply(wait)
  const regex = /\-release\//

  if (!regex.test(text)) return m.reply("input link apkmirror\nakhiran *release* ?")
  try {
    let res = await SearchApk(text)
    let list = res.map((item, index) => `

*Url:* ${item.url}`).join("\n")
    let tops = `*${htki} 📺 Apk Search 🔎 ${htka}*`
    await m.reply(tops + list)
  } catch (e) {
    await m.reply(eror)
  }
}
handler.help = ["apkms2 <query>"]
handler.tags = ["nsfw"]
handler.command = /^(apkms2)$/i
export default handler

async function SearchApk(query) {
  return await fetch(query)
    .then(res => res.text())
    .then(html => {
      const $ = cheerio.load(html);
      const links = [];
      $('a[href$="download/"]').each((i, link) => {
        const title = $(link).text();
        const url = $(link).attr('href');
        links.push({ title: title, url: "https://www.apkmirror.com" + url });
      });
      return links;
    })
}
