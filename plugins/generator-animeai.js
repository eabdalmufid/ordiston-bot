import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    var out
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)

        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        if (/video/g.test(mime)) {
            if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!')
            }
        if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n*${usedPrefix + command}*`)
        let img = await q.download?.()
        let meme = 'https://api.caliph.biz.id/api/animeai?img='
        let memee = '&apikey=caliphkey'
        if (/webp/g.test(mime)) {
            out = meme + await webp2png(img) + memee
        } else if (/image/g.test(mime)) {
            out = meme + await uploadImage(img) + memee
        } else if (/video/g.test(mime)) {
            out = meme + await uploadFile(img) + memee
        } else if (/gif/g.test(mime)) {
            out = meme + await uploadFile(img) + memee
        } else if (/viewOnce/g.test(mime)) {
            out = meme + await uploadFile(img) + memee
        }
        
        m.reply(wait)
        if (out) {
        conn.sendFile(m.chat, out, 'result', "Result *AnimeAi*", m)
        } else {
        throw eror
        }

}
handler.help = ["animeai"]
handler.tags = ['maker']
handler.command = ["animeai"]

export default handler