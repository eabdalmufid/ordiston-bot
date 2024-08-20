import { translate } from '@vitalets/google-translate-api'
import fetch from 'node-fetch'

const defaultLang = 'ja'
const tld = 'cn'
const key = [
  "z-j740K-G86958S",
  "E96-39N92-3021i",
  "p_438_14M3y731P",
  "e1m_5-75427574p",
  "Y11_0_7-1_536-7",
  "X9F694A4Z278J5d",
  "v5y3b-8374f4467",
  "y4A5M8G566846_Y",
  "w3164-16562-7-8",
  "W6901_y9c1w8883",
  "y7c448852-39006",
]

let handler = async (m, { args, usedPrefix, text, command }) => {

let yh = key
let apikey = yh[Math.floor(Math.random() * yh.length)]
let quot = m.quoted ? m.quoted : m;
let q = text ? text : quot.text;
if (!text) throw `Masukan text nya!\n\nExample: ${usedPrefix + command} pagi kawan-kawan`

try {
let ress = await translate(text, { to: defaultLang, autoCorrect: true }).catch(_ => null)

let audio = `https://deprecatedapis.tts.quest/v2/voicevox/audio/?text=${encodeURIComponent(ress.text)}&key=${apikey}`
//if (!audio.ok) throw 'Rest Api sedang error'

//m.reply(ress.text)
conn.sendFile(m.chat, audio, 'audio.opus', null, m, true)
} catch (err) {
m.reply('Error!\n\n' + err)
}
}

handler.help = ['voicevox']
handler.tags = ['ai']
handler.command = ['voicevox', 'michi']
handler.limit = true
export default handler