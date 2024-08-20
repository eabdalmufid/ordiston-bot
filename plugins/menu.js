/* Recode Ordiston */
import {
    promises,
    readFileSync
} from "fs"
import {
    join
} from "path"
import {
    xpRange
} from "../lib/levelling.js"
import moment from "moment-timezone"
import os from "os"
import fs from "fs"
import fetch from "node-fetch"

const defaultMenu = {
    before: `
%dash
%m1 *U S E R*
%m2 *Name:* %name
%m2 *Tag:* %tag
%m2 *Status:* %prems
%m2 *Limit:* %limit
%m2 *Money:* %money
%m2 *Role:* %role
%m2 *Level:* %level [ %xp4levelup Xp For Levelup]
%m2 *Xp:* %exp / %maxexp
%m2 *Total Xp:* %totalexp
%m3

%m1 *T O D A Y*
%m2 *%ucpn*
%m2 *Days:* %week %weton
%m2 *Date:* %date
%m2 *Islamic Date:* %dateIslamic
%m2 *Time:* %wita
%m3

%m1 *I N F O*
%m2 *Bot Name:* %me
%m2 *Mode:* %mode
%m2 *Platform:* %platform
%m2 *Type:* Node.Js
%m2 *Baileys:* Multi Device
%m2 *Prefix:* [ *%_p* ]
%m2 *Uptime:* %muptime
%m2 *Database:* %rtotalreg dari %totalreg
%m3

%m1 *I N F O  C M D* 
%m4 *%totalfeatures* Command
%m4 *🅟* = Premium
%m4 *🅛* = Limit
%m3
%readmore
`.trimStart(),
    header: "%cc *%category* %c1",
    body: "%c2 %cmd %isPremium %islimit",
    footer: "%c3",
    after: "%c4 %me",
}
let handler = async (m, {
    conn,
    usedPrefix: _p,
    __dirname,
    args
}) => {
    await conn.sendReact(m.chat, "⏳", m.key)
    let spas = "                "
    let spas2 = "         "
    let mojis = "╰╴"
    let index = 0
    let ktnya = ["Kamu nanya?",
        "No spam...",
        "Thanks..",
        "Menampilkan...",
        "Tunggu...",
        "Proses...",
        "Loading...",
        "Bertanya..",
        "Hooh..."
    ]
    let ktx = ktnya.getRandom()
    let tags = {
        "main": "Main",
        "rpg": "RolePlay Games",
        "xp": "Exp & Limit",
        "jadian": "Jadian",
        "sticker": "Sticker",
        "edukasi": "Edukasi",
        "quran": "Al Quran",
        "ai": "AI",
        "gpt": "GPT",
        "tools": "Tools",
        "kerang": "Kerang Ajaib",
        "primbon": "Primbon",
        "fun": "Fun",
        "game": "Game",
        "genshin": "Genshin Impact",
        "quotes": "Quotes",
        "audio": "Audio",
        "maker": "Maker",
        "music": "Music",
        "downloader": "Downloader",
        "internet": "Internet",
        "random": "Random",
        "nsfw": "Nsfw",
        "nulis": "MagerNulis & Logo",
        "anonymous": "Anonymous Chat",
        "database": "Database",
        "admin": "Admin",
        "group": "Group",
        "vote": "Voting",
        "absen": "Absen",
        "premium": "Premium",
        "advanced": "Advanced",
        "info": "Info",
        "owner": "Owner",
        "jadibot": "Jadi Bot",
        "host": "Host",
        "Baileys": "Baileys",
        "store": "Store Menu",
        "virus": "Virtex",
        "thnks": "Thanks To",
        "nocategory": "No Category",
    }
    try {
  	// DEFAULT MENU
      let dash = `*─────━•〔 DASHBOARD 〕•━─────*`
      let dash2 = `*─────━•[DASHBOARD]•━─────*`
  	  let m1 = `*❖─···─〈*`
      let m2 = `*│𖥂*`
      let m3 = `*┗───···─────𖡹*`
      let m4 = `*│𖥂*`
      
      // COMMAND MENU
      let cc = `*╭────━•〔*`
      let c1 = `*〕•━────┐*`
      let c2 = `*│⌬*`
      let c3 = `*╰───···─────*❁\n`
      let c4 = `\n*Ordiston~*\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     `
      
      // LOGO L P
      let lprem = global.lopr
      let llim = global.lolm
      let tag = `@${m.sender.split('@')[0]}`

        /* Gobal */
        let glb = global.db.data.users
        let usrs = glb[m.sender]

        /* Hiasan List */
        let spas = "                "
        let spas2 = "         "
        let mojis = "╰╴"
        let index = 0
        let ktnya = ["Kamu nanya?", "No spam...", "Thanks..", "Menampilkan...", "Tunggu...", "Proses...", "Loading...", "Bertanya..", "Hooh..."]
        let ktx = ktnya.getRandom()

        /* TIME ZONE */
        let wib = moment.tz("Asia/Jakarta").format("HH:mm:ss")
        let wibh = moment.tz("Asia/Jakarta").format("HH")
        let wibm = moment.tz("Asia/Jakarta").format("mm")
        let wibs = moment.tz("Asia/Jakarta").format("ss")
        let wita = moment.tz("Asia/Jakarta").format("HH:mm:ss")
        let waktuwita = `${wibh} H ${wibm} M ${wibs} S`

        /* Info Menu */
        let mode = global.opts["self"] ? "Private" : "Publik"
        let _package = JSON.parse(await promises.readFile(join(__dirname, "../package.json")).catch(_ => ({}))) || {}
        let {
            age,
            exp,
            limit,
            level,
            role,
            registered,
            money
        } = glb[m.sender]
        let {
            min,
            xp,
            max
        } = xpRange(level, global.multiplier)
        let name = await conn.getName(m.sender)
        let premium = glb[m.sender].premiumTime
        let prems = `${premium > 0 ? "Premium": "Free"}`
        let platform = os.platform()

        //-----------TIME---------
        let ucpn = `${ucapan()}`
        let d = new Date(new Date + 3600000)
        let locale = "id"
        // d.getTimeZoneOffset()
        // Offset -420 is 18.00
        // Offset    0 is  0.00
        // Offset  420 is  7.00
        let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][Math.floor(d / 84600000) % 5]
        let week = d.toLocaleDateString(locale, {
            weekday: "long"
        })
        let date = d.toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(d)
        let time = d.toLocaleTimeString(locale, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        })
        let _uptime = process.uptime() * 1000
        let _muptime
        if (process.send) {
            process.send("uptime")
            _muptime = await new Promise(resolve => {
                process.once("message", resolve)
                setTimeout(resolve, 1000)
            }) * 1000
        }
        let muptime = clockString(_muptime)
        let uptime = clockString(_uptime)

        //---------------------
        let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
        let totalreg = Object.keys(glb).length
        let rtotalreg = Object.values(glb).filter(user => user.registered == true).length
        let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
            return {
                help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
                tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
                prefix: "customPrefix" in plugin,
                limit: plugin.limit,
                premium: plugin.premium,
                enabled: !plugin.disabled,
            }
        })
        for (let plugin of help)
            if (plugin && "tags" in plugin)
                for (let tag of plugin.tags)
                    if (!(tag in tags) && tag) tags[tag] = tag
        conn.menu = conn.menu ? conn.menu : {}
        let before = conn.menu.before || defaultMenu.before
        let header = conn.menu.header || defaultMenu.header
        let body = conn.menu.body || defaultMenu.body
        let footer = conn.menu.footer || defaultMenu.footer
        let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? "" : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
        let _text = [
            before,
            ...Object.keys(tags).map(tag => {
                return header.replace(/%category/g, tags[tag]) + "\n" + [
                    ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
                        return menu.help.map(help => {
                            return body.replace(/%cmd/g, menu.prefix ? help : "%_p" + help)
                                .replace(/%islimit/g, menu.limit ? "🅛" : "")
                                .replace(/%isPremium/g, menu.premium ? "🅟" : "")
                                .trim()
                        }).join("\n")
                    }),
                    footer
                ].join("\n")
            }),
            after
        ].join("\n")
        let text = typeof conn.menu == "string" ? conn.menu : typeof conn.menu == "object" ? _text : ""
        let replace = {
            "%": "%",
            p: _p,
            uptime,
            muptime,
            me: conn.getName(conn.user.jid),
            npmname: _package.name,
            npmdesc: _package.description,
            version: _package.version,
            exp: exp - min,
            maxexp: xp,
            totalexp: exp,
            xp4levelup: max - exp,
            github: _package.homepage ? _package.homepage.url || _package.homepage : "[unknown github url]",
            tag,
            dash,
            m1,
            m2,
            m3,
            m4,
            cc,
            c1,
            c2,
            c3,
            c4,
            lprem,
            llim,
            ucpn,
            platform,
            wita,
            mode,
            _p,
            money,
            age,
            tag,
            name,
            prems,
            level,
            limit,
            name,
            weton,
            week,
            date,
            dateIslamic,
            time,
            totalreg,
            totalfeatures,
            rtotalreg,
            role,
            readmore: readMore
        }
        text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, "g"), (_, name) => "" + replace[name])
        let pp = flaaa + "allmenu"
        //const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => "./src/avatar_contact.png")

        //------------------< MENU >----------------
        /*
        let pusat = ["ke1", "ke2", "ke3", "ke4", "ke5"]
        let pilih = pusat.getRandom()
        if (pilih == "ke1") {
            await conn.sendButton(m.chat, text.trim(), author, knimg, [
                [emojis + " All Menu", _p + "allmenu"],
                [emojis + " List Menu", _p + "menulist"]
            ], fakes, fakefb)
        }
        if (pilih == "ke2") {
            await conn.send2ButtonLoc(m.chat, knimg, text.trim(), author, emojis + " All Menu", _p + "allmenu", emojis + " List Menu", _p + "menulist", fakes, fakefb)
        }
        if (pilih == "ke3") {
            await conn.send2ButtonVid(m.chat, knimg, text.trim(), author, emojis + " All Menu", _p + "allmenu", emojis + " List Menu", _p + "menulist", fakes, adReplyS)
        }
        if (pilih == "ke4") {
            await conn.sendTemplateButtonLoc(m.chat, knimg, text.trim(), author, emojis + " List Menu", _p + "menulist", fakes, fakefb)
        }
        if (pilih == "ke5") {
            await conn.relayMessage(m.chat, {
                requestPaymentMessage: {
                    currencyCodeIso4217: "USD",
                    amount1000: fsizedoc,
                    requestFrom: m.sender,
                    noteMessage: {
                        extendedTextMessage: {
                            text: text.trim(),
                            contextInfo: {
                                mentionedJid: [m.sender],
                                externalAdReply: {
                                    showAdAttribution: true
                                }
                            }
                        }
                    }
                }
            }, {})
        }
        if (pilih == "ke6") {
            await conn.send2ButtonDoc(m.chat, text.trim(), author, emojis + " All Menu", _p + "allmenu", emojis + " List Menu", _p + "menulist", fakes, adReply)
        }

        // Biasa
        if (pilih) {
            let biasa = "_Ketik *.menubiasa* jika menu tidak muncul_"
            await conn.sendMessage(m.chat, { text: biasa }, { quoted: m })
            }
        // Sound
        var vn = "https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/bot.mp3"
        await conn.sendMessage(m.chat, { audio: { url: vn }, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,100,0,100,0] }, { quoted: m })
        */
        // Biasa
        await conn.sendMessage(m.chat, {
            text: text.trim(),
            contextInfo: {
                externalAdReply: {
                    title: wm,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnail: await conn.resize(pp, 300, 175),
                    sourceUrl: "",
                    mediaUrl: pp,
                },
                mentionedJid: [m.sender],
            },
        }, {
            ephemeralExpiration: ephemeral
        });
        await conn.sendReact(m.chat, "✅", m.key)
        // Biasa
    } catch (e) {
        await conn.reply(m.chat, "Maaf, menu sedang error", m)
        throw e
    }
}
handler.command = /^(allmenu|help|\?)$/i

handler.exp = 3

export default handler
//----------- FUNCTION -------

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
}

function clockStringP(ms) {
    let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
}

function ucapan() {
    const time = moment.tz("Asia/Jakarta").format("HH")
    let res = "Selamat DiniHari"
    if (time >= 4) {
        res = "Good Morning"
    }
    if (time >= 10) {
        res = "Good Afternoon"
    }
    if (time >= 15) {
        res = "Good Afternoon"
    }
    if (time >= 18) {
        res = "Good Night"
    }
    return res
}
