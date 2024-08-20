import fetch from "node-fetch"
import cheerio from "cheerio"

import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"
let handler = async (m, {
    conn,
    text
}) => {
    if (!text) throw "✳️ What do you want me to search for?"

    if (validateURL(text)) {
        await m.reply(wait)
        let v = await getMusicmp3(text)
        let output = `🎵 *Judul:* ${v.judul}
🖼️ *Gambar:* ${v.gambar}
📝 *Deskripsi:* ${v.deskripsi}
🔗 *Tautan Unduh:* ${v.tautan_unduh}
📦 *Ukuran File:* ${v.ukuran_file}
`
        await conn.sendFile(m.chat, v.gambar, "", output, m)
                        await conn.sendFile(m.chat, v.tautan_unduh, v.judul, "", m, false, {
            asDocument: true
        })
    } else {
        await m.reply(wait)
        try {
            let res = await searchMusicmp3(text)
            let teks = res.map((item, index) => {
                return `🔍 *[ RESULT ${index + 1} ]*

📝 *Title:* ${item.title}
🔗 *Url:* ${item.url}
📋 *Desc:* ${item.desc}
🖼️ *Thumb:* ${item.thumb}
`
            }).filter(v => v).join("\n\n________________________\n\n")

            let ytthumb = await (await conn.getFile(res[0].thumb)).data
            let msg = await generateWAMessageFromContent(m.chat, {
                extendedTextMessage: {
                    text: teks,
                    jpegThumbnail: ytthumb,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            body: "S E A R C H",
                            containsAutoReply: true,
                            mediaType: 1,
                            mediaUrl: res[0].url,
                            renderLargerThumbnail: true,
                            showAdAttribution: true,
                            sourceId: "Ordiston",
                            sourceType: "PDF",
                            previewType: "PDF",
                            sourceUrl: res[0].url,
                            thumbnail: ytthumb,
                            thumbnailUrl: res[0].thumb,
                            title: htki + " Y O U T U B E " + htka
                        }
                    }
                }
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })
            await conn.relayMessage(m.chat, msg.message, {})
        } catch (e) {
            await m.reply(eror)
        }
    }

}
handler.help = ["", "search"].map(v => "musicmp3" + v + " <pencarian>")
handler.tags = ["tools"]
handler.command = /^(musicmp3|musicmp3search)$/i
export default handler

function validateURL(url) {
    const pattern = /justnaija\.com\/music-mp3/;
    return pattern.test(url);
}

async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    return await res.text()
}

async function searchMusicmp3(q) {
    const url = 'https://justnaija.com/search?q=' + q + '&SearchIt='; // Ganti dengan URL sumber HTML yang sesuai

    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const articles = [];

        $('article.result').each((index, element) => {
            const title = $(element).find('h3.result-title a').text().trim();
            const url = $(element).find('h3.result-title a').attr('href');
            const thumb = $(element).find('div.result-img img').attr('src');
            const desc = $(element).find('p.result-desc').text().trim();

            const article = {
                title,
                url,
                thumb,
                desc
            };
            articles.push(article);
        });

        return articles;
    } catch (err) {
        console.error(err);
    }
}

async function getMusicmp3(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();

        const $ = cheerio.load(html);

        const judul = $('h1').text();
        const gambar = $('img.lazy').attr('data-src');
        const artis = $('.id3-table tr').eq(0).find('a').text();
        const produser = $('.id3-table tr').eq(1).find('a').text();
        const kategori = $('.id3-table tr').eq(2).find('a').text();
        const genre = $('.id3-table tr').eq(3).find('td').eq(1).text();
        const album = $('.id3-table tr').eq(4).find('a').text();
        const tahun_rilis = $('.id3-table tr').eq(5).find('td').eq(1).text();
        const durasi = $('.id3-table tr').eq(6).find('td').eq(1).text();
        const deskripsi = $('.details p').text();
        const tautan_unduh = $('.song-download a').attr('href');
        const tautan_alternatif_unduh = $('.song-download a').attr('href');
        const ukuran_file = $('.song-download a').text().match(/\[(.*?)\]/)[1];

        const objekArray = {
            judul,
            gambar,
            artis,
            produser,
            kategori,
            genre,
            album,
            tahun_rilis,
            durasi,
            deskripsi,
            tautan_unduh,
            tautan_alternatif_unduh,
            ukuran_file
        };

        return objekArray;
    } catch (error) {
        console.log('Terjadi kesalahan:', error);
        return null;
    }
}