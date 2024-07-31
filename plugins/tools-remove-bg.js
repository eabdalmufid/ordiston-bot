import fetch from "node-fetch"
import { RemoveBackground } from "../lib/remove-background.js"
import uploadImage from '../lib/uploadImage.js'
let handler = async (m, { conn, args }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (/image/.test(mime)) {
		await m.reply(wait)
		let media = await q.download()
		let nita = await uploadImage(media)
		let sauce = await RemoveBackground(nita, "3c1615980dcf693b282c4b0fb608b28a")
		let output = Object.entries(sauce).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n');
		await conn.reply(m.chat, output, m)
	} else throw 'Reply imagenya'
}
handler.help = ["remobg"]
handler.tags = ["tools"]
handler.command = ["remobg"]
export default handler