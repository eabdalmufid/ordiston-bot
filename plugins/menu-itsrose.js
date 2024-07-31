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
• anime/anoboy/detail
• dewasa/bokep/latest
• downloader/yt
• image/anime/diffusion
• manga/mcreader/search
• others/apkmody/detail
• photooxy/wanted
• random/story/anime
• searching/ytsearch
• textpro/anciented
`
await conn.sendFile(m.chat, logo, '', caption, m)
	}
            
try {
if (command) {
switch (template) {
        
            case 'anime':
        let ab = await fetch(`http://api.itsrose.site/anime/${one}?${two}&apikey=Rs-Zeltoria`)
        let ac = await ab.json()
        m.reply(ac)
            break
            case 'downloader':
        let dl = await fetch(`http://api.itsrose.site/downloader/${one}?${two}&apikey=Rs-Zeltoria`)
        let dp = await dl.json()
        m.reply(dp)
            break
            case 'dewasa':
        let dw = await fetch(`http://api.itsrose.site/dewasa/${one}?${two}&apikey=Rs-Zeltoria`)
        let qs = await dw.json()
        m.reply(qs)
            break
            case 'manga':
        let mng = await fetch(`http://api.itsrose.site/manga/${one}?${two}&apikey=Rs-Zeltoria`)
        let mmg = await mng.json()
        m.reply(mmg)
            break
            case 'image':
        let bb = `http://api.itsrose.site/image/${one}?${two}&apikey=Rs-Zeltoria`
        conn.sendButtonImg(m.chat, bb, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'photooxy':
        let ox = `http://api.itsrose.site/photooxy/${one}?${two}&apikey=Rs-Zeltoria`
        conn.sendButtonImg(m.chat, ox, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'random':
        let rd = `http://api.itsrose.site/random/${one}?${two}&apikey=Rs-Zeltoria`
        conn.sendButtonVid(m.chat, rd, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'searching':
        let se = await fetch(`http://api.itsrose.site/searching/${one}?${two}&apikey=Rs-Zeltoria`)
        let seqa = await se.json()
        m.reply(seqa)
            break
            case 'others':
        let oth = await fetch(`http://api.itsrose.site/others/${one}?${two}&apikey=Rs-Zeltoria`)
        let oup = await oth.json()
        m.reply(oup)
            break
            case 'textpro':
        let tpr = `http://api.itsrose.site/textpro/${one}?${two}&apikey=Rs-Zeltoria`
        conn.sendButtonImg(m.chat, tpr, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
}
}
} catch (e) {
throw eror
}
}
handler.help = ['rose <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^rose$/i
export default handler
