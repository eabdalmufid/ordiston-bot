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
        "app"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.techbigs search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .techbigs search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApp(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📢 *title:* ${item.title}
🌐 *url:* ${item.link}
🖼️ *image:* ${item.image}
🔖 *date:* ${item.date}
`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .techbigs app|link")
            await m.reply(wait)
            try {
                let item = await getApp(inputs)
                let cap = `🔍 *[ RESULT ]*

📌 *title:* ${item.info.title}
⬇️ *downloadLink:* ${item.link.data.link}
📦 *fileSize:* ${item.link.data.size}
📱 *info:* ${item.info.content}
🤖 *author:* ${item.info.author}
🔖 *date:* ${item.info.date}
`
                await conn.sendFile(m.chat, logo, "", cap, m)
                await conn.sendFile(m.chat, item.link.data.link, item.info.title || 'Tidak diketahui', null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["techbigs"]
handler.tags = ["internet"]
handler.command = /^(techbigs)$/i
export default handler

/* New Line */
async function searchApp(query) {
    const baseUrl = "https://techbigs.com"
    const url = `${baseUrl}/?s=${query}`;

    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const items = [];

        $('ul.blogs.w3 > li').each((index, element) => {
            const item = {};

            item.title = $(element).find('.title').text().trim();
            item.image = baseUrl + $(element).find('.thumb').attr('data-src');
            item.link = $(element).find('.blog').attr('href');
            item.date = $(element).find('time').attr('datetime');

            items.push(item);
        });

        return items;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function getApp(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const container = $('#ApkOriginal');
        const pageDescription = $('.page-description');
        const pageAuthor = pageDescription.find('.page-author').text().trim();
        const pageTitle = pageDescription.find('.page-title').text().trim();
        const pageContent = pageDescription.find('.wrapcontent p').text().trim();
        const pageDate = pageDescription.find('.page-author time').attr('datetime');

        const obj = {
            id: container.attr('data-id'),
            name: container.attr('data-name'),
            author: pageAuthor,
            title: pageTitle,
            content: pageContent,
            date: pageDate,
            ogImage: $('meta[property="og:image"]').attr('content')
        };
        const down = await getApk(obj.id, obj.name);
        return {
            info: obj,
            link: down
        };
    } catch (error) {
        console.log(error);
    }
}
async function getApk(id, name) {
    const domain = 'https://techbigs.com';
    const token = 'm135ur7kdfyn4cwlasvoh6q0be92zip8tgxj';
    const langid = 'en';
    const ismainlang = '1';
    const ldomain = ismainlang ? domain : `${domain}/${langid}`;

    if (id && name) {
        try {
            const response = await fetch(`${domain}/getapk`, {
                method: 'POST',
                body: JSON.stringify({
                    pid: id,
                    appid: name
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                return await response.json()
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }
}