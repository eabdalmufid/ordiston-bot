import axios from 'axios'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
if (!text) throw 'Masukkan teks, Ex. Animal'
	let su = await fetch('https://api.publicapis.org/entries?title=' + text)
	let sul = await su.json()
	if (sul.count == 0) throw eror
	let listSections = []
	Object.values(sul.entries).map((v, index) => {
	let des = `\n\n
*API:* ${v.API}
*Description:* ${v.Description}
*Auth:* ${v.Auth}
*HTTPS:* ${v.HTTPS}
*Cors:* ${v.Cors}
*Link:* ${v.Link}
*Category:* ${v.Category}
`
	listSections.push([++index + ' ' + cmenub + ' ' + v.API, [
          ['Get Test', usedPrefix + 'get ' + v.Link, des]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Public Api Search 🔎 ' + htka, `⚡ Silakan pilih Public Api Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `Public Api Search Disini`, listSections, m)
    }
handler.help = ['publicapi']
handler.tags = ['internet']
handler.command = /^publicapi$/i

export default handler
