import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js' 

let handler = async (m, { conn, usedPrefix, command, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Kirim/Reply Gambar Dengan Caption .toanime'
m.reply(wait)
try {
let media = await q.download()
let url = await uploadFile(media)
let hasil = `https://api.xyroinee.xyz/api/others/toanime?url=${url}&apikey=${global.xyro}`
conn.sendFile(m.chat, await(await fetch(hasil)).buffer(), 'error.jpg', 'Nih Kak, Maaf Kalau Hasilnya Tidak Sesuai Keinginan', m)
} catch (e) {
m.reply(eror)
}
}
handler.help = ['toanimex']
handler.tags = ['ai']
handler.command = /^(jadianimex|toanimex)$/i
handler.limit = true

export default handler
 