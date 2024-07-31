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
        "video"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.twstalker search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .twstalker search|jokowi")
            await m.reply(wait)
            try {
                let res = await searchTwstalker(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📢 *Title:* ${item.title || 'Tidak diketahui'}
🌐 *Link:* ${item.link || 'Tidak diketahui'}
🖼️ *Image:* ${item.image || 'Tidak diketahui'}
🔖 *Tag:* ${item.tag || 'Tidak diketahui'}
`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "video") {
            if (!inputs) return m.reply("Input query link\nExample: .twstalker video|link")
            await m.reply(wait)
            try {
                let item = await getVideo(inputs);
                let videoSources = item.video
                if (videoSources.length === 0) return m.reply("Tidak ada Video")
                if (inputs_ > videoSources.length) return m.reply(`Pilih angka yg ada dari *${1}* sampai *${videoSources.length}* saja!`)
                let numvid = inputs_ || 1
                let directLink = videoSources[numvid - 1];
                let cap = `🔍 *[ RESULT ]*

📌 *Author:* ${item.author || 'Tidak diketahui'}
📄 *Description:* ${item.description || 'Tidak diketahui'}
`
                await conn.sendFile(m.chat, directLink || giflogo, item.title || 'Tidak diketahui', cap, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["twstalker"]
handler.tags = ["internet"]
handler.command = /^(twstalker)$/i
export default handler

/* New Line */
async function searchTwstalker(query) {
    const url = `https://twstalker.com/search/?q=${query}`;

    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const results = $('.Search-results .main-section .all-search-events .user-request-list').map((index, element) => {
            const $element = $(element);

            return {
                title: $element.find('.user-title1').text().trim(),
                tag: $element.find('.user-noti-txt span').text().trim(),
                link: $element.find('.user-request-dt a').attr('href'),
                image: $element.find('.user-request-dt img').attr('src')
            };
        }).get();

        return results;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

async function getVideo(url) {
    const response = await fetch(url)
    const html = await response.text();

    const $ = cheerio.load(html);

    const data = {
        author: $('meta[name="author"]').attr('content'),
        description: $('meta[name="description"]').attr('content'),
        video: $('video source')
            .map((index, tag) => $(tag).attr('src'))
            .get()
    };

    return (data);
}