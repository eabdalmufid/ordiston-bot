import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"

let handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    command
}) => {
    await conn.sendReact(m.chat, "⏳", m.key)
    var soun = ["aku-ngakak",
        "anjay",
        "ara-ara2",
        "ara-ara-cowok",
        "ara-ara",
        "arigatou",
        "assalamualaikum",
        "asu",
        "ayank",
        "bacot",
        "bahagia-aku",
        "baka",
        "bansos",
        "beat-box2",
        "beat-box",
        "biasalah",
        "bidadari",
        "bot",
        "buka-pintu",
        "canda-anjing",
        "cepetan",
        "china",
        "cuekin-terus",
        "daisuki-dayo",
        "daisuki",
        "dengan-mu",
        "Donasiku",
        "gaboleh-gitu",
        "gak-lucu",
        "gamau",
        "gay",
        "gelay",
        "gitar",
        "gomenasai",
        "hai-bot",
        "hampa",
        "hayo",
        "hp-iphone",
        "ih-wibu",
        "i-like-you",
        "india",
        "karna-lo-wibu",
        "kiss",
        "kontol",
        "ku-coba",
        "maju-wibu",
        "makasih",
        "mastah",
        "menuasli",
        "menuku",
        "menu",
        "MenuYuki",
        "nande-nande",
        "nani",
        "ngadi-ngadi",
        "nikah",
        "nuina",
        "onichan",
        "ownerku",
        "owner-sange",
        "pak-sapardi",
        "pale",
        "pantek",
        "pasi-pasi",
        "punten",
        "sayang",
        "siapa-sih",
        "sudah-biasa",
        "summertime",
        "tanya-bapak-lu",
        "to-the-bone",
        "wajib",
        "waku",
        "woi",
        "yamete",
        "yowaimo",
        "yoyowaimo"
    ].getRandom()
    var vn = "https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/" + soun + ".mp3"
    var gamb = [
        thumb,
        logo
    ].getRandom()

    var cap = "👋 *Selamat datang di dashboard bot kami!*\n\n- Kami berharap Anda akan menikmati pengalaman berinteraksi dengan bot kami yang ramah dan intuitif.\n" + readMore + "\n- Kami telah menyertakan berbagai fitur yang dapat membantu Anda mengelola dan meningkatkan kinerja Anda.\n\n- Kami berharap Anda akan menikmati menggunakan dashboard bot kami dan semoga Anda mendapatkan manfaat dari fitur-fitur yang kami tawarkan.\n\n*[ LIST MENU ]*\n" + usedPrefix + "menulist\n" + usedPrefix + "allmenu\n"
    /*
    await conn.sendButton(m.chat, cap, author, gamb, [
        [emojis + " All Menu", usedPrefix + "allmenu"],
        [emojis + " List Menu", usedPrefix + "menulist"]
    ], m)
    // Biasa
        let biasa = "_Ketik *.menubiasa* jika menu tidak muncul_"
        await conn.sendMessage(m.chat, { text: biasa }, { quoted: m })
    */
        let img = "https://telegra.ph/file/a7b928015c0f0c936deb3.jpg"
        let mthumb = await (await conn.getFile(img)).data
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: cap,
                jpegThumbnail: mthumb,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 256,
                    isForwarded: true,
                    externalAdReply: {
                        body: author,
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: sgc,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceId: "Ordiston",
                        sourceType: "PDF",
                        previewType: "PDF",
                        sourceUrl: sgc,
                        thumbnail: mthumb,
                        thumbnailUrl: img,
                        title: "M E N U - B O T "
                    }
                }
            }
        }, {
            quoted: m,
            ephemeralExpiration: ephemeral
        })
        await conn.relayMessage(m.chat, msg.message, {})
        await conn.sendPresenceUpdate('recording', m.chat)
        await conn.sendFile(m.chat, vn, '', null, { key: msg.key, message: msg.message }, true, { ptt: true })
        await conn.sendReact(m.chat, "✅", m.key)
    
}
handler.help = ["menu", "help", "?"]
handler.tags = ["main"]
handler.command = /^(menu|help|\?)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
