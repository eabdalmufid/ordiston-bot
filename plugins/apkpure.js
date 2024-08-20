import { sandroid1 } from '../lib/scrape.js'
import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, 'Harap Masukan Query', m)

  await m.reply('Searching...')
    let res = await sandroid1(text)
    let teks = res.data.map((v, index) => {
                    return v.judul + '\n⌚ dev: ' + v.dev + '\n⏲️ rating: ' + v.rating + '\n👁️ thumb: ' + v.thumb + '\n📎 link: ' + v.link
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
}
handler.help = ['apkpure'].map(v => v + ' <query>')
handler.tags = ['tools']
handler.command = /^(apkpure)$/i
handler.owner = false

handler.exp = 0
handler.limit = true

export default handler