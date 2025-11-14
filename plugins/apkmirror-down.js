
import fetch from "node-fetch"
import * as cheerio from 'cheerio';

let handler = async (m, { conn, args, text }) => {
  const regex = /\-download\//

  if (!regex.test(text)) return m.reply("input link apkmirror\nakhiran *download* ?")
  try {
    let res = await DownApk(text)
    let res2 = await DownApk(res[0].url)
    let str = text.split("/")[5]
    let words = str.split('-')
    let capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    let names = capitalizedWords.join(' ')
    await m.reply(wait)
    await conn.sendFile(m.chat, res2[0].url, names, null, m, true, { quoted: m, mimetype: "application/vnd.android.package-archive" })
  } catch (e) {
    await m.reply(eror)
  }
}
handler.help = ["apkmdown <query>"]
handler.tags = ["nsfw"]
handler.command = /^(apkmdown)$/i
export default handler

async function DownApk(query) {
  return await fetch(query)
    .then(res => res.text())
    .then(html => {
      const $ = cheerio.load(html)
      const links = []
      $('a[href*="key="]').each((i, link) => {
        const title = $(link).text().replace(/\n/g, '')
        const url = $(link).attr('href')
        links.push({ title: title, url: "https://www.apkmirror.com" + url })
      })
      return links
    })
}
