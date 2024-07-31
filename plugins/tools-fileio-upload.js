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
const { FileIo } = (await import('../lib/upload-to-webs.js'))
let handler = async (m, { conn, args, __dirname }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (/image/.test(mime)) {
		await m.reply(wait)
		const file = join(__dirname, '../images/res.png')
		let media = await q.download()
		await fs.writeFileSync(file, media)
		let ous = await FileIo(file)
		let output = Object.entries(ous).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n')
        await m.reply(output)
		unlinkSync(file)
	} else throw 'Reply imagenya'
}
handler.help = ["fileio"]
handler.tags = ["tools"]
handler.command = ["fileio"]
export default handler