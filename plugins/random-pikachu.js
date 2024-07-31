import uploadImage from '../lib/uploadImage.js'
import { createSticker } from 'wa-sticker-formatter'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    	try {
			let marah = global.API('https://some-random-api.com', '/img/pikachu', {})
			let fet = await(await fetch(marah)).json()
			let stiker = await createSticker(fet.link, { pack: packname, author: author })
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
    	} catch (e) {
    		console.log(e)
    	}
}
handler.menu = ['pikachu']
handler.tags = ['search']
handler.command = /^(pikachu)$/i

handler.premium = false
handler.limit = true

export default handler