import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hsi/i.test(m.quoted.text) || /.*hsi/i.test(m.text))
        return !0
    this.siapakahaku = this.siapakahaku ? this.siapakahaku : {}
    if (!(id in this.siapakahaku))
        return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, null, buttonsiapakahaku, m)
    if (m.quoted.id == this.siapakahaku[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.siapakahaku[id][3])
            delete this.siapakahaku[id]
            return conn.sendButton(m.chat, '*Yah Menyerah :( !*', author, null, buttonsiapakahaku, m)
        }
        let json = JSON.parse(JSON.stringify(this.siapakahaku[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.siapakahaku[id][2]
            conn.sendButton(m.chat, `*Benar!*\n+${this.siapakahaku[id][2]} XP`, author, null, buttonsiapakahaku, m)
            clearTimeout(this.siapakahaku[id][3])
            delete this.siapakahaku[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            conn.sendButton(m.chat, `*Salah!*`, author, null, [
                ['Hint', '/hsi'],
                ['Nyerah', 'menyerah']
            ], m)
    }
    return !0
}
export const exp = 0

const buttonsiapakahaku = [
    ['siapakahaku', '/siapakahaku']
]