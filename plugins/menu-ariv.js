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
• ${usedPrefix + command} dare
• ${usedPrefix + command} truth
• ${usedPrefix + command} quote
• ${usedPrefix + command} fiersa
• ${usedPrefix + command} senja
• ${usedPrefix + command} kpop
• ${usedPrefix + command} random
`
await conn.sendFile(m.chat, logo, '', caption, m)
	}
            
try {
if (command) {
switch (template) {
        
            case 'dare':
        let ab = await fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kata-kata/dare.json')
        let ac = await ab.json()
	m.reply(ac.getRandom)
            break
            case 'truth':
        let ab1 = await fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kata-kata/truth.json')
        let ac1 = await ab1.json()
	m.reply(ac1.getRandom())
            break
            case 'quote':
        let ab2 = await fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kata-kata/quote.json')
        let ac2 = await ab2.json()
    let ad2 = ac2[ Math.floor(Math.random() * ac2.length) ]
	m.reply('"' + ad2.quotes + '"' + '\n\n' + '*' + ad2.author + '*')
            break
            case 'fiersa':
        let ab3 = await fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kata-kata/fiersa-besari.txt')
        let ac3 = await ab3.text()
    let ad3 = ac3.split('\n')
	m.reply(ad3.getRandom())
            break
            case 'senja':
        let ab4 = await fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kata-kata/senja.txt')
        let ac4 = await ab4.text()
    let ad4 = ac4.split('\n')
	m.reply(ad4.getRandom())
            break
            case 'kpop':
        let ab5 = await fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/' + one + '.txt')
        let ac5 = await ab5.text()
    let ad5 = ac5.split('\n')
	conn.sendButtonImg(m.chat, ad5.getRandom(), wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'random':
        let ab6 = await fetch('https://raw.githubusercontent.com/arivpn/dbase/master/random/' + one + '.txt')
        let ac6 = await ab6.text()
    let ad6 = ac6.split('\n')
	conn.sendButtonImg(m.chat, ad6.getRandom(), wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            
}
}
} catch (e) {
throw eror
}
}
handler.help = ['ariv <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^ariv$/i
export default handler

