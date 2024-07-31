
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
let tqto = `*${htki} BIG THANKS TO ${htka}*

*Adiwajshing:*
https://github.com/adiwajshing

*Nurutomo:*
https://github.com/Nurutomo

*Istikmal:* 
https://github.com/BochilGaming

*Ariffb:*
https://github.com/Ariffb25

*Ilman:*
https://github.com/ilmanhdyt

*Amirul:*
https://github.com/amiruldev20

*Rasel:*
https://github.com/raselcomel

*Fatur:*
https://github.com/Ftwrr

*Rominaru:*
https://github.com/Rominaru

*Kannachann:*
https://github.com/Kannachann

*The.sad.boy01:*
https://github.com/kangsad01

*Ameliascrf:*
https://github.com/Ameliascrf

*Fokus ID:*
https://github.com/Fokusdotid

*AmmarBN:*
https://github.com/AmmarrBN
`
conn.sendButton(m.chat, tqto, wm, await(await fetch(hwaifu.getRandom())).buffer(), [['🎀 Menu', '/menu']], m, { fileLength: fsizedoc, seconds: fsizedoc, contextInfo: {
          externalAdReply :{
    mediaUrl: sig,
    mediaType: 2,
    description: wm, 
    title: '👋 Hai, ' + name + ' ' + ucapan,
    body: botdate,
    thumbnail: await(await fetch(pp)).buffer(),
    sourceUrl: sig
     }}
  })
}
handler.help = ['tqto']
handler.tags = ['main','info']
handler.command = /^(credits|credit|thanks|thanksto|tqto)$/i
export default handler
