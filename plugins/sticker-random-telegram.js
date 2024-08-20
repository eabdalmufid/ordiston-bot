import wibusoft from 'wibusoft'
import fetch from 'node-fetch'
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {
var list_input = [
    "awoawo",
    "chat",
    "dbfly",
    "dino-kuning",
    "doge",
    "gojosatoru",
    "hope-boy",
    "jisoo",
    "kawan-sponsbob",
    "kr-robot",
    "kucing",
    "lonte",
    "manusia-lidi",
    "menjamet",
    "meow",
    "nicholas",
    "patrick",
    "popoci",
    "sponsbob",
    "tyni"
]
var salah_input = "*Example:*\n" + usedPrefix + command + " tyni \n*[ Daftar Stiker ]*\n\n" + await ArrClean(list_input)
if (!list_input.includes(text)) throw salah_input
try {
    let res = 'https://api.zeeoneofc.my.id/api/telegram-sticker/' + text + '?apikey=dhmDlD5x'
    m.reply(wait)
    let out = await wibusoft.tools.makeSticker(res, {
                author: author,
                pack: packname,
                keepScale: true
            })
            await m.reply(out)
    } catch (e) {
    throw eror
    }
}
handler.help = ["telegramsticker"]
handler.tags = ['sticker']
handler.command = ["telegramsticker"]

export default handler

function ArrClean(str) {
return str.map((v, index) => ++index + ". " + v).join('\r\n')
}
