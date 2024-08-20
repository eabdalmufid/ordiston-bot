import fetch from "node-fetch"
import cheerio from "cheerio"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let lister = [
        "search",
        "link"

    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) throw "*Example:*\n.stardima search|naruto\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n")

    if (lister.includes(feature)) {
        if (feature == "search") {
            if (!inputs) throw "Input query anime"
            try {
                // Contoh pemanggilan fungsi
                let outs = await searchStardima(inputs)
                let teks = outs.map((anime, index) => {
                    return `*[ ${index + 1} ]*
*Title:* ${anime.title}
*Link:* ${anime.link}
*Image:* ${anime.thumbnail}
   `.trim()
                }).filter(v => v).join("\n\n________________________\n\n")
                await conn.sendFile(m.chat, outs[0].thumbnail, '', teks, m)
            } catch (e) {
                throw eror
            }
        }
        if (feature == "link") {
            if (!inputs) throw "Input query anime"
            try {
                // Contoh pemanggilan fungsi
                let outs = await getLinks(inputs)
                let teks = await Promise.all(outs.map(async (anime, index) => {
                    const convertedLink = await getRedirectLinks(anime.link)
                    const regex = /^(https?:\/\/)?([^\/]+)(\/.*)$/
                    const match = convertedLink.match(regex)

                    return `*[ ${index + 1} ]*
*Title:* ${anime.text} via ${match[2]}
*Link:* ${convertedLink}
`.trim()
                }))

                const message = teks.filter(v => v).join("\n\n________________________\n\n")
                await conn.reply(m.chat, message, m)
            } catch (e) {
                throw eror
            }

        }

    }
}
handler.help = ["stardima type query"]
handler.tags = ["internet"]
handler.command = /^(stardima)$/i
export default handler

async function searchStardima(query) {
    const url = `https://www.stardima.co/watch/?s=${encodeURIComponent(query)}`

    try {
        const response = await fetch(url)
        const html = await response.text()

        const $ = cheerio.load(html)
        const results = []

        $('.result-item').each((index, element) => {
            const thumbnail = $(element).find('.thumbnail img').attr('src')
            const title = $(element).find('.title a').text().trim()
            const encodedLink = $(element).find('.title a').attr('href')
            const link = decodeURIComponent(encodedLink) // Mendekode URL

            const result = {
                thumbnail,
                title,
                link
            }

            results.push(result)
        })

        return results
    } catch (error) {
        console.log('Error:', error)
        return []
    }
}

async function getLinks(url) {
    try {
        const response = await fetch(url)
        const html = await response.text()
        const $ = cheerio.load(html)
        const links = []

        $('a[href*=https://www.stardima.co/watch/links/]').each((index, element) => {
            const link = $(element).attr('href')
            const text = $(element).text()
            links.push({
                link,
                text
            })
        })

        return links
    } catch (error) {
        console.error('Error:', error)
        return []
    }
}

async function getRedirectLinks(url) {
    try {
        const response = await fetch(url)
        const html = await response.text()
        const $ = cheerio.load(html)

        const redirectInput = $('input[type="hidden"][name="redirect"]')
        const redirectValue = redirectInput.val()

        return redirectValue
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}