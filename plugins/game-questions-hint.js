let handler = async (m, { conn }) => {
    conn.question = conn.question ? conn.question : {}
    let id = m.chat
    if (!(id in conn.question)) throw false
    let json = conn.question[id][1]
    conn.sendButton(m.chat, '```' + json.results[0].correct_answer.replace(/[AIUEOaiueo]/ig, '_') + '```', author, null, [
        ['Nyerah', 'menyerah']
    ], m)
}
handler.command = /^quest$/i

handler.limit = true

export default handler