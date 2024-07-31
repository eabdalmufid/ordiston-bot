import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Input *URL*`
let xyz = "&apikey=hanum"
let wtf = await fetch(`https://xzn.wtf/api/oploverzdl?url=` + args[0] + xyz)
let fak = await wtf.json()

let str = `•••••••••••••••••••••••••••••••••••••
• Status: ${fak.status}
• Studio: ${fak.studio}
• Released: ${fak.released}
• Duration: ${fak.duration}
• Season: ${fak.season}
• Type: ${fak.type}
• Posted_by: ${fak.posted_by}
• Released_on: ${fak.released_on}
• Updated_on: ${fak.updated_on}
• Episode: ${fak.episode}
• Prev: ${fak.prev}
• Next: ${fak.next}
`

let a = fak.download

for (let i = 0; i < a.length; i++) {
    str += "•••••••••••••••••••••••••••••••••••••\n\n*•• Format: " + a[i].format + '*\n'
    let b = a[i].resolutions
    for (let i = 0; i < b.length; i++) {
        str += "• Resolutions: " + b[i].name + '\n'
        let c = b[i].servers
        for (let i = 0; i < c.length; i++) {
            str += "servers: " + c[i].name + '\n'
            str += "url: " + c[i].link + '\n\n'
        }
    }
}

//m.reply(str)
conn.relayMessage(m.chat, {
extendedTextMessage:{
                text: str, contextInfo: {
                     externalAdReply: {
                        title: fak.anime_id+'\n'+wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: dua,
                        sourceUrl: args[0]
                    }
                }, 
}}, {})

}

handler.help = ['oploverz'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(oploverz|plvrz)$/i
handler.limit = true
export default handler