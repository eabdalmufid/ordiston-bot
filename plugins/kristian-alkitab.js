import got from "got"
import cheerio from "cheerio"

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} kejadian`
  try {
  let result = await searchAlkitab(text)
  let hasil = `🔍 *[ RESULT ]*\n\n${result.map(item => `📌 *Title:* ${item.title}\n🔗 *Link:* ${item.link}\n📝 *Description:* ${item.description}\n`).join('\n________________________\n')}`
  await m.reply(hasil)
  } catch (e) {
    await m.reply(eror)
  }
}
handler.help = ["alkitab"].map(v => v + " <pencarian>")
handler.tags = ["kristian"]
handler.command = /^(alkitab)$/i
export default handler

async function searchAlkitab(q) {
  const url = "https://alkitab.me/search?q=" + q

  try {
    const { body } = await got(url)
    const $ = cheerio.load(body)
    const results = []

    $("#main.search-results .vw").each((index, element) => {
      if (index !== 0) {
        const link = $(element).find("a").attr("href")
        const title = $(element).find("a").text().trim()
        const description = $(element).find("p.vc").text().trim()

        results.push({ title, link, description })
      }
    })

    return results
  } catch (error) {
    console.error("Error:", error.message)
    return []
  }
}