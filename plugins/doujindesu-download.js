
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
    let djds = await(await import('../lib/scraper-copy.js')).doujindesu(text)
    let item = djds.chapter
    let mp = `*${htki} 📺 Doujin Downloader 🔎 ${htka}*

*Title:* ${item[0].title}
*Url:* ${item[0].url}
*Download Url:* ${item[0].dl_url}

`
    await m.reply(mp)
    } catch (e) {
    throw eror
    }
}
handler.help = ["doujindesudown"]
handler.tags = ['internet']
handler.command = ["doujindesudown"]

export default handler

function ArrClean(str) {
return str.map((v, index) => ++index + ". " + v).join('\r\n')
}