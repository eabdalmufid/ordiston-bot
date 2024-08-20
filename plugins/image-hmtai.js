import fetch from "node-fetch"
import {
    Sticker,
    StickerTypes
} from 'wa-sticker-formatter'
import hmtai from "hmtai"
const Hmtai = new hmtai()
let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let ends = [
        "sfw",
        "nsfw"
    ]
    let Sfw = Object.keys(Hmtai.sfw)
    let Nsfw = Object.keys(Hmtai.nsfw)
    let [modes, kodes] = text.split(/[^\w\s]/g)
    if (!ends.includes(modes)) return m.reply("*Example:*\n.hmtai sfw|wave\n\n*Pilih type yg ada*\n" + ends.map((v, index) => "  ○ " + v).join('\n'))

    if (ends.includes(modes)) {
        if (Number(kodes)) return m.reply("Text only!")
        if (modes == "sfw") {
            if (!Sfw.includes(kodes)) return m.reply("*Example:*\n.hmtai sfw|wave\n\n*Pilih type yg ada*\n" + Sfw.map((v, index) => "  ○ " + v).join('\n'))
            await m.reply(wait)
            let outs = await Hmtai[modes][kodes]()
            let stiker = await createSticker(false, outs, modes, kodes, 30)
            await m.reply(stiker)
        }
        if (modes == "nsfw") {
            if (!Nsfw.includes(kodes)) return m.reply("*Example:*\n.hmtai nsfw|pussy\n\n*Pilih type yg ada*\n" + Nsfw.map((v, index) => "  ○ " + v).join('\n'))
            await m.reply(wait)
            let outs = await Hmtai[modes][kodes]()
            let stiker = await createSticker(false, outs, modes, kodes, 30)
            await m.reply(stiker)
        }
    }

}
handler.help = ["hmtai type query"]
handler.tags = ["internet"]
handler.command = /^(hmtai)$/i
export default handler
async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}