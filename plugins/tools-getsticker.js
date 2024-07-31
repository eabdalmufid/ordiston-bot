import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'
import wibusoft from 'wibusoft'

let handler = async(m, { conn, args, text }) => {
await m.reply(wait)
if (args[1] == 'wsf') {
		let stiker = await createSticker(false, args[0], packname, author, 60)
        m.reply(stiker)
			}
			if (args[1] == 'lib') {
				let stiker = await sticker(null, encodeURI(args[0]), global.packname, global.author)
  if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', fakes, adReply, { asSticker: true })
  throw stiker.toString()
			}
			if (args[1] == 'wib') {
		let stiker = await wibusoft.tools.makeSticker(args[0], {
    author: packname,
    pack: author,
    // circle: true, // default false
    // keepScale: true, // default false
})
        m.reply(stiker)
			}
}
handler.command = /^fetchsticker$/i
handler.limit = true

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