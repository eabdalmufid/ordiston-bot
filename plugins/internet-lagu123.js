// import {
//     generateWAMessageFromContent
// } from "@adiwajshing/baileys"
// import * as cheerio from 'cheerio';
// import fetch from "node-fetch"
// import {
//     youtubedl,
//     youtubedlv2
// } from "@bochilteam/scraper"

// let handler = async (m, {
//     conn,
//     args,
//     usedPrefix,
//     text,
//     command
// }) => {

//     let lister = [
//         "search",
//         "play"
//     ]

//     let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
//     if (!lister.includes(feature)) return m.reply("*Example:*\n.lagu123 search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

//     if (lister.includes(feature)) {

//         if (feature == "search") {
//             if (!inputs) return m.reply("Input query link\nExample: .lagu123 search|vpn")
//             await m.reply(wait)
//             try {
//                 let res = await searchLagu123(inputs)
//                 let teks = res.map((item, index) => {
//                     return `🔍 *[ RESULT ${index + 1} ]*
// 🖼️ *imageSrc:* ${item.imageSrc}
// 📰 *title:* ${item.title}
// 🌐 *url:* ${item.url}
// ▶️ *playUrl:* ${item.playUrl}
// 🔊 *audioUrl:* ${item.audioUrl}
// 🎥 *videoUrl:* ${item.videoUrl}
// ⬇️ *downloadUrl:* ${item.downloadUrl}
// `
//                 }).filter(v => v).join("\n\n________________________\n\n")

//                 let ytthumb = await (await conn.getFile(res[0].detailThumb)).data
//                 let msg = await generateWAMessageFromContent(m.chat, {
//                     extendedTextMessage: {
//                         text: teks,
//                         jpegThumbnail: ytthumb,
//                         contextInfo: {
//                             mentionedJid: [m.sender],
//                             externalAdReply: {
//                                 body: "L I R I K",
//                                 containsAutoReply: true,
//                                 mediaType: 1,
//                                 mediaUrl: res[0].downloadLink,
//                                 renderLargerThumbnail: true,
//                                 showAdAttribution: true,
//                                 sourceId: "Ordiston",
//                                 sourceType: "PDF",
//                                 previewType: "PDF",
//                                 sourceUrl: res[0].downloadLink,
//                                 thumbnail: ytthumb,
//                                 thumbnailUrl: res[0].detailThumb,
//                                 title: htki + " C A F E L A G U " + htka
//                             }
//                         }
//                     }
//                 }, {
//                     quoted: m,
//                     ephemeralExpiration: ephemeral
//                 })
//                 await conn.relayMessage(m.chat, msg.message, {})
//             } catch (e) {
//                 await m.reply(eror)
//             }
//         }

//         if (feature == "play") {
//             if (!inputs.match(/youtu/gi)) return m.reply("Input query link\nExample: .lagu123 play|link")
//             await m.reply(wait)
//             try {
//                 const yt = await youtubedlv2(inputs).catch(async _ => await youtubedl(inputs))
//         const link = await yt.audio["128kbps"].download()
//         let ytl = "https://youtube.com/watch?v="
//         let dls = "Downloading audio succes"
//         let ytthumb = await (await conn.getFile(yt.thumbnail)).data
//     let doc = {
//         audio: {
//             url: link
//         },
//         mimetype: "audio/mp4",
//         fileName: yt.title,
//         contextInfo: {
//             externalAdReply: {
//                 showAdAttribution: true,
//                 mediaType: 2,
//                 mediaUrl: ytl + yt.id,
//                 title: yt.title,
//                 body: dls,
//                 sourceUrl: ytl + yt.id,
//                 thumbnail: ytthumb
//             }
//         }
//     }

//     await conn.sendMessage(m.chat, doc, {
//         quoted: m,
//         ephemeralExpiration: ephemeral
//     })
//             } catch (e) {
//                 await m.reply(eror)
//             }
//         }
//     }
// }
// handler.help = ["lagu123"]
// handler.tags = ["internet"]
// handler.command = /^(lagu123)$/i
// export default handler

// /* New Line */
// function replaceSymbolsAndSpaces(text) {
//   const replacedText = text.replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
//   return replacedText;
// }

// async function searchLagu123(query) {
// 	let proxyurl = "https://files.xianqiao.wang/"
//   const url = `https://${replaceSymbolsAndSpaces(query)}.downloadlagu123.biz/`;
//   const response = await fetch(proxyurl + url);
//   const html = await response.text();

//   const $ = cheerio.load(html);
//   const resultList = [];

//   $('.clearfix.search-content').each((index, element) => {
//     const item = {
//       position: $(element).find('[itemprop="position"]').attr('content'),
//       imageSrc: $(element).find('[itemprop="image"]').attr('src'),
//       title: $(element).find('[itemprop="name"]').text(),
//       url: $(element).find('[itemprop="url"]').attr('href'),
//       playUrl: "https://youtube.com/watch?v=" + $(element).find('[onclick^="playAudio"]').attr('onclick').match(/'([^']+)'/)[1],
//       audioUrl: "https://ytmp3.mobi/button-api/#" + $(element).find('[onclick^="playAudio"]').attr('onclick').match(/'([^']+)'/)[1] + "|mp3",
//       videoUrl: "https://ytmp3.mobi/button-api/#" + $(element).find('[onclick^="playAudio"]').attr('onclick').match(/'([^']+)'/)[1] + "|mp4|e74c3c|ffffff",
//       downloadUrl: $(element).find('a[title^="Download Lagu"]').attr('href'),
//     };

//     resultList.push(item);
//   });

//   return resultList;
// }
