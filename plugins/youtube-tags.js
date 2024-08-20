import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query link")
            await m.reply(wait)
            try {
                let teks = await getYouTubeTags(text)
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
}
handler.help = ["yttags"]
handler.tags = ["internet"]
handler.command = /^(yttags)$/i
export default handler

/* New Line */

async function getYouTubeTags(url) {
  try {
    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);
    const tags = $('meta[name="keywords"]').attr('content');

    return tags;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}