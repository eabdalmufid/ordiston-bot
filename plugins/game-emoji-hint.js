let handler = async (m, { conn }) => {
    conn.tebakemoji = conn.tebakemoji ? conn.tebakemoji : {}
    let id = m.chat
    if (!(id in conn.tebakemoji)) throw false
    let json = conn.tebakemoji[id][1]
    conn.sendButton(m.chat, '```' + (json.unicodeName).replace(/[AIUEOaiueo]/ig, '_') + '```', author, null, [
        ['Nyerah', 'menyerah']
    ], m)
}
handler.command = /^hemo$/i

handler.limit = true

export default handler
