import util from 'util'
import path from 'path'
import fetch from 'node-fetch'

let user = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {
if (!text) throw `Contoh:
${usedPrefix + command} pengcoli`

let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b = ps.getRandom()
let c = ps.getRandom()
let d = ps.getRandom()
let e = ps.getRandom()
let f = ps.getRandom()
let g = ps.getRandom()
let h = ps.getRandom()
let i = ps.getRandom()
let j = ps.getRandom()
let x = `${pickRandom(['😨','😅','😂','😳','😎', '🥵', '😱', '🐦', '🙄', '🐤','🗿','🐦','🤨','🥴','😐','👆','😔', '👀','👎'])}`
let l = Math.floor(Math.random() * x.length);
/*let res = fetch('https://raw.githubusercontent.com/BadXyz/txt/main/citacita/citacita.json')
let json = res.json()
let vn = json.getRandom()*/
let top = `*${x} Top 10 ${text} ${x}*
    
*1. ${user(a)}*
*2. ${user(b)}*
*3. ${user(c)}*
*4. ${user(d)}*
*5. ${user(e)}*
*6. ${user(f)}*
*7. ${user(g)}*
*8. ${user(h)}*
*9. ${user(i)}*
*10. ${user(j)}*`
m.reply(top, null, {
contextInfo: {
mentionedJid: [a, b, c, d, e, f, g, h, i, j]
}})
//conn.sendFile(m.chat, vn, 'error.mp3', null, m, true, { type: 'audioMessage', ptt: true })
    
}
handler.help = handler.command = ['top']
handler.tags = ['fun']
handler.group = true
handler.limit = true

export default handler

function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
  }