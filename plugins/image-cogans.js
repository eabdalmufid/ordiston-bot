import fetch from 'node-fetch'
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {
var list_input = [
    "baekhyung",
"dohkyungsoo",
"huangzitao",
"jhope",
"jimin",
"jungkook",
"kimjondae",
"kimjong",
"kimminseok",
"kimnanjoon",
"kimseok",
"kimtaehyung",
"luhan",
"ohsehun",
"suga",
"wuyifan",
"wuyifan",
"wuyifan"
]
var salah_input = "*Example:*\n" + usedPrefix + command + " vietnam \n*[ Daftar cogans ]*\n\n" + await ArrClean(list_input)
if (!list_input.includes(text)) throw salah_input
try {
    let res = 'https://api.zeeoneofc.my.id/api/cogan/' + text + '?apikey=dhmDlD5x'
    m.reply(wait)
    conn.sendFile(m.chat, res, 'result', "Result Cogan: *" + text.toUpperCase() + "*", m)
    } catch (e) {
    throw eror
    }
}
handler.help = ["cogans"]
handler.tags = ['internet']
handler.command = ["cogans"]

export default handler

function ArrClean(str) {
return str.map((v, index) => ++index + ". " + v).join('\r\n')
}
