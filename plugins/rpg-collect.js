let handler = async (m, { conn }) => {
    let __timers = (new Date - global.db.data.users[m.sender].lastclaim)
    let _timers = (43200000 - __timers)
    let timers = clockString(_timers) 
    let user = global.db.data.users[m.sender]
    if (new Date - global.db.data.users[m.sender].lastclaim > 43200000) {
        conn.reply(m.chat, `Kamu sudah mengclaim dan mendapatkan *1000* 💵money dan *1* 🥤potion`, m)
        user.money += 1000
        user.potion += 1
        user.lastclaim = new Date * 1
    } else conn.reply(m.chat, `silahkan tunggu ${timers} lagi untuk bisa mengclaim lagi`, m)
}
handler.help = ['collect']
handler.tags = ['rpg']
handler.command = /^(collect)$/i

handler.fail = null

export default handler

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
	console.log({ ms, d, h, m, s })
	return [d, h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}