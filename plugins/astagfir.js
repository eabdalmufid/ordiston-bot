const handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender]
    if (!user.warn) throw 'Kamu tidak memiliki peringatan (warning)!'

    if (user.lastIstigfar && user.lastIstigfar + 3600000 > Date.now()) {
        throw `Tunggu setelah ${msToTime(user.lastIstigfar + 3600000 - Date.now())}`
    }

    user.warn = Math.max(0, user.warn - 1)
    m.reply(`Sisa peringatan (warning) kamu: ${user.warn} / 10`)

    if (user.warn === 0) {
        m.reply('Hati-hati! Ini adalah peringatan terakhir kamu. Jika kamu melanggar lagi, kamu akan dikenai sanksi.')
    }

    user.lastIstigfar = Date.now()

    setTimeout(() => {
        conn.reply(m.chat, '⏰ Waktunya menggunakan perintah lagi!\nKetik *.maaf* untuk mengurangi warn.', m);
    }, 3600000);
}

handler.command = /^(astagh?fir(ullah)?|maaf)$/i
handler.limit = true

export default handler

function msToTime(duration) {
    const minutes = Math.floor(duration / (1000 * 60))
    const seconds = Math.floor((duration / 1000) % 60)
    return `${minutes} menit ${seconds} detik`
}