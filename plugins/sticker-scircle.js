import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
let img = await q.download()
let url = await uploadImage(img)
let scircle = global.API('dzx', '/api/canvas/circle', { url }) 
let stiker = await sticker(null, scircle, global.packname, m.name)
conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, { asSticker: true })
} catch (e) {
m.reply('*Respond to a image to make it circle sticker*')
}}
handler.command = /^scircle$/i
export default handler
/* `https://api.dhamzxploit.my.id/api/canvas/circle?url=${url}` */