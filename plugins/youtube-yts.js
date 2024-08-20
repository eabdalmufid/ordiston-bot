import yts from "yt-search"
import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"
import { format } from 'util';

let handler = async (m, {
    conn,
    text
}) => {
    if (!text) throw "✳️ What do you want me to search for on YouTube?"
    let results = await yts(text)
    let tes = results.all
    let teks = results.all.map(v => {
        switch (v.type) {
            case "video":
                return `
📹 *Type:* ${v.type}
🆔 *VideoId:* ${v.videoId}
🔗 *URL:* ${v.url}
📺 *Title:* ${v.title}
📝 *Description:* ${v.description}
🖼️ *Image:* ${v.image}
🖼️ *Thumbnail:* ${v.thumbnail}
⏱️ *Seconds:* ${v.seconds}
⏰ *Timestamp:* ${v.timestamp}
⏲️ *Duration Timestamp:* ${v.duration.timestamp}
⌛ *Duration Seconds:* ${v.duration.seconds}
⌚ *Ago:* ${v.ago}
👀 *Views:* ${formatNumber(v.views)}
👤 *Author Name:* ${v.author.name}
🔗 *Author URL:* ${v.author.url}
   `.trim()
            case "canal":
                return `
🔖 *${v.name}* (${v.url})
⚡ ${v.subCountLabel} (${v.subCount}) Suscribe
📽️ ${v.videoCount} videos
`.trim()
        }
    }).filter(v => v).join("\n\n________________________\n\n")
    
        let ytthumb = await (await conn.getFile(tes[0].thumbnail)).data
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
                        mediaUrl: tes[0].url,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceId: "Ordiston",
                        sourceType: "PDF",
                        previewType: "PDF",
                        sourceUrl: tes[0].url,
                        thumbnail: ytthumb,
                        thumbnailUrl: tes[0].thumbnail,
                        title: htki + " Y O U T U B E " + htka
                    }
                }
            }
        }, {
            quoted: m,
            ephemeralExpiration: ephemeral
        })
        await conn.relayMessage(m.chat, msg.message, {})
}
handler.help = ["", "earch"].map(v => "yts" + v + " <pencarian>")
handler.tags = ["tools"]
handler.command = /^y(outubesearch|ts(earch)?)$/i
export default handler

function formatNumber(num) {
  const suffixes = ['', 'k', 'M', 'B', 'T'];
  const numString = Math.abs(num).toString();
  const numDigits = numString.length;

  if (numDigits <= 3) {
    return numString;
  }

  const suffixIndex = Math.floor((numDigits - 1) / 3);
  let formattedNum = (num / Math.pow(1000, suffixIndex)).toFixed(1);
  
  // Menghapus desimal jika angka sudah bulat
  if (formattedNum.endsWith('.0')) {
    formattedNum = formattedNum.slice(0, -2);
  }

  return formattedNum + suffixes[suffixIndex];
}

/*import yts from 'yt-search'

let handler = async (m, {
    text
}) => {
    if (!text) throw 'Apa yang anda ingin telusuri di YouTube?'
    let results = await yts(text)
    let tes = results.all
    let teks = results.all.map(v => {
        switch (v.type) {
            case 'video':
                return `
▢ ${v.title}
▢ *Link* : ${v.url}
▢ *Duration* : ${v.timestamp}
▢ *Uploaded :* ${v.ago}
▢ *Views:* ${v.views}
   `.trim()
            case 'canal':
                return `
▢ *${v.name}* (${v.url})
▢ ${v.subCountLabel} (${v.subCount}) Subscriber
▢ ${v.videoCount} video
`.trim()
        }
    }).filter(v => v).join('\n\n________________________\n\n')
    conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m)
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^y(outubesearch|ts(earch)?)$/i

export default handler*/
