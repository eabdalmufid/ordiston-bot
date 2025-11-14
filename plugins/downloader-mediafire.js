/*import * as cheerio from 'cheerio';
import { mediafiredl } from "@bochilteam/scraper"
import fetch from "node-fetch"
import { generateWAMessageFromContent } from "@adiwajshing/baileys"

let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    let spas = "                "

    let lister = [
        "v1",
        "v2",
        "v3",
        "v4"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.mediafire v2 link\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join('\n'))

    if (lister.includes(feature)) {
    	
        if (feature == "v1") {
            if (!inputs) return m.reply("Input mediafire link")
                let lol = await fetch(`https://api.lolhuman.xyz/api/mediafire?apikey=${global.lolkey}&url=${inputs}`)
    let human = await lol.json()
    if (!human.result.filename) throw "Error Gan"
    let caplol = `
*💌 Name:* ${human.result.filename}
*🗂️ Extension:* ${human.result.filetype}
*📊 Size:* ${human.result.filesize}
*📨 Uploaded:* ${human.result.uploaded}

${wait}
`
    let thumbnail = 'https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg'
let thumed = await (await conn.getFile(thumbnail)).data
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: caplol,
                jpegThumbnail: thumed,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        body: 'D O W N L O A D E R',
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: inputs,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceId: "Ordiston",
                        sourceType: "PDF",
                        previewType: "PDF",
                        sourceUrl: inputs,
                        thumbnail: thumed,
                        thumbnailUrl: thumbnail,
                        title: 'M E D I A F I R E'
                    }
                }
            }
        }, {
            quoted: m
        })
        await conn.relayMessage(m.chat, msg.message, {})
    if (human.result.link) {
    await conn.sendFile(m.chat, human.result.link, human.result.filename, "", m, null, { mimetype: human.result.filetype, asDocument: true })
    } else throw eror
        }
        if (feature == "v2") {
        	if (!inputs) return m.reply("Input mediafire link")
                let bocil = await mediafiredl(inputs)
    let capboc = `
*💌 Name:* ${bocil.filename}
*📊 Size:* ${bocil.filesizeH}
*🗂️ Extension:* ${bocil.ext}
*📨 Uploaded:* ${bocil.aploud}

${wait}
`
    let thumbnail = 'https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg'
let thumed = await (await conn.getFile(thumbnail)).data
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: capboc,
                jpegThumbnail: thumed,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        body: 'D O W N L O A D E R',
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: inputs,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceId: "Ordiston",
                        sourceType: "PDF",
                        previewType: "PDF",
                        sourceUrl: inputs,
                        thumbnail: thumed,
                        thumbnailUrl: thumbnail,
                        title: 'M E D I A F I R E'
                    }
                }
            }
        }, {
            quoted: m
        })
        await conn.relayMessage(m.chat, msg.message, {})
    if (bocil.url) {
    await conn.sendFile(m.chat, bocil.url, bocil.filename, "", m, null, { mimetype: bocil.ext, asDocument: true })
    } else throw eror
        	}
        if (feature == "v3") {
        	if (!inputs) return m.reply("Input mediafire link")
                let scrap = await mediafireDl(inputs)
    let capscrap = `
*💌 Name:* ${scrap[0].nama}
*📊 Size:* ${scrap[0].size}
*🗂️ Extension:* ${scrap[0].mime}

${wait}
`
let thumbnail = 'https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg'
let thumed = await (await conn.getFile(thumbnail)).data
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: capscrap,
                jpegThumbnail: thumed,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        body: 'D O W N L O A D E R',
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: inputs,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceId: "Ordiston",
                        sourceType: "PDF",
                        previewType: "PDF",
                        sourceUrl: inputs,
                        thumbnail: thumed,
                        thumbnailUrl: thumbnail,
                        title: 'M E D I A F I R E'
                    }
                }
            }
        }, {
            quoted: m
        })
        await conn.relayMessage(m.chat, msg.message, {})
    
if (scrap[0].link) {
    await conn.sendFile(m.chat, scrap[0].link, scrap[0].nama, "", m, null, { mimetype: scrap[0].mime, asDocument: true })
    } else throw eror
        }
        if (feature == "v4") {
        	if (!inputs) return m.reply("Input mediafire link")
                let scrap = await mediafireDl2(inputs)
    let capscrap = `
*💌 Name:* ${scrap.nama}
*📊 Size:* ${scrap.size}
*🗂️ Extension:* ${scrap.mime}

${wait}
`
let thumbnail = 'https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg'
let thumed = await (await conn.getFile(thumbnail)).data
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: capscrap,
                jpegThumbnail: thumed,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        body: 'D O W N L O A D E R',
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: inputs,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceId: "Ordiston",
                        sourceType: "PDF",
                        previewType: "PDF",
                        sourceUrl: inputs,
                        thumbnail: thumed,
                        thumbnailUrl: thumbnail,
                        title: 'M E D I A F I R E'
                    }
                }
            }
        }, {
            quoted: m
        })
        await conn.relayMessage(m.chat, msg.message, {})
    
if (scrap.link) {
    await conn.sendFile(m.chat, scrap.link, scrap.nama, "", m, null, { mimetype: scrap.mime, asDocument: true })
    } else throw eror
        }

    }
}
handler.help = ["mediafire"]
handler.tags = ["downloader"]
handler.command = /^m(ediafire(d(own(load(er)?)?|l))?|f(d(own(load(er)?)?|l))?)$/i
handler.limit = true
export default handler

async function mediafireDl(url) {
  const res = await fetch(url);
  const $ = cheerio.load(await res.text());
  const link = $('a#downloadButton').attr('href');
  const [nama, mime, size] = [
    link.split('/').pop().trim(),
    link.split('.').pop().trim(),
    $('a#downloadButton').text().replace(/Download|\(|\)|\n|\s+/g, '').trim()
  ];
  return [{ nama, mime, size, link }];
}

async function mediafireDl2(url) {
    var _a, _b;
    if (!/https?:\/\/(www\.)?mediafire\.com/.test(url))
        throw new Error('Invalid URL: ' + url);
    const data = await (await fetch(url)).text();
    const $ = cheerio.load(data);
    const Url = ($('#downloadButton').attr('href') || '').trim();
    const url2 = ($('#download_link > a.retry').attr('href') || '').trim();
    const $intro = $('div.dl-info > div.intro');
    const filename = $intro.find('div.filename').text().trim();
    const filetype = $intro.find('div.filetype > span').eq(0).text().trim();
    const ext = ((_b = (_a = /\(\.(.*?)\)/.exec($intro.find('div.filetype > span').eq(1).text())) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.trim()) || 'bin';
    const $li = $('div.dl-info > ul.details > li');
    const aploud = $li.eq(1).find('span').text().trim();
    const filesizeH = $li.eq(0).find('span').text().trim();
    const filesize = parseFloat(filesizeH) * (/GB/i.test(filesizeH)
        ? 1000000
        : /MB/i.test(filesizeH)
            ? 1000
            : /KB/i.test(filesizeH)
                ? 1
                : /B/i.test(filesizeH)
                    ? 0.1
                    : 0);
    return {
        link: Url,
        url2,
        nama: filename,
        filetype,
        mime: ext,
        aploud,
        size: filesizeH,
        filesize
    };
}*/

// import { mediafiredl } from '@bochilteam/scraper'
// let handler = async (m, { conn, args, usedPrefix, command }) => {
//     if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk/file`
//     let res = await mediafiredl(args[0])
//     let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
//     let caption = `
// *💌 Name:* ${filename}
// *📊 Size:* ${filesizeH}
// *🗂️ Extension:* ${ext}
// *📨 Uploaded:* ${aploud}
// `.trim()
//     m.reply(caption)
//     await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
// }
// handler.help = ['mediafire'].map(v => v + ' <url>')
// handler.tags = ['downloader']
// handler.command = /^(mediafire|mf)$/i

// export default handler