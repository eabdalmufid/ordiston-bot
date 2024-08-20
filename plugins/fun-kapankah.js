
import fetch from 'node-fetch'
import fs from 'fs'

let toM = a => '@' + a.split('@')[0]
let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command }) => {
let frep = { contextInfo: { externalAdReply: {title: global.wm, body: global.author, sourceUrl: snh, thumbnail: fs.readFileSync('./thumbnail.jpg')}}}
let imgr = flaaa

if (command == 'kapankah') {
return m.reply(`
*Pertanyaan:* ${m.text}
*Jawaban:* ${(10).getRandom()} ${['detik', 'menit', 'jam', 'hari', 'minggu', 'bulan', 'tahun', 'dekade', 'abad'].getRandom()} lagi ...
  `.trim(), null, m.mentionedJid ? {
        mentions: conn.parseMention(m.text)
    } : {})
}

if (command == 'akankah') {
return m.reply(`
*Pertanyaan:* ${m.text}
*Jawaban:* ${['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin'].getRandom()}
  `.trim(), null, m.mentionedJid ? {
        mentions: conn.parseMention(m.text)
    } : {})
}

if (command == 'siapakah') {
let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    m.reply(`${toM(a)} Dia bang.🗿`, null, {
        mentions: [a]
    })
}

if (command == 'mengapa') {
return m.reply(`
*Pertanyaan:* ${m.text}
*Jawaban:* ${['Karena anda ganteng', 'Karna lo wibu :[', 'karna lo didikan wahyu', 'Karna gw gk tau', 'Lo punya jin', 'Tidak mungkin'].getRandom()}
  `.trim(), null, m.mentionedJid ? {
        mentions: conn.parseMention(m.text)
    } : {})
}

if (command == 'bisakah') {
return m.reply(`
*Pertanyaan:* ${m.text}
*Jawaban:* ${['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin'].getRandom()}
  `.trim(), null, m.mentionedJid ? {
        mentions: conn.parseMention(m.text)
    } : {})
}
}
handler.command = handler.help = ['kapankah', 'akankah', 'siapakah', 'mengapa', 'bisakah']
handler.tags = ['kerang']

export default handler

function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
  }