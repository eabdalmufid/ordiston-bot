import fetch from 'node-fetch'

let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
if (!args[0]) throw `Use example ${usedPrefix}${command} http://i.coco.fun/short/1513tui/`
if (!args[1]) return conn.sendButton(m.chat, htki + ' COCOFUN ' + htka, null, null, [['❌ NO WM', `.cocofun ${args[0]} nowm`],['✅ WITH WM', `.cocofun ${args[0]} withwm`]],m)
let res = await fetch(`https://api.lolhuman.xyz/api/cocofun?apikey=${global.lolkey}&url=${args[0]}`)
    let x = await res.json()
  if (args[1] == 'withwm') {
    conn.sendFile(m.chat, x.result.withwm, '', `*${htki} COCOFUN ${htka}*
*title:* ${x.result.title}
*tag:* ${x.result.tag}
*likes:* ${x.result.likes}
*dislike:* ${x.result.dislike}
*views:* ${x.result.views}
*uploader:* ${x.result.uploader}
*duration:* ${x.result.duration}
*dislike:* ${x.result.dislike}`, m)
  }
  if (args[1] == 'nowm') {
    conn.sendFile(m.chat, x.result.nowm, '', `*${htki} COCOFUN ${htka}*
*title:* ${x.result.title}
*tag:* ${x.result.tag}
*likes:* ${x.result.likes}
*dislike:* ${x.result.dislike}
*views:* ${x.result.views}
*uploader:* ${x.result.uploader}
*duration:* ${x.result.duration}
*dislike:* ${x.result.dislike}`, m)
  }
  }
handler.help = ['cocofun'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^c(oco(fun(d(own(load(er)?)?|l))?|d(own(load(er)?)?|l))|cfun(d(own(load(er)?)?|l))?)$/i

export default handler