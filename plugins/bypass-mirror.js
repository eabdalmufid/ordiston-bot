
import fetch from 'node-fetch'
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {
var salah_input = "*Example:*\n" + usedPrefix + command + " url"
if (!text) throw salah_input
try {
    let djds = await(await import('../lib/Bypass-Mirror.js')).bypassMirrored(text)
    let list = djds.map((item, index) => `*${htki} 📺 Bypass Mirror 🔎 ${htka}*

*Host:* ${item.host}
*Url:* ${item.url}
*Status:* ${item.status}

`).join("\n")
    await m.reply(list)
    } catch (e) {
    throw eror
    }
}
handler.help = ["bypassmirror"]
handler.tags = ['internet']
handler.command = ["bypassmirror"]

export default handler

function ArrClean(str) {
return str.map((v, index) => ++index + ". " + v).join('\r\n')
}