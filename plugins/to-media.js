import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import fetch from 'node-fetch'
import PDFDocument from 'pdfkit';
import { Writable } from 'stream';

let handler = async (m, { conn, text, usedPrefix, command }) => {

if (command == 'towebp') {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`
let img = await q.download?.()
    let url = await uploadImage(img)
    let res = `https://api.lolhuman.xyz/api/convert/towebp?apikey=${global.lolkey}&img=${url}`
await conn.sendFile(m.chat, res, 'out.webp', m, false, { mimetype: 'image/webp', thumbnail: Buffer.alloc(0) })
    }
    
if (command == 'towebpr') {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`

    let img = await q.download?.()
    let url = await uploadImage(img)
    let res = `https://api.lolhuman.xyz/api/convert/towebpwround?apikey=${global.lolkey}&img=${url}`
await conn.sendFile(m.chat, res, 'out.webp', m, false, { mimetype: 'image/webp', thumbnail: Buffer.alloc(0) })
}

if (command == 'webptogif') {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`

    let img = await q.download?.()
   // let url = await uploadImage(img)
    let res = `https://api.lolhuman.xyz/api/convert/webptogif?apikey=${global.lolkey}&img=${img}`
await conn.sendFile(m.chat, res, 'out.gif', m, false, { mimetype: 'image/gif', thumbnail: Buffer.alloc(0) })
}

if (command == 'webptomp4') {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`

    let img = await q.download?.()
   // let url = await uploadImage(img)
    let res = `https://api.lolhuman.xyz/api/convert/webptomp4?apikey=${global.lolkey}&img=${img}`
await conn.sendFile(m.chat, res, 'out.mp4', m, false, { mimetype: 'video/mp4', thumbnail: Buffer.alloc(0) })
}

if (command == 'imgtopdf') {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`

    let img = await q.download?.()
    // let url = await uploadImage(img)
    // let res = `https://api.lolhuman.xyz/api/convert/imgtopdf?apikey=${global.lolkey}&img=${img}`
    let res = await convertImageToPDF(img)
await conn.sendMessage(m.chat, {
            document: res,
            mimetype: "application/pdf",
            fileName: `For ${m.name}.pdf`
        }, {
            quoted: m,
            ephemeralExpiration: ephemeral
        })
}

if (command == 'topng') {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`

    let img = await q.download?.()
   // let url = await uploadImage(img)
    let res = `https://api.lolhuman.xyz/api/convert/topng?apikey=${global.lolkey}&img=${img}`
await conn.sendFile(m.chat, res, 'out.png', m, false, { mimetype: 'image/png', thumbnail: Buffer.alloc(0) })
}

if (command == 'tobase64') {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`

    let img = await q.download?.()
    // let url = await uploadFile(img)
    let res = `https://api.lolhuman.xyz/api/filetobase64?apikey=${global.lolkey}&file=${img}`
await conn.sendFile(m.chat, res, 'Hasil', '', m)
}

if (command == '64tofile') {
if (!text) throw `balas gambar dengan perintah\n\n${usedPrefix + command} base64`
let res = `https://api.lolhuman.xyz/api/base64tofile?apikey=${global.lolkey}&base=${text}`
await conn.sendFile(m.chat, res, 'Hasil', '', m)
}

if (command == 'urltoimg') {
if (!text) throw `balas gambar dengan perintah\n\n${usedPrefix + command} url`
let res = `https://api.lolhuman.xyz/api/urltoimg?apikey=${global.lolkey}&url=${text}`
await conn.sendFile(m.chat, res, 'out.jpeg', m, false, { mimetype: 'image/jpeg', thumbnail: Buffer.alloc(0) })
}

if (command == 'filetourl') {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`

    let img = await q.download?.()
   // let url = await uploadImage(img)
    let res = await fetch(`https://api.lolhuman.xyz/api/filetourl?apikey=${global.lolkey}&file=${img}`)
    let p = await res.json()
    let rem = p.result
    await m.reply(`*Result:* ${rem}`)
}

if (command == 'emorse') {
    if (!text) throw `balas gambar dengan perintah\n\n${usedPrefix + command} text`
let res = await fetch(`https://api.lolhuman.xyz/api/morse/encrypt?apikey=${global.lolkey}&text=${text}`)
    let p = await res.json()
    let rem = p.result
    await m.reply(`*Result:* ${rem}`)
}

if (command == 'dmorse') {
    if (!text) throw `balas gambar dengan perintah\n\n${usedPrefix + command} kode morse`
let res = await fetch(`https://api.lolhuman.xyz/api/morse/decrypt?apikey=${global.lolkey}&text=${text}`)
    let p = await res.json()
    let rem = p.result
    await m.reply(`*Result:* ${rem}`)
}

if (command == 'emojimix3') {
    if (!text) throw `perintah\n\n${usedPrefix + command} 😱 + 😳`
let urut = text.split`+`
  let text1 = urut[0]
  let text2 = urut[1]

    let res = `https://api.lolhuman.xyz/api/emojimix/${text1}+${text2}?apikey=${global.lolkey}`
let stiker = await sticker(false, res, global.packname, global.author)
conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
}

if (command == 'smojimg') {
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text
    
    let res = `https://api.lolhuman.xyz/api/smoji/${text}?apikey=${global.lolkey}`
await conn.sendFile(m.chat, res, 'out.jpeg', m, false, { mimetype: 'image/jpeg', thumbnail: Buffer.alloc(0) })
}

if (command == 'smojimg2') {
    if (!text) throw `balas gambar dengan perintah\n\n${usedPrefix + command} emoji`
let res = await fetch(`https://api.lolhuman.xyz/api/smoji3/${text}?apikey=${global.lolkey}`)
    let p = await res.json()
    let x = p.result
    const sections = [
    {
	title: "Theme",
	rows: [
	{title: "apple", rowId: `${usedPrefix}get ${x.emoji.apple}`},
{title: "au_by_kddi", rowId: `${usedPrefix}get ${x.emoji.au_by_kddi}`},
{title: "docomo", rowId: `${usedPrefix}get ${x.emoji.docomo}`},
{title: "emojidex", rowId: `${usedPrefix}get ${x.emoji.emojidex}`},
{title: "facebook", rowId: `${usedPrefix}get ${x.emoji.facebook}`},
{title: "google", rowId: `${usedPrefix}get ${x.emoji.google}`},
{title: "htc", rowId: `${usedPrefix}get ${x.emoji.htc}`},
{title: "joypixels", rowId: `${usedPrefix}get ${x.emoji.joypixels}`},
{title: "lg", rowId: `${usedPrefix}get ${x.emoji.lg}`},
{title: "messenger", rowId: `${usedPrefix}get ${x.emoji.messenger}`},
{title: "microsoft", rowId: `${usedPrefix}get ${x.emoji.microsoft}`},
{title: "mozilla", rowId: `${usedPrefix}get ${x.emoji.mozilla}`},
{title: "noto_emoji", rowId: `${usedPrefix}get ${x.emoji.noto_emoji}`},
{title: "openmoji", rowId: `${usedPrefix}get ${x.emoji.openmoji}`},
{title: "samsung", rowId: `${usedPrefix}get ${x.emoji.samsung}`},
{title: "skype", rowId: `${usedPrefix}get ${x.emoji.skype}`},
{title: "softbank", rowId: `${usedPrefix}get ${x.emoji.softbank}`},
{title: "sony_playstation", rowId: `${usedPrefix}get ${x.emoji.sony_playstation}`},
{title: "twitter", rowId: `${usedPrefix}get ${x.emoji.twitter}`},
{title: "whatsapp", rowId: `${usedPrefix}get ${x.emoji.whatsapp}`}
	]
    }
]

const listMessage = {
  text: `⚡ Silakan pilih tema di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
  footer: global.wm,
  title: `⎔───「 ${command} 」───⎔`,
  buttonText: `Tema Disini`,
  sections
}
conn.sendMessage(m.chat, listMessage, fdoc)
}

}
//lo mau apa??
handler.command = handler.help = ['64tofile', 'dmorse', 'emojimix3', 'emorse', 'filetourl', 'imgtopdf', 'smojimg', 'smojimg2', 'tobase64', 'topng', 'towebp', 'towebpr', 'urltoimg', 'webptogif', 'webptomp4']
handler.tags = ['tools']

export default handler

async function convertImageToPDF(imageBuffer) {
  return new Promise((resolve, reject) => {
    const pdfDoc = new PDFDocument();
    const buffers = [];

    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        buffers.push(chunk);
        callback();
      },
    });

    pdfDoc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    pdfDoc.on('error', (error) => {
      reject(error);
    });

    pdfDoc.image(imageBuffer);
    pdfDoc.end();

    writableStream.on('error', (error) => {
      reject(error);
    });

    pdfDoc.pipe(writableStream);
  });
}