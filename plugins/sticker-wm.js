import { addExif, sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'


let handler = async (m, { conn, text, usedPrefix, command }) => {
  let stiker = false
  try {
    let [packname, ...author] = text.split`|`
    author = (author || []).join('|')
    let q = m.quoted ? m.quoted : m
    let mime = m.quoted.mimetype || ''
    if (/webp/.test(mime)) {
      let img = await m.quoted.download()
      if (!img) throw 'Reply a sticker!'
      stiker = await addExif(img, packname || '', author || '')
    } else if (/image/.test(mime)) {
      let imge = await m.quoted.download()
      let outi = await uploadImage(imge)
      stiker = await sticker(outi, packname || '', author || '')
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) return m.reply('maks 10 detik!')
      let imgo = await m.quoted.download()
      let outu = await uploadImage(imgo)
      stiker = await sticker( outu, packname || '', author || '')
    }
  } finally {
    if (stiker) await conn.sendFile(m.chat, stiker, 'stiker.webp', '', m, false, { asSticker: true })
    else throw `Balas stiker dengan perintah *${usedPrefix + command} <teks>|<teks>*`
  }
}
handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^(s(ti(ck(erwn|wm)|k(er)?wm)|wm)|colong|wm)$/i

handler.premium = true
export default handler
