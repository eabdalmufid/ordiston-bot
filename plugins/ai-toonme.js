import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix }) => {
    if (!args[0]) throw `Input *URL*\nklo mau pake gambar jadiin url dulu pake ${usedPrefix}tourl :v`
let xyz = "&apikey=hanum"
    let response = await axios.get('https://xzn.wtf/api/aitoonme?url='+args[0]+xyz)
    let imageURL = response.data.url

    await m.reply('Sedang diproses...')
    await conn.sendFile(m.chat, imageURL, '', wm, m)
}

handler.help = ['aitoonme']
handler.tags = ['convert']
handler.command = /^(aitoonme|tnm)$/i
handler.limit = true

export default handler