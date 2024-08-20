// Tolong jangan bully saya bang,, saya cuman mau bisnis :)
import fetch from 'node-fetch'
import fs from 'fs'

let handler = async(m, { conn, command, usedPrefix, args }) => {
        let pn = await fetch(`https://api.zacros.my.id/other/meme`)
        let pnn = await pn.json()
        let pnnnn = `*Result:* ${pnn.title}
        Url: ${pnn.url}
        Ups: ${pnn.ups}
        Comment: ${pnn.comments}
        `
        await conn.sendButton(m.chat, pnnnn, wm, pnn.image, [
                ['Next', `${usedPrefix + command}`]
            ], m)
}
handler.help = ['jokes (reply)']
handler.tags = ['sticker']
handler.command = /^jokes$/i

export default handler