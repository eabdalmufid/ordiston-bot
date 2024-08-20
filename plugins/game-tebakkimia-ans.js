import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hkim/i.test(m.quoted.text) || /.*hkim/i.test(m.text))
        return !0
    this.tebakkimia = this.tebakkimia ? this.tebakkimia : {}
    if (!(id in this.tebakkimia))
        return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, null, buttontebakkimia, m)
    if (m.quoted.id == this.tebakkimia[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakkimia[id][3])
            delete this.tebakkimia[id]
            return conn.sendButton(m.chat, '*Yah Menyerah :( !*', author, null, buttontebakkimia, m)
        }
        let json = JSON.parse(JSON.stringify(this.tebakkimia[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.unsur.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakkimia[id][2]
            conn.sendButton(m.chat, `*Benar!*\n+${this.tebakkimia[id][2]} XP`, author, null, buttontebakkimia, m)
            clearTimeout(this.tebakkimia[id][3])
            delete this.tebakkimia[id]
        } else if (similarity(m.text.toLowerCase(), json.unsur.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            conn.sendButton(m.chat, `*Salah!*`, author, null, [
                ['Hint', '/hkim'],
                ['Nyerah', 'menyerah']
            ], m)
    }
    return !0
}
export const exp = 0

const buttontebakkimia = [
    ['tebakkimia', '/tebakkimia']
]