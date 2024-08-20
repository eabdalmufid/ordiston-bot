import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hlag/i.test(m.quoted.text) || /.*hlag/i.test(m.text))
        return !0
    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
    if (!(id in this.tebaklagu))
        return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, null, buttontebaklagu, m)
    if (m.quoted.id == this.tebaklagu[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebaklagu[id][3])
            delete this.tebaklagu[id]
            return conn.sendButton(m.chat, '*Yah Menyerah :( !*', author, null, buttontebaklagu, m)
        }
        let json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.judul.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaklagu[id][2]
            conn.sendButton(m.chat, `*Benar!*\n+${this.tebaklagu[id][2]} XP`, author, null, buttontebaklagu, m)
            clearTimeout(this.tebaklagu[id][3])
            delete this.tebaklagu[id]
        } else if (similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            conn.sendButton(m.chat, `*Salah!*`, author, null, [
                ['Hint', '/hlag'],
                ['Nyerah', 'menyerah']
            ], m)
    }
    return !0
}
export const exp = 0

const buttontebaklagu = [
    ['tebaklagu', '/tebaklagu']
]