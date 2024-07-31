import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
let imgr = flaaa

    conn.tebaksurah = conn.tebaksurah ? conn.tebaksurah : {}
    let id = m.chat
    if (id in conn.tebaksurah) {
        conn.sendButton(m.chat, 'Masih ada soal belum terjawab di chat ini', author, null, buttons, conn.tebaksurah[id][0])
        throw false
    }
    let ran = 6236
    let res = await fetch('https://api.alquran.cloud/v1/ayah/' + ran.getRandom() + '/ar.alafasy')
    if (res.status !== 200) throw await res.text()
    let result = await res.json()
    let json = result.data
    if (result.code == '200') {
    // if (!json.status) throw json
    let caption = `Number In Surah: ${json.numberInSurah}
By: ${json.edition.name} ${json.edition.englishName}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *${usedPrefix}hsur* untuk bantuan
Bonus: ${poin} XP
*Balas pesan ini untuk menjawab!*`.trim()

let captu = `
*${json.surah.englishName}*

*INFORMATION*
Surah Number: ${json.surah.number}
Surah Name: ${json.surah.name} ${json.surah.englishName}
Eng Name: ${json.surah.englishNameTranslation}
Number Of Ayahs: ${json.surah.numberOfAyahs}
Type: ${json.surah.revelationType}
`

    conn.tebaksurah[id] = [
        await conn.sendFthumb(m.chat, `🎮 ${command.toUpperCase()} 🎮`, caption + '\n\n' + author, `${imgr + command}`, '', m),
        //await conn.sendButton(m.chat, caption, author, `${imgr + command}`, buttons, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaksurah[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah ${captu}`, author, null, [
                ['tebaksurah', '/tebaksurah']
            ], conn.tebaksurah[id][0])
            delete conn.tebaksurah[id]
        }, timeout)
    ]
    await conn.sendFile(m.chat, json.audio, 'coba-lagi.mp3', '', m)
    } else if (result.code == '404') {
    m.reply(`*Ulangi! Command ${usedPrefix + command} Karena ${json.data}*`)
    }
}
handler.help = ['tebaksurah']
handler.tags = ['game']
handler.command = /^tebaksurah/i

export default handler

const buttons = [
    ['Hint', '/hsur'],
    ['Nyerah', 'menyerah']
]