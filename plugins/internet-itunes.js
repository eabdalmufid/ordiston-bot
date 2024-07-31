import axios from 'axios'
import fetch from 'node-fetch'
import cheerio from 'cheerio'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
if (!text) throw 'Masukkan teks, Ex. Radiogead'
	let su = await fetch('https://itunes.apple.com/search?term=' + text)
	let sul = await su.json()
	let listSections = []
	Object.values(sul.results).map((v, index) => {
	let des = `\n\n
*wrapperType:* ${v.wrapperType}
*artistId:* ${v.artistId}
*collectionId:* ${v.collectionId}
*artistName:* ${v.artistName}
*collectionName:* ${v.collectionName}
*collectionCensoredName:* ${v.collectionCensoredName}
*artistViewUrl:* ${v.artistViewUrl}
*collectionViewUrl:* ${v.collectionViewUrl}
*artworkUrl60:* ${v.artworkUrl60}
*artworkUrl100:* ${v.artworkUrl100}
*collectionPrice:* ${v.collectionPrice}
*collectionExplicitness:* ${v.collectionExplicitness}
*trackCount:* ${v.trackCount}
*copyright:* ${v.copyright}
*country:* ${v.country}
*currency:* ${v.currency}
*releaseDate:* ${v.releaseDate}
*primaryGenreName:* ${v.primaryGenreName}
*previewUrl:* ${v.previewUrl}
*description:* ${v.description}
`
	listSections.push([index + ' ' + cmenub + ' ' + v.artistName, [
          ['Get Image', usedPrefix + 'get ' + v.artworkUrl100, des],
          ['Get Audio', usedPrefix + 'get ' + v.previewUrl, des]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 itunes Search 🔎 ' + htka, `⚡ Silakan pilih itunes Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `Itunes Search Disini`, listSections, m)
    }
handler.help = ['itunes']
handler.tags = ['music', 'audio']
handler.command = ['itunes']

export default handler
