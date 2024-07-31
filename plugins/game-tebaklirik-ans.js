import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hlir/i.test(m.quoted.text) || /.*hlir/i.test(m.text))
        return !0
    this.tebaklirik = this.tebaklirik ? this.tebaklirik : {}
    if (!(id in this.tebaklirik))
        return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, null, buttontebaklirik, m)
    if (m.quoted.id == this.tebaklirik[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebaklirik[id][3])
            delete this.tebaklirik[id]
            return conn.sendButton(m.chat, '*Yah Menyerah :( !*', author, null, buttontebaklirik, m)
        }
        let json = JSON.parse(JSON.stringify(this.tebaklirik[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaklirik[id][2]
            conn.sendButton(m.chat, `*Benar!*\n+${this.tebaklirik[id][2]} XP`, author, null, buttontebaklirik, m)
            clearTimeout(this.tebaklirik[id][3])
            delete this.tebaklirik[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            conn.sendButton(m.chat, `*Salah!*`, author, null, [
                ['Hint', '/hlir'],
                ['Nyerah', 'menyerah']
            ], m)
    }
    return !0
}
export const exp = 0

const buttontebaklirik = [
    ['tebaklirik', '/tebaklirik']
]