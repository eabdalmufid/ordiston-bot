import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {
let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]
  
if (command == 'cdnjs') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} angular`

let f = await fetch(`https://api.cdnjs.com/libraries/${text}`)
let x = await f.json()
let caption = `*Name:* ${x.name}
*Latest:* ${x.latest}

*Description:* ${x.description}
*Homepage:* ${x.homepage}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix}${command} ${text}`]
            ], m)
}

if (command == 'readqr') {
let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Fotonya Mana? Reply gambar yg gk ada button aja'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`
    let img = await q.download?.()
    let url = await uploadImage(img)

let f = await fetch(`https://api.lolhuman.xyz/api/read-qr?apikey=${global.lolkey}&img=${url}`)
let x = await f.json()
let caption = `*Hasil:* ${x.result}`
m.reply(caption)
}

if (command == 'scanqr') {
let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Fotonya Mana? Reply gambar yg gk ada button aja'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`
    let img = await q.download?.()
    let url = await uploadImage(img)

let f = await fetch(`http://api.qrserver.com/v1/read-qr-code/?fileurl=${url}`)
let x = await f.json()
var caption = `*Type :* ${x[0].type}
*Seq :* ${x[0].symbol[0].seq}
*Data :* ${x[0].symbol[0].data}
`
m.reply(caption)
}

if (command == 'animechan') {
let f = await fetch(`https://animechan.vercel.app/api/random`)
let x = await f.json()
let caption = `*Quotes:* ${x.quote}

*Anime:* ${x.anime}
*Character:* ${x.character}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
}

if (command == 'whatanime') {
let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Fotonya Mana?'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`
    let img = await q.download?.()
    let url = await uploadImage(img)

let f = await fetch(`https://api.trace.moe/search?url=${url}`)
let xc = await f.json()
let r = xc.result
let x = r.getRandom()
let caption = `*Anilist:* ${x.anilist}
*Name:* ${x.filename}
*Episode:* ${x.episode}
*Dari:* ${x.from}
*Ke:* ${x.to}
*Kecocokan:* ${x.similarity}
`
await conn.sendButton(m.chat, caption, wm, x.image, [
                ['Get Video', `${usedPrefix}get ${x.video}`]
            ], m)
}

if (command == 'isgd') {
if (!text) throw `Teks Mana?
Contoh: ${usedPrefix + command} https://google.com`
let f = await fetch(`https://is.gd/create.php?format=json&url=${text}`)
let x = await f.json()
let caption = `*Shorturl:* ${x.shorturl}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
}

if (command == 'resmush') {
let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Fotonya Mana?'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`
    let img = await q.download?.()
    let url = await uploadImage(img)

let f = await fetch(`http://api.resmush.it/ws.php/?img=${url}`)
let x = await f.json()
let caption = `*Src:* ${x.src}
*Size:* ${x.src_size}

*Dest:* ${x.dest}
*Size:* ${x.dest_size}

*Percent:* ${x.percent}
*Expires:* ${x.expires}`
await conn.sendButton(m.chat, caption, wm, x.dest, [
                ['Get Img', `${usedPrefix}get ${x.dest}`]
            ], m)
}

if (command == 'toascii') {
let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Fotonya Mana?'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`
    let img = await q.download?.()
    let url = await uploadImage(img)

let f = await fetch(`https://process.filestackapi.com/A7lMmfpoSTu3i5i7yBXeQz/ascii=colored:true/${url}`)
let xc = await f.text()
let caption = `*Jadikan File HTML*

${xc}`
m.reply(caption)
}

if (command == 'dlytmp3') {
  if (!text) throw 'Url Mana?'
let f = await fetch(`https://api.webraku.xyz/api/ytmp3?url=${text}&apikey=Nathan`)
let xc = await f.json()
let r = xc.result
let caption = `*Title:* ${r.title}
*Size:* ${r.size}
*View:* ${r.views}
*Like:* ${r.likes}
*Dislike:* ${r.dislike}
*Channel:* ${r.channel}
*Upload:* ${r.uploadDate}
*Desc:* ${r.desc}`
await conn.sendButton(m.chat, caption, wm, r.thumb, [
                ['Get', `${usedPrefix}get ${r.result}`]
            ], m)
}

if (command == 'dlytmp4') {
  if (!text) throw 'Url Mana?'
let f = await fetch(`https://api.webraku.xyz/api/ytmp4?url=${text}&apikey=Nathan`)
let xc = await f.json()
let r = xc.result
let caption = `*Title:* ${r.title}
*Size:* ${r.size}
*Quality:* ${r.quality}
*View:* ${r.views}
*Like:* ${r.likes}
*Dislike:* ${r.dislike}
*Channel:* ${r.channel}
*Upload:* ${r.uploadDate}
*Desc:* ${r.desc}`
await conn.sendButton(m.chat, caption, wm, r.thumb, [
                ['Get', `${usedPrefix}get ${r.result}`]
            ], m)
}

if (command == 'mcskin') {
if (!args[0] && !one && !two) throw `Contoh:\n${usedPrefix + command} .mcskin stone |atas|bawah`
let res = await mcskin(args[0], one, two)
await conn.sendFile(m.chat, res, 'image.png', "Your Text: \n" + one + " " + two, m)
}


}
handler.command = handler.help = ['cdnjs', 'readqr', 'scanqr', 'animechan', 'whatanime', 'isgd', 'resmush', 'toascii', 'dlytmp3', 'dlytmp4', 'mcskin']
handler.tags = ['tools']

export default handler

function mcskin(teks, atas, bawah) {
let link;
    if (teks == 'stone')
      link = `https://minecraftskinstealer.com/achievement/20/${atas}/${bawah}`;
    if (teks == 'grass')
      link = `https://minecraftskinstealer.com/achievement/1/${atas}/${bawah}`;
    if (teks == 'craftingtable')
      link = `https://minecraftskinstealer.com/achievement/13/${atas}/${bawah}`;
    if (teks == 'furnace')
      link = `https://minecraftskinstealer.com/achievement/18/${atas}/${bawah}`;
    if (teks == 'coal')
      link = `https://minecraftskinstealer.com/achievement/31/${atas}/${bawah}`;
    if (teks == 'iron')
      link = `https://minecraftskinstealer.com/achievement/22/${atas}/${bawah}`;
    if (teks == 'gold')
      link = `https://minecraftskinstealer.com/achievement/23/${atas}/${bawah}`;
    if (teks == 'diamond')
      link = `https://minecraftskinstealer.com/achievement/2/${atas}/${bawah}`;
    if (teks == 'redstone')
      link = `https://minecraftskinstealer.com/achievement/14/${atas}/${bawah}`;
    if (teks == 'diamond-sword')
      link = `https://minecraftskinstealer.com/achievement/3/${atas}/${bawah}`;
    if (teks == 'tnt')
      link = `https://minecraftskinstealer.com/achievement/6/${atas}/${bawah}`;
    if (teks == 'cookie')
      link = `https://minecraftskinstealer.com/achievement/7/${atas}/${bawah}`;
    if (teks == 'cake')
      link = `https://minecraftskinstealer.com/achievement/10/${atas}/${bawah}`;
    if (teks == 'creeper')
      link = `https://minecraftskinstealer.com/achievement/4/${atas}/${bawah}`;
    if (teks == 'pig')
      link = `https://minecraftskinstealer.com/achievement/5/${atas}/${bawah}`;
    if (teks == 'heart')
      link = `https://minecraftskinstealer.com/achievement/8/${atas}/${bawah}`;
      
      return link
}