import { caklontong } from '@bochilteam/scraper'

let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
let imgr = flaaa

    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) {
        conn.sendButton(m.chat, 'Masih ada soal belum terjawab di chat ini', author, null, buttons, conn.caklontong[id][0])
        throw false
    }
    const json = await caklontong()
    let caption = `${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hcak untuk bantuan
Bonus: ${poin} XP
    `.trim()
    conn.caklontong[id] = [
        await conn.sendFthumb(m.chat, `🎮 ${command.toUpperCase()} 🎮`, caption + '\n\n' + author, `${imgr + command}`, '', m),
        //await conn.sendButton(m.chat, caption, author, `${imgr + command}`, buttons, m),
        json, poin,
        setTimeout(() => {
            if (conn.caklontong[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, author, null, [
                ['caklontong', '/caklontong']
            ], conn.caklontong[id][0])
            delete conn.caklontong[id]
        }, timeout)
    ]
}
handler.help = ['caklontong']
handler.tags = ['game']
handler.command = /^caklontong/i

export default handler

const buttons = [
    ['Hint', '/hcak'],
    ['Nyerah', 'menyerah']
]