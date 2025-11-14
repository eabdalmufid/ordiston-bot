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
        "detail",
        "r18",
        "vilipix"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n" + usedPrefix + command + " search|manhwa\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: " + usedPrefix + command + " search|manhwa")
            try {
            await m.reply(wait)
                let res = await fetchPixivSearchResults(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

🆔 *ID:* ${item.id || 'Tidak diketahui'}
📚 *Title:* ${item.title || 'Tidak diketahui'}
📝 *Type:* ${item.type || 'Tidak diketahui'}
📝 *Caption:* ${item.caption || 'Tidak diketahui'}
📅 *Create Date:* ${formatTanggal(item.create_date) || 'Tidak diketahui'}
👁️ *Total View:* ${item.total_view || 'Tidak diketahui'}`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "detail") {
            if (!inputs) return m.reply("Input query link\nExample: " + usedPrefix + command + " detail|angka")
            await m.reply(wait)
            let IDpixiv = await detectArtworkNumber(Number(inputs))
            try {
                let item = await fetchPixivIllust(IDpixiv)
                let cap = `🔍 *[ RESULT ]*

🆔 *ID:* ${item.id || 'Tidak diketahui'}
📚 *Title:* ${item.title || 'Tidak diketahui'}
🔖 *Type:* ${item.type || 'Tidak diketahui'}
📝 *Caption:* ${item.caption || 'Tidak diketahui'}
🔒 *Restrict:* ${item.restrict || 'Tidak diketahui'}
📅 *Create Date:* ${formatTanggal(item.create_date) || 'Tidak diketahui'}
📄 *Page Count:* ${item.page_count || 'Tidak diketahui'}
🔍 *Width:* ${item.width || 'Tidak diketahui'}
🔍 *Height:* ${item.height || 'Tidak diketahui'}
🧠 *Sanity Level:* ${item.sanity_level || 'Tidak diketahui'}
🔒 *X Restrict:* ${item.x_restrict || 'Tidak diketahui'}
👁️ *Total View:* ${item.total_view || 'Tidak diketahui'}
🔖 *Total Bookmarks:* ${item.total_bookmarks || 'Tidak diketahui'}
📌 *Is Bookmarked:* ${item.is_bookmarked || 'Tidak diketahui'}
👀 *Visible:* ${item.visible || 'Tidak diketahui'}
🔇 *Is Muted:* ${item.is_muted || 'Tidak diketahui'}
💬 *Total Comments:* ${item.total_comments || 'Tidak diketahui'}
🧠 *Illust AI Type:* ${item.illust_ai_type || 'Tidak diketahui'}
📚 *Illust Book Style:* ${item.illust_book_style || 'Tidak diketahui'}
🔒 *Comment Access Control:* ${item.comment_access_control || 'Tidak diketahui'}
`
                await conn.sendFile(m.chat, "https://pixiv.re/" + item.id + ".png" || item.meta_single_page.original_image_url || logo, "", cap, m)

            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "r18") {
            try {
            await m.reply(wait)
                let item = await R18()
                let result = Object.entries(item)
                    .map(([key, value]) => `	◦  *${key.charAt(0).toUpperCase() + key.slice(1).split('.').join(' ')}* : ${value}`)
                    .join('\n');
                await conn.sendFile(m.chat, item.url || logo, "", result, m)

            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "vilipix") {
            if (isNaN(inputs)) return m.reply("Input query link\nExample: " + usedPrefix + command + " vilipix|angka")
            try {
            await m.reply(wait)
                let item = await vilipixRandomImg(inputs)
                if (inputs >= item.data.count) return m.reply("Input query link\nExample: " + usedPrefix + command + " vilipix|angka\n\nTersedia: " + item.data.count)
                let result = Object.entries(item.data.rows[0])
                    .map(([key, value]) => `	◦  *${key.charAt(0).toUpperCase() + key.slice(1).split('.').join(' ')}* : ${value}`)
                    .join('\n');
                await conn.sendFile(m.chat, item.data.rows[0].original_url || item.data.rows[0].regular_url || logo, "", result, m)

            } catch (e) {
                await m.reply(eror)
            }
        }


    }
}
handler.help = ["pixiv"]
handler.tags = ["internet"]
handler.command = /^(pixiv)$/i
handler.premium = true
export default handler

/* New Line */

function formatTanggal(tanggal) {
    const dateObj = new Date(tanggal);
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };
    const formattedDate = dateObj.toLocaleDateString('id-ID', options);
    return formattedDate;
}

function detectArtworkNumber(input) {
    const regex = /(\d+)/; // Ekspresi reguler untuk mencocokkan angka

    // Jika input adalah URL, ekstrak nomor dari URL
    if (typeof input === 'string' && input.startsWith('https://www.pixiv.net/en/artworks/')) {
        const match = input.match(regex);
        if (match) {
            return match[0];
        }
    }

    // Jika input bukan URL, langsung mencocokkan angka
    if (typeof input === 'number') {
        const match = String(input).match(regex);
        if (match) {
            return match[0];
        }
    }

    return null; // Jika tidak ada angka yang terdeteksi
}

async function fetchPixivSearchResults(word) {
    try {
        const response = await fetch(`http://api.obfs.dev/api/pixiv/search?word=${encodeURIComponent(word)}`);
        const data = await response.json();
        return data.illusts;
    } catch (error) {
        console.log('An error occurred while fetching Pixiv search results:', error);
        throw error;
    }
}

async function fetchPixivIllust(id) {
    try {
        const response = await fetch(`http://api.obfs.dev/api/pixiv/illust?id=${id}`);
        const data = await response.json();
        return data.illust;
    } catch (error) {
        console.log('An error occurred while fetching Pixiv illust:', error);
        throw error;
    }
}

async function R18() {
    try {
        const response = await fetch("https://image.anosu.top/pixiv/json?r18=1");
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.log('An error occurred while fetching Pixiv illust:', error);
        throw error;
    }
}

async function vilipixRandomImg(offset) {
    try {
        const response = await fetch(`https://www.vilipix.com/api/v1/picture/recommand?limit=1&offset=${offset}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('An error occurred while fetching Pixiv illust:', error);
        throw error;
    }
}