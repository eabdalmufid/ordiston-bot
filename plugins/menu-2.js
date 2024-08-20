import axios from 'axios'
import FormData from 'form-data'
import fetch from 'node-fetch'
import { readFileSync } from 'fs'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let imgr = flaaa

let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]
  
let template = (args[0] || '').toLowerCase()
if (!args[0]) {
let caption = `*Contoh Penggunaan*

${usedPrefix + command} advanceglow
${usedPrefix + command} ahegao
${usedPrefix + command} alquran
${usedPrefix + command} alquranaudio
${usedPrefix + command} anal
${usedPrefix + command} anime
${usedPrefix + command} animearmpits
${usedPrefix + command} animebellybutton
${usedPrefix + command} animebooty
${usedPrefix + command} animefeets
${usedPrefix + command} animethighss
${usedPrefix + command} arcade8bit
${usedPrefix + command} art
${usedPrefix + command} artinama
${usedPrefix + command} asmaulhusna
${usedPrefix + command} asupan
${usedPrefix + command} avenger
${usedPrefix + command} baka
${usedPrefix + command} battlefield4
${usedPrefix + command} beautifulflower
${usedPrefix + command} biganimetiddies
${usedPrefix + command} birthdaycake
${usedPrefix + command} birthdayday
${usedPrefix + command} bj
${usedPrefix + command} blackpink
${usedPrefix + command} bloodfrosted
${usedPrefix + command} blowjob
${usedPrefix + command} bokeh
${usedPrefix + command} box3d
${usedPrefix + command} brainly
${usedPrefix + command} breakwall
${usedPrefix + command} bts
${usedPrefix + command} bucin
${usedPrefix + command} burnpaper
${usedPrefix + command} carvedwood
${usedPrefix + command} ceritahoror
${usedPrefix + command} cerpen
${usedPrefix + command} character
${usedPrefix + command} chiisaihentai
${usedPrefix + command} chord
${usedPrefix + command} classic
${usedPrefix + command} cloud
${usedPrefix + command} cnnindonesia
${usedPrefix + command} cnninternasional
${usedPrefix + command} cnnnasional
${usedPrefix + command} coffe
${usedPrefix + command} covidglobal
${usedPrefix + command} covidindo
${usedPrefix + command} cuaca
${usedPrefix + command} cuddle
${usedPrefix + command} cum
${usedPrefix + command} cum_jpg
${usedPrefix + command} cup
${usedPrefix + command} cup1
${usedPrefix + command} deluxesilver
${usedPrefix + command} drakorongoing
${usedPrefix + command} ecchi
${usedPrefix + command} elf
${usedPrefix + command} ero
${usedPrefix + command} erofeet
${usedPrefix + command} erok
${usedPrefix + command} erokemo
${usedPrefix + command} eron
${usedPrefix + command} eroyuri
${usedPrefix + command} exo
${usedPrefix + command} faktaunik
${usedPrefix + command} fallleaves
${usedPrefix + command} fbdl
${usedPrefix + command} feed
${usedPrefix + command} feet
${usedPrefix + command} feetg
${usedPrefix + command} femdom
${usedPrefix + command} fireworksparkle
${usedPrefix + command} flamming
${usedPrefix + command} fox_girl
${usedPrefix + command} freefire
${usedPrefix + command} futanari
${usedPrefix + command} futureneon
${usedPrefix + command} galaxybat
${usedPrefix + command} galaxystyle
${usedPrefix + command} galaxywallpaper
${usedPrefix + command} gasm
${usedPrefix + command} genshin
${usedPrefix + command} gimage
${usedPrefix + command} gimage2
${usedPrefix + command} glitch
${usedPrefix + command} glittergold
${usedPrefix + command} glossychrome
${usedPrefix + command} glowingneon
${usedPrefix + command} golderrose
${usedPrefix + command} goldplaybutton
${usedPrefix + command} google
${usedPrefix + command} greenbush
${usedPrefix + command} greenneon
${usedPrefix + command} halloween
${usedPrefix + command} harrypotter
${usedPrefix + command} heartshaped
${usedPrefix + command} hentai
${usedPrefix + command} hentai4everyone
${usedPrefix + command} hentaifemdom
${usedPrefix + command} hentaiparadise
${usedPrefix + command} heroml
${usedPrefix + command} hoax
${usedPrefix + command} holo
${usedPrefix + command} holoero
${usedPrefix + command} hologram3d
${usedPrefix + command} holographic
${usedPrefix + command} hololewd
${usedPrefix + command} horrorblood
${usedPrefix + command} husbu
${usedPrefix + command} icecold
${usedPrefix + command} igdl
${usedPrefix + command} igdl2
${usedPrefix + command} indbeasiswa
${usedPrefix + command} infogempa
${usedPrefix + command} jadian
${usedPrefix + command} jadwalbola
${usedPrefix + command} jadwalsholat
${usedPrefix + command} jadwaltv
${usedPrefix + command} jadwaltvnow
${usedPrefix + command} jarak
${usedPrefix + command} jodoh
${usedPrefix + command} jokerlogo
${usedPrefix + command} jooxplay
${usedPrefix + command} katabijak
${usedPrefix + command} kbbi
${usedPrefix + command} kemonomimi
${usedPrefix + command} kisahnabi
${usedPrefix + command} kiss
${usedPrefix + command} kodepos
${usedPrefix + command} konachan
${usedPrefix + command} kuni
${usedPrefix + command} kusonime
${usedPrefix + command} kusonimesearch
${usedPrefix + command} letterleaves
${usedPrefix + command} lewd
${usedPrefix + command} lewdanimegirls
${usedPrefix + command} lewdk
${usedPrefix + command} lewdkemo
${usedPrefix + command} lighttext
${usedPrefix + command} lionlogo
${usedPrefix + command} lirik
${usedPrefix + command} listsurah
${usedPrefix + command} lk21
${usedPrefix + command} loli
${usedPrefix + command} love
${usedPrefix + command} lovemessage
${usedPrefix + command} luxury
${usedPrefix + command} luxurygold
${usedPrefix + command} manga
${usedPrefix + command} marvelstudio
${usedPrefix + command} megumin
${usedPrefix + command} metaldark
${usedPrefix + command} metallogo
${usedPrefix + command} minion
${usedPrefix + command} mlstalk
${usedPrefix + command} multicolor3d
${usedPrefix + command} nature3d
${usedPrefix + command} natureleaves
${usedPrefix + command} neko
${usedPrefix + command} neon
${usedPrefix + command} neonlight
${usedPrefix + command} newsinfo
${usedPrefix + command} newyearcard
${usedPrefix + command} ninjalogo
${usedPrefix + command} noeltext
${usedPrefix + command} nsfw_avatar
${usedPrefix + command} otakudesu
${usedPrefix + command} otakudesusearch
${usedPrefix + command} pantun
${usedPrefix + command} pinterest
${usedPrefix + command} pinterest2
${usedPrefix + command} pinterestdl
${usedPrefix + command} pixiv
${usedPrefix + command} pixivdl
${usedPrefix + command} playstore
${usedPrefix + command} poke
${usedPrefix + command} pornhub
${usedPrefix + command} pubg
${usedPrefix + command} puppycute
${usedPrefix + command} pussy
${usedPrefix + command} pussy_jpg
${usedPrefix + command} quotes
${usedPrefix + command} quotesanime
${usedPrefix + command} quotesdilan
${usedPrefix + command} quotesimage
${usedPrefix + command} randomnama
${usedPrefix + command} roadwarning
${usedPrefix + command} romance
${usedPrefix + command} royaltext
${usedPrefix + command} sagiri
${usedPrefix + command} sandengraved
${usedPrefix + command} sandsummer
${usedPrefix + command} sandwriting
${usedPrefix + command} shadow
${usedPrefix + command} shinobu
${usedPrefix + command} shopee
${usedPrefix + command} shortlink
${usedPrefix + command} shota
${usedPrefix + command} sideoppai
${usedPrefix + command} silverplaybutton
${usedPrefix + command} smoke
${usedPrefix + command} smug
${usedPrefix + command} snow3d
${usedPrefix + command} solo
${usedPrefix + command} solog
${usedPrefix + command} space
${usedPrefix + command} spotify
${usedPrefix + command} spotifysearch
${usedPrefix + command} ssweb
${usedPrefix + command} ssweb2
${usedPrefix + command} stalkgithub
${usedPrefix + command} stalkig
${usedPrefix + command} stalktiktok
${usedPrefix + command} stalktwitter
${usedPrefix + command} starsnight
${usedPrefix + command} steel3d
${usedPrefix + command} strawberry
${usedPrefix + command} summer3d
${usedPrefix + command} summernature
${usedPrefix + command} summersand
${usedPrefix + command} tebakumur
${usedPrefix + command} telesticker
${usedPrefix + command} text1917
${usedPrefix + command} textbyname
${usedPrefix + command} textcake
${usedPrefix + command} thunder
${usedPrefix + command} tiktok
${usedPrefix + command} tiktokmusic
${usedPrefix + command} tiktoknowm
${usedPrefix + command} tits
${usedPrefix + command} toxic
${usedPrefix + command} translate
${usedPrefix + command} trap
${usedPrefix + command} twtdl
${usedPrefix + command} undergrass
${usedPrefix + command} underwater
${usedPrefix + command} urbandictionary
${usedPrefix + command} waifu
${usedPrefix + command} wallgravity
${usedPrefix + command} wallnime
${usedPrefix + command} wallpaper
${usedPrefix + command} wallpapersearch
${usedPrefix + command} wallpapersearch2
${usedPrefix + command} wancak
${usedPrefix + command} watercolor
${usedPrefix + command} wattpad
${usedPrefix + command} wattpadsearch
${usedPrefix + command} wetglass
${usedPrefix + command} weton
${usedPrefix + command} wikipedia
${usedPrefix + command} wolflogo
${usedPrefix + command} wolfmetal
${usedPrefix + command} wooden3d
${usedPrefix + command} woodenboard
${usedPrefix + command} woodheart
${usedPrefix + command} writegalacy
${usedPrefix + command} yaoi
${usedPrefix + command} ytmp3
${usedPrefix + command} ytmp4
${usedPrefix + command} ytplay
${usedPrefix + command} ytsearch
${usedPrefix + command} yuri
${usedPrefix + command} zippyshare`
await conn.sendButton(m.chat, caption, wm, imgr + 'join', [
                ['Menu', `${usedPrefix}menu`]
            ], m, { quoted: fakes })
            }
            
            try {
if (command) {
switch (template) {

        // Islami //
        case 'listsurah':
            axios
                .get(`https://api.lolhuman.xyz/api/quran?apikey=${global.lolkey}`)
                .then(({ data }) => {
                    var teks = 'List Surah:\n'
                    for (var x in data.result) {
                        teks += `${x}. ${data.result[x]}\n`
                    }
                    conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
                })
                .catch(console.error)
            break
        case 'alquran':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |18 or ${usedPrefix + command} ${template} |18/10 or ${usedPrefix + command} ${template} |18/1-10`)
            axios
                .get(`https://api.lolhuman.xyz/api/quran/${one}?apikey=${global.lolkey}`)
                .then(({ data }) => {
                    var ayat = data.result.ayat
                    var teks = `QS. ${data.result.surah} : 1-${ayat.length}\n\n`
                    for (var x of ayat) {
                        teks += `${x.arab}\n${x.ayat}. ${x.latin}\n${x.indonesia}\n\n`
                    }
                    teks = teks.replace(/<u>/g, '_').replace(/<\/u>/g, '_')
                    teks = teks.replace(/<strong>/g, '*').replace(/<\/strong>/g, '*')
                    conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
                })
                .catch(console.error)
            break
        case 'alquranaudio':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |18 or ${usedPrefix + command} ${template} |18/10`)
            conn.sendMessage(m.chat, { audio: { url: `https://api.lolhuman.xyz/api/quran/audio/${one}?apikey=${global.lolkey}` }, mimetype: 'audio/mp4' })
            break
        case 'asmaulhusna':
            axios
                .get(`https://api.lolhuman.xyz/api/asmaulhusna?apikey=${global.lolkey}`)
                .then(({ data }) => {
                    var teks = `No : ${data.result.index}\n`
                    teks += `Latin: ${data.result.latin}\n`
                    teks += `Arab : ${data.result.ar}\n`
                    teks += `Indonesia : ${data.result.id}\n`
                    teks += `English : ${data.result.en}`
                    conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
                })
                .catch(console.error)
            break
        case 'kisahnabi':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Muhammad`)
            axios
                .get(`https://api.lolhuman.xyz/api/kisahnabi/${one}?apikey=${global.lolkey}`)
                .then(({ data }) => {
                    var teks = `Name : ${data.result.name}\n`
                    teks += `Lahir : ${data.result.thn_kelahiran}\n`
                    teks += `Umur : ${data.result.age}\n`
                    teks += `Tempat : ${data.result.place}\n`
                    teks += `Story : \n${data.result.story}`
                    conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
                })
                .catch(console.error)
            break
        case 'jadwalsholat':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Yogyakarta`)
            axios
                .get(`https://api.lolhuman.xyz/api/sholat/${one}?apikey=${global.lolkey}`)
                .then(({ data }) => {
                    var teks = `Wilayah : ${data.result.wilayah}\n`
                    teks += `Tanggal : ${data.result.tanggal}\n`
                    teks += `Sahur : ${data.result.sahur}\n`
                    teks += `Imsak : ${data.result.imsak}\n`
                    teks += `Subuh : ${data.result.subuh}\n`
                    teks += `Terbit : ${data.result.terbit}\n`
                    teks += `Dhuha : ${data.result.dhuha}\n`
                    teks += `Dzuhur : ${data.result.dzuhur}\n`
                    teks += `Ashar : ${data.result.ashar}\n`
                    teks += `Maghrib : ${data.result.imsak}\n`
                    teks += `Isya : ${data.result.isya}`
                    conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
                })
                .catch(console.error)
            break

        // Downloader //
        case 'ytplay':
            if (!one) return await m.reply(`Example: ${usedPrefix + command} ${template} |melukis senja`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytsearch?apikey=${global.lolkey}&query=${one}`)
                .then(({ data }) => {
                    axios.get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${global.lolkey}&url=https://www.youtube.com/watch?v=${data.result[0].videoId}`).then(({ data }) => {
                        var caption = `❖ Title    : *${data.result.title}*\n`
                        caption += `❖ Size     : *${data.result.size}*`
                        conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
                            conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                        })
                    })
                })
                .catch(console.error)
            break
        case 'ytsearch':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Melukis Senja`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytsearch?apikey=${global.lolkey}&query=${one}`)
                .then(({ data }) => {
                    var teks = ''
                    for (var x of data.result) {
                        teks += `Title : ${x.title}\n`
                        teks += `Views : ${x.views}\n`
                        teks += `Published : ${x.published}\n`
                        teks += `Thumbnail : ${x.thumbnail}\n`
                        teks += `Link : https://www.youtube.com/watch?v=${x.videoId}\n\n`
                    }
                    conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
                })
                .catch(console.error)
            break
        case 'ytmp3':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www.youtube.com/watch?v=qZIQAk-BUEc`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${global.lolkey}&url=${one}`)
                .then(({ data }) => {
                    var caption = `❖ Title    : *${data.result.title}*\n`
                    caption += `❖ Size     : *${data.result.size}*`
                    conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
                        conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                    })
                })
                .catch(console.error)
            break
        case 'ytmp4':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www.youtube.com/watch?v=qZIQAk-BUEc`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytmp4?apikey=${global.lolkey}&url=${one}`)
                .then(({ data }) => {
                    var caption = `❖ Title    : *${data.result.title}*\n`
                    caption += `❖ Size     : *${data.result.size}*`
                    conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
                        conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'video/mp4', fileName: `${data.result.title}.mp4` })
                    })
                })
                .catch(console.error)
            break
        case 'telesticker':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://t.me/addstickers/LINE_Menhera_chan_ENG`)
            axios.get(`https://api.lolhuman.xyz/api/telestick?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                conn.sendMessage(m.chat, { sticker: { url: data.result.sticker.getRandom() } })
            })
            break
        case 'tiktoknowm':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://vt.tiktok.com/ZSwWCk5o/`)
            axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result.link }, mimetype: 'video/mp4' })
            })
            break
        case 'tiktokmusic':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://vt.tiktok.com/ZSwWCk5o/`)
            conn.sendMessage(m.chat, { audio: { url: `https://api.lolhuman.xyz/api/tiktokmusic?apikey=${global.lolkey}&url=${one}` }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
            break
        case 'spotify':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA`)
            axios.get(`https://api.lolhuman.xyz/api/spotify?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                var caption = `Title : ${data.result.title}\n`
                caption += `Artists : ${data.result.artists}\n`
                caption += `Duration : ${data.result.duration}\n`
                caption += `Popularity : ${data.result.popularity}\n`
                caption += `Preview : ${data.result.preview_url}\n`
                conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
                    conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                })
            })
            break
        case 'spotifysearch':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Melukis Senja`)
            axios.get(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                var teks = ''
                for (var x of data.result) {
                    teks += `Title : ${x.title}\n`
                    teks += `Artists : ${x.artists}\n`
                    teks += `Duration : ${x.duration}\n`
                    teks += `Link : ${x.link}\n`
                    teks += `Preview : ${x.preview_url}\n\n\n`
                }
                conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            })
            break
        case 'jooxplay':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Melukis Senja`)
            axios.get(`https://api.lolhuman.xyz/api/jooxplay?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                var caption = `Title : ${data.result.info.song}\n`
                caption += `Artists : ${data.result.info.singer}\n`
                caption += `Duration : ${data.result.info.duration}\n`
                caption += `Album : ${data.result.info.album}\n`
                caption += `Uploaded : ${data.result.info.date}\n`
                caption += `Lirik :\n ${data.result.lirik}\n`
                conn.sendMessage(m.chat, { image: { url: data.result.image }, caption }).then(() => {
                    conn.sendMessage(m.chat, { audio: { url: data.result.audio[0].link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                })
            })
            break
        case 'igdl':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
            axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                var url = data.result
                if (url.includes('.mp4')) {
                    conn.sendMessage(m.chat, { video: { url }, mimetype: 'video/mp4' })
                } else {
                    conn.sendMessage(m.chat, { image: { url } })
                }
            })
            break
        case 'igdl2':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
            axios.get(`https://api.lolhuman.xyz/api/instagram2?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                for (var x of data.result) {
                    if (x.includes('.mp4')) {
                        conn.sendMessage(m.chat, { video: { url: x }, mimetype: 'video/mp4' })
                    } else {
                        conn.sendMessage(m.chat, { image: { url: x } })
                    }
                }
            })
            break
        case 'twtdl':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://twitter.com/gofoodindonesia/status/1229369819511709697`)
            axios.get(`https://api.lolhuman.xyz/api/twitter?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result.link[data.result.link.length - 1].link }, mimetype: 'video/mp4' })
            })
            break
        case 'fbdl':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
            axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result }, mimetype: 'video/mp4' })
            })
            break
        case 'zippyshare':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www51.zippyshare.com/v/5W0TOBz1/file.html`)
            axios.get(`https://api.lolhuman.xyz/api/zippyshare?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                var teks = `File Name : ${data.result.name_file}\n`
                teks += `Size : ${data.result.size}\n`
                teks += `Date Upload : ${data.result.date_upload}\n`
                teks += `Download Url : ${data.result.download_url}`
                conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            })
            break
        case 'pinterest':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/pinterest?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                conn.sendMessage(m.chat, { image: { url: data.result } })
            })
            break
        case 'pinterest2':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/pinterest2?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                for (var x of data.result.slice(0, 5)) {
                    conn.sendMessage(m.chat, { image: { url: x } })
                }
            })
            break
        case 'pinterestdl':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://id.pinterest.com/pin/696580267364426905/`)
            axios.get(`https://api.lolhuman.xyz/api/pinterestdl?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                conn.sendMessage(m.chat, { image: { url: data.result[0] } })
            })
            break
        case 'pixiv':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/pixiv?apikey=${global.lolkey}&query=${one}` } })
            break
        case 'pixivdl':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |63456028`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/pixivdl/${one}?apikey=${global.lolkey}` } })
            break

        // AniManga //
        case 'character':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Miku Nakano`)
            axios.get(`https://api.lolhuman.xyz/api/character?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                var caption = `Id : ${data.result.id}\n`
                caption += `Name : ${data.result.name.full}\n`
                caption += `Native : ${data.result.name.native}\n`
                caption += `Favorites : ${data.result.favourites}\n`
                caption += `Media : \n`
                for (var x of data.result.media.nodes) {
                    caption += `- ${x.title.romaji} (${x.title.native})\n`
                }
                caption += `\nDescription : \n${data.result.description.replace(/__/g, '_')}`
                conn.sendMessage(m.chat, { image: { url: data.result.image.large }, caption })
            })
            break
        case 'manga':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/manga?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                var caption = `Id : ${data.result.id}\n`
                caption += `Id MAL : ${data.result.idMal}\n`
                caption += `Title : ${data.result.title.romaji}\n`
                caption += `English : ${data.result.title.english}\n`
                caption += `Native : ${data.result.title.native}\n`
                caption += `Format : ${data.result.format}\n`
                caption += `Chapters : ${data.result.chapters}\n`
                caption += `Volume : ${data.result.volumes}\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Source : ${data.result.source}\n`
                caption += `Start Date : ${data.result.startDate.day} - ${data.result.startDate.month} - ${data.result.startDate.year}\n`
                caption += `End Date : ${data.result.endDate.day} - ${data.result.endDate.month} - ${data.result.endDate.year}\n`
                caption += `Genre : ${data.result.genres.join(', ')}\n`
                caption += `Synonyms : ${data.result.synonyms.join(', ')}\n`
                caption += `Score : ${data.result.averageScore}%\n`
                caption += `Characters : \n`
                for (var x of data.result.characters.nodes) {
                    caption += `- ${x.name.full} (${x.name.native})\n`
                }
                caption += `\nDescription : ${data.result.description}`
                conn.sendMessage(m.chat, { image: { url: data.result.coverImage.large }, caption })
            })
            break
        case 'anime':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/anime?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                var caption = `Id : ${data.result.id}\n`
                caption += `Id MAL : ${data.result.idMal}\n`
                caption += `Title : ${data.result.title.romaji}\n`
                caption += `English : ${data.result.title.english}\n`
                caption += `Native : ${data.result.title.native}\n`
                caption += `Format : ${data.result.format}\n`
                caption += `Episodes : ${data.result.episodes}\n`
                caption += `Duration : ${data.result.duration} mins.\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Season : ${data.result.season}\n`
                caption += `Season Year : ${data.result.seasonYear}\n`
                caption += `Source : ${data.result.source}\n`
                caption += `Start Date : ${data.result.startDate.day} - ${data.result.startDate.month} - ${data.result.startDate.year}\n`
                caption += `End Date : ${data.result.endDate.day} - ${data.result.endDate.month} - ${data.result.endDate.year}\n`
                caption += `Genre : ${data.result.genres.join(', ')}\n`
                caption += `Synonyms : ${data.result.synonyms.join(', ')}\n`
                caption += `Score : ${data.result.averageScore}%\n`
                caption += `Characters : \n`
                for (var x of data.result.characters.nodes) {
                    caption += `- ${x.name.full} (${x.name.native})\n`
                }
                caption += `\nDescription : ${data.result.description}`
                conn.sendMessage(m.chat, { image: { url: data.result.coverImage.large }, caption })
            })
            break
        
        case 'kusonime':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://kusonime.com/nanatsu-no-taizai-bd-batch-subtitle-indonesia/`)
            axios.get(`https://api.lolhuman.xyz/api/kusonime?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                var caption = `Title : ${data.result.title}\n`
                caption += `Japanese : ${data.result.japanese}\n`
                caption += `Genre : ${data.result.genre}\n`
                caption += `Seasons : ${data.result.seasons}\n`
                caption += `Producers : ${data.result.producers}\n`
                caption += `Type : ${data.result.type}\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Total Episode : ${data.result.total_episode}\n`
                caption += `Score : ${data.result.score}\n`
                caption += `Duration : ${data.result.duration}\n`
                caption += `Released On : ${data.result.released_on}\n`
                caption += `Desc : ${data.result.desc}\n`
                for (var x in data.result.link_dl) {
                    caption += `\n${x}\n`
                    for (var y in link_dl[x]) {
                        caption += `${y} - ${link_dl[x][y]}\n`
                    }
                }
                conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption })
            })
            break
        case 'kusonimesearch':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/kusonimesearch?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                var caption = `Title : ${data.result.title}\n`
                caption += `Japanese : ${data.result.japanese}\n`
                caption += `Genre : ${data.result.genre}\n`
                caption += `Seasons : ${data.result.seasons}\n`
                caption += `Producers : ${data.result.producers}\n`
                caption += `Type : ${data.result.type}\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Total Episode : ${data.result.total_episode}\n`
                caption += `Score : ${data.result.score}\n`
                caption += `Duration : ${data.result.duration}\n`
                caption += `Released On : ${data.result.released_on}\n`
                caption += `Desc : ${data.result.desc}\n`
                for (var x in data.result.link_dl) {
                    caption += `\n${x}\n`
                    for (var y in link_dl[x]) {
                        caption += `${y} - ${link_dl[x][y]}\n`
                    }
                }
                conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption })
            })
            break
        case 'otakudesu':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://otakudesu.tv/lengkap/pslcns-sub-indo/`)
            axios.get(`https://api.lolhuman.xyz/api/otakudesu?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                var teks = `Title : ${data.result.title}\n`
                teks += `Japanese : ${data.result.japanese}\n`
                teks += `Judul : ${data.result.judul}\n`
                teks += `Type : ${data.result.type}\n`
                teks += `Episode : ${data.result.episodes}\n`
                teks += `Aired : ${data.result.aired}\n`
                teks += `Producers : ${data.result.producers}\n`
                teks += `Genre : ${data.result.genres}\n`
                teks += `Duration : ${data.result.duration}\n`
                teks += `Studios : ${data.result.status}\n`
                teks += `Rating : ${data.result.rating}\n`
                teks += `Credit : ${data.result.credit}\n`
                for (var x in data.result.link_dl) {
                    teks += `\n\n*${data.result.link_dl[x].title}*\n`
                    for (var y in data.result.link_dl[x].link_dl) {
                        ini_info = data.result.link_dl[x].link_dl[y]
                        teks += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                        teks += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                        teks += `\`\`\`Link : \`\`\`\n`
                        down_link = ini_info.link_dl
                        for (var z in down_link) {
                            teks += `${z} - ${down_link[z]}\n`
                        }
                    }
                }
                conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            })
            break
        case 'otakudesusearch':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/otakudesusearch?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                var teks = `Title : ${data.result.title}\n`
                teks += `Japanese : ${data.result.japanese}\n`
                teks += `Judul : ${data.result.judul}\n`
                teks += `Type : ${data.result.type}\n`
                teks += `Episode : ${data.result.episodes}\n`
                teks += `Aired : ${data.result.aired}\n`
                teks += `Producers : ${data.result.producers}\n`
                teks += `Genre : ${data.result.genres}\n`
                teks += `Duration : ${data.result.duration}\n`
                teks += `Studios : ${data.result.status}\n`
                teks += `Rating : ${data.result.rating}\n`
                teks += `Credit : ${data.result.credit}\n`
                for (var x in data.result.link_dl) {
                    teks += `\n\n*${data.result.link_dl[x].title}*\n`
                    for (var y in data.result.link_dl[x].link_dl) {
                        var info = data.result.link_dl[x].link_dl[y]
                        teks += `\n\`\`\`Reso : \`\`\`${info.reso}\n`
                        teks += `\`\`\`Size : \`\`\`${info.size}\n`
                        teks += `\`\`\`Link : \`\`\`\n`
                        var link = info.link_dl
                        for (var z in link) {
                            teks += `${z} - ${link[z]}\n`
                        }
                    }
                }
                conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            })
            break

        // Information //
        case 'kbbi':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |kursi`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/kbbi?apikey=${global.lolkey}&query=${one}`)
            var teks = `\`\`\`Kata : ${data.result[0].nama}\`\`\`\n`
            teks += `\`\`\`Kata Dasar : ${data.result[0].kata_dasar}\`\`\`\n`
            teks += `\`\`\`Pelafalan : ${data.result[0].pelafalan}\`\`\`\n`
            teks += `\`\`\`Bentuk Tidak Baku : ${data.result[0].bentuk_tidak_baku}\`\`\`\n\n`
            for (var x of data.result) {
                teks += `\`\`\`Kode : ${x.makna[0].kelas[0].kode}\`\`\`\n`
                teks += `\`\`\`Kelas : ${x.makna[0].kelas[0].nama}\`\`\`\n`
                teks += `\`\`\`Artinya : \n${x.makna[0].kelas[0].deskripsi}\`\`\`\n\n`
                teks += `\`\`\`Makna Lain : \n${x.makna[0].submakna}\`\`\`\n `
                teks += `\`\`\`Contoh Kalimat : \n${x.makna[0].contoh}\`\`\`\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'brainly':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |siapakah sukarno`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/brainly?apikey=${global.lolkey}&query=${one}`)
            var teks = 'Beberapa Pembahasan Dari Brainly :\n\n'
            for (var x of data.result) {
                teks += `==============================\n`
                teks += `\`\`\`Pertanyaan :\`\`\`\n${x.question.content}\n\n`
                teks += `\`\`\`Jawaban :\`\`\`\n${x.answer[0].content}\n`
                teks += `==============================\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'jarak':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |jakarta|yogyakarta`)
            
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jaraktempuh?apikey=${global.lolkey}&kota1=${one}&kota2=${two}`)
            var teks = `Informasi Jarak dari ${one} ke ${two} :\n\n`
            teks += `\`\`\`◪ Asal :\`\`\` ${data.result.from.name}\n`
            teks += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.from.latitude}\n`
            teks += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.from.longitude}\n\n`
            teks += `\`\`\`◪ Tujuan :\`\`\` ${data.result.to.name}\n`
            teks += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.to.latitude}\n`
            teks += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.to.longitude}\n\n`
            teks += `\`\`\`◪ Jarak Tempuh :\`\`\` ${data.result.jarak}\n`
            teks += `\`\`\`◪ Waktu Tempuh :\`\`\`\n`
            teks += `   ╭───────────────❏\n`
            teks += `❍┤ Kereta Api : ${data.result.kereta_api}\n`
            teks += `❍┤ Pesawat : ${data.result.pesawat}\n`
            teks += `❍┤ Mobil : ${data.result.mobil}\n`
            teks += `❍┤ Motor : ${data.result.motor}\n`
            teks += `❍┤ Jalan Kaki : ${data.result.jalan_kaki}\n`
            teks += `   ╰───────────────❏\n`
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'urbandictionary':
            var { data } = await axios.get(`http://api.lolhuman.xyz/api/urdict?apikey=${global.lolkey}&query=${one}`)
            for (var x of data.result) {
                var teks = `\`\`\`Meaning :\n${x.definition}\`\`\`\n\n`
                teks += `\`\`\`Link : ${x.permalink}\`\`\`\n\n`
                teks += `\`\`\`Sounds Url : ${x.sound_urls[0]}\`\`\`\n\n`
                teks += `\`\`\`Like : ${x.thumbs_up}\`\`\`\n\n`
                teks += `\`\`\`Dislike : ${x.thumbs_down}\`\`\`\n\n`
                teks += `\`\`\`Created On : \n${x.written_on}\`\`\`\n\n`
                teks += `\`\`\`Author : ${x.author}\`\`\`\n\n`
                teks += `\`\`\`Word : ${x.word}\`\`\`\n\n`
                teks += `\`\`\`Defined Id : ${x.defid}\`\`\`\n\n`
                teks += `\`\`\`Example : ${x.example}\`\`\`\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'chord':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Melukis senja`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/chord?apikey=${global.lolkey}&query=${one}`)
            var teks = `Title : ${data.result.title}\n`
            teks += `Chord : \n${data.result.chord}`
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'heroml':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Fanny`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/heroml/${one}?apikey=${global.lolkey}`)
            var caption = `Name : ${data.result.hero_name}\n`
            caption += `Entrance Quotes : ${data.result.ent_quotes}\n`
            caption += `Role : ${data.result.detail.role}\n`
            caption += `Specialty : ${data.result.detail.specialty}\n`
            caption += `Laning : ${data.result.detail.laning_recommendation}\n`
            caption += `Release : ${data.result.detail.release_date}\n`
            caption += `Movement speed : ${data.result.attr.movement_speed}\n`
            caption += `Physical attack : ${data.result.attr.physical_attack}\n`
            caption += `Magic power : ${data.result.attr.magic_power}\n`
            caption += `Physical defense : ${data.result.attr.physical_defense}\n`
            caption += `Magic defense : ${data.result.attr.magic_defense}\n`
            caption += `Critical rate : ${data.result.attr.basic_atk_crit_rate}\n`
            caption += `Hp : ${data.result.attr.hp}\n`
            caption += `Mana : ${data.result.attr.mana}\n`
            caption += `Mana regen : ${data.result.attr.mana_regen}\n`
            conn.sendMessage(m.chat, { image: { url: data.result.icon }, caption })
            break
        case 'mlstalk':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |84830127/2169`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/mobilelegend/${one}?apikey=${global.lolkey}`)
            m.reply(data.result)
            break
        case 'genshin':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |jean`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/genshin/${one}?apikey=${global.lolkey}`)
            var caption = `Name : ${data.result.title}\n`
            caption += `Intro : ${data.result.intro}\n`
            caption += `Icon : ${data.result.icon}\n`
            await conn.sendMessage(m.chat, { image: { url: data.result.cover1 }, caption })
            await conn.sendMessage(m.chat, { audio: { url: data.result.cv[0].audio[0] }, mimetype: 'audio/mp4' })
            break
        case 'wikipedia':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Tahu`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wiki?apikey=${global.lolkey}&query=${one}`)
            m.reply(data.result)
            break
        case 'translate':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |en|Tahu Bacem`)
            
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/translate/auto/${one}?apikey=${global.lolkey}&text=${two}`)
            init_txt = `From : ${data.result.from}\n`
            init_txt += `To : ${data.result.to}\n`
            init_txt += `Original : ${data.result.original}\n`
            init_txt += `Translated : ${data.result.translated}\n`
            init_txt += `Pronunciation : ${data.result.pronunciation}\n`
            m.reply(init_txt)
            break
        case 'brainly':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Soekarno adalah`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/brainly?apikey=${global.lolkey}&query=${one}`)
            var teks = 'Result : \n'
            for (var x of data.result) {
                teks += `${x.title}\n`
                teks += `${x.url}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'jadwaltv':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |RCTI`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwaltv/${one}?apikey=${global.lolkey}`)
            var teks = `Jadwal TV ${args[0].toUpperCase()}\n`
            for (var x in data.result) {
                teks += `${x} - ${data.result[x]}\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'jadwaltvnow':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwaltv/now?apikey=${global.lolkey}`)
            var teks = `Jadwal TV Now :\n`
            for (var x in data.result) {
                teks += `${x.toUpperCase()}${data.result[x]}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'newsinfo':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/newsinfo?apikey=${global.lolkey}`)
            var teks = 'Result :\n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Author : ${x.author}\n`
                teks += `Source : ${x.source.name}\n`
                teks += `Url : ${x.url}\n`
                teks += `Published : ${x.publishedAt}\n`
                teks += `Description : ${x.description}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'cnnindonesia':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia?apikey=${global.lolkey}`)
            var teks = 'Result :\n'
            for (var x of data.result) {
                teks += `Judul : ${x.judul}\n`
                teks += `Link : ${x.link}\n`
                teks += `Tipe : ${x.tipe}\n`
                teks += `Published : ${x.waktu}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'cnnnasional':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia/nasional?apikey=${global.lolkey}`)
            var teks = 'Result :\n'
            for (var x of data.result) {
                teks += `Judul : ${x.judul}\n`
                teks += `Link : ${x.link}\n`
                teks += `Tipe : ${x.tipe}\n`
                teks += `Published : ${x.waktu}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'cnninternasional':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia/internasional?apikey=${global.lolkey}`)
            var teks = 'Result :\n'
            for (var x of data.result) {
                teks += `Judul : ${x.judul}\n`
                teks += `Link : ${x.link}\n`
                teks += `Tipe : ${x.tipe}\n`
                teks += `Published : ${x.waktu}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'infogempa':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/infogempa?apikey=${global.lolkey}`)
            var caption = `Lokasi : ${data.result.lokasi}\n`
            caption += `Waktu : ${data.result.waktu}\n`
            caption += `Potensi : ${data.result.potensi}\n`
            caption += `Magnitude : ${data.result.magnitude}\n`
            caption += `Kedalaman : ${data.result.kedalaman}\n`
            caption += `Koordinat : ${data.result.koordinat}`
            conn.sendMessage(m.chat, { image: { url: data.result.map }, caption })
            break
        case 'lirik':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Melukis Senja`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/lirik?apikey=${global.lolkey}&query=${one}`)
            m.reply(data.result)
            break
        case 'cuaca':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Yogyakarta`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cuaca/${one}?apikey=${global.lolkey}`)
            var teks = `Tempat : ${data.result.tempat}\n`
            teks += `Cuaca : ${data.result.cuaca}\n`
            teks += `Angin : ${data.result.angin}\n`
            teks += `Description : ${data.result.description}\n`
            teks += `Kelembapan : ${data.result.kelembapan}\n`
            teks += `Suhu : ${data.result.suhu}\n`
            teks += `Udara : ${data.result.udara}\n`
            teks += `Permukaan laut : ${data.result.permukaan_laut}\n`
            conn.sendMessage(m.chat, { location: { degreesLatitude: data.result.latitude, degreesLongitude: data.result.longitude } })
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'covidindo':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/corona/indonesia?apikey=${global.lolkey}`)
            var teks = `Positif : ${data.result.positif}\n`
            teks += `Sembuh : ${data.result.sembuh}\n`
            teks += `Dirawat : ${data.result.dirawat}\n`
            teks += `Meninggal : ${data.result.meninggal}`
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'covidglobal':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/corona/global?apikey=${global.lolkey}`)
            var teks = `Positif : ${data.result.positif}\n`
            teks += `Sembuh : ${data.result.sembuh}\n`
            teks += `Dirawat : ${data.result.dirawat}\n`
            teks += `Meninggal : ${data.result.meninggal}`
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'kodepos':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Slemanan or ${usedPrefix + command} ${template} |66154`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/kodepos?apikey=${global.lolkey}&query=${one}`)
            var teks = `Provinsi : ${data.result[0].province}\n`
            teks += `Kabupaten : ${data.result[0].city}\n`
            teks += `Kecamatan : ${data.result[0].subdistrict}\n`
            teks += `Kelurahan : ${data.result[0].urban}\n`
            teks += `Kode Pos : ${data.result[0].postalcode}`
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'jadwalbola':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwalbola?apikey=${global.lolkey}`)
            var teks = 'Jadwal Bola :\n'
            for (var x of data.result) {
                teks += `Hari : ${x.hari}\n`
                teks += `Jam : ${x.jam}\n`
                teks += `Event : ${x.event}\n`
                teks += `Match : ${x.match}\n`
                teks += `TV : ${x.tv}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'indbeasiswa':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/indbeasiswa?apikey=${global.lolkey}`)
            var teks = 'Info Beasiswa :\n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Link : ${x.link}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'hoax':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/turnbackhoax?apikey=${global.lolkey}`)
            var teks = 'Info Hoax :\n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Link : ${x.link}\n`
                teks += `Posted : ${x.posted}\n`
                teks += `Description : ${x.desc}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break

        // Movie & Story
        case 'lk21':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Transformer`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/lk21?apikey=${global.lolkey}&query=${one}`)
            var caption = `Title : ${data.result.title}\n`
            caption += `Link : ${data.result.link}\n`
            caption += `Genre : ${data.result.genre}\n`
            caption += `Views : ${data.result.views}\n`
            caption += `Duration : ${data.result.duration}\n`
            caption += `Tahun : ${data.result.tahun}\n`
            caption += `Rating : ${data.result.rating}\n`
            caption += `Desc : ${data.result.desc}\n`
            caption += `Actors : ${data.result.actors.join(', ')}\n`
            caption += `Location : ${data.result.location}\n`
            caption += `Date Release : ${data.result.date_release}\n`
            caption += `Language : ${data.result.language}\n`
            caption += `Link Download : ${data.result.link_dl}`
            conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption })
            break
        case 'drakorongoing':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/drakorongoing?apikey=${global.lolkey}`)
            var teks = 'Ongoing Drakor\n\n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Link : ${x.link}\n`
                teks += `Thumbnail : ${x.thumbnail}\n`
                teks += `Year : ${x.category}\n`
                teks += `Total Episode : ${x.total_episode}\n`
                teks += `Genre : ${x.genre.join(', ')}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'wattpad':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www.wattpad.com/707367860-kumpulan-quote-tere-liye-tere-liye-quote-quote`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wattpad?apikey=${global.lolkey}&url=${one}`)
            var caption = `Title : ${data.result.title}\n`
            caption += `Rating : ${data.result.rating}\n`
            caption += `Motify date : ${data.result.modifyDate}\n`
            caption += `Create date: ${data.result.createDate}\n`
            caption += `Word : ${data.result.word}\n`
            caption += `Comment : ${data.result.comment}\n`
            caption += `Vote : ${data.result.vote}\n`
            caption += `Reader : ${data.result.reader}\n`
            caption += `Pages : ${data.result.pages}\n`
            caption += `Description : ${data.result.desc}\n\n`
            caption += `Story : \n${data.result.story}`
            conn.sendMessage(m.chat, { image: { url: data.result.photo }, caption })
            break
        case 'wattpadsearch':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Tere Liye`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wattpadsearch?apikey=${global.lolkey}&query=${one}`)
            var teks = 'Wattpad Seach : \n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Url : ${x.url}\n`
                teks += `Part : ${x.parts}\n`
                teks += `Motify date : ${x.modifyDate}\n`
                teks += `Create date: ${x.createDate}\n`
                teks += `Coment count: ${x.commentCount}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'cerpen':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cerpen?apikey=${global.lolkey}`)
            var teks = `Title : ${data.result.title}\n`
            teks += `Creator : ${data.result.creator}\n`
            teks += `Story :\n${data.result.cerpen}`
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'ceritahoror':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/ceritahoror?apikey=${global.lolkey}`)
            var caption = `Title : ${data.result.title}\n`
            caption += `Desc : ${data.result.desc}\n`
            caption += `Story :\n${data.result.story}\n`
            conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption })
            break

        // Searching
        case 'gimage':
        case 'konachan':
        case 'wallpapersearch':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`)
            if (command === 'wallpapersearch') {
                command = 'wallpaper'
            }
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/${args[0]}?apikey=${global.lolkey}&query=${one}` } })
            break
        case 'gimage2':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/gimage2?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                for (var x of data.result.slice(0, 5)) {
                    conn.sendMessage(m.chat, { image: { url: x } })
                }
            })
            break
        case 'wallpapersearch2':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/wallpaper2?apikey=${global.lolkey}&query=${one}`).then(({ data }) => {
                conn.sendMessage(m.chat, { image: { url: data.result } })
            })
            break
        case 'playstore':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |telegram`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/playstore?apikey=${global.lolkey}&query=${one}`)
            var teks = 'Play Store Search : \n'
            for (var x of data.result) {
                teks += `Name : ${x.title}\n`
                teks += `ID : ${x.appId}\n`
                teks += `Developer : ${x.developer}\n`
                teks += `Link : ${x.url}\n`
                teks += `Price : ${x.priceText}\n`
                teks += `Price : ${x.price}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'shopee':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |tas gendong`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/shopee?apikey=${global.lolkey}&query=${one}`)
            var teks = 'Shopee Search : \n'
            for (var x of data.result) {
                teks += `Name : ${x.name}\n`
                teks += `Terjual : ${x.sold}\n`
                teks += `Stock : ${x.stock}\n`
                teks += `Lokasi : ${x.shop_loc}\n`
                teks += `Link : ${x.link_produk}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
        case 'google':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/gsearch?apikey=${global.lolkey}&query=${one}`)
            var teks = 'Google Search : \n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Link : ${x.link}\n`
                teks += `Desc : ${x.desc}\n\n`
            }
            conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break

        // Random Text //
        case 'quotes':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/quotes?apikey=${global.lolkey}`)
            m.reply(`_${data.result.quote}_\n\n*― ${data.result.by}*`)
            break
        case 'quotesanime':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/quotesnime?apikey=${global.lolkey}`)
            m.reply(`_${data.result.quote}_\n\n*― ${data.result.character}*\n*― ${data.result.anime} ${data.result.episode}*`)
            break
        case 'quotesdilan':
            quotedilan = await axios.get(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=${global.lolkey}`)
            m.reply(quotedilan.result)
            break
        case 'faktaunik':
        case 'katabijak':
        case 'pantun':
        case 'bucin':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/${teks}?apikey=${global.lolkey}`)
            m.reply(data.result)
            break
        case 'randomnama':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/nama?apikey=${global.lolkey}`)
            m.reply(data.result)
            break

        // Entertainment
        case 'asupan':
            axios.get(`https://api.lolhuman.xyz/api/asupan?apikey=${global.lolkey}`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result }, mimetype: 'video/mp4' })
            })
            break
        case 'wancak':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/onecak?apikey=${global.lolkey}` } })
            break

        // Primbon
        case 'artinama':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Kanna Clarissa`)
            axios.get(`https://api.lolhuman.xyz/api/artinama?apikey=${global.lolkey}&nama=${one}`).then(({ data }) => {
                m.reply(data.result)
            })
            break
        case 'jodoh':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Tahu|Bacem`)
            axios.get(`https://api.lolhuman.xyz/api/jodoh/${one}/${two}?apikey=${global.lolkey}`).then(({ data }) => {
                var teks = `Positif : ${data.result.positif}\n`
                teks += `Negative : ${data.result.negatif}\n`
                teks += `Deskripsi : ${data.result.deskripsi}`
                conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            })
            break
        case 'weton':
            if (!args[1]) return m.reply(`Example: ${usedPrefix + command} ${template} |12 12 2020`)
            axios.get(`https://api.lolhuman.xyz/api/weton/${args[1]}/${args[2]}/${args[3]}?apikey=${global.lolkey}`).then(({ data }) => {
                var teks = `Weton : ${data.result.weton}\n`
                teks += `Pekerjaan : ${data.result.pekerjaan}\n`
                teks += `Rejeki : ${data.result.rejeki}\n`
                teks += `Jodoh : ${data.result.jodoh}`
                conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            })
            break
        case 'jadian':
            if (!args[1]) return m.reply(`Example: ${usedPrefix + command} ${template} |12 12 2020`)
            axios.get(`https://api.lolhuman.xyz/api/jadian/${args[1]}/${args[2]}/${args[3]}?apikey=${global.lolkey}`).then(({ data }) => {
                var teks = `Karakteristik : ${data.result.karakteristik}\n`
                teks += `Deskripsi : ${data.result.deskripsi}`
                conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            })
            break
        case 'tebakumur':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Kanna Clarissa`)
            axios.get(`https://api.lolhuman.xyz/api/tebakumur?apikey=${global.lolkey}&name=${one}`).then(({ data }) => {
                var teks = `Nama : ${data.result.name}\n`
                teks += `Umur : ${data.result.age}`
                conn.sendButton(m.chat, teks, wm, null, [
                ['Menu', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            })
            break

        // Stalk
        case 'stalkig':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |jessnolimit`)
            axios.get(`https://api.lolhuman.xyz/api/stalkig/${one}?apikey=${global.lolkey}`).then(({ data }) => {
                var caption = `Username : ${data.result.username}\n`
                caption += `Full Name : ${data.result.fullname}\n`
                caption += `Posts : ${data.result.posts}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Following : ${data.result.following}\n`
                caption += `Bio : ${data.result.bio}`
                conn.sendMessage(m.chat, { image: { url: data.result.photo_profile }, caption })
            })
            break
        case 'stalkgithub':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |LoL-Human`)
            axios.get(`https://api.lolhuman.xyz/api/github/${one}?apikey=${global.lolkey}`).then(({ data }) => {
                var caption = `Name : ${data.result.name}\n`
                caption += `Link : ${data.result.url}\n`
                caption += `Public Repo : ${data.result.public_repos}\n`
                caption += `Public Gists : ${data.result.public_gists}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Following : ${data.result.following}\n`
                caption += `Bio : ${data.result.bio}`
                conn.sendMessage(m.chat, { image: { url: data.result.avatar }, caption })
            })
            break
        case 'stalktwitter':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |jokowi`)
            axios.get(`https://api.lolhuman.xyz/api/twitter/${one}?apikey=${global.lolkey}`).then(({ data }) => {
                var caption = `Username : ${data.result.screen_name}\n`
                caption += `Name : ${data.result.name}\n`
                caption += `Tweet : ${data.result.tweet}\n`
                caption += `Joined : ${data.result.joined}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Following : ${data.result.following}\n`
                caption += `Like : ${data.result.like}\n`
                caption += `Description : ${data.result.description}`
                conn.sendMessage(m.chat, { image: { url: data.result.profile_picture }, caption })
            })
            break
        case 'stalktiktok':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |bulansutena`)
            axios.get(`https://api.lolhuman.xyz/api/stalktiktok/${one}?apikey=${global.lolkey}`).then(({ data }) => {
                var caption = `Username : ${data.result.username}\n`
                caption += `Nickname : ${data.result.nickname}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Followings : ${data.result.followings}\n`
                caption += `Likes : ${data.result.likes}\n`
                caption += `Video : ${data.result.video}\n`
                caption += `Bio : ${data.result.bio}\n`
                conn.sendMessage(m.chat, { image: { url: data.result.user_picture }, caption })
            })
            break

        // Other
        case 'ssweb':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://api.lolhuman.xyz`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/ssweb?apikey=${global.lolkey}&url=${one}` } })
            break
        case 'ssweb2':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://api.lolhuman.xyz`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/sswebfull?apikey=${global.lolkey}&url=${one}` } })
            break
        case 'shortlink':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://api.lolhuman.xyz`)
            axios.get(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=${global.lolkey}&url=${one}`).then(({ data }) => {
                m.reply(data.result)
            })
            break

        // Random Image //
        case 'art':
        case 'bts':
        case 'exo':
        case 'elf':
        case 'loli':
        case 'neko':
        case 'waifu':
        case 'shota':
        case 'husbu':
        case 'sagiri':
        case 'shinobu':
        case 'megumin':
        case 'wallnime':
        case 'quotesimage':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/random/${args[0]}?apikey=${global.lolkey}` } })
            break

        case 'chiisaihentai':
        case 'trap':
        case 'blowjob':
        case 'yaoi':
        case 'ecchi':
        case 'hentai':
        case 'ahegao':
        case 'hololewd':
        case 'sideoppai':
        case 'animefeets':
        case 'animebooty':
        case 'animethighss':
        case 'hentaiparadise':
        case 'animearmpits':
        case 'hentaifemdom':
        case 'lewdanimegirls':
        case 'biganimetiddies':
        case 'animebellybutton':
        case 'hentai4everyone':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/random/nsfw/${args[0]}?apikey=${global.lolkey}` } })
            break

        case 'bj':
        case 'ero':
        case 'cum':
        case 'feet':
        case 'yuri':
        case 'trap':
        case 'lewd':
        case 'feed':
        case 'eron':
        case 'solo':
        case 'gasm':
        case 'poke':
        case 'anal':
        case 'holo':
        case 'tits':
        case 'kuni':
        case 'kiss':
        case 'erok':
        case 'smug':
        case 'baka':
        case 'solog':
        case 'feetg':
        case 'lewdk':
        case 'waifu':
        case 'pussy':
        case 'femdom':
        case 'cuddle':
        case 'hentai':
        case 'eroyuri':
        case 'cum_jpg':
        case 'blowjob':
        case 'erofeet':
        case 'holoero':
        case 'classic':
        case 'erokemo':
        case 'fox_girl':
        case 'futanari':
        case 'lewdkemo':
        case 'wallpaper':
        case 'pussy_jpg':
        case 'kemonomimi':
        case 'nsfw_avatar':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/random2/${args[0]}?apikey=${global.lolkey}` } })
            break

        // Textprome //
        case 'blackpink':
        case 'neon':
        case 'greenneon':
        case 'advanceglow':
        case 'futureneon':
        case 'sandwriting':
        case 'sandsummer':
        case 'sandengraved':
        case 'metaldark':
        case 'neonlight':
        case 'holographic':
        case 'text1917':
        case 'minion':
        case 'deluxesilver':
        case 'newyearcard':
        case 'bloodfrosted':
        case 'halloween':
        case 'jokerlogo':
        case 'fireworksparkle':
        case 'natureleaves':
        case 'bokeh':
        case 'toxic':
        case 'strawberry':
        case 'box3d':
        case 'roadwarning':
        case 'breakwall':
        case 'icecold':
        case 'luxury':
        case 'cloud':
        case 'summersand':
        case 'horrorblood':
        case 'thunder':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Kanna Clarissa`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome/${args[0]}?apikey=${global.lolkey}&text=${one}` } })
            break

        case 'pornhub':
        case 'glitch':
        case 'avenger':
        case 'space':
        case 'ninjalogo':
        case 'marvelstudio':
        case 'lionlogo':
        case 'wolflogo':
        case 'steel3d':
        case 'wallgravity':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Kanna Clarissa`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome2/${args[0]}?apikey=${global.lolkey}&text1=${one}&text2=${two}` } })
            break

        // Photo Oxy //
        case 'shadow':
        case 'cup':
        case 'cup1':
        case 'romance':
        case 'smoke':
        case 'burnpaper':
        case 'lovemessage':
        case 'undergrass':
        case 'love':
        case 'coffe':
        case 'woodheart':
        case 'woodenboard':
        case 'summer3d':
        case 'wolfmetal':
        case 'nature3d':
        case 'underwater':
        case 'golderrose':
        case 'summernature':
        case 'letterleaves':
        case 'glowingneon':
        case 'fallleaves':
        case 'flamming':
        case 'harrypotter':
        case 'carvedwood':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Kanna Clarissa`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/photooxy1/${args[0]}?apikey=${global.lolkey}&text=${one}` } })
            break

        case 'tiktok':
        case 'arcade8bit':
        case 'battlefield4':
        case 'pubg':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Kanna Clarissa`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/photooxy2/${args[0]}?apikey=${global.lolkey}&text1=${one}&text2=${two}` } })
            break

        // Ephoto 360 //
        case 'wetglass':
        case 'multicolor3d':
        case 'watercolor':
        case 'luxurygold':
        case 'galaxywallpaper':
        case 'lighttext':
        case 'beautifulflower':
        case 'puppycute':
        case 'royaltext':
        case 'heartshaped':
        case 'birthdaycake':
        case 'galaxystyle':
        case 'hologram3d':
        case 'greenneon':
        case 'glossychrome':
        case 'greenbush':
        case 'metallogo':
        case 'noeltext':
        case 'glittergold':
        case 'textcake':
        case 'starsnight':
        case 'wooden3d':
        case 'textbyname':
        case 'writegalacy':
        case 'galaxybat':
        case 'snow3d':
        case 'birthdayday':
        case 'goldplaybutton':
        case 'silverplaybutton':
        case 'freefire':
            if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Kanna Clarissa`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/ephoto1/${args[0]}?apikey=${global.lolkey}&text=${one}` } })
            break
}
}
} catch (e) {
throw eror
}
}
handler.help = ['lolmenu <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^lol|lolmenu$/i
export default handler