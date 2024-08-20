import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    conn.trivias = conn.trivias ? conn.trivias : {}
    let id = m.chat
    if (!(id in conn.trivias)) throw false
    let json = conn.trivias[id][1]
    let jawaban = await Tr(json.correctAnswer)
    conn.sendButton(m.chat, '```' + jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', author, null, [
        ['Nyerah', 'menyerah']
    ], m)
}
handler.command = /^htri$/i
handler.limit = true

export default handler

async function Tr(teks) {
let reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=' + teks)
	let res = await reis.json()
	return res[0][0][0]
}