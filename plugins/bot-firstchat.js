import moment from 'moment-timezone';

export async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return

    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat Dinihari"
    if (time >= 4) {
        res = "Selamat Pagi"
    }
    if (time > 10) {
        res = "Selamat Siang"
    }
    if (time >= 15) {
        res = "Selamat Sore"
    }
    if (time >= 18) {
        res = "Selamat Malam"
    }
    
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let user = global.db.data.users[m.sender]
    let txt = `👋 Hai ${res} kak @${who.split("@")[0]}

${user.banned ? '📮Maaf, kamu dibanned & Tidak bisa menggunakan bot ini lagi' : `💬 Ada yg bisa ${this.user.name} bantu?\nSilahkan ketik *.menu* untuk melihat daftar menu pada bot.`}`.trim()

    if (new Date() - user.pc < 21600000) return // waktu ori 21600000 (6 jam)
    await this.reply(m.chat, txt, m, { mentions: this.parseMention(txt) })
    user.pc = new Date * 1
}
