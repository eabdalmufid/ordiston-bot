import axios from 'axios'
import FormData from 'form-data'
import fetch from 'node-fetch'
import fs from 'fs'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, isPrems, isOwner, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

let imgr = flaaa

let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]
  
let template = (args[0] || '').toLowerCase()
if (!args[0] || !one) {
let caption = `*Contoh Penggunaan Single*
${usedPrefix + command} cecan

*Contoh Penggunaan Multi*
${usedPrefix + command} pinterest |wibu

*List:*
• ${usedPrefix + command} anime_wpp
• ${usedPrefix + command} audi_top
• ${usedPrefix + command} dogis
• ${usedPrefix + command} hentai
• ${usedPrefix + command} kuack
• ${usedPrefix + command} michis
• ${usedPrefix + command} neko_h
• ${usedPrefix + command} nekonime1
• ${usedPrefix + command} nekonime2
• ${usedPrefix + command} nekonime3
• ${usedPrefix + command} rand_audio
• ${usedPrefix + command} rand_img
• ${usedPrefix + command} rostro_4k
• ${usedPrefix + command} txtimg
• ${usedPrefix + command} waifu
• ${usedPrefix + command} waifu_h
• ${usedPrefix + command} waifu_hd
• ${usedPrefix + command} xd_img
• ${usedPrefix + command} ytaudio
• ${usedPrefix + command} ytplay
`
await conn.sendButtonVid(m.chat, logo, caption, 'Nih.mp4', 'Back', '.menulist', fakes, adReply)
	}
            
try {
if (command) {
switch (template) {
        
            case 'hentaivid':
        let ab = await fetch(`https://latam-api.vercel.app/api/hentaivid?apikey=nekosmic`)
        let dapet = await ab.json()
        let listSections = []
	Object.values(dapet).map((v, index) => {
	listSections.push([index + ' ' + cmenub + ' ' + v.titulo, [
          ['Video 1', usedPrefix + 'get ' + v.video_1, `${v.titulo}
${v.link}
${v.categoria}
${v.compartido}
${v.vistas}
${v.tipo}
${v.video_1}
${v.video_2}`],
          ['Video 2', usedPrefix + 'get ' + v.video_2, `${v.titulo}
${v.link}
${v.categoria}
${v.compartido}
${v.vistas}
${v.tipo}
${v.video_1}
${v.video_2}`]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 HENTAI VIDEO 🔎 ' + htka, `⚡ Silakan pilih HENTAI VIDEO di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `HENTAI VIDEO Disini`, listSections, m)
            break
            case 'hentai':
case 'neko_h':
case 'waifu_h':
        let hen = await fetch(`https://latam-api.vercel.app/api/${args[0]}?apikey=nekosmic`)
        let tai = await hen.json()
        conn.sendButtonImg(m.chat, tai.hidrogeno, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'kuack':
case 'anime_wpp':
case 'dogis':
case 'michis':
case 'nekonime1':
case 'nekonime2':
case 'nekonime3':
case 'rostro_4k':
case 'waifu':
case 'waifu_hd':
case 'xd_img':
        let kua = await fetch(`https://latam-api.vercel.app/api/${args[0]}?apikey=nekosmic`)
        let ack = await kua.json()
        conn.sendButtonImg(m.chat, ack.imagen, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'audi_top':
case 'rand_audio':
let kuas = await fetch(`https://latam-api.vercel.app/api/${args[0]}?apikey=nekosmic`)
        let acks = await kuas.json()
					await conn.sendFile(m.chat, acks.audio, '', '', fakes, null, {
						fileLength: fsizedoc,
						seconds: fsizedoc,
						contextInfo: {
							externalAdReply: {
								body: author,
								containsAutoReply: true,
								mediaType: 2,
								mediaUrl: syt,
								showAdAttribution: true,
								sourceUrl: syt,
								thumbnailUrl: await conn.resize(logo, 300, 150),
								renderLargerThumbnail: true,
								title: 'Nihh Kak, ' + name,
							}
						}
					})
					break
            case 'rand_img':
        let kuxa = await fetch(`https://latam-api.vercel.app/api/rand_img?apikey=nekosmic`)
        let acxk = await kuxa.json()
        conn.sendButtonImg(m.chat, acxk.randimg, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            
            case 'txtimg':
        let kuta = await fetch(`https://latam-api.vercel.app/api/txtimg?apikey=nekosmic&q=${one}`)
        let actk = await kuta.json()
        conn.sendButtonImg(m.chat, actk.txtimg, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            
            case 'ytaudio':
        let kuya = await fetch(`https://latam-api.vercel.app/api/ytaudio?apikey=nekosmic&q=${one}`)
        let acyk = await kuya.json()
        let acumal = `${acyk.titulo}
        ${acyk.duracion}
        ${acyk.vistas}
        ${acyk.descripcion}`
        conn.sendButtonImg(m.chat, acyk.logo, acumal, 'Nih.jpg', 'Get', '.get ' + acyk.descarga, fakes, adReply)
            break
            
            case 'ytplay':
        let kupa = await fetch(`https://latam-api.vercel.app/api/ytplay?apikey=nekosmic&q=${one}`)
        let acpk = await kupa.json()
        let acukal = `${acpk.titulo}
        ${acpk.duracion}
        ${acpk.vistas}
        ${acpk.descripcion}`
        conn.sendButtonImg(m.chat, acpk.logo, acukal, 'Nih.jpg', 'Get', '.get ' + acpk.descarga, fakes, adReply)
            break
            
            
}
}
} catch (e) {
throw eror
}
}
handler.help = ['latam <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^latam$/i
export default handler

