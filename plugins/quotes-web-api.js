import fetch from "node-fetch"
import cheerio from "cheerio"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    if (!text) return m.reply("*Example:*\n.quotesweb 1")
    if (!/^\d+$/.test(text)) return m.reply('Input harus berupa angka');
    await m.reply(wait)
    try {
        let src = await fetchQuotes(text)
        let json = src[Math.floor(Math.random() * src.length)]
        let output = Object.entries(json).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n')
        await m.reply(output)
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["quotesweb page"]
handler.tags = ["internet"]
handler.command = /^(quotesweb)$/i
export default handler

async function fetchQuotes(page) {
    try {
        const response = await fetch('https://www.goodreads.com/quotes/tag/indonesia?page=' + page); // Ganti dengan URL halaman yang sesuai
        const html = await response.text();
        const $ = cheerio.load(html);
        const quotes = [];
        $('.quoteDetails').each((index, element) => {
            const quotes = $('.quoteText', element).text().trim();
            const author = $('.authorOrTitle', element).text().trim();
            const tags = $('.quoteFooter a[href^="/quotes/tag/"]', element).map((index, tagElement) => $(tagElement).text().trim()).get();
            const likes = $('.quoteFooter a.smallText', element).text().trim();
            quotes.push({
                quotes,
                author,
                tags,
                likes
            });
        });
        return quotes;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    }
}