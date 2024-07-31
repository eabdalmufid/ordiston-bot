import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `Reply video/audio you want to convert to voice note/vn with caption *${usedPrefix + command}*`
    let media = await q.download?.()
    if (!media) throw 'Can\'t download media'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw 'Can\'t convert media to audio'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' })
}
handler.help = ['tovn'].map(v => v + ' <reply>')
handler.tags = ['audio']

handler.command = /^(to(ptt|vn)|ptt|vn)$/i

export default handler