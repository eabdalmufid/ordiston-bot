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
• ${usedPrefix + command} gombal
• ${usedPrefix + command} gombal2
• ${usedPrefix + command} image
• ${usedPrefix + command} image2
`
await conn.sendFile(m.chat, logo, '', caption, m)
	}
            
try {
if (command) {
switch (template) {
        
            case 'gombal':
        let ab = await fetch('https://candaan-api-h590oa540-ardhptr21.vercel.app/api/text')
        let ac = await ab.json()
    let ad = ac.data
	m.reply(ad.getRandom)
            break
            case 'gombal2':
        let ab2 = await fetch('https://candaan-api-h590oa540-ardhptr21.vercel.app/api/text/random')
        let ac2 = await ab2.json()
    let ad2 = ac2.data
	m.reply(ad2)
            break
            case 'image':
        let bb = await fetch('https://candaan-api-h590oa540-ardhptr21.vercel.app/api/image')
        let bc = await bb.json()
    let bd = bc.data
	let be = Object.values(bd).map((v, index) => ({
		title: '📌 ' + v.ayat,
		description: '\nSourcw: ' + v.source + '\nLink: ' + v.url,
		rowId: usedPrefix + 'get ' + v.url
	}))
	let bf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, bf, be, m)
            break
            case 'image2':
        let puk = 'https://candaan-api-h590oa540-ardhptr21.vercel.app/api/image/random'
        let ima = await fetch(puk)
        let kes = await ima.json()
        conn.sendButtonImg(m.chat, kes.url, kes.source, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            
            
}
}
} catch (e) {
throw eror
}
}
handler.help = ['cand <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^cand$/i
export default handler

