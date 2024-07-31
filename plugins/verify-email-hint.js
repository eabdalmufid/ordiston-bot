let handler = async (m, { conn }) => {
    conn.regmail = conn.regmail ? conn.regmail : {}
    let id = m.chat
    if (!(id in conn.regmail)) throw false
    let json = conn.regmail[id][1]
    conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hotp$/i

handler.limit = true

export default handler