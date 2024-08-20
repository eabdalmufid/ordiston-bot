import fetch from "node-fetch"
import dhn from 'dhn-api'
let handler = async(m, { conn }) => {
   var a = await dhn.KompasNews()
   var b = await a.json()
   var c = b.getRandom()
   //var c = b[Math.floor(Math.random() * b.length)]
   var { berita, berita_url, berita_thumb, berita_jenis, berita_diupload } = c
   var sell = `📺 *Kompas News*

📢 *Berita:* ${berita}
📁 *Type News:* ${berita_jenis}
⌚ *Uploded:* ${berita_diupload}
🛰 *Source Url:* ${berita_url}`
   conn.sendButton(m.chat, sell, wm, berita_thumb, [['Kompas News', '.kompasnews']], m, {jpegThumbnail: await(await fetch(berita_thumb)).buffer()})
}
handler.help = ['kompasnews']
handler.tags = ['berita']
handler.command = /^kompas(news)?$/i
handler.limit = true

export default handler
