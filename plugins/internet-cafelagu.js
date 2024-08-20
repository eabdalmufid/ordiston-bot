import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"
import cheerio from "cheerio"
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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.cafelagu search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .cafelagu search|vpn")
            await m.reply(wait)
            try {
                let res = await searchCafelagu(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
📚 *Title:* ${item.title}
🎵 *Artist:* ${item.artist}
🔗 *DownloadLink:* ${item.downloadLink}
🖼️ *DetailThumb:* ${item.detailThumb}
`
                }).filter(v => v).join("\n\n________________________\n\n")

                let ytthumb = await (await conn.getFile(res[0].detailThumb)).data
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
                                mediaUrl: res[0].downloadLink,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                                sourceId: "Ordiston",
                                sourceType: "PDF",
                                previewType: "PDF",
                                sourceUrl: res[0].downloadLink,
                                thumbnail: ytthumb,
                                thumbnailUrl: res[0].detailThumb,
                                title: htki + " C A F E L A G U " + htka
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
            if (!inputs) return m.reply("Input query link\nExample: .cafelagu app|link")
            try {
                let item = await getCafelagu(inputs);
                let captvid = `📚 *Title:* ${item.title}
🎵 *Artist:* ${item.artist}
🔗 *DownloadLink:* ${item.downloadLink}
🖼️ *DetailThumb:* ${item.detailThumb}
⏱️ *Duration:* ${item.duration}
🔊 *AudioSrc:* ${item.audioSrc}
🎧 *AudioType:* ${item.audioType}
📝 *Description:* ${item.description}
💾 *DownloadLinks:* ${item.downloadLinks.map(link => encodeURI(link)).join('\n• ')}
⚡ *FastDownloadLink:* ${item.fastDownloadLink}
`
                let ytthumb = await (await conn.getFile(item.detailThumb)).data
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
                                mediaUrl: item.downloadLink,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                                sourceId: "Ordiston",
                                sourceType: "PDF",
                                previewType: "PDF",
                                sourceUrl: item.downloadLink,
                                thumbnail: ytthumb,
                                thumbnailUrl: item.detailThumb,
                                title: htki + " C A F E L A G U " + htka
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
handler.help = ["cafelagu"]
handler.tags = ["internet"]
handler.command = /^(cafelagu)$/i
export default handler

/* New Line */
async function searchCafelagu(query) {
  const url = "https://mp3.cafelagu.me";
  try {
    const response = await fetch(url + '/download/' + query);
    const html = await response.text();
    const $ = cheerio.load(html);

    return $('#main div.menu').map((index, element) => {
      const $element = $(element);
      const detailThumb = url + $element.find('.detail-thumb img').attr('src');
      const detailInfo = $element.find('.detail-info');
      const title = detailInfo.find('.ab').text().trim();
      const artist = detailInfo.find('.sg').text().trim();
      const downloadLink = url + detailInfo.find('a.download').attr('href');

      return { title, artist, downloadLink, detailThumb };
    }).get();
  } catch (error) {
    throw error;
  }
};

async function getCafelagu(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const downloadLink = 'https://mp3.cafelagu.me' + $('.download-button').attr('href');

    const downloadData = await getDownloadLinks(downloadLink);

    const data = {
      title: $('h1').text().trim(),
      artist: $('.bh-info .f12').text().trim(),
      downloadLink: downloadLink,
      detailThumb: $('.bh-thumb img').attr('src'),
      playCount: $('.bh-info .play-count').text().trim(),
      duration: $('.bh-info b').text().trim().split(':')[1].trim(),
      audioSrc: $('.bh-audio audio source').attr('src'),
      audioType: $('.bh-audio audio source').attr('type'),
      description: $('.info b').text().trim(),
      downloadLinks: downloadData.downloadLinks,
      fastDownloadLink: downloadData.fastDownloadLink
    };

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getDownloadLinks(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const downloadLinks = [];
    $('iframe.download-iklan1').each((index, element) => {
      const src = $(element).attr('src');
      downloadLinks.push(src);
    });

    const fastDownloadLink = $('a.button-watch').attr('onclick').match(/'(.*?)'/)[1];

    const data = {
      downloadLinks,
      fastDownloadLink
    };

    return data;
  } catch (error) {
    console.error(error);
  }
}