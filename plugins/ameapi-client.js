import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import {
    webp2png
} from '../lib/webp2mp4.js'
import {
    Sticker,
    StickerTypes
} from 'wa-sticker-formatter'
import ameClient from "amethyste-api"
const ameApi = new ameClient(ameapikey)

let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    if (command == "ame") {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply("balas gambar")
        m.reply(wait)
        let img = await q.download()
        let stek = new Sticker(img, {
            pack: packname,
            author: author,
            type: StickerTypes.FULL
        })
        let buffer = await stek.toBuffer()
        let out
        try {
            if (/webp/g.test(mime)) out = await webp2png(img)
            else if (/image/g.test(mime)) out = await uploadImage(img)
            else if (/video/g.test(mime)) out = await uploadFile(img)
            else if (/viewOnce/g.test(mime)) out = await uploadFile(img)
            if (typeof out !== 'string') out = await uploadImage(img)
            else if (/gif/g.test(mime)) out = stek
        } catch (e) {
            console.error(e)
        }
        let effectimg = [
            "3000years",
            "afusion",
            "approved",
            "badge",
            "batslap",
            "beautiful",
            "blur",
            "blurple",
            "brazzers",
            "burn",
            "challenger",
            "circle",
            "contrast",
            "crush",
            "ddungeon",
            "deepfry",
            "dictator",
            "discordhouse",
            "distort",
            "dither565",
            "emboss",
            "facebook",
            "fire",
            "frame",
            "gay",
            "glitch",
            "greyple",
            "greyscale",
            "instagram",
            "invert",
            "jail",
            "lookwhatkarenhave",
            "magik",
            "missionpassed",
            "moustache",
            "pixelize",
            "posterize",
            "ps4",
            "redple",
            "rejected",
            "rip",
            "scary",
            "sepia",
            "sharpen",
            "sniper",
            "spin",
            "steamcard",
            "subzero",
            "symmetry",
            "thanos",
            "tobecontinued",
            "triggered",
            "trinity",
            "twitter",
            "unsharpen",
            "utatoo",
            "vs",
            "wanted",
            "wasted",
            "whowouldwin"
        ]
        let listSections = []
        Object.keys(effectimg).map((v, index) => {
            listSections.push(["Num. " + ++index, [
                [effectimg[v].toUpperCase(), usedPrefix + "ameget |" + effectimg[v] + "|" + out, ""]
            ]])
        })
        return conn.sendList(m.chat, htki + " 🗒️ List Effect " + htka, "⚡ Silakan pilih efek yang anda mau.", author, "[ Effect ]", listSections, m)
    }
    if (command == "ameget") {
        let urut = text.split`|`
        let one = urut[1]
        let two = urut[2]
        m.reply(wait)
        let buffer = await ameApi.generate(one, {
            "url": two
        })
        await conn.sendFile(m.chat, buffer, '', '', m)
    }
}
handler.help = ["ame"]
handler.tags = ["maker"]
handler.command = /^(ame|ameget)$/i
export default handler