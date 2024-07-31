import {
    randomBytes
} from "crypto"

let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {

    let name = await conn.getName(m.sender)
    let imgr = flaaa
    let chats
    let pcgc = ["pc", "gc", "all"]

    if (!pcgc.includes(text)) return m.reply("PC,  GC atau ALL\n*Ex.* .tobc *gc*")

    if (text.toLowerCase() == "pc") {
        chats = (Object.keys(conn.chats)).filter((v) => v.endsWith("s.whatsapp.net"))
    }
    if (text.toLowerCase() == "gc") {
        chats = (Object.keys(conn.chats)).filter((v) => v.endsWith("g.us"))
    }
    if (text.toLowerCase() == "all") {
        chats = (Object.keys(conn.chats)).filter((v) => v)
    }

    if (!m.quoted) return m.reply("Reply pesan")
    let medias = m.getQuotedObj()
    conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
    try {
        for (let id of chats) {
            await delay(1500)
            await conn.copyNForward(id, medias, true)
        }
    } catch {
        m.reply(eror)
    }
    m.reply("Selesai Broadcast All Chat :)")
}
handler.help = ["tobroadcast", "tobc"].map(v => v + " <teks>")
handler.tags = ["owner"]
handler.command = /^(tobroadcast|tobc)$/i
handler.owner = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const delay = time => new Promise(res => setTimeout(res, time))
const randomID = length => randomBytes(Math.ceil(length * .5)).toString("hex").slice(0, length)