import axios from 'axios';
import * as cheerio from 'cheerio';

const handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    const [from, to] = text.split(/[^\w\s]/g);
    if (!(from && to)) throw `Contoh: ${usedPrefix + command} jakarta|bandung`;
    await m.reply(wait);
    try {
        const data = await jarak(from, to);
        if (data.img) {
            await conn.sendMessage(m.chat, {
                image: data.img,
                caption: data.desc + "\n\n" + data.rute
            }, {
                quoted: m,
				ephemeralExpiration: ephemeral
            });
        } else {
            await m.reply(data.desc);
        }
    } catch (error) {
        console.error(error);
        await m.reply(eror);
    }
};
handler.help = ['jarak *[from]|[to]*'];
handler.tags = ['tools'];
handler.command = ['jarak'];
export default handler;

async function jarak(from, to) {
    try {
        const query = `jarak ${from} ke ${to}`;
        const {
            data
        } = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=id`);
        const $ = cheerio.load(data);
        const img = $('script:contains("var s=\'")').text().match(/var s='(.*?)'/)?.[1] || '';
        const imgData = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split(',')[1], 'base64') : null;
        const [desc, rute] = $('div.kCrYT > span > div.BNeawe.deIvCb.AP7Wnd, div.kCrYT > span > div.BNeawe.tAd8D.AP7Wnd').toArray().map(el => $(el).text().trim());
        return {
            img: imgData,
            desc: desc.replace(/(Dari:|Ke:)/g, '- *$1*'),
            rute: rute
        };
    } catch (error) {
        console.error(error);
        throw 'Terjadi kesalahan dalam menghitung jarak.';
    }
}