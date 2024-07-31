import {
    aiovideodl
} from '@bochilteam/scraper'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
if (!args[0]) throw `Use example ${usedPrefix}${command} https://vt.tiktok.com/ZSdDyUHcR/\n\nhttps://www.tiktok.com/@kata__kasar/video/7088823247373946138`

const { title, medias } = await aiovideodl(args[0])
for (const { url, quality, formattedSize} of medias) await conn.sendFile(m.chat, await(await fetch(url)).buffer(), '', `*AIOVIDEO DOWNLOADER*\n\n${title ? `*Title:* ${title}` : "NotFound"}\n*💽Format:* ${quality ? `${quality}` : "Unknown"}\n*📨Size:* ${formattedSize ? `${formattedSize}` : "countless" }\n`, m)
}
handler.help = ['aiovideo2'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(aio(video2)?(dl2)?)$/i

export default handler