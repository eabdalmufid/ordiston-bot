import fetch from "node-fetch"
import { sandroid1,
sanime,
sanoboydl,
sanoboys,
sapkmirror,
sapkmody,
sartinama,
sasupanfilm,
sasupanfilminfo,
sbacaresep,
scarigc,
scariresep,
schara,
scorona,
sdevianart,
sdewabatch,
sdrakor,
sfacebook,
sfilm,
sgempa,
sghfollower,
sghfollowing,
sghuser,
sgoredl,
shappymod,
shappymoddl,
sigdl,
sigdl2,
sigstalk,
sigstory,
sjob,
sjoox,
skiryu,
skonachan,
smanga,
smangatoon,
smediafire,
smerdekanews,
smetronews,
spalingmurah,
spin,
spinterest2,
squotes,
srandomgore,
srandomtt,
srexdl,
srexdldown,
ssearchgore,
ssfiledown,
ssfilesearch,
ssoundcloud,
sstickersearch,
stextmakervid,
stiktok,
strendtwit,
stwitter,
swallpapercave,
swallpapercraft,
swallpaperhd,
swattpad,
swebtoons,
swikisearch,
szerochan,
szippydl } from "../lib/scrape.js"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let lister = [
        "android1",
"anime",
"anoboydl",
"anoboys",
"apkmirror",
"apkmody",
"artinama",
"asupanfilm",
"asupanfilminfo",
"bacaresep",
"carigc",
"cariresep",
"chara",
"corona",
"devianart",
"dewabatch",
"drakor",
"facebook",
"film",
"gempa",
"ghfollower",
"ghfollowing",
"ghuser",
"goredl",
"happymod",
"happymoddl",
"igdl",
"igdl2",
"igstalk",
"igstory",
"job",
"joox",
"kiryu",
"konachan",
"manga",
"mangatoon",
"mediafire",
"merdekanews",
"metronews",
"palingmurah",
"pin",
"pinterest2",
"quotes",
"randomgore",
"randomtt",
"rexdl",
"rexdldown",
"searchgore",
"sfiledown",
"sfilesearch",
"soundcloud",
"stickersearch",
"textmakervid",
"tiktok",
"trendtwit",
"twitter",
"wallpapercave",
"wallpapercraft",
"wallpaperhd",
"wattpad",
"webtoons",
"wikisearch",
"zerochan",
"zippydl"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(/[^\w\s]/g)
    if (!lister.includes(feature)) return m.reply("*Example:*\n.fs youtube.search.hello\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {
        
if (feature == "android1") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sandroid1(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "anime") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sanime(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "anoboydl") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sanoboydl(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "anoboys") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sanoboys(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "apkmirror") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sapkmirror(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "apkmody") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sapkmody(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "artinama") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sartinama(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "asupanfilm") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sasupanfilm(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "asupanfilminfo") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sasupanfilminfo(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "bacaresep") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sbacaresep(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "carigc") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await scarigc(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "cariresep") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await scariresep(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "chara") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await schara(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "corona") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await scorona(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "devianart") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sdevianart(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "dewabatch") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sdewabatch(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "drakor") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sdrakor(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "facebook") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sfacebook(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "film") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sfilm(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "gempa") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sgempa(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "ghfollower") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sghfollower(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "ghfollowing") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sghfollowing(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "ghuser") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sghuser(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "goredl") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sgoredl(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "happymod") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await shappymod(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "happymoddl") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await shappymoddl(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "igdl") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sigdl(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "igdl2") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sigdl2(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "igstalk") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sigstalk(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "igstory") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sigstory(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "job") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sjob(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "joox") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sjoox(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "kiryu") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await skiryu(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "konachan") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await skonachan(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "manga") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await smanga(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "mangatoon") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await smangatoon(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "mediafire") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await smediafire(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "merdekanews") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await smerdekanews(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "metronews") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await smetronews(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "palingmurah") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await spalingmurah(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "pin") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await spin(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "pinterest2") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await spinterest2(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "quotes") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await squotes(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "randomgore") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await srandomgore(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "randomtt") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await srandomtt(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "rexdl") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await srexdl(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "rexdldown") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await srexdldown(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "searchgore") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await ssearchgore(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "sfiledown") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await ssfiledown(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "sfilesearch") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await ssfilesearch(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "soundcloud") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await ssoundcloud(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "stickersearch") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sstickersearch(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "textmakervid") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await stextmakervid(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "tiktok") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await stiktok(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "trendtwit") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await strendtwit(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "twitter") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await stwitter(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "wallpapercave") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await swallpapercave(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "wallpapercraft") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await swallpapercraft(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "wallpaperhd") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await swallpaperhd(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "wattpad") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await swattpad(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "webtoons") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await swebtoons(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "wikisearch") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await swikisearch(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "zerochan") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await szerochan(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "zippydl") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await szippydl(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
    }

}
handler.help = ["scrap type query"]
handler.tags = ["internet"]
handler.command = /^(scrap)$/i
export default handler

function clean(string) {
    return string.replace(/{/g, '').replace(/}/g, '')
                 .replace(/"/g, '')
}