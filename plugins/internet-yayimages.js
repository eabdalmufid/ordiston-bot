import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

    if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} car`
    let res = await fetch(`https://api.yayimages.com/search/ea990627-3429-4819-bfe7-9ba03a0c0f71/${text}`)
    let f = await res.json()
    let listSections = []
	Object.values(f.images).map((v, index) => {
	listSections.push([index + ' ' + cmenub + ' ' + v.title, [
          ['Get Photo', usedPrefix + 'get ' + v.thumb_url, `
          ${1 + index}. *id:* ${v.id}
*description:* ${v.description}
*thumb_url:* ${v.thumb_url}
*username:* ${v.username}
*width:* ${v.width}
*height:* ${v.height}
*model_count:* ${v.model_count}
*vector:* ${v.vector}
*category:* ${v.category}
`]
]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Yayimages 🔎 ' + htka, `⚡ Hai ${name} Silakan pilih Yayimages Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `Yayimages Disini`, listSections, m)
}
handler.help = ['yay <teks>']
handler.tags = ['sticker']
handler.command = /^(yay)$/i

handler.limit = 3

export default handler
