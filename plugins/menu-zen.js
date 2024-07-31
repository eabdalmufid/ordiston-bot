import axios from 'axios'
import FormData from 'form-data'
import fetch from 'node-fetch'
import fs from 'fs'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, isPrems, isOwner, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

let imgr = flaaa

let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]
  
let template = (args[0] || '').toLowerCase()
if (!args[0] || !one) {
let caption = `*Contoh Penggunaan Single*
${usedPrefix + command} cecan

*Contoh Penggunaan Multi*
${usedPrefix + command} pinterest |wibu

*List:*
• animeweb/animeplanet
• animeweb/animesearch
• animeweb/anoboy/download
• animeweb/anoboy/search
• animeweb/doujindesu/latest
• animeweb/doujindesu/search
• animeweb/kiryuu
• animeweb/klikmanga
• animeweb/komikstation
• animeweb/mangatoon
• animeweb/myanimelist/anime
• animeweb/myanimelist/anime
• animeweb/myanimelist/character
• animeweb/myanimelist/character
• animeweb/myanimelist/manga
• animeweb/myanimelist/manga
• animeweb/myanimelist/topanime
• animeweb/myanimelist/topmanga
• animeweb/mynime/detail
• animeweb/nekopoi/hentailist
• animeweb/nekopoi/javlist
• animeweb/nekopoi/latest
• animeweb/nekopoi/search
• animeweb/nhentai
• animeweb/otakudesu/complete
• animeweb/otakudesu/download
• animeweb/otakudesu/download
• animeweb/otakudesu/info
• animeweb/otakudesu/info
• animeweb/otakudesu/ongoing
• animeweb/otakudesu/search
• animeweb/otakudesu/search
• api/anime/sfw/avatar
• api/anime/sfw/baka
• api/anime/sfw/cuddle
• api/anime/sfw/feed
• api/anime/sfw/fox_girl
• api/anime/sfw/gecg
• api/anime/sfw/holo
• api/anime/sfw/hug
• api/anime/sfw/kemonomimi
• api/anime/sfw/kiss
• api/anime/sfw/meow
• api/anime/sfw/neko
• api/anime/sfw/pat
• api/anime/sfw/poke
• api/anime/sfw/slap
• api/anime/sfw/smug
• api/anime/sfw/tickle
• api/anime/sfw/waifu
• api/anime/sfw/wallpaper
• api/morensfw/ahegao
• api/morensfw/ass
• api/morensfw/bdsm
• api/morensfw/blowjob
• api/morensfw/cuckold
• api/morensfw/cum
• api/morensfw/ero
• api/morensfw/femdom
• api/morensfw/foot
• api/morensfw/gangbang
• api/morensfw/glasses
• api/morensfw/hentai
• api/morensfw/hentaigif
• api/morensfw/jahy
• api/morensfw/maid
• api/morensfw/manga
• api/morensfw/masturbation
• api/morensfw/mobilewall
• api/morensfw/netorare
• api/morensfw/nsfwneko
• api/morensfw/orgy
• api/morensfw/panties
• api/morensfw/pussy
• api/morensfw/sfwneko
• api/morensfw/tentacles
• api/morensfw/thighs
• api/morensfw/yuri
• api/morensfw/zettairyouiki
• convert/apng-to-webp
• convert/geturl
• convert/shorturl
• convert/ssweb
• convert/ssweb/v2
• convert/sticker-nobg
• convert/webp-to-mp4
• convert/whatmusic
• creator/attp
• creator/biden
• creator/botcomment
• creator/changemymind
• creator/drakememe
• creator/hartatahta
• creator/kannagen
• creator/maketweet
• creator/nuliskanan
• creator/nuliskiri
• creator/pikachu
• creator/poohmeme
• creator/sadcat
• creator/tahtacustom
• creator/trump
• creator/ttp
• creator/ttp
• creator/waifu2x
• downloader/aio
• downloader/cocofun
• downloader/gore
• downloader/hentaivid
• downloader/hentaivid/longer
• downloader/instagram/story
• downloader/instagram/story/username
• downloader/joox
• downloader/linesticker
• downloader/mediafire
• downloader/randomtiktok
• downloader/telesticker
• downloader/tikporn
• downloader/xnxx
• downloader/xvideos
• downloader/y2mate
• downloader/youtube
• downloader/ytplay
• downloader/ytshorts
• downloader/zippyshare
• entertainment/artikata
• entertainment/asahotak
• entertainment/caklontong
• entertainment/dare
• entertainment/family100
• entertainment/jagokata
• entertainment/kuncitts
• entertainment/siapakah
• entertainment/simisimi
• entertainment/simisimi/v2
• entertainment/susunkata
• entertainment/tebakbendera
• entertainment/tebakgambar
• entertainment/tebakkabupaten
• entertainment/tebakkalimat
• entertainment/tebakkata
• entertainment/tebakkimia
• entertainment/tebaklagu
• entertainment/tebaklagu2
• entertainment/tebaklirik
• entertainment/tebaktebakan
• entertainment/tekateki
• entertainment/truth
• ephoto/awan
• ephoto/beach
• ephoto/blackpink
• ephoto/bohlam
• ephoto/cake
• ephoto/certificate
• ephoto/coklat
• ephoto/crossfire
• ephoto/ffcover
• ephoto/flashlight
• ephoto/flower
• ephoto/galaxy
• ephoto/glass
• ephoto/grafity
• ephoto/igcertificate
• ephoto/kaligrafi
• ephoto/logo
• ephoto/logo2
• ephoto/logo3
• ephoto/logo4
• ephoto/logogaming
• ephoto/logogirl
• ephoto/logogold
• ephoto/marmer
• ephoto/musimsemi
• ephoto/neon
• ephoto/piringkaligrafi
• ephoto/proyektor
• ephoto/puppycute
• ephoto/quotes
• ephoto/quotesonline
• ephoto/ruby
• ephoto/shadowtext
• ephoto/sparkling
• ephoto/spiderlogo
• ephoto/starlogo
• ephoto/starnight
• ephoto/starnight2
• ephoto/typography
• ephoto/valorant
• ephoto/yasuologo
• ephoto/ytcertificate
• information/bmkg/gempa
• information/bmkg/weather/jawa-barat
• information/bmkg/weather/jawa-barat/bandung
• information/checkrek/bca
• information/covidindo
• information/covidworld
• information/hitungwr
• information/iplookup
• information/itunes
• information/kbbi
• information/kodepos
• information/mlherodetail
• information/mlherolist
• information/mpl
• information/phoneinfo
• information/steam
• information/weatherlookup
• information/wikia
• information/wikipedia
• islami/asmaulhusna
• islami/jadwalshalat
• islami/jadwalshalat/all
• islami/kisahmuslim
• islami/kisahnabi/muhammad
• islami/listkota
• islami/listsurah
• islami/quran/1
• islami/quran/1/1
• islami/quran/audio/1
• islami/quran/audio/1/1
• news/antaranews
• news/bbc
• news/cnbc
• news/dailynews
• news/detiknews
• news/fajarnews
• news/inews
• news/kompas
• news/kontanews
• news/koransindo
• news/okezone
• news/temponews
• news/tribunews
• news/vivanews
• photoeditor/jadianime
• photoeditor/jadianime/v2
• photoeditor/jadizombie
• primbon/artimimpi
• primbon/artinama
• primbon/haribaik/23/08/2001
• primbon/harilarangan/23/08/2001
• primbon/harinaas/23/08/2001
• primbon/harisangar_taliwangke/23/08/2001
• primbon/jadian/23/08/2001
• primbon/jodoh
• primbon/memancing_ikan/23/08/2001
• primbon/nomerhoki
• primbon/pekerjaanweton/23/08/2001
• primbon/potensipenyakit/23/08/2001
• primbon/rahasia_nagahari/23/08/2001
• primbon/rejekiweton/23/08/2001
• primbon/shio
• primbon/usahabisnis/23/08/2001
• primbon/weton_jawa/23/08/2001
• primbon/zodiak
• randomanime/anime
• randomanime/animeme
• randomanime/ass
• randomanime/blowjob
• randomanime/couples
• randomanime/ecchi
• randomanime/ero
• randomanime/hentai
• randomanime/hololive
• randomanime/husbu
• randomanime/maid
• randomanime/marin-kitagawa
• randomanime/megumin
• randomanime/milf
• randomanime/mori-calliope
• randomanime/neko
• randomanime/nekos
• randomanime/oppai
• randomanime/oral
• randomanime/paizuri
• randomanime/raiden-shogun
• randomanime/selfies
• randomanime/shinobu
• randomanime/trap
• randomanime/uniform
• randomanime/waifu
• randomanime/waifus
• randomasupan/aeunicetjoaa
• randomasupan/asupan
• randomasupan/asupantiktok
• randomasupan/cecan
• randomasupan/china
• randomasupan/discord18
• randomasupan/justina
• randomasupan/kayes
• randomasupan/kpop
• randomasupan/natajadeh
• randomasupan/notnot
• randomasupan/rose
• randomasupan/ryujin
• randomasupan/thailand
• randomasupan/vietnam
• randomimage/aesthetic
• randomimage/anjing
• randomimage/blackpink
• randomimage/boneka
• randomimage/cecan
• randomimage/cogan
• randomimage/cosplay
• randomimage/darkjoke
• randomimage/hacker
• randomimage/kucing
• randomimage/meme
• randomimage/memeindo
• randomimage/minecraft
• randomimage/mobil
• randomimage/motor
• randomimage/onecak
• randomimage/onecak/search
• randomimage/patrick
• randomimage/profil
• randomimage/pubg
• randomimage/wallhp
• randomtext/alay
• randomtext/animequotes
• randomtext/animequotes2
• randomtext/bucinquote
• randomtext/cerpen
• randomtext/cersex
• randomtext/cersex2
• randomtext/creepyfact
• randomtext/dilanquote
• randomtext/faktaunik
• randomtext/galauquote
• randomtext/halah
• randomtext/heleh
• randomtext/hilih
• randomtext/holoh
• randomtext/huluh
• randomtext/jawaquote
• randomtext/kanyequote
• randomtext/katasenja
• randomtext/motivasi
• randomtext/muslimquote
• randomtext/pantun
• randomtext/puisi
• randomtext/randomquote
• randomtext/reversetext
• randomtext/tomorse
• randomtext/trumpquote
• randomtext/trumpthink
• searching/animequotes
• searching/bacaresep
• searching/bingsearch
• searching/chordlagu
• searching/dafontsearch
• searching/gimage
• searching/gimage2
• searching/gsearch
• searching/jadwaltv
• searching/kazelyrics
• searching/liriklagu
• searching/pinterest
• searching/pinterest2
• searching/pixiv
• searching/pixiv/random
• searching/resep
• searching/sfilesearch
• searching/stickerline
• searching/stickersearch
• searching/styletext
• searching/trendtwit
• searching/wagroup
• searching/wamods
• searching/xnxx
• searching/xnxx
• searching/xvideos
• searching/xvideos
• searching/zerochan
• stalker/github
• stalker/ig
• stalker/nickaov
• stalker/nickautochess
• stalker/nickbigolive
• stalker/nickcocofun
• stalker/nickcod
• stalker/nickdomino
• stalker/nickdragonraja
• stalker/nickff
• stalker/nickhago
• stalker/nicklokapala
• stalker/nickml
• stalker/nickmladventure
• stalker/nicknimotv
• stalker/nickpb
• stalker/nickpubg
• stalker/nicksausage
• stalker/nicksdriver
• stalker/nickzepeto
• stalker/npm
• stalker/tiktok
• textpro/3dchristmas
• textpro/3ddeepsea
• textpro/3dgradient
• textpro/3dneonlight
• textpro/3drainbow
• textpro/3dscifi
• textpro/3dwaterpipe
• textpro/americanflag
• textpro/berry
• textpro/blackpink
• textpro/bluecircuit
• textpro/christmas
• textpro/crackedstone
• textpro/dropwater
• textpro/fiction
• textpro/firework
• textpro/foggywindows
• textpro/glitch
• textpro/gluetext
• textpro/greenhorror
• textpro/halloween
• textpro/harrypotter
• textpro/impressiveglitch
• textpro/logowolf
• textpro/logowolf2
• textpro/magma
• textpro/marvel
• textpro/matrix
• textpro/metallic
• textpro/natural
• textpro/neondevil
• textpro/pornhub
• textpro/sketch
• textpro/space
• textpro/thunder
• textpro/transformer
• togel/ankara
• togel/cambodia
• togel/hk
• togel/hongkong
• togel/laos
• togel/sdy
• togel/sgp
• togel/singapore4d
• togel/sydney
• togel/taipei
• user/cekapi
• webzone/amino
• webzone/apkmirror
• webzone/apkmody
• webzone/drakor
• webzone/gsmarena
• webzone/happymod
• webzone/happymod/download
• webzone/imdb
• webzone/jadwalbioskop
• webzone/jalantikus
• webzone/lk21
• webzone/moddroid
• webzone/nowplayingbioskop
• webzone/palingmurah
• webzone/playstore
• webzone/rexdl
• webzone/secreto
• webzone/shopee
• webzone/turnbackhoax
• webzone/wattpad
• webzone/webtoons
`
await conn.sendFile(m.chat, logo, '', caption, m)
	}
            
try {
if (command) {
switch (template) {
        
            case 'animeweb':
        let ab = await fetch(`http://api.zahwazein.xyz/animeweb/${args[0]}?query=${one}&apikey=zenzkey_1ec92f71d3bb`)
        let ac = await ab.json()
        m.reply(ac)
            break
            case 'sfw':
        let bb = `http://api.zahwazein.xyz/api/anime/sfw/${args[0]}?apikey=zenzkey_1ec92f71d3bb`
        conn.sendButtonImg(m.chat, bb, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'morensfw':
        let cb = `http://api.zahwazein.xyz/api/anime/morensfw/${args[0]}?apikey=zenzkey_1ec92f71d3bb`
        conn.sendButtonImg(m.chat, cb, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'convert':
        let db = await fetch(`http://api.zahwazein.xyz/convert/${one}?url=${two}&apikey=zenzkey_1ec92f71d3bb`)
        let dc = await db.json()
        m.reply(dc)
            break
            case 'creator':
        let xs = `http://api.zahwazein.xyz/creator/${one}?text=${two}&apikey=zenzkey_1ec92f71d3bb`
        conn.sendButtonImg(m.chat, xs, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'downloader':
        let eb = await fetch(`http://api.zahwazein.xyz/downloader/${one}?apikey=zenzkey_1ec92f71d3bb&url=${two}`)
        let ec = await eb.json()
    m.reply(ec)
            break
            case 'entertainment':
        let enb = await fetch(`http://api.zahwazein.xyz/entertainment/${one}?query=${two}&apikey=zenzkey_1ec92f71d3bb`)
        let enc = await enb.json()
    m.reply(enc)
            break
            case 'ephoto':
        let eph = `http://api.zahwazein.xyz/ephoto/${one}?text=${two}&apikey=zenzkey_1ec92f71d3bb`
        conn.sendButtonImg(m.chat, eph, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'news':
        let cdf = await fetch(`http://api.zahwazein.xyz/news/${one}?apikey=zenzkey_1ec92f71d3bb`)
        let cgg = await cdf.json()
    m.reply(cgg)
            break
            
            case 'photoeditor':
        let dff = await fetch(`http://api.zahwazein.xyz/photoeditor/${one}?url=${two}&apikey=zenzkey_1ec92f71d3bb`)
        let gff = await dff.json()
    m.reply(gff)
            break
            
            case 'randomanime':
        let duy = `http://api.zahwazein.xyz/randomanime/${one}?apikey=zenzkey_1ec92f71d3bb`
        conn.sendButtonImg(m.chat, duy, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'randomimage':
        let duc = `http://api.zahwazein.xyz/randomimage/${one}?apikey=zenzkey_1ec92f71d3bb`
        conn.sendButtonImg(m.chat, duc, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            
            case 'randomtext':
        let rtd = await fetch(`http://api.zahwazein.xyz/randomtext/${one}&apikey=zenzkey_1ec92f71d3bb`)
        let gtt = await rtd.json()
    m.reply(gtt)
            break
            
            case 'searching':
        let srd = await fetch(`http://api.zahwazein.xyz/searching/${one}?query=${two}&apikey=zenzkey_1ec92f71d3bb`)
        let srt = await srd.json()
    m.reply(srt)
            break
            
            case 'textpro':
        let tp = `http://api.zahwazein.xyz/textpro/${one}?text=${two}&apikey=zenzkey_1ec92f71d3bb`
        conn.sendButtonImg(m.chat, tp, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            
            case 'togel':
        let tgf = await fetch(`http://api.zahwazein.xyz/togel/${one}?apikey=zenzkey_1ec92f71d3bb`)
        let tgl = await tgf.json()
    m.reply(tgl)
            break
            
            case 'webzone':
        let tbc = await fetch(`http://api.zahwazein.xyz/webzone/${one}?query=${two}&apikey=zenzkey_1ec92f71d3bb`)
        let tubg = await tbc.json()
    m.reply(tubg)
            break
            
}
}
} catch (e) {
throw eror
}
}
handler.help = ['zen <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^zen$/i
export default handler
