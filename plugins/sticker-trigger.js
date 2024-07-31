import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import {
    Sticker,
    StickerTypes
} from 'wa-sticker-formatter'
import { sticker } from '../lib/sticker.js'

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    let out, oimg
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)

        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        if (/video/g.test(mime)) {
            if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!')
            }
        if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command}`)
        let img = await q.download?.()
        
        if (/webp/g.test(mime)) {
        	oimg = `https://oni-chan.my.id/api/canvas/trigger?picturl=${await webp2png(img)}&apikey=`
            out = await createSticker(oimg, false, packname, name, 60)
        } else if (/image/g.test(mime)) {
        	oimg = `https://oni-chan.my.id/api/canvas/trigger?picturl=${await uploadImage(img)}&apikey=`
            out = await createSticker(oimg, false, packname, name, 60)
        } else if (/video/g.test(mime)) {
        	oimg = `https://oni-chan.my.id/api/canvas/trigger?picturl=${await uploadFile(img)}&apikey=`
            out = await sticker(oimg, false, packname, name)
        } else if (/gif/g.test(mime)) {
        	oimg = `https://oni-chan.my.id/api/canvas/trigger?picturl=${await uploadFile(img)}&apikey=`
            out = await createSticker(oimg, false, packname, name, 60)
        } else if (/viewOnce/g.test(mime)) {
            oimg = `https://oni-chan.my.id/api/canvas/trigger?picturl=${await uploadFile(img)}&apikey=`
            out = await createSticker(oimg, false, packname, name, 60)
        }
        
        await m.reply(wait)
        if (out) {
        await m.reply(out)
        } else {
        await m.reply(eror)
        }

}
handler.menu = ['strigger']
handler.tags = ['maker']
handler.command = /^(strigger(ed)?)$/i
handler.limit = true
export default handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: StickerTypes.FULL,
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}

async function createStickerV(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: StickerTypes.CROPPED,
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}