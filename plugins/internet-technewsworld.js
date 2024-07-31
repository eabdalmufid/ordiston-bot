import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "read"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.tnw search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .tnw search|vpn")
            await m.reply(wait)
            try {
                let res = await searchTNW(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📰 *Title:* ${item.title}
🔗 *Url:* ${item.articleUrl}
🖼️ *Thumb:* ${item.imageUrl}
📆 *Date:* ${item.date}
👤 *Author:* ${item.author}
📰 *Source:* ${item.source}
🔢 *Word Count:* ${item.wordCount}
📝 *Description:* ${item.description}`
                }).filter(v => v).join("\n\n________________________\n\n")

                await m.reply(teks)

            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "read") {
            if (!inputs) return m.reply("Input query link\nExample: .tnw read|link")
            try {
                let item = await detailTNW(inputs)
                let teks = `🔍 *[ RESULT ]*

📰 *Title:* ${item.ogTitle}
🖼️ *Image:* ${item.ogImage}
📝 *Description:* ${item.ogDescription}
🔗 *URL:* ${item.ogUrl}
💬 *Combined Data:*
${item.combinedData}`
                await conn.sendFile(m.chat, item.ogImage, item.ogTitle, teks, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["tnw"]
handler.tags = ["internet"]
handler.command = /^(tnw)$/i
export default handler

/* New Line */

async function searchTNW(q) {
    try {
        const response = await fetch('https://www.technewsworld.com/search-results?keyword=' + q + '&orderby=post_date&order=desc') // Ganti dengan URL halaman yang sesuai
        const html = await response.text()
        const $ = cheerio.load(html)
        const searchItems = []

        $('div.search-item').each((index, element) => {
            const searchItem = {
                imageUrl: $(element).find('img').attr('src'),
                articleUrl: $(element).find('a').eq(0).attr('href'),
                title: $(element).find('h2').text(),
                author: $(element).find('.story-meta li').eq(0).text(),
                date: $(element).find('.story-meta li').eq(1).text(),
                source: $(element).find('.story-meta li').eq(2).text(),
                wordCount: $(element).find('.story-meta li').eq(3).text(),
                description: $(element).find('p').text(),
            }

            searchItems.push(searchItem)
        })

        return searchItems
    } catch (error) {
        console.log('Error:', error)
    }
}

async function detailTNW(url) {
    try {
        const response = await fetch(url)
        const html = await response.text()
        const $ = cheerio.load(html)

        const ogTitle = $('meta[property="og:title"]').attr('content') || ''
        const ogImage = $('meta[property="og:image"]').attr('content') || ''
        const ogDescription = $('meta[property="og:description"]').attr('content') || ''
        const ogUrl = $('meta[property="og:url"]').attr('content') || ''

        const combinedData = $('div.story-content p')
            .map((index, element) => {
                const text = $(element).text()
                const link = $(element).find('a').attr('href') || ''

                return `${text} ${link ? link : ''}`.trim()
            })
            .get()

        return {
            ogTitle,
            ogImage,
            ogDescription,
            ogUrl,
            combinedData: combinedData.join('\n')
        }
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}