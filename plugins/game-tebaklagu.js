import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
let play_list = ['37i9dQZEVXbObFQZ3JLcXt', '37i9dQZEVXbMDoHDwVN2tF', '37i9dQZF1DXa2EiKmMLhFD', '37i9dQZF1DXdHrK6XFPCM1', '3AaKHE9ZMMEdyRadsg8rcy', '4mFuArYRh3SO8jfffYLSER']
let spotify_id = play_list.getRandom()
let imgr = flaaa

    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    let id = m.chat
    if (id in conn.tebaklagu) {
        conn.sendButton(m.chat, 'Masih ada soal belum terjawab di chat ini', author, null, buttons, conn.tebaklagu[id][0])
        throw false
    }
    
    try {
    let ress = await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tebaklagu.json')
   let data = await ress.json()
    let json = data[Math.floor(Math.random() * data.length)]
    // if (!json.status) throw json
    let caption = `Penyanyi: ${json.artis}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *${usedPrefix}hlag* untuk bantuan
Bonus: ${poin} XP
*Balas pesan ini untuk menjawab!*`.trim()
    conn.tebaklagu[id] = [
        await conn.sendFthumb(m.chat, `🎮 ${command.toUpperCase()} 🎮`, caption + '\n\n' + author, `${imgr + command}`, '', m),
        //await conn.sendButton(m.chat, caption, author, `${imgr + command}`, buttons, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaklagu[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.judul}*`, author, null, [
                ['tebaklagu', '/tebaklagu']
            ], conn.tebaklagu[id][0])
            delete conn.tebaklagu[id]
        }, timeout)
    ]
    await conn.sendMessage(m.chat, { audio: { url: json.lagu }, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,100,0,100,0] }, { quoted: m, ephemeralExpiration: ephemeral })
   } catch (e) {
   throw eror
      }
}
handler.help = ['tebaklagu']
handler.tags = ['game']
handler.command = /^tebaklagu/i

export default handler

const buttons = [
    ['Hint', '/hlag'],
    ['Nyerah', 'menyerah']
]