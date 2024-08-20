import axios from "axios"
import fetch from "node-fetch"
import uploadImage from "../lib/uploadImage.js"

let handler = async (m, {
    conn,
    usedPrefix,
    args,
    text,
    command
}) => {

    let urut = text.split`|`
    let one = urut[0]
    let two = urut[1]
    let three = urut[2]
    
    
    if (command == "images") {
    if (!Number(args[0])) throw "Insert Input 1\n\n*Example:* .images 500 500\n( Number only )"
    if (!Number(args[1])) throw "Insert Input 2\n\n*Example:* .images 500 500\n( Number only )"
        m.reply(wait)
        let lis = [
            "picsum.photos",
            "unsplash.it",
            "random.imagecdn.app"
        ]
        let row = Object.keys(lis).map((v, index) => ({
            title: "By " + lis[v],
            description: "Bot " + author,
            rowId: usedPrefix + "imagesget " + lis[v] + "|" + args[0] + "|" +  args[1]
        }))
        let button = {
            buttonText: `Tema Disini`,
            description: `⚡ Silakan pilih tema di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
            footerText: wm
        }
        return conn.sendListM(m.chat, button, row, m)
    }
    if (command == "imagesget") {
        try {
            let caption = '*[ Result ]*\n' + '*Width:* ' + two + '\n' + '*Height:* ' + three 
let but = '[ Next ]'
if (one == 'picsum.photos') {
conn.sendButtonImg(m.chat, global.API('https://picsum.photos/' + two + '/' + three), caption, wm, but, usedPrefix + command + ' ' + one + "|" + two + "|" +  three, m)
}
if (one == 'unsplash.it') {
conn.sendButtonImg(m.chat, global.API('https://unsplash.it/' + two + '/' + three + '?random'), caption, wm, but, usedPrefix + command + ' ' + one + "|" + two + "|" +  three, m)
}
if (one == 'random.imagecdn.app') {
conn.sendButtonImg(m.chat, global.API('https://random.imagecdn.app/' + two + '/' + three), caption, wm, but, usedPrefix + command + ' ' + one + "|" + two + "|" +  three, m)
}
        } catch (e) {
            throw eror
        }
    }

}
handler.help = ["images"]
handler.tags = ["search"]
handler.command = /^images(get)?$/i

export default handler