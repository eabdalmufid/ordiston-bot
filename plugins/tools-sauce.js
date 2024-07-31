import fs from 'fs'
import sagiri from 'sagiri'

let sauceClient = sagiri('96a418eb1f0d7581fad16d30e0dbf1dbbdf4d3bd')

let handler = async (m, { conn}) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (/image/.test(mime)) {
		let media = Date.now() + '.' + mime.split('/')[1]
		fs.writeFileSync(media, await q.download())
		let sauce = await sauceClient(media)
		let txt = sauce.map(({ url, site, similarity, thumbnail, authorName, authorUrl }) => {
			return `*❔ Similarity:* ${similarity}%\n*🔎  Site:* ${site}\n*🔗 Url:* ${url}\n*🧧 Thumb:* ${thumbnail}\n*🖌️ Author Name:* ${authorName}\n*✅ Author Url:* ${authorUrl}`
		}).join('\n\n❑━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━❑\n\n')
		await conn.sendFile(m.chat, sauce[0].thumbnail, 0, txt.trim(), m, false, {thumbnail: Buffer.alloc(0) })
		fs.unlinkSync(media)
	} else throw 'Reply imagenya'
}

handler.help = ['sauce <reply/send image>']
handler.tags = ['tools']
handler.command = /^(sauce)$/i

export default handler
