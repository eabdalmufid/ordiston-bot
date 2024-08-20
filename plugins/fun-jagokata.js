import got from "got"
import cheerio from "cheerio"

let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    if (!text) throw "\nSertakan querinya kak !\n\nContoh: .jagokata Sedih"
    await m.reply(wait)
    try {
    let res = await JagoKata(text)
    let item = res[0]
    let result = `🔍 *[ RESULT ]*

💬 *Quote:* ${item.quote || 'Tidak diketahui'}
🔗 *Link:* ${item.link || 'Tidak diketahui'}
✍️ *Author:* ${item.author || 'Tidak diketahui'}
📝 *Description:* ${item.description || 'Tidak diketahui'}
🕒 *Lifespan:* ${item.lifespan || 'Tidak diketahui'}
👍 *Votes:* ${item.votes || 0}`
    await conn.sendFile(m.chat, item.img || logo, "", result, m)
    } catch (e) {
    await m.reply(eror)
    }
}
handler.help = ["jagokata"]
handler.tags = ["fun"]
handler.command = ["jagokata"]
export default handler

/* New Line */
async function JagoKata(q) {
    const baseUrl = 'https://jagokata.com/'
    const response = await got(baseUrl + 'kata-bijak/kata-' + q + '.html?page=0')
    const $ = cheerio.load(response.body)

    const quotes = []

    $('#citatenrijen li[id^="q"]').each((index, element) => {
        const id = $(element).attr('id')
        const quote = $('.quotebody .fbquote', element).text().trim()
        const link = baseUrl + $('.citaatopties .images-container a', element).attr('href')
        const img = $('.quotebody img', element).attr('data-src').trim()
        const author = $('.quotebody .citatenlijst-auteur a', element).text().trim()
        const description = $('.quotebody .citatenlijst-auteur .auteur-beschrijving', element).text().trim()
        const lifespan = $('.quotebody .citatenlijst-auteur .auteur-gebsterf', element).text().trim()
        const votes = $('.votes-content .votes-positive', element).text().trim()

        quotes.push({
            id,
            quote,
            img,
            link,
            author,
            description,
            lifespan,
            votes
        })
    })

    return quotes
}