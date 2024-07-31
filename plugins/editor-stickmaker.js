import uploadImage from '../lib/uploadImage.js'
import { createSticker } from 'wa-sticker-formatter'
import fs from 'fs'
const effects = ['jail', 'gay', 'glass', 'wasted' ,'triggered']

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let effect = text.trim().toLowerCase()
  if (!effects.includes(effect)) throw `
*Usage:* ${usedPrefix}stickmaker <effectname>
*Example:* ${usedPrefix}stickmaker jail

*List Effect:*
${effects.map(effect => `_> ${effect}_`).join('\n')}
`.trim()
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
    	try {
			let img = await q.download?.()
			let out = await uploadImage(img)
			let apiUrl = global.API('https://some-random-api.com/canvas/', encodeURIComponent(effect), {
    avatar: out
  })
			let stiker = await createSticker(apiUrl, { pack: packname, author: author })
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
    	} catch (e) {
    		console.log(e)
    	}
    } else {
    	m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
    }
}

handler.help = ['stickmaker (caption|reply media)']
handler.tags = ['sticker']
handler.command = /^(stickmaker|stikmaker)$/i

export default handler