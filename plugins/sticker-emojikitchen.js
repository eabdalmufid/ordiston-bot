import fetch from "node-fetch"
import {
    Sticker,
    StickerTypes
} from 'wa-sticker-formatter'
let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
let [modes, kodes] = text.split(/[^\w\s]/g)
    if (!modes || !kodes) return m.reply("*Example:*\n.emojikitchen 😅.😅")
            await m.reply(wait)
            try {
            let data = await EmojiKitchen(modes.codePointAt(0).toString(16), kodes.codePointAt(0).toString(16))
            let stiker = await createSticker(false, data, packname, m.name, 30)
                    await m.reply(stiker)
            } catch (e) {
            await m.reply(eror)
            }
}
handler.help = ["emojikitchen query"]
handler.tags = ["internet"]
handler.command = /^(emojikitchen)$/i
export default handler

async function EmojiKitchen(a, b) {
  try {
    let suks = "https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u" + a + "/u" + a + "_u" + b + ".png"
    return suks
  } catch (error) {
    console.log("Error fetching data:", error)
  }
}

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}
