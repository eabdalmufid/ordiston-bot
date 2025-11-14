// import { spotifySearch } from '../lib/scraped-downloader.js'
// import { music } from '@xct007/frieren-scraper';

// let handler = async(m, { conn, text }) => {
//   if (!text) throw `Masukkan judul musik!`
//   try {
//   let json = await spotifySearch(text)
//   let { title, artist, album, thumbnail, url, preview_mp3 } = json[0]
// let spotifyinfo = `✨️ *Title:* ${title}
// 🗣️ *Artists:* ${artist}
// 🎆️ *Album:* ${album}
// 🌐️ *URL*: ${url}
// 💚️ *Direct URL:* ${preview_mp3}`

//   await conn.sendFile(m.chat, thumbnail, '', spotifyinfo, m)
//   await conn.sendFile(m.chat, preview_mp3, 'spotify.mp3', spotifyinfo, m)
//   } catch (e) {
//   try {
//   let json = await music.search(text)
//   let { title, artist, album, thumbnail, release_date, audio } = json[0]
// let spotifyinfo = `✨️ *Title:* ${title}
// 🗣️ *Artists:* ${artist}
// 🎆️ *Album:* ${album}
// 🌐️ *Date*: ${release_date}
// 💚️ *Direct URL:* ${audio}`

//   await conn.sendFile(m.chat, thumbnail, '', spotifyinfo, m)
//   await conn.sendFile(m.chat, audio, 'spotify.mp3', spotifyinfo, m)
//   } catch (e) {
//   await m.reply(eror)
//   }
//   }
// }
// handler.help = ['spotify <query>']
// handler.tags = ['internet']
// handler.command = /^(spotify|music)$/i
// export default handler