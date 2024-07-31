import axios from "axios"
import { download } from "aptoide-scraper"

let handler = async (m, { conn, text, command, usedPrefix }) => {
	let regex = /^[a-z]\w*(\.[a-z]\w*)+$/i
	if (!regex.test(text)) throw "Input package name"
	try {
		let aptodl = await download(text)
		await m.reply(wait)
		let { name, lastup, size, icon, dllink } = aptodl
		let cap = "*Name:* " + name + "\n" + "*Lastup:* " + lastup + "\n" + "*Size:* " + size + "\n\n" + wait
		await conn.sendFile(m.chat, icon, "", cap, m)
		await conn.sendFile(m.chat, dllink, name, null, m, true, { quoted: m, mimetype: "application/vnd.android.package-archive" })
	} catch (e) {
		await m.reply(eror)
	}
}
handler.help = ["aptoidedown"]
handler.tags = ["tools"]
handler.command = /^ap(ptoided(own|l)|toided(own|l))$/i

export default handler