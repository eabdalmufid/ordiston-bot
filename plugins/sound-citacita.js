import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
  let res = await fetch('https://raw.githubusercontent.com/BadXyz/txt/main/citacita/citacita.json')
  let json = await res.json()
  await conn.sendMessage(m.chat, { audio: { url: json.getRandom() }, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,100,0,100,0] }, { quoted: m, ephemeralExpiration: ephemeral })
}
handler.help = ['citacita']
handler.tags = ['random']
handler.command = /^(citacita)$/i

export default handler
