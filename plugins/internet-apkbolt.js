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
        "app"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apkbolt search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apkbolt search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApp(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
📷 *imageURL:* ${item.imageURL}
📚 *title:* ${item.title}
🔗 *link:* ${item.link}
🔖 *categories:* ${item.categories}
`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apkbolt app|link")
            await m.reply(wait)
            try {
                let item = await getInfo(inputs)
                let cap = `🔍 *[ RESULT ]*
📷 *imageURL:* ${item.image}
📚 *title:* ${item.name}
🔗 *link:* ${item.link}
🔗 *downloadLink:* ${item.downloadLink}
💾 *downloadFile:* ${item.downloadFile}
`
                await conn.sendFile(m.chat, item.image || logo, "", cap, m)
                await conn.sendFile(m.chat, item.downloadFile || logo, item.name || 'Tidak diketahui', null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apkbolt"]
handler.tags = ["internet"]
handler.command = /^(apkbolt)$/i
export default handler

/* New Line */
async function searchApp(q) {
    const url = 'https://apkbolt.com/?s=' + q; // Ganti dengan URL yang sesuai

    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const articles = [];

        $('article.vce-post').each((index, element) => {
            const article = {};

            const metaImage = $(element).find('.meta-image');
            article.imageURL = metaImage.find('img').attr('src');
            article.title = $(element).find('.entry-title a').text().trim();
            article.link = $(element).find('.entry-title a').attr('href');
            article.categories = [];
            $(element).find('.meta-category a').each((index, element) => {
                article.categories.push($(element).text().trim());
            });

            articles.push(article);
        });

        return articles;
    } catch (error) {
        console.log(error);
    }
}

async function getInfo(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const mediaText = $('.wp-block-media-text');
        const content = mediaText.find('.wp-block-media-text__content');
        content.find('script').remove(); // Menghapus tag <script>
        const downloadLink = $('.redirect-press-final-link').attr('href');
        const downloadFile = await getApp(downloadLink);
        const info = {
            name: $('meta[property="og:title"]').attr('content'),
            image: $('meta[property="og:image"]').attr('content'),
            link: $('meta[property="og:url"]').attr('content'),
            downloadLink,
            downloadFile
        };

        return info;
    } catch (error) {
        console.log(error);
    }
}

async function getApp(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const mainWrapper = $('#main-wrapper');
        mainWrapper.find('script').remove(); // Menghapus tag <script>
        const downloadLink = mainWrapper.find('a').attr('href');
        return downloadLink;
    } catch (error) {
        console.log(error);
        return null;
    }
}