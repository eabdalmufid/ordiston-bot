let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0] || isNaN(args[0])) throw `Masukan angka mewakili jumlah hari!\n\ncontoh:\n${usedPrefix + command} 30`

    let who
    if (m.isGroup) who = args[1] ? args[1] : m.chat
    else who = args[1]

    var jumlahHari = 86400000 * args[0]
    var now = new Date() * 1
    if (now < global.db.data.chats[who].expired) global.db.data.chats[who].expired += jumlahHari
    else global.db.data.chats[who].expired = now + jumlahHari
    let caption = `Berhasil menetapkan hari kedaluarsa untuk ${await conn.getName(who)} selama ${args[0]} hari.\n\nHitung Mundur : ${msToDate(global.db.data.chats[who].expired - now)}`
    conn.sendButton(m.chat, caption, wm, null, [['Delete Expired', '/delexpired'], ['Cek Expired', '/cekexpired']], m)
}
handler.help = ['expired <hari>']
handler.tags = ['owner']
handler.command = /^(expired)$/i
handler.owner = true
export default handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Days*, ', h, ' *Hours*, ', m, ' *Minute*, ', s, ' *Second* '].map(v => v.toString().padStart(2, 0)).join('')
}