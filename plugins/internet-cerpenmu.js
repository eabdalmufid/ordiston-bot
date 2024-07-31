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
        "list",
        "read"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.cerpenmu list\n\n*Pilih type yg ada*\n" + lister.map((v, index) => " ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "list") {
            await m.reply(wait)
            try {
                let res = await getCategoryCerpen()
                let teks = res.categories.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
  📚 Title: ${item.title}
  🔗 Link: ${item.link}
  📝 Total: ${item.total}
  `
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "read") {
            if (!inputs) return m.reply("Input query link\nExample: .cerpenmu read|5\nList: .cerpenmu list")
            await m.reply(wait)
            try {
                let res = await getCategoryCerpen()
                let url
                if (isNumberFormat(inputs)) {
                    url = res.categories[parseInt(inputs) + 1].link
                } else {
                    url = inputs
                }

                let item = await getContentCerpen(url)
                let cap = `🔍 *[ RESULT ]*
📚 Title: ${item.title}
📝 Content: ${item.content}
🖼️ Image: ${item.image}
`
                await conn.sendFile(m.chat, item.image || logo, "", cap, m)

            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["cerpenmu"]
handler.tags = ["internet"]
handler.command = /^(cerpenmu)$/i
export default handler

/* New Line */

// Fungsi untuk memeriksa apakah format input adalah nomor
function isNumberFormat(input) {
    return /^\d+$/.test(input);
}

async function getCategoryCerpen() {
    try {
        const url = 'https://cerpenmu.com/';
        const response = await fetch(url);
        const body = await response.text();

        const $ = cheerio.load(body);
        const articles = [];

        $('article.post').each((index, element) => {
            const articleObj = {
                title: $(element).find('h2 > a').text(),
                link: $(element).find('h2 > a').attr('href'),
                author: $(element).find('blockquote > a').text(),
                category: $(element).find('a[rel="category tag"]').map((_, el) => $(el).text()).get()
            };
            articles.push(articleObj);
        });

        const categories = [];
        $('.cat-item').each((index, element) => {
            const totalMatch = $(element).text().match(/\((\d+)\)/);
            const category = {
                title: $(element).find('a').text(),
                link: $(element).find('a').attr('href'),
                total: $(element).text().match(/\(([\d,]+)\)/)[1]
            };
            categories.push(category);
        });

        const result = {
            categories: categories,
            articles: articles
        };

        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getContentCerpen(url, page = 1) {
    try {
        const pageUrl = url + (page ? `/page/${page}/` : '');
        const response = await fetch(pageUrl);
        const body = await response.text();
        const $ = cheerio.load(body);

        const articles = $('article.post')
            .map((index, element) => {
                const $element = $(element);
                const link = $element.find('h2 a').attr('href');

                if (link && link.endsWith('.html')) {
                    return {
                        title: $element.find('h2 a').text(),
                        link,
                        tag: $element.find('a[rel="tag"]').text(),
                        quote: $element.find('blockquote').text()
                    };
                }
            })
            .get();

        const randomArticle = articles[Math.floor(Math.random() * articles.length)];

        if (randomArticle) {
            const articleResponse = await fetch(randomArticle.link);
            const articleBody = await articleResponse.text();
            const $article = cheerio.load(articleBody, {
                xmlMode: false
            });

            $article('script, style').remove();

            Object.assign(randomArticle, {
                title: $article('h1').text(),
                image: $article('img').attr('src'),
                content: $article('p').text()
            });
        }

        return randomArticle || null;

    } catch (error) {
        console.log('Error:', error);
        return null;
    }
}