/* Recode By Ordiston */
import fetch from 'node-fetch';
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
await conn.sendMessage(m.chat, {
          react: {
            text: '⏳',
            key: m.key,
          }})
          let anime = ["9anime",
"animefox",
"animepahe",
"bilibili",
"crunchyroll",
"enime",
"gogoanime",
"zoro"]
let books = ["libgen"]
let comics = ["getComics"]
let lightnovels = ["readlightnovels"]
let manga = ["managreader",
"mangadex",
"mangahere",
"mangakakalot",
"mangapark",
"mangapill",
"mangasee123"]
let meta = ["anilist-manga",
"anilist",
"mal",
"tmdb"]
let movies = ["dramacool",
"flixhq",
"viewasian"]
let urut = text.split`|`
  let one = urut[0]
  let two = urut[1]
  let three = urut[2]
  if (args[0] == 'anime') {
          let listSections = []
	Object.keys(anime).map((v, index) => {
	let url = 'https://api.consumet.org/anime/' + anime[v] + '/' + one
	listSections.push(["Model [ " + ++index + ' ]', [
          [anime[v], usedPrefix + command + " consumetget " + url, "➥"]
        ]])
	})
	return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
	}
	if (args[0] == 'books') {
          let listSections = []
	Object.keys(books).map((v, index) => {
	let url = 'https://api.consumet.org/books/' + books[v] + '/' + one
	listSections.push(["Model [ " + ++index + ' ]', [
          [books[v], usedPrefix + command + " consumetget " + url, "➥"]
        ]])
	})
	return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
	}
	if (args[0] == 'comics') {
          let listSections = []
	Object.keys(comics).map((v, index) => {
	let url = 'https://api.consumet.org/comics/' + comics[v] + '/' + one
	listSections.push(["Model [ " + ++index + ' ]', [
          [comics[v], usedPrefix + command + " consumetget " + url, "➥"]
        ]])
	})
	return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
	}
	if (args[0] == 'lightnovels') {
          let listSections = []
	Object.keys(lightnovels).map((v, index) => {
	let url = 'https://api.consumet.org/light-novels/' + lightnovels[v] + '/' + one
	listSections.push(["Model [ " + ++index + ' ]', [
          [lightnovels[v], usedPrefix + command + " consumetget " + url, "➥"]
        ]])
	})
	return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
	}
	if (args[0] == 'manga') {
          let listSections = []
	Object.keys(manga).map((v, index) => {
	let url = 'https://api.consumet.org/manga/' + manga[v] + '/' + one
	listSections.push(["Model [ " + ++index + ' ]', [
          [manga[v], usedPrefix + command + " consumetget " + url, "➥"]
        ]])
	})
	return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
	}
	if (args[0] == 'meta') {
          let listSections = []
	Object.keys(meta).map((v, index) => {
	let url = 'https://api.consumet.org/meta/' + books[v] + '/' + one
	listSections.push(["Model [ " + ++index + ' ]', [
          [meta[v], usedPrefix + command + " consumetget " + url, "➥"]
        ]])
	})
	return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
	}
	if (args[0] == 'movies') {
          let listSections = []
	Object.keys(movies).map((v, index) => {
	let url = 'https://api.consumet.org/movies/' + movies[v] + '/' + one
	listSections.push(["Model [ " + ++index + ' ]', [
          [movies[v], usedPrefix + command + " consumetget " + url, "➥"]
        ]])
	})
	return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
	}
	if (args[0] == 'consumetget') {
	let jso = await fetch(args[1])
	let res = await jso.json()
	if (res.error) throw res.error
	let sul = Object.values(res.results[0] ? res.results[0] : res.results).join('\r\n• ').replace('[object Object]', '')
	throw '*Result :*\n\n• ' + sul + '\n\n' + author
    }
}
handler.help = ['consumet'].map(v => v + ' query')
handler.tags = ['tools']
handler.command = /^consumet$/i
handler.limit = true
export default handler
