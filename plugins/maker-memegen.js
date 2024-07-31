import fetch from "node-fetch"
import uploadImage from '../lib/uploadImage.js'
import {
    sticker
} from "../lib/sticker.js"
import wibusoft from "wibusoft"

let handler = async (m, {
    conn,
    usedPrefix,
    args,
    text,
    command
}) => {
await m.reply(wait)
    let [atas, bawah] = text.split(/[^\w\s]/g)
    let q = m.quoted ? m.quoted : m
    let image = await q.download?.()
    let bg = await uploadImage(image)
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!/image|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command} <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`)
    let img = await q.download?.()
    try {
        let f = await fetch('https://api.memegen.link/fonts', {
            headers: {
                'accept': 'application/json'
            }
        })
        let fo = await f.json()
        let b = (Object.values(fo).map((v) => v.id)).getRandom()
        let res = await fetch('https://api.memegen.link/templates/custom', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'background': bg,
                'text': [encodeURIComponent(atas ? atas : ''), encodeURIComponent(bawah ? bawah : '')],
                'font': b,
                'extension': 'png'
            })
        })
        let jsons = await res.json()
        try {
            let out = await wibusoft.tools.makeSticker(jsons.url, {
                author: packname,
                pack: m.name,
                keepScale: true
            })
            await m.reply(out)
        } catch (e) {
            let stick = await sticker(false, jsons.url, m.name, packname)
            await conn.sendFile(m.chat, stick, "memegen.webp", "", m)
        }
    } catch (e) {
        let res = await fetch('https://api.memegen.link/images/custom', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'background': bg,
                'text': [encodeURIComponent(atas ? atas : ''), encodeURIComponent(bawah ? bawah : '')],
                'font': b,
                'extension': 'png'
            })
        })
        let jsons = await res.json()
        try {
            let out = await wibusoft.tools.makeSticker(jsons.url, {
                author: packname,
                pack: m.name,
                keepScale: true
            })
            await m.reply(out)
        } catch (e) {
            let stick = await sticker(false, jsons.url, m.name, packname)
            await conn.sendFile(m.chat, stick, "memegen.webp", "", m)
        }
    }
}
handler.help = ["memegen"]
handler.tags = ["maker"]
handler.command = /^(memegen)$/i
export default handler

function ArrClean(str) {
    return str.map((v, index) => ++index + ". " + v).join('\r\n')
}