import * as cheerio from 'cheerio';
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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.bokepindo search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {
        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .bokepindo search|vpn")
            await m.reply(wait)
            try {
                let res = await searchBokepindo(inputs)
                let teks = res.map((item, index) => {
  return `🔍 *[ HASIL ${index + 1} ]*

🆔 Video UID: ${item.videoUid}
📂 Post ID: ${item.postId}
📚 Judul: ${item.title}
🖼️ Thumbnail: ${item.thumbnailSrc}
📽️ HD Video: ${item.hdVideo}
👁️ Views: ${item.views}
⌛ Durasi: ${item.duration}
🔗 Link Video: ${item.videoLink}
`;
}).filter(v => v).join("\n\n________________________\n\n");
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "stream") {
            if (!inputs) return m.reply("Input query link\nExample: .bokepindo search|group")
            await m.reply(wait)
            try {
                let item = await streamBokepindo(inputs)
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
handler.help = ["bokepindo"]
handler.tags = ["internet"]
handler.command = /^(bokepindo)$/i
export default handler

/* New Line */
async function searchBokepindo(s) {
  try {
    const response = await fetch('https://bokepindo13.pro/?s=' + s);
    if (!response.ok) throw new Error('Failed to fetch data');
    const $ = cheerio.load(await response.text());
    return $('article[data-video-uid]').map((index, element) => ({
      videoUid: $(element).attr('data-video-uid'),
      postId: $(element).attr('data-post-id'),
      title: $(element).find('a').attr('title'),
      thumbnailSrc: $(element).find('img').attr('data-src'),
      hdVideo: $(element).find('.hd-video').text(),
      views: $(element).find('.views').text(),
      duration: $(element).find('.duration').text(),
      videoLink: $(element).find('a').attr('href'), // Menambahkan link video
    })).get();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function streamBokepindo(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data');
    const $ = cheerio.load(await response.text());
    const videoSrc = $('#bkpdo-player-container iframe').attr('src');
    return videoSrc;
  } catch (error) {
    console.error('Error fetching video src:', error);
    throw error;
  }
}