import fetch from "node-fetch"
import {
    Sticker,
    StickerTypes
} from 'wa-sticker-formatter'
import hmfull from "hmfull"

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
    let typs = [
        "HMtai",
        "NekoBot",
        "NekoLove",
        "Nekos"
    ]
let Hsfw = Object.keys(hmfull.HMtai.sfw)
let Nesfw = Object.keys(hmfull.NekoBot.sfw)
let Nelsfw = Object.keys(hmfull.NekoLove.sfw)
let Neksfw = Object.keys(hmfull.Nekos.sfw)
let Sfw = Hsfw.concat(Nesfw, Nelsfw, Neksfw)

let Hnsfw = Object.keys(hmfull.HMtai.nsfw)
let Nensfw = Object.keys(hmfull.NekoBot.nsfw)
let Nelnsfw = Object.keys(hmfull.NekoLove.nsfw)
let Neknsfw = Object.keys(hmfull.Nekos.nsfw)
let Nsfw = Hnsfw.concat(Nensfw, Nelnsfw, Neknsfw)

    let [types, modes, kodes] = text.split(/[^\w\s]/g)
   if (!typs.includes(types)) return m.reply("*Example:*\n.hmfull Nekos|sfw|waifu\n\n*Pilih type yg ada*\n" + typs.map((v, index) => "  ○ " + v).join('\n'))

    if (typs.includes(types)) {
    if (!ends.includes(modes)) return m.reply("*Example:*\n.hmfull Nekos|sfw|waifu\n\n*Pilih type yg ada*\n" + ends.map((v, index) => "  ○ " + v).join('\n'))

    if (ends.includes(modes)) {
        if (Number(kodes)) return m.reply("Text only!")
        if (modes == "sfw") {
            if (!Sfw.includes(kodes)) return m.reply("*Example:*\n.hmfull Nekos|sfw|waifu\n\n*Pilih type yg ada*\n" + Sfw.map((v, index) => "  ○ " + v).join('\n'))
            await m.reply(wait)
            let outs = await hmfull[types][modes][kodes]()
            let stiker = await createSticker(false, outs.url, modes, kodes, 30)
            await m.reply(stiker)
        }
        if (modes == "nsfw") {
            if (!Nsfw.includes(kodes)) return m.reply("*Example:*\n.hmfull nsfw|pussy\n\n*Pilih type yg ada*\n" + Nsfw.map((v, index) => "  ○ " + v).join('\n'))
            await m.reply(wait)
            let outs = await hmfull[types][modes][kodes]()
            let stiker = await createSticker(false, outs.url, modes, kodes, 30)
            await m.reply(stiker)
        }
    }
    }

}
handler.help = ["hmfull type query"]
handler.tags = ["internet"]
handler.command = /^(hmfull)$/i
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