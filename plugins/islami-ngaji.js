import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "ayat",
        "surah"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.ngaji ayat|edisi\n\n*Pilih type yg ada*\n\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "ayat") {
            if (!inputs) return m.reply("Input query link\nExample: .ngaji 1|3")
            await m.reply(wait)
            try {
                if (isNaN(inputs) || isNaN(inputs_)) return m.reply("Harus berupa angka")
                let data = await getEditionData()
                let edisi = data.data.map((item, index) => {
                    return `🔍 *[ EDISI ${index + 1} ]*

🌐 *English:* ${item.englishName}
📛 *Name:* ${item.name}
`
                }).filter(v => v).join("\n\n________________________\n\n")

                if (!inputs_) return m.reply("Pilih edisi yang anda mau\nExample: .ngaji ayat|edisi\n\n" + edisi)


                if (inputs_ >= 1 && inputs_ <= data.data.length) {
                    const index = inputs_ - 1;
                    let bagian = data.data[index];
                    let res = await getAyahData(inputs, bagian.identifier)
                    if (res.code !== 200) return m.reply(res.data)
                    let imagers = await getImageUrl(res.data.number, res.data.surah.number)
                    let cap = `🔍 *[ EDISI ${res.data.edition.englishName} ]*

🌐 *Name:* ${res.data.surah.name}
📢 *Surah Number:* ${res.data.surah.number}
📖 *English:* ${res.data.surah.englishName}
📝 *Text:* ${res.data.text}

${wait}
`
                    await conn.sendFile(m.chat, imagers || logo, "", cap, m)
                    await conn.sendMessage(m.chat, {
                        audio: {
                            url: res.data.audio
                        },
                        seconds: fsizedoc,
                        ptt: true,
                        mimetype: "audio/mpeg",
                        fileName: "vn.mp3",
                        waveform: [100, 0, 100, 0, 100, 0, 100]
                    }, {
                        quoted: m,
                        ephemeralExpiration: ephemeral
                    })
                } else {
                    return m.reply('Nomor yang diminta lebih besar dari jumlah objek yang ada.');
                }


            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "surah") {
            if (!inputs) return m.reply("Input query link\nExample: .ngaji 1|3")
            if (inputs > 114) return m.reply("Input lebih dari 114")
            await m.reply(wait)
            try {
                if (isNaN(inputs) || isNaN(inputs_)) return m.reply("Harus berupa angka")
                let data = await getEditionDataSurah()
                let edisi = data.map((item, index) => {
                    return `🔍 *[ EDISI ${index + 1} ]*

🌐 *English:* ${item.englishName}
📛 *Name:* ${item.name}
`
                }).filter(v => v).join("\n\n________________________\n\n")

                if (!inputs_) return m.reply("Pilih edisi yang anda mau\nExample: .ngaji ayat|edisi\n\n" + edisi)


                if (inputs_ >= 1 && inputs_ <= data.length) {
                    const index = inputs_ - 1;
                    let bagian = data[index];
                    let res = await getSurahData(inputs, bagian.identifier)
                    if (res.code !== 200) return m.reply(res.data)
                    let imagers = await getImageUrl(res.data.number, res.data.numberOfAyahs)
                    let audios = await getAudioUrl(bagian.identifier, res.data.number)
                    let cap = `🌐 *Name:* ${res.data.name}

📢 *Surah:* ${res.data.number}
📖 *English:* ${res.data.englishName}

${wait}
`
                    await conn.sendFile(m.chat, imagers || logo, "", cap, m)
                    await conn.sendMessage(m.chat, {
                        audio: {
                            url: audios
                        },
                        seconds: fsizedoc,
                        ptt: true,
                        mimetype: "audio/mpeg",
                        fileName: "vn.mp3",
                        waveform: [100, 0, 100, 0, 100, 0, 100]
                    }, {
                        quoted: m,
                        ephemeralExpiration: ephemeral
                    })
                } else {
                    return m.reply('Nomor yang diminta lebih besar dari jumlah objek yang ada.');
                }


            } catch (e) {
                await m.reply(eror)
            }
        }

    }
}
handler.help = ["ngaji"]
handler.tags = ["internet"]
handler.command = /^(ngaji)$/i
export default handler

/* New Line */
async function fetchJson(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getEditionData() {
    const editionUrl = 'https://api.alquran.cloud/v1/edition/format/audio';
    const editionData = await fetchJson(editionUrl);
    return editionData;
}

async function getEditionDataSurah() {
    const editionUrl = 'https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_audio.json';
    const editionData = await fetchJson(editionUrl);
    return editionData;
}

async function getAyahData(ayah, edition) {
    const ayahUrl = `https://api.alquran.cloud/v1/ayah/${ayah}/${edition}`;
    const ayahData = await fetchJson(ayahUrl);
    return ayahData;
}

async function getSurahData(surah, edition) {
    const surahUrl = `https://api.alquran.cloud/v1/surah/${surah}/${edition}`;
    const surahData = await fetchJson(surahUrl);
    return surahData;
}

function getImageUrl(surah, ayah) {
    return `https://cdn.islamic.network/quran/images/high-resolution/${surah}_${ayah}.png`;
}

function getAudioUrl(edition, number) {
    return `https://cdn.islamic.network/quran/audio-surah/128/${edition}/${number}.mp3`;
}