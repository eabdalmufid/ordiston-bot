import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    let link = await (isTele ? uploadImage : uploadFile)(media)
    if (!text) throw 'Input parameter required\n\n*Detail:* https://images.weserv.nl/docs/'
    try {
        const input = text;
        const result = input.replace(/ /g, '&').replace(/(\w+)=(\w+)/g, '$1=$2');
        const wsrv = "https://wsrv.nl/?url=" + link + "&" + result;
        await conn.sendFile(m.chat, wsrv, 'wsrv.jpg', 'Sudah Jadi', m);
    } catch (e) {
        await m.reply(eror + '\n\n*Detail:* https://images.weserv.nl/docs/');
    }
}
handler.help = ['towsrv'].map(v => v + ' (Balas foto)')
handler.tags = ['tools']
handler.command = /^(to|jadi)wsrv$/i
handler.limit = true
export default handler