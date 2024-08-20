import { toDataURL } from 'qrcode'

let handler = async (m, { conn, usedPrefix, args, command }) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input teks atau reply teks yang ingin di jadikan qr!"
    await m.reply(wait)
    let caption = `Nih hasil ${command} nya
Balas pesan ini ntuk membaca Qr Ketik *.readqr* `
    try {
        await conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', caption, m)
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <teks>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i
export default handler