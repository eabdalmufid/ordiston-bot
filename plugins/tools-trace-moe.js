import fetch from 'node-fetch';
import {
    webp2mp4
} from '../lib/webp2mp4.js'
import uploadImage from '../lib/uploadImage.js';

let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {

    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    let url
    if (/image\/(jpe?g|png)/.test(mime)) {
        const img = await q.download?.();
        url = await uploadImage(img);
    } else if (args[0] && isImageURL(args[0])) {
        url = args[0]
    } else return m.reply(`❌ Reply an image with command ${usedPrefix + command}`)
    await m.reply(wait)

    try {
        const result = await fetchAnimeData(url);
        if (!result || result.length === 0) {
            return m.reply('❌ Error: Tidak dapat melacak anime.');
        }

        const {
            anilist: {
                id = 'Tidak diketahui',
                idMal = 'Tidak diketahui',
                title = {},
                synonyms,
                isAdult
            },
            filename,
            episode = 'Tidak diketahui',
            from,
            to,
            similarity,
            video,
            image
        } = result[0];

        const nativeTitle = title.native || 'Tidak diketahui';
        const romajiTitle = title.romaji || 'Tidak diketahui';
        const englishTitle = title.english || 'Tidak diketahui';

        let message = `📺 *Anime ID:* ${id}\n🔗 *MyAnimeList ID:* ${idMal}\n📜 *Native Title:* ${nativeTitle}\n🎭 *Romaji:* ${romajiTitle}\n🇺🇸 *English:* ${englishTitle}\n`;

        if (synonyms && synonyms.length > 0) {
            message += `📚 *Synonyms:* ${synonyms.join(', ')}\n`;
        }

        message += `🔞 *Adult:* ${isAdult ? 'Yes' : 'No'}\n`;
        message += `🔍 *Similarity:* ${similarity ? similarity.toFixed(2) : 'Tidak diketahui'}%\n`;
        message += `⏰ *Time:* ${from ? formatDuration(from * 1000) : 'Tidak diketahui'} - ${to ? formatDuration(to * 1000) : 'Tidak diketahui'}\n`;

        if (episode !== 'Tidak diketahui') {
            message += `🎬 *Episode:* ${episode}\n`;
        }

        let webpbuffer = await mp4ToWebp(await (await conn.getFile(video)).data, {
            pack: packname,
            author: m.name
        });
        let outbuffer = await webp2mp4(webpbuffer);
        await conn.sendFile(m.chat, outbuffer, '', message, m);
    } catch (error) {
        console.error(error);
        return m.reply('❌ Terjadi kesalahan saat mencari anime.');
    }

}
handler.help = ["trace *Reply image*"]
handler.tags = ["tools"]
handler.command = /^(trace)$/i
export default handler

// Fungsi untuk memeriksa apakah URL adalah link gambar
function isImageURL(url) {
    const imageRegex = /\.(jpeg|jpg|png|webp)$/i;
    return imageRegex.test(url);
}

async function fetchAnimeData(url) {
    const apiUrl = `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const {
        result
    } = await response.json();
    return result;
}

async function mp4ToWebp(file, stickerMetadata) {
    if (stickerMetadata) {
        if (!stickerMetadata.pack) stickerMetadata.pack = '‎'
        if (!stickerMetadata.author) stickerMetadata.author = '‎'
        if (!stickerMetadata.crop) stickerMetadata.crop = false
    } else if (!stickerMetadata) {
        stickerMetadata = {
            pack: '‎',
            author: '‎',
            crop: false
        }
    }
    let getBase64 = file.toString('base64')
    const Format = {
        file: `data:video/mp4;base64,${getBase64}`,
        processOptions: {
            crop: stickerMetadata?.crop,
            startTime: '00:00:00.0',
            endTime: '00:00:7.0',
            loop: 0
        },
        stickerMetadata: {
            ...stickerMetadata
        },
        sessionInfo: {
            WA_VERSION: '2.2106.5',
            PAGE_UA: 'WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
            WA_AUTOMATE_VERSION: '3.6.10 UPDATE AVAILABLE: 3.6.11',
            BROWSER_VERSION: 'HeadlessChrome/88.0.4324.190',
            OS: 'Windows Server 2016',
            START_TS: 1614310326309,
            NUM: '6247',
            LAUNCH_TIME_MS: 7934,
            PHONE_VERSION: '2.20.205.16'
        },
        config: {
            sessionId: 'session',
            headless: true,
            qrTimeout: 20,
            authTimeout: 0,
            cacheEnabled: false,
            useChrome: true,
            killProcessOnBrowserClose: true,
            throwErrorOnTosBlock: false,
            chromiumArgs: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--aggressive-cache-discard',
                '--disable-cache',
                '--disable-application-cache',
                '--disable-offline-load-stale-cache',
                '--disk-cache-size=0'
            ],
            executablePath: 'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
            skipBrokenMethodsCheck: true,
            stickerServerEndpoint: true
        }
    }
    let res = await fetch('https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl', {
        method: 'post',
        headers: {
            Accept: 'application/json, text/plain, /',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(Format)
    })
    return Buffer.from((await res.text()).split(';base64,')[1], 'base64')
}

function formatDuration(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}