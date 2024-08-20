import cheerio from "cheerio"
import fetch from "node-fetch"
let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let lister = [
        "search",
        "list",
        "chord"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.chordtela search|adel\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join('\n'))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .chordtela artist|adelle")
            await m.reply(wait)
            try {
                // Contoh penggunaan:
                let repack = inputs
                let input = await getChordUrl(repack)
                let res = await fetchChordData(input, repack)
                let teks = res.map((v, index) => {
                    return `*[ ${index + 1} ]*
🔖 *Title* : ${v.name}
🔗 *Link* : ${v.url}
   `.trim()
                }).filter(v => v).join("\n\n________________________\n\n")
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "list") {
            if (!validateURL(inputs)) return m.reply("Input query link\nExample: .chordtela list|https://www.chordtela.com/chord/adella")
            await m.reply(wait)
            try {
                let outs = await getList(inputs)
                const teks = outs.map((v, index) => {
                    return `*[ ${index + 1} ]*
*Label:* ${v.title}
*Link:* ${v.href}
   `.trim()
                }).filter(v => v).join("\n\n________________________\n\n")
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "chord") {
            if (!validateURL(inputs)) return m.reply("Input query link\nExample: .chordtela chord|https://www.chordtela.com/2016/06/adele-rolling-in-deep.html")
            await m.reply(wait)
            try {
                let teks = await getChord(inputs)
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }

    }
}
handler.help = ["chordtela type query"]
handler.tags = ["internet"]
handler.command = /^(chordtela)$/i
export default handler

/* New Line */
function getChordUrl(input) {
    let huruf = input.charAt(0).toLowerCase()
    let chordtela = "https://www.chordtela.com/chord-gitar-"

    if (huruf >= "a" && huruf <= "b") {
        return chordtela + "a-b"
    } else if (huruf >= "c" && huruf <= "d") {
        return chordtela + "c-d"
    } else if (huruf >= "e" && huruf <= "f") {
        return chordtela + "e-f"
    } else if (huruf >= "g" && huruf <= "h") {
        return chordtela + "g-h"
    } else if (huruf >= "i" && huruf <= "j") {
        return chordtela + "i-j"
    } else if (huruf >= "k" && huruf <= "l") {
        return chordtela + "k-l"
    } else if (huruf >= "m" && huruf <= "n") {
        return chordtela + "m-n"
    } else if (huruf >= "o" && huruf <= "p") {
        return chordtela + "o-p"
    } else if (huruf >= "q" && huruf <= "r") {
        return chordtela + "q-r"
    } else if (huruf >= "s" && huruf <= "t") {
        return chordtela + "s-t"
    } else if (huruf >= "u" && huruf <= "v") {
        return chordtela + "u-v"
    } else if (huruf >= "w" && huruf <= "x") {
        return chordtela + "w-x"
    } else if (huruf >= "y" && huruf <= "z") {
        return chordtela + "y-z"
    }

    return null // Jika input tidak cocok dengan awalan yang ditentukan
}

async function fetchChordData(url, input) {

    try {
        return await fetch(url)
            .then(response => response.text())
            .then(body => {
                const $ = cheerio.load(body)
                const artists = []

                $('tbody tr td span.name').each((index, element) => {
                    const artistName = $(element).text()
                    const artistUrl = $(element).parent().attr('href')

                    if (artistName.toLowerCase().includes(input.toLowerCase())) {
                        artists.push({
                            name: artistName,
                            url: artistUrl
                        })
                    }
                })

                return (artists)
            })
    } catch (error) {
        console.error('Error fetching chord data:', error)
        return null
    }
}

async function getList(url) {
    try {
        const response = await fetch(url)
        const html = await response.text()
        const $ = cheerio.load(html)
        const resultList = []

        $('ul.archive-list li').each((index, element) => {
            const title = $(element).find('a').text()
            const href = $(element).find('a').attr('href')
            resultList.push({
                title,
                href
            })
        })

        return resultList
    } catch (error) {
        console.log(error)
        return []
    }
}

async function getChord(url) {
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)
    const result = {}

    $('div').each((index, element) => {
        const divId = $(element).attr('id')
        const divText = $(element).text()
        result[divId] = divText
    })

    return result.main
}

function validateURL(url) {
  const regex = /^https:\/\/www\.chordtela\.com\/(?:chord\/[a-zA-Z0-9-]+|20[0-9]{2}\/[0-9]{2}\/[a-zA-Z0-9-]+\.html)$/;
  return regex.test(url)
}