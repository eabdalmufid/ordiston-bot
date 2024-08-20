
import fetch from "node-fetch"
import cheerio from "cheerio"

let handler = async (m, { conn, args, text }) => {
  await m.reply(wait)
  if (!text) return m.reply("input query apkmirror?")
  try {
    let res = await SearchApk(text)
    let list = res.map((item, index) => `

*Title:* ${item.titles}
*Url:* ${item.value}`).join("\n")
    let tops = `*${htki} 📺 Apk Search 🔎 ${htka}*`
    await m.reply(tops + list)
  } catch (e) {
    await m.reply(eror)
  }
}
handler.help = ["apkms <query>"]
handler.tags = ["internet"]
handler.command = /^(apkms)$/i
export default handler

async function SearchApk(query) {
  // Array JSON untuk menyimpan hasil ekstraksi
  const result = []

  // Fetch halaman web
  return await fetch("https://www.apkmirror.com/?s=" + query)
    .then(response => response.text())
    .then(data => {
      // Load HTML dengan Cheerio
      const $ = cheerio.load(data)

      // Cari semua elemen span dengan class "dlx r"
      $(".appRow").each((index, element) => {
        // Ambil link dari a href pada elemen span saat ini
        const link = $(element).find("a").attr("href")
        const titles = $(element).find("a").text()

        // Tambahkan data ke dalam array JSON
        if (link.startsWith("/apk")) {
          result.push({
            titles: titles.split("\n")[0],
            value: "https://www.apkmirror.com" + link.split("#")[0]
          })
        }
      })

      // Tampilkan hasil
      return result
    })
}
