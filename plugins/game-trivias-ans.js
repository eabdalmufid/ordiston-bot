import similarity from 'similarity'
import fetch from 'node-fetch'

const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*htri/i.test(m.quoted.text) || /.*htri/i.test(m.text))
        return !0
    this.trivias = this.trivias ? this.trivias : {}
    if (!(id in this.trivias))
        return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, null, buttontrivias, m)
    if (m.quoted.id == this.trivias[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.trivias[id][3])
            delete this.trivias[id]
            return conn.sendButton(m.chat, '*Yah Menyerah :( !*', author, null, buttontrivias, m)
        }
        let json = JSON.parse(JSON.stringify(this.trivias[id][1]))
        let jawaban = await Tr(json.correctAnswer)
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.trivias[id][2]
            conn.sendButton(m.chat, `*Benar!*\n+${this.trivias[id][2]} XP`, author, null, buttontrivias, m)
            clearTimeout(this.trivias[id][3])
            delete this.trivias[id]
        } else if (similarity(m.text.toLowerCase(), jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            conn.sendButton(m.chat, `*Salah!*`, author, null, [
                ['Hint', '/htri'],
                ['Nyerah', 'menyerah']
            ], m)
    }
    return !0
}
export const exp = 0

const buttontrivias = [
    ['trivias', '/trivias']
]

async function Tr(teks) {
let reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=' + teks)
	let res = await reis.json()
	return res[0][0][0]
}