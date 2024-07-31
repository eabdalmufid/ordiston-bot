const Frinkiac = await(await import('../lib/frinkiac.js')).default
const frinkiac = new Frinkiac();
let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
if (!text) throw 'Input text required';
const [query, caption] = text.split(/[^\w\s]/g);
if (!query || !caption) throw 'Input query and caption required';
    try {
        const result = await frinkiac.searchMaker(query, caption)
        const frink = Object.entries(result).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n');
        await conn.sendFile(m.chat, result.url, 'frink.jpg', frink, m);
    } catch (e) {
        await m.reply('Error occurred');
    }
}
handler.help = ['frink'].map(v => v + ' (query)')
handler.tags = ['maker']
handler.command = /^(frink)$/i
handler.limit = true
export default handler