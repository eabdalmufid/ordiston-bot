import fetch from 'node-fetch'
let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (command == 'jooxp') {
if (!text) throw `Contoh:
${usedPrefix + command} gustixa`
let f = await fetch(`https://api.lolhuman.xyz/api/jooxplay?apikey=${global.lolkey}&query=${text}`)
let x = await f.json()
let teks = `*Result:*
*singer:* ${x.result.info.singer}
*song:* ${x.result.info.song}
*album:* ${x.result.info.album}
*date:* ${x.result.info.date}
*duration:* ${x.result.info.duration}
*duration:* ${x.result.lirik}
`
  await conn.sendButton(m.chat, teks, wm, x.result.image, [
                ['Search!', `${usedPrefix}jooxs ${text}`],
                ['Mp3!', `${usedPrefix}get ${x.result.audio[0].link}`]
            ], m)
            }
            
}

handler.command = handler.help = ['jooxp']
handler.tags = ['tools']

export default handler
