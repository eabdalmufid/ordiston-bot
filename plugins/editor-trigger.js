import uploadImage from '../lib/uploadImage.js'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
    	
			let img = await q.download?.()
			let out = await uploadImage(img)
			m.reply(wait)
			
			var some = global.API('https://some-random-api.com', '/canvas/triggered', { avatar: out })
			if (some) {
			var stikersome = await createSticker(false, some, packname, name, 60)
			m.reply(stikersome)
			} else {
			 var dham = "https://api.dhamzxploit.my.id/api/canvas/trigger?url=" + out
			 var stikerdham = await createSticker(false, dham, packname, name, 60)
			m.reply(stikerdham)
			}
			
    	
    } else {
    	m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
    }
}

handler.menu = ['trigger']
handler.tags = ['search']
handler.command = /^(trigger(ed)?)$/i
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