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
        "songv1",
        "songv2",
        "lyricsv1",
        "lyricsv2"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.songsearch v1|hello\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "songv1") {
            if (!inputs) return m.reply("Input query link\nExample: .songsearch v1|hello")
            await m.reply(wait)
            try {
                let res = await searchSong(inputs);
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*

🎶 Name: ${item.name}
📅 Year: ${item.year}
👤 Artist: ${item.artist.name}
💿 Album: ${item.albums.map(v => v.name || '')}
⭐ Score: ${item.score}
🆔 ID: ${item.id}
📜 Lyrics: ${cleanLyrics(item.fragments.join('\n'))}
📷 Image: ${item.image.url}
🔗 Link: https://songsear.ch${item['_url']}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                let ytthumb = await (await conn.getFile(res[0].image.url)).data
                let msg = await generateWAMessageFromContent(m.chat, {
                    extendedTextMessage: {
                        text: teks,
                        jpegThumbnail: ytthumb,
                        contextInfo: {
                            mentionedJid: [m.sender],
                            externalAdReply: {
                                body: "L I R I K",
                                containsAutoReply: true,
                                mediaType: 1,
                                mediaUrl: "https://songsear.ch" + res[0]['_url'],
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                                sourceId: "Ordiston",
                                sourceType: "PDF",
                                previewType: "PDF",
                                sourceUrl: "https://songsear.ch" + res[0]['_url'],
                                thumbnail: ytthumb,
                                thumbnailUrl: res[0].image.url,
                                title: htki + " SONG - SEARCH " + htka
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

        if (feature == "lyricsv1") {
            if (!inputs) return m.reply("Input query link\nExample: .songsearch v1|hello")
            await m.reply(wait)
            try {
                let res = await getSong(inputs);
                let teks = `*[ RESULT ]*

🎶 Title: ${res.song.name}
👤 Artist: ${res.song.artist.name}
💿 Album: ${res.song.albums.map(v => v.name || '')}
📜 Lyrics: ${cleanLyricsV2(res.song['text_html'])}
📷 Image: ${res.song.image.url}
🔗 Link: https://songsear.ch${res.song['_url']}
`
                let ytthumb = await (await conn.getFile(res.song.image.url)).data
                let msg = await generateWAMessageFromContent(m.chat, {
                    extendedTextMessage: {
                        text: teks,
                        jpegThumbnail: ytthumb,
                        contextInfo: {
                            mentionedJid: [m.sender],
                            externalAdReply: {
                                body: "L I R I K",
                                containsAutoReply: true,
                                mediaType: 1,
                                mediaUrl: "https://songsear.ch" + res.song['_url'],
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                                sourceId: "Ordiston",
                                sourceType: "PDF",
                                previewType: "PDF",
                                sourceUrl: "https://songsear.ch" + res.song['_url'],
                                thumbnail: ytthumb,
                                thumbnailUrl: res.song.image.url,
                                title: htki + " SONG - SEARCH " + htka
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

        if (feature == "songv2") {
            if (!inputs) return m.reply("Input query link\nExample: .songsearch v1|hello")
            await m.reply(wait)
            try {
                let res = await searchSongV2(inputs);
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*

🎶 Title: ${item.title}
👤 Artist: ${item.artist}
💿 Album: ${item.album}
📜 Lyrics: ${item.lyrics}
📷 Image: ${item.image}
🔗 Link: ${item.link}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                let ytthumb = await (await conn.getFile(res[0].image)).data
                let msg = await generateWAMessageFromContent(m.chat, {
                    extendedTextMessage: {
                        text: teks,
                        jpegThumbnail: ytthumb,
                        contextInfo: {
                            mentionedJid: [m.sender],
                            externalAdReply: {
                                body: "L I R I K",
                                containsAutoReply: true,
                                mediaType: 1,
                                mediaUrl: res[0].link,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                                sourceId: "Ordiston",
                                sourceType: "PDF",
                                previewType: "PDF",
                                sourceUrl: res[0].link,
                                thumbnail: ytthumb,
                                thumbnailUrl: res[0].image,
                                title: htki + " SONG - SEARCH " + htka
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
        if (feature == "lyricsv2") {
            if (!inputs) return m.reply("Input query link\nExample: .songsearch v1|hello")
            await m.reply(wait)
            try {
                let res = await getSongV2(inputs);
                let teks = `*[ RESULT ]*

🎶 Title: ${res.title}
👤 Artist: ${res.artist}
💿 Album: ${res.album}
📅 Year: ${res.year}
📜 Lyrics: ${cleanLyricsV2(res.lyrics)}
📷 Image: ${res.imageSrc}
🔗 Link: ${res.ogURL}
`
                let ytthumb = await (await conn.getFile(res.imageSrc)).data
                let msg = await generateWAMessageFromContent(m.chat, {
                    extendedTextMessage: {
                        text: teks,
                        jpegThumbnail: ytthumb,
                        contextInfo: {
                            mentionedJid: [m.sender],
                            externalAdReply: {
                                body: "L I R I K",
                                containsAutoReply: true,
                                mediaType: 1,
                                mediaUrl: res.ogURL,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                                sourceId: "Ordiston",
                                sourceType: "PDF",
                                previewType: "PDF",
                                sourceUrl: res.ogURL,
                                thumbnail: ytthumb,
                                thumbnailUrl: res.imageSrc,
                                title: htki + " SONG - SEARCH " + htka
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
handler.help = ["songsearch"]
handler.tags = ["internet"]
handler.command = /^(songsearch)$/i
export default handler

/* New Line */
async function searchSong(keyword) {
    const url = `https://songsear.ch/api/search?q=${encodeURIComponent(keyword)}`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        return json.results
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
async function getSong(id) {
    const url = `https://songsear.ch/api/song/${id}`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        return json
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


async function searchSongV2(keyword) {
    const url = `https://songsear.ch/q/${encodeURIComponent(keyword)}`;

    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        return $('.results .result').map((index, element) => {
            const $element = $(element);

            return {
                title: $element.find('.head h2 a').text().trim(),
                artist: $element.find('.head h3 b').text().trim(),
                album: $element.find('.head .albums b').text().trim(),
                lyrics: $element.find('.fragments p').text().trim(),
                image: $element.find('.head img.album').attr('src'),
                link: "https://songsear.ch" + $element.find('.head h2 a').attr('href'),
            };
        }).get();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getSongV2(url) {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    return {
        imageSrc: $('.result.song .text-center .song-picture').attr('src').trim(),
        album: $('.result.song .text-center img').attr('alt').trim(),
        title: $('.result.song .text-center h2').text().trim(),
        artist: $('.result.song .text-center h3').eq(0).text().trim().replace('by', ''),
        year: $('.result.song .text-center h3').eq(1).text().trim().replace('on', ''),
        lyrics: $('blockquote').html().trim(),
        ogURL: $('meta[property="og:url"]').attr('content')
    };
}


function cleanLyrics(html) {
    const regex = /<[^>]+>/g;
    return html.replace(regex, "");
}

function cleanLyricsV2(html) {
    return html.replace(/<br\s*\/?>/gi, '\n')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'");
}