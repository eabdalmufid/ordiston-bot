import fs from 'fs'
import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix: _p }) => {
let [number, pesan, boddy] = text.split(/[^\w\s]/g)

let td = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

    if (!number) return conn.reply(m.chat, 'Silahkan masukan nomor yang akan dikirim', m)
    if (!pesan) return conn.reply(m.chat, 'Silahkan masukan pesannya', m)
    if (text > 500) return conn.reply(m.chat, 'Teks Kepanjangan!', m)
    
    let user = global.db.data.users[m.sender]

    let korban = `${number}`
    var nomor = m.sender
    let spam1 = `*「 SUKSES 」*\n\nDari : wa.me/${korban}\nPesan : ${pesan}\n\n${global.wm}`

    await conn.reply(korban + '@s.whatsapp.net', spam1, 0, {
    contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: sig,
    mediaType: 2,
    title: global.wm, 
    body: 'Hai,Ini Balasan Pesan Dari Owner',  
    sourceUrl: snh, 
    thumbnail: fs.readFileSync('./thumbnail.jpg')
      }}
     })    

{

    let logs = `[!] Berhasil mengirim pesan wa ke nomor ${korban}`
    conn.reply(m.chat, logs, m)
}}
handler.command = /^(pesan|balas)$/i

export default handler