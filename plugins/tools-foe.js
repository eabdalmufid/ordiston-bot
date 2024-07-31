import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw `Contoh: ${usedPrefix + command} manusia`;
    await m.reply(wait);
    try {
        const data = await getSearchResults(text + " pertama kali di dunia");
        if (data.result && !data.result.includes('�')) {
            await conn.sendMessage(m.chat, {
                text: data.result
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            });
        } else {
            await m.reply(data.result.includes('�') ? 'Tidak ada hasil' : 'Terjadi kesalahan');
        }
    } catch (error) {
        console.error(error);
        await m.reply('Terjadi kesalahan');
    }
};

handler.help = ['foe *[first on earth]*'];
handler.tags = ['tools'];
handler.command = ['foe'];
export default handler;

const getSearchResults = async (query) => {
    const { data } = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=id`);
    const $ = cheerio.load(data);
    const result = $('.Gx5Zad.xpd.EtOod.pkphOe:eq(1) .BNeawe.s3v9rd.AP7Wnd:eq(1)').text().trim() || '';
    return { result: result };
}