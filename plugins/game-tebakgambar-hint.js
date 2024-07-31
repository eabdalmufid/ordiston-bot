let handler = async (m, { conn }) => {
    conn.tebakingambar = conn.tebakingambar ? conn.tebakingambar : {}
    let id = m.chat
    if (!(id in conn.tebakingambar)) throw false
    let json = conn.tebakingambar[id][1]
    conn.sendButton(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', author, null, [
        ['Nyerah', 'menyerah']
    ], m)
}
handler.command = /^hgam$/i

handler.limit = true

export default handler