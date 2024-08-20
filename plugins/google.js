import axios from "axios"
import fetch from "node-fetch"
import {
    googleIt
} from "@bochilteam/scraper"
import GoogleIt from "google-it"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    args
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input teks atau reply teks yang ingin di cari!"
    let google_img = flaaa + "google"
    await m.reply(wait)
    try {
        let search = await GoogleIt({
            query: text
        })
        let caption = search.map((v, index) => `*${v.title || 'Tidak terdeteksi'}*\n  *○ Link:* ${v.link || 'Tidak terdeteksi'}\n  *○ Snippet:* ${v.snippet || 'Tidak terdeteksi'}`).join("\n\n")
        await conn.sendFthumb(m.chat, 'GOOGLE', caption, google_img, '', m)
        //await conn.sendFile(m.chat, google_img, "", caption, m)
    } catch (e) {
        try {
            let search = await googleIt(text)
            let caption = search.articles.map((v, index) => `*${v.title || 'Tidak terdeteksi'}*\n  *○ Link:* ${v.url || 'Tidak terdeteksi'}\n  *○ Snippet:* ${v.description || 'Tidak terdeteksi'}`).join("\n\n")
            if (!caption.length) throw `Query "${text}" Not Found`
            await conn.sendFthumb(m.chat, 'GOOGLE', caption, google_img, '', m)
            //await conn.sendFile(m.chat, google_img, "", caption, m)
        } catch (e) {
            try {
                let API_KEY = "7d3eb92cb730ed676d5afbd6c902ac1f"
                let search = await (await fetch("http://api.serpstack.com/search?access_key=" + API_KEY + "&type=web&query=" + text)).json()
                let caption = search.organic_results.map((v, index) => `*${v.title || 'Tidak terdeteksi'}*\n  *○ Link:* ${v.url || 'Tidak terdeteksi'}\n  *○ Snippet:* ${v.snippet || 'Tidak terdeteksi'}`).join("\n\n")
                await conn.sendFthumb(m.chat, 'GOOGLE', caption, google_img, '', m)
                //await conn.sendFile(m.chat, google_img, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["google", "googlef"].map(v => v + " <pencarian>")
handler.tags = ["internet"]
handler.command = /^googlef?$/i
export default handler