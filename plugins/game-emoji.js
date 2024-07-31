import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
let imgr = "https://emoji.aranja.com/static/emoji-data/img-apple-160/"

    conn.tebakemoji = conn.tebakemoji ? conn.tebakemoji : {}
    let id = m.chat
    if (id in conn.tebakemoji) {
        conn.sendButton(m.chat, 'Masih ada soal belum terjawab di chat ini', author, null, buttons, conn.tebakemoji[id][0])
        throw false
    }
    let src = await (await fetch('https://emoji-api.com/emojis?access_key=b7e74af2d49675275c934455de1ef48fe8b6c0a3')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*Emoji apakah ini:* ${json.character}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hemo untuk bantuan
Bonus: ${poin} XP
    `.trim()
    conn.tebakemoji[id] = [
        await conn.sendFthumb(m.chat, `🎮 ${command.toUpperCase()} 🎮`, caption + '\n\n' + author, imgr + json.codePoint.toLowerCase() + ".png", '', m),
        //await conn.sendButton(m.chat, caption, author, imgr + json.codePoint.toLowerCase() + ".png", buttons, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakemoji[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${(json.unicodeName)}*`, author, null, [
                ['tebakemoji', '/tebakemoji']
            ], conn.tebakemoji[id][0])
            delete conn.tebakemoji[id]
        }, timeout)
    ]
}
handler.help = ['tebakemoji']
handler.tags = ['game']
handler.command = /^tebakemoji/i

export default handler

const buttons = [
    ['Hint', '/hemo'],
    ['Nyerah', 'menyerah']
]
