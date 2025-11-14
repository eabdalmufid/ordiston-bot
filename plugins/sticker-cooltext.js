import fetch from "node-fetch";
import * as cheerio from 'cheerio';;

let handler = async (m, {
    conn,
    text,
    usedPrefix
}) => {
    const parts = text.split('|');
    const query = parts[0] ? parts[0].trim() : null;
    const style = parts[1] ? parts[1].trim() : null;
    const input = parts[2] ? parts[2].trim() : null;
    if (!query || !style) {
        return m.reply("Gunakan format: " + usedPrefix + "cooltext [teks] | [style/id] | [indeks/URL]");
    }
    if (!input) {
        const urlRegex = /^https:\/\/cooltext\.com\/Logo-/;
        if (style.match(urlRegex)) {
            const url = style;
            const logoID = await extractLogoIDFromLink(url);
            try {
                const imageUrl = await getImageUrl(logoID, query);
                const caption = `- *Image for:* ${query}\n- *LogoID:* ${logoID}\n- *Oleh:* @${m.sender.split('@')[0]}`;
                const message = imageUrl.isAnimated ?
                    {
                        video: {
                            url: imageUrl.renderLocation
                        },
                        caption,
                        mentions: [m.sender],
                        gifPlayback: true,
                        gifAttribution: 2
                    } :
                    {
                        image: {
                            url: imageUrl.renderLocation
                        },
                        caption,
                        mentions: [m.sender]
                    };
                return conn.sendMessage(m.chat, message, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                });
            } catch (error) {
                return m.reply(`Error: ${error.message}`);
            }
        } else if (Number(style)) {
            try {
                const imageUrl = await getImageUrl(parseInt(style), query);
                const caption = `- *Image for:* ${query}\n- *LogoID:* ${style}\n- *Oleh:* @${m.sender.split('@')[0]}`;
                const message = imageUrl.isAnimated ?
                    {
                        video: {
                            url: imageUrl.renderLocation
                        },
                        caption,
                        mentions: [m.sender],
                        gifPlayback: true,
                        gifAttribution: 2
                    } :
                    {
                        image: {
                            url: imageUrl.renderLocation
                        },
                        caption,
                        mentions: [m.sender]
                    };
                return conn.sendMessage(m.chat, message, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                });
            } catch (error) {
                return m.reply(`Error: ${error.message}`);
            }
        } else {
            const searchResults = await searchCoolText(style);
            if (searchResults.length === 0) {
                return m.reply("Tidak ada hasil yang ditemukan untuk pencarian ini.");
            }
            const replyMessage = searchResults.map((result, i) => `*${i + 1}.* ${result.title}`).join('\n');
            return m.reply(replyMessage);
        }
    }
    if (Number(input)) {
        const searchResults = await searchCoolText(style);
        const index = parseInt(input);
        if (index >= 1 && index <= searchResults.length) {
            const selectedResult = searchResults[index - 1];
            const logoID = await extractLogoIDFromLink(selectedResult.link);
            try {
                const imageUrl = await getImageUrl(logoID, query);
                const caption = `- *Image for:* ${query}\n- *LogoID:* ${logoID}\n- *Oleh:* @${m.sender.split('@')[0]}`;
                const message = imageUrl.isAnimated ?
                    {
                        video: {
                            url: imageUrl.renderLocation
                        },
                        caption,
                        mentions: [m.sender],
                        gifPlayback: true,
                        gifAttribution: 2
                    } :
                    {
                        image: {
                            url: imageUrl.renderLocation
                        },
                        caption,
                        mentions: [m.sender]
                    };
                return conn.sendMessage(m.chat, message, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                });
            } catch (error) {
                return m.reply(`Error: ${error.message}`);
            }
        }
        return m.reply("Invalid index. Gunakan format: " + usedPrefix + "cooltext [teks] | [style/id] | [indeks]");
    }
    return m.reply("Input tidak valid. Gunakan format: " + usedPrefix + "cooltext [teks] | [style/id] | [indeks/URL]");
};
handler.help = ["cooltext"];
handler.tags = ["misc"];
handler.command = /^(cooltext)$/i;
export default handler;

async function getImageUrl(textStyleId, text) {
    const FONT_SIZE = 70;
    const URL = "https://cooltext.com/PostChange";
    try {
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        };
        const body = [
            `LogoID=${textStyleId}`,
            `Text=${encodeURIComponent(text)}`,
            `FontSize=${FONT_SIZE}`,
            `FileFormat=6`,
            `Integer5=0`,
            `Integer7=0`,
            `Integer8=0`,
            `Integer6=0`,
            `Integer9=0`,
            `Integer13=on`,
            `Integer12=on`,
        ].join("&");
        const response = await fetch(URL, {
            method: "POST",
            headers,
            body,
        });
        const json = await response.json();
        return json || null;
    } catch (e) {
        console.error(e);
        throw new Error("Something went wrong getting Word Art");
    }
}

async function extractLogoIDFromLink(link) {
    try {
        const response = await fetch(link);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        return $('#LogoID').attr('value');
    } catch (error) {
        console.error(error);
        throw new Error("Failed to extract LogoID from the link");
    }
}

async function searchCoolText(query) {
    try {
        const response = await fetch(`https://cooltext.com/Search?Query=${query}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        const resultArray = $('.SearchLink').map(function() {
            const link = "https://cooltext.com/" + $(this).attr('href');
            const title = $(this).find('.SearchResult b').text();
            return {
                title,
                link
            };
        }).get();
        const filteredResultArray = resultArray.filter(result => result.link.startsWith("https://cooltext.com/Logo-"));
        return filteredResultArray;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to perform the search");
    }
}