import fs from 'fs'
import fetch from 'node-fetch'
import path, { join } from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'
const { upload } = (await import('../lib/upload-to-anonfiles.js')).default
let handler = async (m, { conn, args, __dirname }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (/image/.test(mime)) {
		await m.reply(wait)
		const file = join(__dirname, '../images/res.png')
		let media = await q.download()
		await fs.writeFileSync(file, media)
		let ous = await upload(file)
		let output = Object.entries(ous.data.file.url).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n')
        await m.reply(output)
		unlinkSync(file)
	} else throw 'Reply imagenya'
}
handler.help = ["anonfiles"]
handler.tags = ["tools"]
handler.command = ["anonfiles"]
export default handler