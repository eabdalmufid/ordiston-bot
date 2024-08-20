let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) throw "input text"
    try {
            await m.reply(wait)
        await conn.sendFile(m.chat, "https://api.yanzbotz.my.id/api/text2img/realistic?prompt=" + text, text, "*[ Result ]*\n" + text, m)
            
    } catch (e) {
        throw eror
    }
}
handler.help = ["realistic"]
handler.tags = ["internet"]
handler.command = /^realistic$/i

export default handler