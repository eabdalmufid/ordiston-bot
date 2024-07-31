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
• ${usedPrefix + command} pindl
• ${usedPrefix + command} xnxxdl
• ${usedPrefix + command} xnxx
• ${usedPrefix + command} tiktok2
• ${usedPrefix + command} tiktok
• ${usedPrefix + command} soundcloud
• ${usedPrefix + command} pinterest
• ${usedPrefix + command} mediafire
• ${usedPrefix + command} gdrive
• ${usedPrefix + command} fb
`
await conn.sendFile(m.chat, logo, '', caption, m)
	}
            
try {
if (command) {
switch (template) {
        
            case 'gdrive':
        let ab = await fetch(`https://malesin.xyz/gdrive?url=${one}`)
        let ac = await ab.json()
	let ae = {
		title: '📌 ' + ac.fileName,
		description: '\nSize: ' + ac.fileSize + '\nType: ' + ac.mimetype,
		rowId: usedPrefix + 'get ' + ac.downloadUrl
	}
	let af = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, af, ae, m)
            break
            case 'fb':
        let bb = await fetch(`https://malesin.xyz/fb?url=${one}`)
        let bc = await bb.json()
    let bd = bc.result
	let be = Object.values(bd).map((v, index) => ({
		title: '📌 ' + v.quality,
		description: author,
		rowId: usedPrefix + 'get ' + v.url
	}))
	let bf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, bf, be, m)
            break
            case 'tiktok':
        let cb = await fetch(`https://malesin.xyz/tiktok?url=${one}`)
        let cc = await cb.json()
        conn.send2ButtonVid(m.chat, cc.video, cc.title, cc.author, `Wm`, `.get ${cc.videoWM}`, `Audio`, `.get ${cc.audio}`, fakes, adReply)
            break
            case 'tiktok2':
        let cb2 = await fetch(`https://malesin.xyz/tiktok2?url=${one}`)
        let cc2 = await cb2.json()
        conn.send2ButtonVid(m.chat, giflogo, wm, author, `Ori`, `.get ${cc2.audio_original}`, `Audio`, `.get ${cc2.audio}`, fakes, adReply)
            break
           case 'pindl':
        let cb3 = await fetch(`https://malesin.xyz/pindl?url=${one}`)
        let cc3 = await cb3.json()
        conn.sendButtonImg(m.chat, cc3.result, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'xnxxdl':
        let cb4 = await fetch(`https://malesin.xyz/xnxxdl?url=${one}`)
        let cc4 = await cb4.json()
        conn.send2ButtonVid(m.chat, cc4.result.files.high, cc4.result.title, cc4.result.duration + ' s', `Low`, `.get ${cc4.result.files.low}`, `HLS`, `.get ${cc4.result.files.HLS}`, fakes, adReply)
            break
            case 'pinterest':
        let db = await fetch(`https://malesin.xyz/pinsearch?q=${one}`)
        let dc = await db.json()
    let dd = dc.result
	let de = Object.keys(dd).map((v, index) => ({
		title: `Data ke ${1 + index}`,
		description: '• ' + wm,
		rowId: usedPrefix + 'get ' + dd[v]
	}))
	let df = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, df, de, m)
            break
            case 'mediafire':
        let eb = await fetch(`https://malesin.xyz/mediafire?url=${one}`)
        let ec = await eb.json()
    let ed = ec.result
	let ee = {
		title: ed.filename,
		description: '• ' + ed.filename + '• ' + ed.filesize + '• ' + ed.uploadAt + '• ' + ed.mimetype + '• ' + ed.ext + '• ' + ed.filetype + '• ' + ed.link ,
		rowId: usedPrefix + 'get ' + ed.link
	}
	let ef = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, ef, ee, m)
            break
            case 'soundcloud':
        let db2 = await fetch(`https://malesin.xyz/scsearch?q=${one}`)
        let dc2 = await db2.json()
    let dd2 = dc2.result
	let de2 = Object.values(dd2).map((v, index) => ({
		title: v.title,
		description: '• ' + v.artist + '• ' + v.views + '• ' + v.release + '• ' + v.timestamp,
		rowId: usedPrefix + 'ss ' + v.url
	}))
	let df2 = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, df2, de2, m)
            break
            
            case 'xnxx':
        let db3 = await fetch(`https://malesin.xyz/xnxxsearch?q=${one}`)
        let dc3 = await db3.json()
    let dd3 = dc3.result
	let de3 = Object.values(dd3).map((v, index) => ({
		title: v.title,
		description: '• ' + v.info,
		rowId: usedPrefix + 'males xnxxdl |' + v.link
	}))
	let df3 = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, df3, de3, m)
            break
            
}
}
} catch (e) {
throw eror
}
}
handler.help = ['males <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^males$/i
export default handler

