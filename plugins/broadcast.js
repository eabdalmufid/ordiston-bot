import { randomBytes } from 'crypto'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {

let name = await conn.getName(m.sender)
let imgr = flaaa
  let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
  for (let id of chats) {
  await delay(1500)
  if (args[0] == 'polling') {
  let a = text.split("|").slice(1)
    if (!a[1]) throw "Format\n" + usedPrefix + command + " halo |ya|gak"
    if (a[12]) throw "Kebanyakan pilihan, Format\n" + usedPrefix + command + " halo |ya|gak"
    if (checkDuplicate(a)) throw "Ada kesamaan isi dalam pesan!"
    let cap = "*Polling Request By* " + m.name + "\n*Pesan:* " + text.split("|")[0]

    const pollMessage = {
        name: cap,
        values: a,
        multiselect: false,
        selectableCount: 1
    }
    await conn.sendMessage(id, {
        poll: pollMessage
    })
  } else
  if (args[0] == 'sharebot') {
  if (!id.endsWith('@g.us')) {
  await conn.relayMessage(id, {
                    protocolMessage: {
                        type: 11
                    }
                }, {})
                } else {
                await conn.sendContactArray(m.chat, [
                [conn.user.jid.split("@")[0], await conn.getName(conn.user.jid), "🔥 Bot WhatsApp 🐣", "📵 Dont spam/call me 😢", "Nothing", "🇮🇩 Indonesia", "🚀 https://s.id/Cerdasin62/", "🤖 Hanya bot biasa yang kadang suka eror ☺"]
            ], m)
                }
  } else {
  await conn.sendFile(id, imgr + 'BROADCAST', '', htki + ' *BROADCAST* ' + htka + '\n\n*Pesan:*\n' + text, m)
  }
  }
  m.reply('Selesai Broadcast All Chat :)')
}
handler.help = ['broadcast', 'bc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)$/i

handler.owner = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const delay = time => new Promise(res => setTimeout(res, time))
const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)

function checkDuplicate(arr) {
    return new Set(arr).size !== arr.length
}