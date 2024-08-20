import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import fs from 'fs'
import jimp from 'jimp'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command, isPrems, isOwner }) => {
let frep = { contextInfo: { externalAdReply: {title: global.wm, body: global.author, sourceUrl: snh, thumbnail: fs.readFileSync('./thumbnail.jpg')}}}

let imgr = flaaa
let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]
  

if (command == 'brainfuck') {
if (!text) return m.reply(`Example: ${usedPrefix + command} blablabla`)

let res = await fetch(`https://tools.helixs.id//API/brainfuck.php?encode&text=${text}`)
let v = await res.json()
let caption = `*Result:*

${v.result}`
m.reply(caption)
}
if (command == 'heliximage') {
if (!text) return m.reply(`Example: ${usedPrefix + command} blablabla`)

let res = await fetch(`https://tools.helixs.id//API/random-image?data=${text}`)
let v = await res.json()
let gett = await(await fetch(v.result.getRandom())).buffer()
await conn.sendButton(m.chat, 'Url:', v.result.getRandom(), gett, [
                ['Sticker', '.s']
            ], fakes, adReply)
}

if (command == 'htmlesc') {
if (!text) return m.reply(`Example: ${usedPrefix + command} blablabla`)

let res = await fetch(`https://tools.helixs.id//API/html-escape.php?text=${text}`)
let v = await res.json()
let caption = `*Result:*

${v.text}`
m.reply(caption)
}

if (command == 'imglink') {
if (!text) return m.reply(`Example: ${usedPrefix + command} https://google.com`)

let res = await fetch(`https://tools.helixs.id//API/images.php?url=${text}`)
let v = await res.json()
let caption = `*Result:*

${Array.from(v.result)}`
m.reply(caption)
}

if (command == 'shortenlink') {
if (!text) return m.reply(`Example: ${usedPrefix + command} https://google.com`)

let res = await fetch(`https://tools.helixs.id//API/shorten-link.php?url=${text}`)
let v = await res.json()
let caption = `*Result:*
${v.result}
`
m.reply(caption)
}

if (command == 'akuari') {
if (!args[0]) throw `Contoh:\n${usedPrefix + command} latest

*List:*
• alquran
• likeedl
• storysad
• textpro
• textpro2
• ephoto
• ephoto2
• asupan
• rimage
• alpha
• konachan
`
if (args[0] == 'alquran') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |9`)
let res = await fetch(`https://api.akuari.my.id/islami/alquran?query=${one}`)
let x = await res.json()
let v = x.result.verses
let listSections = []
    Object.values(v).map((v, index) => {
    let cp = `*Number:* ${v.number}
*English:* ${v.translation_en}
*Indonesia:* ${v.translation_id}
`
        listSections.push(["Num. " + ++index, [
            [x.result.recitations[0].name + "\n\n", usedPrefix + "get " + x.result.recitations[0].audio_url, cp],
            [x.result.recitations[1].name + "\n\n", usedPrefix + "get " + x.result.recitations[1].audio_url, cp],
            [x.result.recitations[2].name + "\n\n", usedPrefix + "get " + x.result.recitations[2].audio_url, cp],
        ]])
    })
    return conn.sendList(m.chat, htki + " 🗒️ List Ayat " + htka, "⚡ Silakan pilih ayat dari " + x.result.name + " ( " + x.result.name_translations.ar + " )", author, "[ Ayat ]", listSections, m)
}
if (args[0] == 'likeedl') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |https://likee.video/@vicky_marpaung/video/7006676628722311449`)
let res = await fetch(`https://api.akuari.my.id/downloader/likeedl?link=${text}`)
let v = await res.json()
let caption = `*Result:*
*title:* ${v.url}
*title:* ${v.title}
*duration:* ${v.duration}
*source:* ${v.source}
*medias:* ${v.medias[0].url}
*quality:* ${v.medias[0].quality}
*extension:* ${v.medias[0].extension}
*size:* ${v.medias[0].size}
*formattedSize:* ${v.medias[0].formattedSize}
`
await conn.sendButton(m.chat, caption, wm, `${v.thumbnail}`, [
                ['Get', `${usedPrefix}get ${v.medias[0].url}`]
            ], fakes, adReply)
}

if (args[0] == 'storysad') {
let res = `https://api.akuari.my.id/downloader/storysad`
let caption = `*Result:*
`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Menu', `${usedPrefix}menu`],
                ['Next', `${usedPrefix + command} ${args[0]}`]
            ], fakes, adReply)
}
if (args[0] == 'textpro') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |teks|link`)

let res = await fetch(`https://api.akuari.my.id/textpro/scraper-1?text=${one}&link=${two}`)
let v = await res.json()
let caption = `*Result:*
*respon:* ${v.respon}
`
await conn.sendButton(m.chat, caption, wm, v.respon, [
                ['Picture', `${usedPrefix}get ${v.respon}`]
            ], fakes, adReply)
}
if (args[0] == 'textpro2') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |teks|teks|link`)

let res = await fetch(`https://api.akuari.my.id/textpro/scraper-2?text=${one}&text2=${two}&link=${three}`)
let v = await res.json()
let caption = `*Result:*
*respon:* ${v.respon}
`
await conn.sendButton(m.chat, caption, wm, v.respon, [
                ['Picture', `${usedPrefix}get ${v.respon}`]
            ], fakes, adReply)
}
if (args[0] == 'ephoto') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |teks|link`)

let res = await fetch(`https://api.akuari.my.id/ephoto/scraper-1?text=${one}&link=${two}`)
let v = await res.json()
let caption = `*Result:*
*respon:* ${v.respon}
`
await conn.sendButton(m.chat, caption, wm, v.respon, [
                ['Picture', `${usedPrefix}get ${v.respon}`]
            ], fakes, adReply)
}
if (args[0] == 'ephoto2') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |teks|teks|link`)

let res = await fetch(`https://api.akuari.my.id/ephoto/scraper-2?text=${one}&text2=${two}&link=${three}`)
let v = await res.json()
let caption = `*Result:*
*respon:* ${v.respon}
`
await conn.sendButton(m.chat, caption, wm, v.respon, [
                ['Picture', `${usedPrefix}get ${v.respon}`]
            ], fakes, adReply)
}
if (args[0] == 'asupan') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |bocil

*List:*
• bocil
• cecan
• ghea
• hijab
• rika
• santuy
• ukhty
`)

let res = await fetch(`https://api.akuari.my.id/asupan/${one}`)
let v = await res.json()
let caption = `*Result:*
`
await conn.sendButton(m.chat, caption, wm, v.respon, [
                ['Get', `${usedPrefix}get ${v.respon}`]
            ], fakes, adReply)
}
if (args[0] == 'rimage') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |darkmeme17

*List:*
• darkmeme17
• darkjokes1
• harley
`)
let res = `https://api.akuari.my.id/randomimage/${one}`
let caption = `*Result:*
`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Menu', `${usedPrefix}menu`],
                ['Next', `${usedPrefix + command} ${args[0]}`]
            ], fakes, adReply)
}
if (args[0] == 'alpha') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |genshin`)
let res = `https://api.akuari.my.id/search/alphacoders?query=${one}`
let caption = `*Result:*
`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Menu', `${usedPrefix}menu`],
                ['Next', `${usedPrefix + command} ${args[0]} |${one}`]
            ], fakes, adReply)
}
if (args[0] == 'konachan') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |azur_lane`)
let res = `https://api.akuari.my.id/search/konachan?query=${one}`
let caption = `*Result:*
`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Menu', `${usedPrefix}menu`],
                ['Next', `${usedPrefix + command} ${args[0]} |${one}`]
            ], fakes, adReply)
}
}

if (command == 'impact') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} amber`

let f = await fetch(`https://impact.moe/api/characters/${text}`)
let x = await f.json()
let caption = `*birthday:* ${x.birthday}
*chineseVA:* ${x.chineseVA}
*constellation:* ${x.constellation}
*description:* ${x.description}
*element:* ${x.element}
*englishVA:* ${x.englishVA}
*faction:* ${x.faction}
*icon:* ${x.icon}
*id:* ${x.id}
*image:* ${x.image}
*japaneseVA:* ${x.japaneseVA}
*koreanVA:* ${x.koreanVA}
*name:* ${x.name}
*quote:* ${x.quote}
*rarity:* ${x.rarity}
*region:* ${x.region}
*squareCard:* ${x.squareCard}
*tier:* ${x.tier}
*title:* ${x.title}
*weapon:* ${x.weapon}
`
await conn.sendButton(m.chat, caption, wm, x.image, [
                ['Next', `${usedPrefix}${command} ${text}`]
            ], fakes, adReply)
}

if (command == 'ytreels') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://youtube.com/shorts/68dfq9ine1k`

let f = await fetch(`https://api.lolhuman.xyz/api/ytreels?apikey=327a6596e4c4baa20c756132&url=${text}`)
let x = await f.json()
let caption = `*title:* ${x.result.title}
*size:* ${x.result.size}
`
await conn.sendButton(m.chat, caption, wm, x.resukt.thumbnail, [
                ['Get', `${usedPrefix}get ${x.result.link}`]
            ], fakes, adReply)
}

}
handler.command = handler.help = ['akuari', 'brainfuck', 'heliximage', 'htmlesc', 'imglink', 'shortenlink', 'impact', 'ytreels']
handler.tags = ['info']

export default handler