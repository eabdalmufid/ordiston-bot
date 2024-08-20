import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*quest/i.test(m.quoted.text) || /.*quest/i.test(m.text))
        return !0
    this.question = this.question ? this.question : {}
    if (!(id in this.question))
        return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, null, buttonquestion, m)
    if (m.quoted.id == this.question[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.question[id][3])
            delete this.question[id]
            return conn.sendButton(m.chat, '*Yah Menyerah :( !*', author, null, buttonquestion, m)
        }
        let json = JSON.parse(JSON.stringify(this.question[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.results[0].correct_answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.question[id][2]
            conn.sendButton(m.chat, `*Benar!*\n+${this.question[id][2]} XP`, author, null, buttonquestion, m)
            clearTimeout(this.question[id][3])
            delete this.question[id]
        } else if (similarity(m.text.toLowerCase(), json.results[0].correct_answer.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            conn.sendButton(m.chat, `*Salah!*`, author, null, [
                ['Hint', '/quest'],
                ['Nyerah', 'menyerah']
            ], m)
    }
    return !0
}
export const exp = 0

const buttonquestion = [
    ['question', '/question']
]