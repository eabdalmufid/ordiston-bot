import cheerio from "cheerio"
import fetch from "node-fetch"

let handler = async (m, {
    text,
    usedPrefix,
    command
}) => {

    if (!text) return m.reply("Input query")
    await m.reply(wait)
    try {
        let res = await scrapeData(text)
        let teks = transformData(res).map((item, index) => {
            return `🔍 *[ RESULT ${index + 1} ]*

📰 *Title:* ${item.currentTitle} ( ${item.previousTitle} )
🔗 *Url:* ${item.currentLink}`
        }).filter(v => v).join("\n\n________________________\n\n")
        await m.reply(teks)
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["gcwa"].map(v => v + " <apa>")
handler.command = ["gcwa"]
handler.tags = ["random"]
export default handler

function transformData(data) {
    return data.map(({
        currentTitle,
        currentLink,
        previousTitle,
        previousLink
    }) => ({
        currentTitle: currentTitle.replace(/^\*\d+\.\s*/, "").replace(/\*/g, ""),
        currentLink: currentLink.split("?")[0],
        previousTitle: previousTitle.replace(/^(https:\/\/chat\.whatsapp\.com\/[^:]+):?/, "Sebelumnya: ").split("\n")[0],
        previousLink: previousLink.split("?")[0]
    }))
}
async function scrapeData(q) {
    try {
        const response = await fetch("http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=" + q + "&searchby=name") // Ganti URL dengan URL yang sesuai
        const html = await response.text()
        const $ = cheerio.load(html)

        return $(".wa-chat").map((index, element) => ({
            currentTitle: $(element).find(".wa-chat-body .wa-chat-title-container .wa-chat-title .wa-chat-title-text").text().trim(),
            currentLink: $(element).find(".wa-chat-body .wa-chat-title-container a").attr("href"),
            previousTitle: $(element).find(".wa-chat-body .wa-chat-message").text(),
            previousLink: $(element).find(".wa-chat-body .wa-chat-message .URLMessage").attr("href")
        })).get()
    } catch (error) {
        console.log(error)
        return null
    }
}