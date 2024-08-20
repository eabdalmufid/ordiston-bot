import fetch from "node-fetch"
const dylux = await (await import('api-dylux')).default

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let lister = ["chatgpt",
        "fbdl",
        "gdrivedl",
        "googleimage",
        "igstalk",
        "lyrics",
        "mediafiredl",
        "pinterest",
        "sfiledl",
        "sfilesearch",
        "ssweb",
        "stickersearch",
        "tiktokstalk",
        "tiktokdl",
        "ttp",
        "twitter",
        "wallpaper",
        "xnxxsearch",
        "xnxxdl",
        "xvideossearch",
        "xvideossearch",
        "xvideosdl"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.dylux facebook|link\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join('\n'))

    if (lister.includes(feature)) {
        if (!(inputs)) return m.reply("Input link " + feature)
        await m.reply(wait)
        let outs = await fetchJson(feature, inputs)
        throw outs
    }
}
handler.help = ["dylux type query"]
handler.tags = ["internet"]
handler.command = /^(dylux)$/i
export default handler

async function fetchJson(type, querys) {
    let selectedInput
    // contoh penggunaan
    if (type == "chatgpt") {
        selectedInput = await dylux.ChatGpt(querys)
    }
    if (type == "fbdl") {
        selectedInput = await dylux.fbdl(querys)
    }
    if (type == "gdrivedl") {
        selectedInput = await dylux.GDriveDl(querys)
    }
    if (type == "googleimage") {
        selectedInput = await dylux.googleImage(querys)
    }
    if (type == "igstalk") {
        selectedInput = await dylux.igStalk(querys)
    }
    if (type == "lyrics") {
        selectedInput = await dylux.lyrics(querys)
    }
    if (type == "mediafiredl") {
        selectedInput = await dylux.mediafireDl(querys)
    }
    if (type == "pinterest") {
        selectedInput = await dylux.pinterest(querys)
    }
    if (type == "sfiledl") {
        selectedInput = await dylux.sfileDl(querys)
    }
    if (type == "sfilesearch") {
        selectedInput = await dylux.sfileSearch(querys)
    }
    if (type == "ssweb") {
        selectedInput = await dylux.ssweb(querys)
    }
    if (type == "stickersearch") {
        selectedInput = await dylux.StickerSearch(querys)
    }
    if (type == "tiktokstalk") {
        selectedInput = await dylux.ttStalk(querys)
    }
    if (type == "tiktokdl") {
        selectedInput = await dylux.tiktok(querys)
    }
    if (type == "ttp") {
        selectedInput = await dylux.ttp(querys)
    }
    if (type == "twitter") {
        selectedInput = await dylux.twitter(querys)
    }
    if (type == "wallpaper") {
        selectedInput = await dylux.wallpaper(querys)
    }
    if (type == "xnxxsearch") {
        selectedInput = await dylux.xnxxSearch(querys)
    }
    if (type == "xnxxdl") {
        selectedInput = await dylux.xnxxdl(querys)
    }
    if (type == "xvideossearch") {
        selectedInput = await dylux.xvideosSearch(querys)
    }
    if (type == "xvideosdl") {
        selectedInput = await dylux.xvideosdl(querys)
    }

    return selectedInput
}