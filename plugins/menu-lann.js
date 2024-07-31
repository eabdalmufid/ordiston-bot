import fetch from "node-fetch"
import axios from "axios"
import cheerio from "cheerio"

let handler = async (m, {
    text,
    args,
    usedPrefix,
    command
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
    let name = await conn.getName(who)

    if (!args[0]) {
        let hasil = ["anime",
            "download",
            "emoji",
            "ephoto",
            "game",
            "maker",
            "muslim",
            "news",
            "photooxy",
            "primbon",
            "random",
            "search",
            "stalk",
            "sticker",
            "story",
            "textpro",
            "tools",
            "vokal",
            "wallpaper",
            "webzone"
        ]
        throw "example .lann download |tiktok|url\n.lann query1 |query2|query3"
    }
    let blum = "Fitur Ini Belum ditambahkan"
    let urut = text.split`|`
    let one = urut[1]
    let two = urut[2]
    let three = urut[3]

    if (args[0] == "anime") {
        let out = await Lann("anime", one)
        await conn.sendFile(m.chat, out, "out", "*DONE*", m)
    }
    if (args[0] == "download") {
        let teks = await Lann("download", one, two)
        throw await clean(JSON.stringify(teks, null, 4))
    }
    if (args[0] == "emoji") {
        let out = await Lann("emoji", one, two)
        await conn.sendFile(m.chat, out, "out", "*DONE*", m)
    }
    if (args[0] == "ephoto") {
        let out = await Lann("ephoto", one, two)
        await conn.sendFile(m.chat, out, "out", "*DONE*", m)
    }
    if (args[0] == "game") {
        let teks = await Lann("game", one)
        throw await clean(JSON.stringify(teks, null, 4))
    }
    if (args[0] == "maker") {
        let out = await Lann("maker", one, two)
        await conn.sendFile(m.chat, out, "out", "*DONE*", m)
    }
    if (args[0] == "maker2") {
        let out = await Lann("maker", one, two)
        await conn.sendFile(m.chat, out, "out", "*DONE*", m)
    }
    if (args[0] == "muslim") {
        let teks = await Lann("muslim", one)
        throw await clean(JSON.stringify(teks, null, 4))
    }
    if (args[0] == "news") {
        let teks = await Lann("news", one)
        throw await clean(JSON.stringify(teks, null, 4))
    }
    if (args[0] == "photooxy") {
        let out = await Lann("photooxy", one, two)
        await conn.sendFile(m.chat, out, "out", "*DONE*", m)
    }
    if (args[0] == "photooxy2") {
        let out = await Lann("photooxy2", one, two, three)
        await conn.sendFile(m.chat, out, "out", "*DONE*", m)
    }
    if (args[0] == "primbon") {
        let teks = await Lann("primbon", one)
        throw await clean(JSON.stringify(teks, null, 4))
    }
    if (args[0] == "random") {
        let teks = await Lann("random", one)
        throw await clean(JSON.stringify(teks, null, 4))
    }
    if (args[0] == "search") {
        let teks = await Lann("search", one, two)
        throw await clean(JSON.stringify(teks, null, 4))
    }

}
handler.tags = ["tools"]
handler.help = ["lann <args> |query"]
handler.command = ["lann"]

export default handler

function clean(string) {
    return string.replace(/{/g, '').replace(/}/g, '')
        .replace(/"/g, '')
}


async function Lann(source, query1 = "", query2 = "", query3 = "") {
    if (source == "anime") {
        return "https://api.lannn.me/api/" + source + "/" + query1 + "?apikey=Lann"
    }
    if (source == "download") {
        let url = "https://api.lannn.me/api/" + source + "/" + query1 + "?url=" + query2 + "&apikey=Lann"
        return await (await fetch(url)).json()
    }
    if (source == "emoji") {
        return "https://api.lannn.me/api/" + source + "/" + query1 + "?emoji=" + query2 + "&apikey=Lann"
    }
    if (source == "ephoto") {
        return "https://api.lannn.me/api/" + source + "/" + query1 + "?text=" + query2 + "&apikey=Lann"
    }
    if (source == "game") {
        let url = "https://api.lannn.me/api/" + source + "/" + query1 + "?apikey=Lann"
        return await (await fetch(url)).json()
    }
    if (source == "maker") {
        return "https://api.lannn.me/api/" + source + "/" + query1 + "?url=" + query2 + "&apikey=Lann"
    }
    if (source == "maker2") {
        return "https://api.lannn.me/api/" + source + "/" + query1 + "?text=" + query2 + "&apikey=Lann"
    }
    if (source == "muslim") {
        let url = "https://api.lannn.me/api/" + source + "/" + query1 + "?apikey=Lann"
        return await (await fetch(url)).json()
    }
    if (source == "news") {
        let url = "https://api.lannn.me/api/" + source + "/" + query1 + "?apikey=Lann"
        return await (await fetch(url)).json()
    }
    if (source == "photooxy") {
        return "https://api.lannn.me/api/" + source + "/" + query1 + "?text=" + query2 + "&apikey=Lann"
    }
    if (source == "photooxy") {
        return "https://api.lannn.me/api/" + source + "/" + query1 + "?text1=" + query2 + "&text2=" + query3 + "&apikey=Lann"
    }
    if (source == "primbon") {
        let url = "https://api.lannn.me/api/" + source + "/" + query1 + "?" + query2 + "&apikey=Lann"
        return await (await fetch(url)).json()
    }
    if (source == "random") {
        let url = "https://api.lannn.me/api/" + source + "/" + query1 + "?apikey=Lann"
        return await (await fetch(url)).json()
    }
    if (source == "search") {
        let url = "https://api.lannn.me/api/" + source + "/" + query1 + "?text=" + query2 + "&apikey=Lann"
        return await (await fetch(url)).json()
    }

}