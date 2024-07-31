import fetch from 'node-fetch'
import hxz from 'hxz-api'
import fs from 'fs'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, isPrems, isOwner, command }) => {
let frep = { contextInfo: { externalAdReply: {title: global.wm, body: global.author, sourceUrl: snh, thumbnail: fs.readFileSync('./thumbnail.jpg')}}}
let imgr = flaaa
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hoppai.getRandom())

if (command == 'tthnowm') {
if (!text) return m.reply(`Example: ${usedPrefix + command} https://vt.tiktok.com/ZSenkFefe`)

let p = await  hxz.ttdownloader(text)
let { nowm, wm, audio } = p
conn.sendFile(m.chat, nowm, null, 'No Wm', m)
}
if (command == 'tthwm') {
if (!text) return m.reply(`Example: ${usedPrefix + command} https://vt.tiktok.com/ZSenkFefe`)

let p = await  hxz.ttdownloader(text)
let { nowm, wm, audio } = p
conn.sendFile(m.chat, wm, null, 'Wm', m)
}
if (command == 'tthaudio') {
if (!text) return m.reply(`Example: ${usedPrefix + command} https://vt.tiktok.com/ZSenkFefe`)

let p = await  hxz.ttdownloader(text)
let { nowm, wm, audio } = p
conn.sendFile(m.chat, audio, null, 'Audio', m)
}

if (command == 'chara') {
let p = await  hxz.chara(text)
conn.sendFile(m.chat, p.result, null, 'Chara', m)
}

}
handler.command = handler.help = ['tthnowm', 'tthwm', 'tthaudio', 'chara']
handler.tags = ['downloader']

export default handler