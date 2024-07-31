import axios from 'axios'
import fetch from 'node-fetch'
import cheerio from 'cheerio'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
if (!text) throw 'Input Text'
let sp = text.split`|`
	let no = sp[0]
	let tems = sp[1]
if (command == 'piximg') {
let res = await fetch('https://pixabay.com/api/?key=30089426-4575ed7bbbc8bfffe9a0b8eb4&q=' + encodeURIComponent(text))
let sul = await res.json()
	let listSections = []
	Object.values(sul.hits).map((v, index) => {
	listSections.push([index + ' ' + cmenub + ' By: ' + v.user, [
          ['Lihat', usedPrefix + 'pixgetimg ' + index + '|' + text, author]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Pixabay Search 🔎 ' + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Pixabay Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `Pixabay Search Disini`, listSections, m)
	}
	if (command == 'pixvid') {
	let res = await fetch('https://pixabay.com/api/videos/?key=30089426-4575ed7bbbc8bfffe9a0b8eb4&q=' + text)
let sul = await res.json()
	let listSections = []
	Object.values(sul.hits).map((v, index) => {
	listSections.push([index + ' ' + cmenub + ' By: ' + v.user, [
          ['Lihat', usedPrefix + 'pixgetvid ' + index + '|' + text, author]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Pixabay Search 🔎 ' + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Pixabay Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `Pixabay Search Disini`, listSections, m)
	}
	if (command == 'pixgetimg') {
	let res = await fetch('https://pixabay.com/api/?key=30089426-4575ed7bbbc8bfffe9a0b8eb4&q=' + encodeURIComponent(tems))
	let sul = await res.json()
	let desimg = `*webformatHeight:* ${sul.hits[no].webformatHeight}
*imageWidth:* ${sul.hits[no].imageWidth}
*previewHeight:* ${sul.hits[no].previewHeight}
*webformatURL:* ${sul.hits[no].webformatURL}
*userImageURL:* ${sul.hits[no].userImageURL}
*previewURL:* ${sul.hits[no].previewURL}
*comments:* ${sul.hits[no].comments}
*type:* ${sul.hits[no].type}
*imageHeight:* ${sul.hits[no].imageHeight}
*tags:* ${sul.hits[no].tags}
*previewWidth:* ${sul.hits[no].previewWidth}
*downloads:* ${sul.hits[no].downloads}
*collections:* ${sul.hits[no].collections}
*user_id:* ${sul.hits[no].user_id}
*largeImageURL:* ${sul.hits[no].largeImageURL}
*pageURL:* ${sul.hits[no].pageURL}
*id:* ${sul.hits[no].id}
*imageSize:* ${sul.hits[no].imageSize}
*webformatWidth:* ${sul.hits[no].webformatWidth}
*user:* ${sul.hits[no].user}
*views:* ${sul.hits[no].views}
*likes:* ${sul.hits[no].likes}
`
            conn.sendFile(m.chat, sul.hits[no].previewURL ? sul.hits[no].webformatURL : sul.hits[no].largeImageURL, '', desimg, m)
	}
	
	if (command == 'pixgetvid') {
	let res = await fetch('https://pixabay.com/api/videos?key=30089426-4575ed7bbbc8bfffe9a0b8eb4&q=' + encodeURIComponent(tems))
	let sul = await res.json()
	let desvid = `\n\n
*userImageURL:* ${sul.hits[no].userImageURL}
*comments:* ${sul.hits[no].comments}
*videos:* ${sul.hits[no].videos}

*videos.small.size:* ${sul.hits[no].videos.small.size}
*videos.small.width:* ${sul.hits[no].videos.small.width}
*videos.small.url:* ${sul.hits[no].videos.small.url}
*videos.small.height:* ${sul.hits[no].videos.small.height}

*videos.large.size:* ${sul.hits[no].videos.large.size}
*videos.large.width:* ${sul.hits[no].videos.large.width}
*videos.large.url:* ${sul.hits[no].videos.large.url}
*videos.large.height:* ${sul.hits[no].videos.large.height}

*videos.tiny.size:* ${sul.hits[no].videos.tiny.size}
*videos.tiny.width:* ${sul.hits[no].videos.tiny.width}
*videos.tiny.url:* ${sul.hits[no].videos.tiny.url}
*videos.tiny.height:* ${sul.hits[no].videos.tiny.height}

*videos.medium.size:* ${sul.hits[no].videos.medium.size}
*videos.medium.width:* ${sul.hits[no].videos.medium.width}
*videos.medium.url:* ${sul.hits[no].videos.medium.url}
*videos.medium.height:* ${sul.hits[no].videos.medium.height}
*picture_id:* ${sul.hits[no].picture_id}
*type:* ${sul.hits[no].type}
*tags:* ${sul.hits[no].tags}
*duration:* ${sul.hits[no].duration}
*downloads:* ${sul.hits[no].downloads}
*user_id:* ${sul.hits[no].user_id}
*pageURL:* ${sul.hits[no].pageURL}
*id:* ${sul.hits[no].id}
*user:* ${sul.hits[no].user}
*views:* ${sul.hits[no].views}
*likes:* ${sul.hits[no].likes}
`
            conn.sendFile(m.chat, sul.hits[no].videos.large.url ? sul.hits[no].videos.medium.url : sul.hits[no].videos.small.url, '', desvid, m)
	}
	
    }
handler.help = ['piximg','pixvid']
handler.tags = ['internet']
handler.command = ['piximg','pixvid','pixgetimg','pixgetvid']

export default handler
