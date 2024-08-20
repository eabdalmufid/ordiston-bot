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
        "all",
        "read"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.hespress search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "all") {
            await m.reply(wait)
            try {
                let res = await allHespress()
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
📚 Title: ${item.title}
🔗 Link: ${decodeURIComponent(item.link)}
📝 Date: ${item.date}
  `
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "read") {
            if (!inputs) return m.reply("Input query link\nExample: .hespress read|5\nList: .hespress list")
            await m.reply(wait)
            try {
                let res = await allHespress()
                let url
                if (isNumberFormat(inputs)) {
                    url = res[parseInt(inputs) + 1].link
                } else {
                    url = inputs
                }

                let item = await readHespress(url)
                let cap = `🔍 *[ RESULT ]*
📚 Title: ${item.title}
🖼️ Image: ${item.image}
📝 Caption: ${item.caption}
✍️ Author: ${item.author}
📅 Date: ${item.date}
📜 Content: ${item.content}
🔖 Tags: ${item.tags}
`
                await conn.sendFile(m.chat, item.image || logo, "", cap, m)

            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["hespress"]
handler.tags = ["internet"]
handler.command = /^(hespress)$/i
export default handler

/* New Line */

// Fungsi untuk memeriksa apakah format input adalah nomor
function isNumberFormat(input) {
    return /^\d+$/.test(input);
}

async function allHespress() {
    try {
        const response = await fetch('https://www.hespress.com/all'); // Ganti URL dengan URL sumber Anda
        const html = await response.text();

        const $ = cheerio.load(html);
        const result = [];

        $('.col-12.col-sm-6.col-md-6.col-xl-3').each((index, element) => {
            const card = {
                title: $(element).find('.card-title').text().trim(),
                date: $(element).find('.date-card small').text().trim(),
                image: $(element).find('.card-img-top img').attr('src'),
                link: $(element).find('.stretched-link').attr('href')
            };

            result.push(card);
        });

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function readHespress(url) {
    try {
        const response = await fetch(url); // Ganti URL dengan URL sumber Anda
        const html = await response.text();

        const $ = cheerio.load(html);
        $('script').remove();
        $('style').remove();
        const header = $('.article-header');
        const title = header.find('.post-title').text().trim();
        const image = $('.figure-heading-post .post-thumbnail img').attr('src');
        const caption = $('.figure-heading-post figcaption').text().trim();
        const author = $('.author a').text().trim();
        const date = $('.date-post').text().trim();
        const content = $('.article-content').text().trim();
        const tags = $('.box-tags .tag_post_tag').map((index, element) => $(element).text().trim()).get();

        const article = {
            title,
            image,
            caption,
            author,
            date,
            content,
            tags
        };

        return article;
    } catch (error) {
        console.error('Error:', error);
    }
}