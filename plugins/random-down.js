import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (!text) throw `Contoh penggunaan ${usedPrefix}${command} query`
await conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/random/nsfw/${text}?apikey=${global.lolkey}`, '', `Random *${command}*`, m)

}
handler.command = /^(dlrandom)$/i

export default handler