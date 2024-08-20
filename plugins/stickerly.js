import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
try {
    if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} spongebob`
    let res = await fetch(global.API('lolhuman', '/api/stickerwa', { query: text }, 'apikey'))
    let json = await res.json()
    let ha = json.result
	let row = Object.values(ha).map((v, index) => ({
		title: index + ' ' + v.title,
		description: '\nAuthor: ' + v.author + '\nUrl: ' + v.url + '\nUrl: ' + Array.from(v.stickers),
		rowId: usedPrefix + 'fetchsticker ' + (v.stickers).getRandom() + ' wsf'
	}))
	let button = {
		buttonText: `${command} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, button, row, m)
	} catch (e) {
	throw eror
	}
}
handler.help = ['stickerly <teks>']
handler.tags = ['sticker']
handler.command = /^(stickerly)$/i

handler.limit = 3

export default handler
