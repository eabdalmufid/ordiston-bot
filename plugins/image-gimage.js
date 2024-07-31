import fetch from "node-fetch"
import axios from "axios"
import cheerio from "cheerio"
import {
    googleImage
} from "@bochilteam/scraper"
import {
    readFileSync
} from "fs"
const dylux = await (await import("api-dylux")).default
import got from "got"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "v1",
        "v2",
        "v3",
        "v4"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature.toLowerCase())) return m.reply("*Example:*\n.image search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v.toUpperCase()).join("\n"))

    if (lister.includes(feature.toLowerCase())) {

        if (feature == "v1") {
            if (!inputs) return m.reply("Input query link\nExample: .image search|jokowi")
            await m.reply(wait)
            try {
                let res = await GoogleImage(inputs)
                let teks = "🔍 *[ RESULT ]*"
                await conn.sendFile(m.chat, res.getRandom() || logo, "", teks, m)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "v2") {
            if (!inputs) return m.reply("Input query link\nExample: .image search|jokowi")
            await m.reply(wait)
            try {
                let res = await googleImage(inputs)
                let teks = "🔍 *[ RESULT ]*"
                await conn.sendFile(m.chat, res.getRandom() || logo, "", teks, m)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "v3") {
            if (!inputs) return m.reply("Input query link\nExample: .image search|jokowi")
            await m.reply(wait)
            try {
                let res = await dylux.googleImage(inputs)
                let teks = "🔍 *[ RESULT ]*"
                await conn.sendFile(m.chat, res.getRandom() || logo, "", teks, m)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "v4") {
            if (!inputs) return m.reply("Input query link\nExample: .image search|jokowi")
            await m.reply(wait)
            try {
                let res = await (await fetch(`https://api.lolhuman.xyz/api/gimage2?apikey=${lolkey}&query=${inputs}`)).json()
                let teks = "🔍 *[ RESULT ]*"
                await conn.sendFile(m.chat, ((res.result).getRandom()) || logo, "", teks, m)
            } catch (e) {
                await m.reply(eror)
            }
        }



    }
}
handler.help = ["image"]
handler.tags = ["internet"]
handler.command = /^(g?image)$/i
export default handler

/* New Line */
async function GoogleImage(query) {
    const data = await got(`https://www.google.com/search?q=${query}&tbm=isch`, {
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
        },
    }).text();

    const $ = cheerio.load(data);
    const pattern =
        /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
    const matches = $.html().matchAll(pattern);
    const decodeUrl = (url) => decodeURIComponent(JSON.parse(`"${url}"`));
    return [...matches]
        .map(({
            groups
        }) => decodeUrl(groups?.url))
        .filter((v) => /.*\.jpe?g|png$/gi.test(v));
}