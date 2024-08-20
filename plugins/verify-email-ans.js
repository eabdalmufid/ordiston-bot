import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hotp/i.test(m.quoted.text) || /.*hotp/i.test(m.text))
        return !0
    this.regmail = this.regmail ? this.regmail : {}
    if (!(id in this.regmail))
        return this.reply(m.chat, '*❗ Kode verifikasi Anda telah kedaluwarsa.*', m)
    if (m.quoted.id == this.regmail[id][0].id) {
        let isSurrender = /^(cancel|batal)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.regmail[id][3])
            delete this.regmail[id]
            return this.reply(m.chat, '*❌ Nomor Anda tidak berhasil diverifikasi.*', m)
        }
        let json = JSON.parse(JSON.stringify(this.regmail[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.regmail[id][2]
            this.reply(m.chat, `*✅ Nomor Anda telah berhasil diverifikasi.*\n+${this.regmail[id][2]} XP`, m)
            clearTimeout(this.regmail[id][3])
            delete this.regmail[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*❗ Dikit Lagi!*`)
        else
            this.reply(m.chat, `*❌ Kode verifikasi Anda salah.*`, m)
    }
    return !0
}
export const exp = 0

const buttonregmail = [
    ['regmail', '/regmail']
]