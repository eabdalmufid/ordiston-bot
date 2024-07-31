import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "stream"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.bokepsin search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {
        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .bokepsin search|vpn")
            await m.reply(wait)
            try {
                let res = await searchBokepsin(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📚 title: ${item.title}
🔗 link: ${item.videoUrl}
📅 date: ${item.views}
📖 story: ${item.duration}
  `
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "stream") {
            if (!inputs) return m.reply("Input query link\nExample: .bokepsin search|group")
            await m.reply(wait)
            try {
                let item = await streamBokepsin(inputs)
                let cap = `🔍 *[ RESULT ]*

🔗 link: ${item}
`
                await m.reply(cap)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["bokepsin"]
handler.tags = ["internet"]
handler.command = /^(bokepsin)$/i
export default handler

/* New Line */
async function searchBokepsin(q) {
  const url = 'https://bokepsin.website/search/' + q;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const results = $('.video-block').map((index, element) => ({
    title: $(element).find('.title').text(),
    imageUrl: $(element).find('.video-img').attr('data-src'),
    videoUrl: $(element).find('.thumb').attr('href'),
    views: $(element).find('.views-number').text().trim(),
    duration: $(element).find('.duration').text().trim()
  })).get();
  return results;
}

async function streamBokepsin(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const embedUrl = $('meta[itemprop="embedURL"]').attr('content');
  return embedUrl.startsWith('//') ? `https:${embedUrl}` : embedUrl;
}