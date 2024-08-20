import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, text, args, command }) => {

    if (command == "sfx") {
        if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} 2`
        try {
            let gas = await fetch(`http://www.myinstants.com/api/v1/instants/?format=json&page=${args[0]}`)
            let json = await gas.json()
            let dapet = json.results
            let list = dapet.map((v, index) => {
                return `(${index + 1}) ${v.name}\n${usedPrefix}get ${v.sound}\n✨ *Color:* ${v.color}\n🔗 *Slug:* ${v.slug}\n📜 *Description:* ${v.description}\n🖼️ *Image:* ${v.image}\n`
            }).join('\n')
            
            let choice = args[1] ? parseInt(args[1]) - 1 : -1
            if (choice >= 0 && choice < dapet.length) {
                let v = dapet[choice]
                let teks = `✨ *Name :* ${v.name}\n🌈 *Color :* ${v.color}\n🔗 *Slug :* ${v.slug}\n📜 *Description :* ${v.description}`
                await m.reply(teks)
                await conn.sendFile(m.chat, v.sound, '', '', m)
            } else {
                return m.reply(`⚠️ Pilihan tidak valid. Silakan pilih nomor urutan yang benar dari daftar berikut:\n\n${list}\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`)
            }
        } catch (e) {
            return m.reply("❌ Error kan")
        }
    }

    if (command == "sfx2") {
        if (!text) throw `Contoh penggunaan ${usedPrefix}${command} drum\n*ket:*\ndrum : nama sound\n`
        let url = `http://freesound.org/apiv2/search/text/?token=I4LLx1YDPjNbkBCuK0zYbQAV9njbRLJ9ZhctDhGP&query=${encodeURIComponent(text)}`;
        let response = await fetch(url);
        let results = await response.json();

        let dapet = results.results
        let list = Object.values(dapet).map((v, index) => {
            return `(${index + 1}) ${v.name}\n🆔 *ID:* ${v.id}\n📜 *LICENSE:* ${v.license}\n👤 *USERNAME:* ${v.username}\n🏷️ *TAGS:* ${Array.from(v.tags)}\n`
        }).join('\n')
        
        let choice = args[1] ? parseInt(args[1]) - 1 : -1
        if (choice >= 0 && choice < dapet.length) {
            let v = dapet[choice]
            let teks = `${v.name}\n🆔 *ID:* ${v.id}\n📜 *LICENSE:* ${v.license}\n👤 *USERNAME:* ${v.username}\n🏷️ *TAGS:* ${Array.from(v.tags)}\n`
            await m.reply(teks)
            await conn.sendFile(m.chat, `http://freesound.org/apiv2/sounds/${v.id}/?token=I4LLx1YDPjNbkBCuK0zYbQAV9njbRLJ9ZhctDhGP`, '', '', m)
        } else {
            return m.reply(`⚠️ Pilihan tidak valid. Silakan pilih nomor urutan yang benar dari daftar berikut:\n\n${list}\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`)
        }
    }

    if (command == "sfx3") {
        let hasil = ["Donasiku",
"MenuYuki",
"aku-ngakak",
"anjay",
"ara-ara-cowok",
"ara-ara",
"ara-ara2",
"arigatou",
"assalamualaikum",
"asu",
"ayank",
"bacot",
"bahagia-aku",
"baka",
"bansos",
"beat-box",
"beat-box2",
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
"i-like-you",
"ih-wibu",
"india",
"karna-lo-wibu",
"kiss",
"kontol",
"ku-coba",
"maju-wibu",
"makasih",
"mastah",
"menu",
"menuasli",
"menuku",
"nande-nande",
"nani",
"ngadi-ngadi",
"nikah",
"nuina",
"onichan",
"owner-sange",
"ownerku",
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
"yoyowaimo"]

        let list = hasil.map((sound, index) => {
            return `(${index + 1}) ${sound}\n${usedPrefix}get https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/${sound}.mp3\n✍️ *By:* ${author}\n`
        }).join('\n')
        
        let choice = args[0] ? parseInt(args[0]) - 1 : -1
        if (choice >= 0 && choice < hasil.length) {
            let sound = hasil[choice]
            let teks = `✨ *Sound :* ${sound}\n✍️ *By :* ${author}`
            await conn.sendFile(m.chat, `https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/${sound}.mp3`, sound + '.mp3', teks, m)
        } else {
            return m.reply(`⚠️ Pilihan tidak valid. Silakan pilih nomor urutan yang benar dari daftar berikut:\n\n${list}\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`)
        }
    }

    if (command == "sfx4") {
        let hasil = Array(74).fill(1).map((n, i) => n + i)

        let list = hasil.map((sound, index) => {
            return `(${index + 1}) Sound ke- ${sound}\n${usedPrefix}get https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/sound/sound${sound}.mp3\n✍️ *By:* ${author}\n`
        }).join('\n')
        
        let choice = args[0] ? parseInt(args[0]) - 1 : -1
        if (choice >= 0 && choice < hasil.length) {
            let sound = hasil[choice]
            let teks = `✨ *Sound :* Sound ke- ${sound}\n✍️ *By :* ${author}`
            await conn.sendFile(m.chat, `https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/sound/sound${sound}.mp3`, 'sound' + sound + '.mp3', teks, m)
        } else {
            return m.reply(`⚠️ Pilihan tidak valid. Silakan pilih nomor urutan yang benar dari daftar berikut:\n\n${list}\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`)
        }
    }

    if (command == "sfx5") {
        let hasil = Array(119).fill(1).map((n, i) => n + i)

        let list = hasil.map((sound, index) => {
            return `(${index + 1}) Sound ke- ${sound}\n${usedPrefix}get https://raw.githubusercontent.com/WH-MODS-BOT/Sounds/main/sound${sound}.mp3\n✍️ *By:* ${author}\n`
        }).join('\n')
        
        let choice = args[0] ? parseInt(args[0]) - 1 : -1
        if (choice >= 0 && choice < hasil.length) {
            let sound = hasil[choice]
            let teks = `✨ *Sound :* Sound ke- ${sound}\n✍️ *By :* ${author}`
            await conn.sendFile(m.chat, `https://raw.githubusercontent.com/WH-MODS-BOT/Sounds/main/sound${sound}.mp3`, 'sound' + sound + '.mp3', teks, m)
        } else {
            return m.reply(`⚠️ Pilihan tidak valid. Silakan pilih nomor urutan yang benar dari daftar berikut:\n\n${list}\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`)
        }
    }

    if (command == "smap") {
        let rndm = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "XK", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RS", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "CS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "XT", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"]

        if (!text) throw `Contoh:\n${usedPrefix + command} ID`
        let f = await fetch(`https://api.worldbank.org/v2/country/${text}?format=json`)
        let xx = await f.json()
        let teks = `✨ *Name :* ${xx[1][0].name}\n🆔 *ID :* ${xx[1][0].id}\n🏙️ *City :* ${xx[1][0].capitalCity}\n🌐 *Longitude :* ${xx[1][0].longitude}\n🌐 *Latitude :* ${xx[1][0].latitude}`
        await conn.sendFile(m.chat, `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${xx[1][0].longitude},${xx[1][0].latitude}&z=12&l=map&size=600,300`, '', teks, m)
    }
}

handler.command = handler.help = ["sfx", "sfx2", "sfx3", "sfx4", "sfx5", "smap"]
handler.tags = ["audio"]

export default handler