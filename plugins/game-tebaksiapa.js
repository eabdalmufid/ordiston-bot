import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
let imgr = flaaa

    conn.tebaksiapa = conn.tebaksiapa ? conn.tebaksiapa : {}
    let id = m.chat
    if (id in conn.tebaksiapa) {
        conn.sendButton(m.chat, 'Masih ada soal belum terjawab di chat ini', author, null, buttons, conn.tebaksiapa[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hsia untuk bantuan
Bonus: ${poin} XP
    `.trim()
    conn.tebaksiapa[id] = [
        await conn.sendFthumb(m.chat, `🎮 ${command.toUpperCase()} 🎮`, caption + '\n\n' + author, `${imgr + command}`, '', m),
        //await conn.sendButton(m.chat, caption, author, `${imgr + command}`, buttons, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaksiapa[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, author, null, [
                ['tebaksiapa', '/tebaksiapa']
            ], conn.tebaksiapa[id][0])
            delete conn.tebaksiapa[id]
        }, timeout)
    ]
}
handler.help = ['tebaksiapa']
handler.tags = ['game']
handler.command = /^tebaksiapa/i

export default handler

const buttons = [
    ['Hint', '/hsia'],
    ['Nyerah', 'menyerah']
]