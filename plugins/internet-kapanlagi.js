import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"
import * as cheerio from 'cheerio';
import fetch from "node-fetch"


let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "url"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.kapanlagi search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .kapanlagi search|vpn")
            await m.reply(wait)
            try {
                let res = await scrapeLyrics(inputs);
                let captvid = `*Title:*
${res.title}

*Lirik:*
${res.song}

*Url:*
${res.url}
`
                let ytthumb = await (await conn.getFile(res.thumbnail)).data
                let msg = await generateWAMessageFromContent(m.chat, {
                    extendedTextMessage: {
                        text: captvid,
                        jpegThumbnail: ytthumb,
                        contextInfo: {
                            mentionedJid: [m.sender],
                            externalAdReply: {
                                body: "L I R I K",
                                containsAutoReply: true,
                                mediaType: 1,
                                mediaUrl: res.url,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                                sourceId: "Ordiston",
                                sourceType: "PDF",
                                previewType: "PDF",
                                sourceUrl: res.url,
                                thumbnail: ytthumb,
                                thumbnailUrl: res.thumbnail,
                                title: htki + " K A P A N L A G I " + htka
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

        if (feature == "url") {
            if (!inputs) return m.reply("Input query link\nExample: .kapanlagi app|link")
            try {
                let res = await scrapeUrl(inputs);
                let captvid = `*Title:*
${res[1].headline}

*Lirik:*
${res[1].description}

*Url:*
${res[1].url}
`
                let ytthumb = await (await conn.getFile(res[1].image.url)).data
                let msg = await generateWAMessageFromContent(m.chat, {
                    extendedTextMessage: {
                        text: captvid,
                        jpegThumbnail: ytthumb,
                        contextInfo: {
                            mentionedJid: [m.sender],
                            externalAdReply: {
                                body: "L I R I K",
                                containsAutoReply: true,
                                mediaType: 1,
                                mediaUrl: res[1].url,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                                sourceId: "Ordiston",
                                sourceType: "PDF",
                                previewType: "PDF",
                                sourceUrl: res[1].url,
                                thumbnail: ytthumb,
                                thumbnailUrl: res[1].image.url,
                                title: htki + " K A P A N L A G I " + htka
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
}
handler.help = ["kapanlagi"]
handler.tags = ["internet"]
handler.command = /^(kapanlagi)$/i
export default handler

/* New Line */
async function scrapeLyrics(title) {
    const response = await fetch(`https://lirik.kapanlagi.com/lagu/${title.charAt(0).toLowerCase()}_id`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const links = $('.div-horizontal2-list a').map((i, el) => $(el).attr('href')).get();

    let mostSimilarLyric;
    let highestMatchCount = 0;

    for (const link of links) {
        const response = await fetch(link);
        const html = await response.text();
        const $ = cheerio.load(html);
        const spanLirik = $("span.lirik_line");
        const song = spanLirik.map((index, element) => $(element).html().replace(/<\/?[^>]+(>|$)/g, "").trim()).get().join("\n");
        const lyricTitle = $('.head-lirik h5').text().trim().replace(/<\/?[^>]+(>|$)/g, "");
        const thumbnailUrl = $('img.lirik-headline-image').attr('src');
        const linkHref = $("link[rel='canonical']").attr("href");

        const titleWords = title.toLowerCase().split(/\W+/);
        const lyricTitleWords = lyricTitle.toLowerCase().split(/\W+/);

        let matchCount = 0;
        for (const word of titleWords) {
            if (lyricTitleWords.includes(word)) {
                matchCount++;
            }
        }

        if (matchCount > highestMatchCount) {
            highestMatchCount = matchCount;
            mostSimilarLyric = {
                title: lyricTitle,
                song: song,
                thumbnail: thumbnailUrl,
                url: linkHref
            };
        }
    }

    return mostSimilarLyric;
}

async function scrapeUrl(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const scriptLdJson = $("script[type='application/ld+json']");
    let teksJson;

    scriptLdJson.each((index, element) => {
        const teksElement = $(element).html();
        if (teksElement.trim().startsWith("[") && teksElement.trim().endsWith("]")) {
            teksJson = teksElement.trim();
            return false; // Keluar dari loop setelah menemukan elemen yang sesuai
        }
    });
    const json = JSON.parse(teksJson);
    const jsonBaru = json.map((obj) => {
        const newObj = {};
        for (const key in obj) {
            newObj[key.replace("@", "")] = obj[key];
        }
        return newObj;
    });
    return jsonBaru;
}