import cheerio from "cheerio"
import fetch from "node-fetch"
import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"

let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    if (!text) return m.reply("Input link snapchat\nExample: https://t.snapchat.com/2SeUKN21")
    // Panggil fungsi getSnapchatVideo dengan URL yang sesuai
    try {
        let res = await getSnapchatVideo(text)
        let snap_caption = `*💌 Name:* ${res.name}
*🗂️ Extension:* ${res.encodingFormat}
*⏰ Extension:* ${res.duration}
*📊 Description:* ${res.description}
*📨 Uploaded:* ${res.uploadDate}

*👤 Creator name:* ${res.creator.alternateName}
*🔗 Creator url:* ${res.creator.url}
`
        let snap_thumb = res.thumbnailUrl
        let snap_thumb_s = await (await conn.getFile(snap_thumb)).data
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: snap_caption,
                jpegThumbnail: snap_thumb_s,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        body: 'D O W N L O A D E R',
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: res.contentUrl,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceId: "Ordiston",
                        sourceType: "PDF",
                        previewType: "PDF",
                        sourceUrl: res.contentUrl,
                        thumbnail: snap_thumb_s,
                        thumbnailUrl: snap_thumb,
                        title: 'S N A P C H A T'
                    }
                }
            }
        }, {
            quoted: m,
            ephemeralExpiration: ephemeral
        })
        await conn.relayMessage(m.chat, msg.message, {})
        await conn.sendFile(m.chat, res.contentUrl, res.name, "", m, null, {
            mimetype: res.encodingFormat,
            asDocument: true
        })
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ['cocofun'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^snap(chat|dl)$/i
export default handler

async function getSnapchatVideo(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const scriptElement = $('script[type="application/ld+json"]');
    const scriptContent = scriptElement.html();
    return scriptContent ? JSON.parse(scriptContent) : null;
}