let handler = async (m, { args, usedPrefix, command }) => {
    let fa = `
penggunaan:
${usedPrefix + command} angka
contoh:
${usedPrefix + command} 100

artinya kamu bertaruh 100 XP.

*JACKPOT:* taruhan digandakan
*kalah:* taruhan diambil`.trim()
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    let taruhan = parseInt(args[0])
    let users = global.db.data.users[m.sender]
    let time = users.lastslot + 10000
    if (new Date - users.lastslot < 10000) throw `tunggu selama ${msToTime(time - new Date())}`
    if (taruhan < 1) throw 'Minimal 1 XP!'
    if (users.exp < taruhan) {
        throw `XP kamu tidak cukup!`
    }

    let bet = ["🏆️", "🥇", "💵"];
    let a = Math.floor(Math.random() * bet.length)
    let b = Math.floor(Math.random() * bet.length)
    let c = Math.floor(Math.random() * bet.length)
    let x = [],
        y = [],
        z = []
    for (let i = 0; i < 3; i++) {
        x[i] = bet[a]
        a++
        if (a == bet.length) a = 0
    }
    for (let i = 0; i < 3; i++) {
        y[i] = bet[b]
        b++
        if (b == bet.length) b = 0
    }
    for (let i = 0; i < 3; i++) {
        z[i] = bet[c]
        c++
        if (c == bet.length) c = 0
    }
    let end
    if (a == b && b == c) {
        end = `JACKPOT! 🥳 *+${taruhan + taruhan} XP*`
        users.exp += taruhan
    } else if (a == b || a == c || b == c) {
        end = '*TRY AGAIN!*'
    } else {
        end = `LOSE 😥 *-${taruhan} XP*`
        users.exp -= taruhan
    }
    users.lastslot = new Date * 1
    return await conn.sendButton(m.chat, `
*[ 🎰 | SLOTS ]*

${end}

${x[0]} ${y[0]} ${z[0]}
${x[1]} ${y[1]} ${z[1]}
${x[2]} ${y[2]} ${z[2]}`.trim(), wm, null, [[`slot ${args[0]}`, `.slot ${args[0]}`]], m)
}
handler.help = ['slot <angka>']
handler.tags = ['game']
handler.command = /^(slot?)$/i
export default handler

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    return minutes + " menit " + seconds + " detik"
}