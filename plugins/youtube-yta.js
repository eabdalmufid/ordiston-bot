import {
    youtubedl,
    youtubedlv2
} from "@bochilteam/scraper"
import fetch from "node-fetch"
import ytdl from "ytdl-core"

let handler = async (m, {
    conn,
    args
}) => {
    if (!args[0]) throw "[ Masukkan Url Youtube! ]"
    await conn.reply(m.chat, wait, m)
    try {
        
        let Ytdl = await ytmp3(args[0])
        let dls = "Download audio succes ( V1 )"
        let ytthumb = await (await conn.getFile(Ytdl.meta.image)).data
        let doc = {
            audio: Ytdl.buffer,
            mimetype: "audio/mp4",
            fileName: Ytdl.meta.title,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: args[0],
                    title: Ytdl.meta.title,
                    body: dls,
                    sourceUrl: args[0],
                    thumbnail: ytthumb
                }
            }
        }

        await conn.sendMessage(m.chat, doc, {
            quoted: m,
            ephemeralExpiration: ephemeral
        })

    } catch {
        try {
            
            let yt = await youtubedl(args[0]).catch(async () => await youtubedlv2(args[0]))
            //let yt = await youtubedlv2(args[0]).catch(async _ => await youtubedl(args[0]))
            let link = await yt.audio["128kbps"].download()
            let ytl = "https://youtube.com/watch?v="
            let dls = "Download audio succes ( V2 )"
            let ytthumb = await (await conn.getFile(yt.thumbnail)).data
            let doc = {
                audio: {
                    url: link
                },
                mimetype: "audio/mp4",
                fileName: yt.title,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: ytl + yt.id,
                        title: yt.title,
                        body: dls,
                        sourceUrl: ytl + yt.id,
                        thumbnail: ytthumb
                    }
                }
            }

            await conn.sendMessage(m.chat, doc, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })

        } catch {
            try {
                
                let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkey}&url=${args[0]}`)
                let lolh = await lolhuman.json()
                let n = lolh.result.title || "error"
                await conn.sendMessage(m.chat, {
                    audio: {
                        url: lolh.result.link
                    },
                    fileName: `${n}.mp3`,
                    mimetype: "audio/mp4"
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                })
            } catch {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["mp3", "a"].map(v => "yt" + v + ` <url> <without message>`)
handler.tags = ["downloader"]
handler.command = /^y((outube|tb)audio|(outube|tb?)mp3|utubaudio|taudio|ta)$/i

handler.exp = 0
handler.register = false
handler.limit = true

export default handler

async function ytmp3(url) {
    try {
        const {
            videoDetails
        } = await ytdl.getInfo(url, {
            lang: "id"
        });

        const stream = ytdl(url, {
            filter: "audioonly",
            quality: 140
        });
        const chunks = [];

        stream.on("data", (chunk) => {
            chunks.push(chunk);
        });

        await new Promise((resolve, reject) => {
            stream.on("end", resolve);
            stream.on("error", reject);
        });

        const buffer = Buffer.concat(chunks);

        return {
            meta: {
                title: videoDetails.title,
                channel: videoDetails.author.name,
                seconds: videoDetails.lengthSeconds,
                description: videoDetails.description,
                image: videoDetails.thumbnails.slice(-1)[0].url,
            },
            buffer: buffer,
            size: buffer.length,
        };
    } catch (error) {
        throw error;
    }
};

/*let limit = 80
import fetch from 'node-fetch'
import {
    youtubedl,
    youtubedlv2,
    youtubedlv3
} from '@bochilteam/scraper';
import {
    youtube
} from "social_media_downloader"

let handler = async (m, {
    conn,
    args,
    isPrems,
    isOwner
}) => {
    await conn.sendMessage(m.chat, {
        react: {
            text: '⏳',
            key: m.key,
        }
    })
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
    let name = await conn.getName(who)

    if (!args || !args[0]) throw '[ Masukkan Url Youtube! ]'
    let chat = global.db.data.chats[m.chat]
    const isY = /y(es)/gi.test(args[1])
    const {
        thumbnail,
        audio: _audio,
        title
    } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
    const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
    let audio, source, res, link, lastError, isLimit
    for (let i in _audio) {
        try {
            audio = _audio[i]
            isLimit = limitedSize < audio.fileSize
            if (isLimit) continue
            link = await audio.download()
            if (link) res = await fetch(link)
            isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
            if (isLimit) continue
            if (res) source = await res.arrayBuffer()
            if (source instanceof ArrayBuffer) break
        } catch (e) {
            audio = link = source = null
            lastError = e
        }
    }
    if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || 'Can\'t download audio')
    if (!isY && !isLimit) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
*━━━━━━▢ YOUTUBE ▢━━━━━━*

*⭔ Title:* ${title}
*⭔ Type:* mp3
*⭔ Filesize:* ${audio.fileSizeH}

*L O A D I N G. . .*
`.trim(), m)

    try {
        if (!isLimit) await conn.sendFile(m.chat, source, title + '.mp3', '', m, null, {
            mimetype: 'audio/mp4',
            contextInfo: {
                externalAdReply: {
                    body: 'Audio Size: ' + audio.fileSizeH,
                    containsAutoReply: true,
                    mediaType: 2,
                    mediaUrl: args[0],
                    showAdAttribution: true,
                    sourceUrl: args[0],
                    thumbnailUrl: thumbnail,
                    renderLargerThumbnail: true,
                    title: 'Request by: ' + name,
                }
            }
        })
        if (args[1] == 'deno') {
            let p = await youtube(args[0])
            let dapet = p.result
            let listSections = []
            Object.values(dapet).map((v, index) => {
                listSections.push([index + ' ' + cmenub + ' ' + v.format, [
                    [v.ext, usedPrefix + 'get ' + v.url, '\n⏲️ *filesize:* ' + v.filesize]
                ]])
            })
            return conn.sendList(m.chat, htki + ' 📺 Youtube Search 🔎 ' + htka, `⚡ Silakan pilih YouTube Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `YouTube Search Disini`, listSections, m)
        }
    } catch (e) {
        throw eror
    }
}
handler.help = ['mp3', 'a'].map(v => 'yt' + v + ` <url> <without message>`)
handler.tags = ['downloader']
handler.command = /^y((outube|tb)audio|(outube|tb?)mp3|utubaudio|taudio|ta)$/i

handler.exp = 0
handler.register = false
handler.limit = true

export default handler*/