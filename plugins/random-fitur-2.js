import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (command == 'ceritahoror') {
let res = await fetch(`https://api.lolhuman.xyz/api/ceritahoror?apikey=${global.lolkey}`)
  let sul = await res.json()
  let has = sul.result
  await conn.sendButton(m.chat, `*Judul:* ${has.title}
  *Desc:* ${has.desc}
  *Story:* ${has.story}`, author, has.thumbnail, [
                ['Next', `${usedPrefix + command}`]
            ], fakes, adReply)
}

if (command == 'growiki') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} magplant`

let res = await fetch(`https://api.lolhuman.xyz/api/growiki?apikey=${global.lolkey}&query=${text}`)
  let sul = await res.json()
  let has = sul.result
  await conn.sendButton(m.chat, `*Name:* ${has.name}
  *Desc:* ${has.desc}
  *prop:* ${has.prop}
  *info:* ${has.info}
  *Story:* ${has.prop}
`, author, has.img, [
                ['Next', `${usedPrefix + command}`]
            ], fakes, adReply)
}

if (command == 'growstocks') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} magplant`

let res = await fetch(`https://api.lolhuman.xyz/api/growstocks?apikey=${global.lolkey}&query=${text}`)
  let sul = await res.json()
  let has = sul.result
  await conn.sendButton(m.chat, `*Name:* ${has.name}
  *Desc:* ${has.desc}
  *price status:* ${has.price_status}
  *demand status:* ${has.demand_status}
  *source:* ${has.source}
  *edited:* ${has.edited}
`, author, has.img, [
                ['Next', `${usedPrefix + command}`]
            ], fakes, adReply)
}

if (command == 'gsearch') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} magplant`

let res = await fetch(`https://api.lolhuman.xyz/api/gsearch?apikey=${global.lolkey}&query=${text}`)
  let sul = await res.json()
  let has = sul.result
  await conn.sendButton(m.chat, `*Name:* ${has.title}
  *Desc:* ${has.desc}
  *price status:* ${has.link}
`, author, null, [
                ['Next', `${usedPrefix + command}`]
            ], fakes, adReply)
}

if (command == 'gsmarena') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} oppo`

let res = await fetch(`https://api.lolhuman.xyz/api/gsmarena?apikey=${global.lolkey}&query=${text}`)
  let sul = await res.json()
  let has = sul.result
  await conn.sendButton(m.chat, `*Name:* ${has.phone_name}
  *Speed:* ${has.specification.network.speed}
  *Launch:* ${has.specification.launch.status}
  *Body:* ${has.specification.body.build}
  *Dis status:* ${has.specification.display.displaytype}
  *Plat:* ${has.specification.platform.os}
  ${has.specification.platform.chipset}
  ${has.specification.platform.cpu}
  *Mem:* ${has.specification.memory.internalmemory}
  *Batre:* ${has.specification.battery.batdescription1}
`, author, has.phone_image, [
                ['Next', `${usedPrefix + command}`]
            ], fakes, adReply)
}

if (command == 'jadwalbola') {
let f = await fetch(`https://api.lolhuman.xyz/api/jadwalbola?apikey=${global.lolkey}`)
let xx = await f.json()
let v = xx.result
let teks = v.map(v => {
return `
*Hari:* ${v.hari}
  *Jam:* ${v.jam}
  *Event:* ${v.event}
  *Match:* ${v.match}
  *Tv:* ${v.tv}
      `.trim()
  }).filter(v => v).join('\n\n▣═━–〈 *SEARCH* 〉–━═▣\n\n')
  //m.reply(teks)
  await conn.sendButton(m.chat, teks, wm, null, [
                ['Search!', `${usedPrefix + command}`]
            ], fakes, adReply)
}

if (command == 'jadwaltv') {
let json = await fetch(`https://api.lolhuman.xyz/api/jadwaltv/now?apikey=${global.lolkey}`)
        let has = await json.json()
        await conn.sendButton(m.chat, `
  *antv:* ${has.result.antv}
  *gtv:* ${has.result.gtv}
  *indosiar:* ${has.result.indosiar}
  *inewstv:* ${has.result.inewstv}
  *kompastv:* ${has.result.kompastv}
  *metrotv:* ${has.result.metrotv}
  *mnctv:* ${has.result.mnctv}
  *nettv:* ${has.result.nettv}
  *rcti:* ${has.result.rcti}
  *rtv:* ${has.result.rtv}
  *sctv:* ${has.result.sctv}
  *trans7:* ${has.result.trans7}
  *tvone:* ${has.result.tvone}
  *tvri:* ${has.result.tvri}
  `, author, has.phone_image, [
                ['Next', `${usedPrefix + command}`]
            ], fakes, adReply)
}

if (command == 'jalantikus') {
let f = await fetch(`https://api.lolhuman.xyz/api/jalantikus?apikey=${global.lolkey}`)
let xx = await f.json()
let v = xx.result
let teks = v.map(v => {
return `
*Name:* ${v.title}
  *time:* ${v.time}
  *link:* ${v.link}
  *category:* ${v.category}
      `.trim()
  }).filter(v => v).join('\n\n▣═━–〈 *SEARCH* 〉–━═▣\n\n')
  //m.reply(teks)
  await conn.sendButton(m.chat, teks, wm, null, [
                ['Search!', `${usedPrefix + command}`]
            ], fakes, adReply)
}

if (command == 'jaraktempuh') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} aceh banten`
let f = await fetch(`https://api.lolhuman.xyz/api/jaraktempuh?apikey=${global.lolkey}&kota1=${args[0]}&kota2=${args[1]}`)
let xx = await f.json()
let v = xx.result
let teks = v.map(v => {
return `
*Dari:* ${v.from.name}
*Ke:* ${v.to.name}

*Jarak:* ${v.jarak}
*kereta api:* ${v.kereta_api}
*pesawat:* ${v.pesawat}
*mobil:* ${v.mobil}
*motor:* ${v.motor}
*jalan kaki:* ${v.jalan_kaki}
      `.trim()
  }).filter(v => v).join('\n\n▣═━–〈 *SEARCH* 〉–━═▣\n\n')
  //m.reply(teks)
  await conn.sendButton(m.chat, teks, wm, null, [
                ['Search!', `${usedPrefix + command}`]
            ], fakes, adReply)
            
}

if (command == 'random') {
const sections = [
    {
	title: "Theme",
	rows: [
	{title: "ahegao", rowId: usedPrefix + 'dlrandom ahegao'},
{title: "animearmpits", rowId: usedPrefix + 'dlrandom animearmpits'},
{title: "animebooty", rowId: usedPrefix + 'dlrandom animebooty'},
{title: "animefeets", rowId: usedPrefix + 'dlrandom animefeets'},
{title: "animethighss", rowId: usedPrefix + 'dlrandom animethighss'},
{title: "biganimetiddies", rowId: usedPrefix + 'dlrandom biganimetiddies'},
{title: "blowjob", rowId: usedPrefix + 'dlrandom blowjob'},
{title: "chiisaihentai", rowId: usedPrefix + 'dlrandom chiisaihentai'},
{title: "ecchi", rowId: usedPrefix + 'dlrandom ecchi'},
{title: "hentai4everyone", rowId: usedPrefix + 'dlrandom hentai4everyone'},
{title: "hentaifemdom", rowId: usedPrefix + 'dlrandom hentaifemdom'},
{title: "hentai", rowId: usedPrefix + 'dlrandom hentai'},
{title: "hololewd", rowId: usedPrefix + 'dlrandom hololewd'},
{title: "lewdanimegirls", rowId: usedPrefix + 'dlrandom lewdanimegirls'},
{title: "loli", rowId: usedPrefix + 'dlrandom loli'},
{title: "milf", rowId: usedPrefix + 'dlrandom milf'},
{title: "neko", rowId: usedPrefix + 'dlrandom neko'},
{title: "sideoppai", rowId: usedPrefix + 'dlrandom sideoppai'},
{title: "trap", rowId: usedPrefix + 'dlrandom trap'},
{title: "waifu", rowId: usedPrefix + 'dlrandom waifu'},
{title: "yaoi", rowId: usedPrefix + 'dlrandom yaoi'}
	]
    }
]

const listMessage = {
  text: `⚡ Silakan pilih tema di tombol di bawah...\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah nsfw lagi`,
  footer: global.wm,
  title: `⎔───「 ${command} 」───⎔`,
  buttonText: `Random Disini`,
  sections
}
conn.sendMessage(m.chat, listMessage, {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: wm,jpegThumbnail: Buffer.alloc(0)}}}, ephemeralExpiration: ephemeral })
}

if (command == 'random2') {
const sections = [
    {
	title: "Theme",
	rows: [
	{title: "anal", rowId: usedPrefix + 'dlrandom2 anal'},
{title: "baka", rowId: usedPrefix + 'dlrandom2 baka'},
{title: "bj", rowId: usedPrefix + 'dlrandom2 bj'},
{title: "blowjob", rowId: usedPrefix + 'dlrandom2 blowjob'},
{title: "classic", rowId: usedPrefix + 'dlrandom2 classic'},
{title: "cuddle", rowId: usedPrefix + 'dlrandom2 cuddle'},
{title: "cum", rowId: usedPrefix + 'dlrandom2 cum'},
{title: "cum_jpg", rowId: usedPrefix + 'dlrandom2 cum_jpg'},
{title: "ero", rowId: usedPrefix + 'dlrandom2 ero'},
{title: "erofeet", rowId: usedPrefix + 'dlrandom2 erofeet'},
{title: "erok", rowId: usedPrefix + 'dlrandom2 erok'},
{title: "erokemo", rowId: usedPrefix + 'dlrandom2 erokemo'},
{title: "eron", rowId: usedPrefix + 'dlrandom2 eron'},
{title: "eroyuri", rowId: usedPrefix + 'dlrandom2 eroyuri'},
{title: "feed", rowId: usedPrefix + 'dlrandom2 feed'},
{title: "feet", rowId: usedPrefix + 'dlrandom2 feet'},
{title: "feetg", rowId: usedPrefix + 'dlrandom2 feetg'},
{title: "femdom", rowId: usedPrefix + 'dlrandom2 femdom'},
{title: "fox_girl", rowId: usedPrefix + 'dlrandom2 fox_girl'},
{title: "futanari", rowId: usedPrefix + 'dlrandom2 futanari'},
{title: "gasm", rowId: usedPrefix + 'dlrandom2 gasm'},
{title: "hentai", rowId: usedPrefix + 'dlrandom2 hentai'},
{title: "holo", rowId: usedPrefix + 'dlrandom2 holo'},
{title: "holoero", rowId: usedPrefix + 'dlrandom2 holoero'},
{title: "hololewd", rowId: usedPrefix + 'dlrandom2 hololewd'},
{title: "kemonomimi", rowId: usedPrefix + 'dlrandom2 kemonomimi'},
{title: "keta", rowId: usedPrefix + 'dlrandom2 keta'},
{title: "kiss", rowId: usedPrefix + 'dlrandom2 kiss'},
{title: "kuni", rowId: usedPrefix + 'dlrandom2 kuni'},
{title: "les", rowId: usedPrefix + 'dlrandom2 les'},
{title: "lewd", rowId: usedPrefix + 'dlrandom2 lewd'},
{title: "lewdk", rowId: usedPrefix + 'dlrandom2 lewdk'},
{title: "lewdkemo", rowId: usedPrefix + 'dlrandom2 lewdkemo'},
{title: "neko", rowId: usedPrefix + 'dlrandom2 neko'},
{title: "ngif", rowId: usedPrefix + 'dlrandom2 ngif'},
{title: "nsfw_avatar", rowId: usedPrefix + 'dlrandom2 nsfw_avatar'},
{title: "nsfw_neko_gif", rowId: usedPrefix + 'dlrandom2 nsfw_neko_gif'},
{title: "poke", rowId: usedPrefix + 'dlrandom2 poke'},
{title: "pussy", rowId: usedPrefix + 'dlrandom2 pussy'},
{title: "pussy_jpg", rowId: usedPrefix + 'dlrandom2 pussy_jpg'},
{title: "random_hentai_gif", rowId: usedPrefix + 'dlrandom2 random_hentai_gif'},
{title: "smug", rowId: usedPrefix + 'dlrandom2 smug'},
{title: "solo", rowId: usedPrefix + 'dlrandom2 solo'},
{title: "solog", rowId: usedPrefix + 'dlrandom2 solog'},
{title: "tickle", rowId: usedPrefix + 'dlrandom2 tickle'},
{title: "tits", rowId: usedPrefix + 'dlrandom2 tits'},
{title: "trap", rowId: usedPrefix + 'dlrandom2 trap'},
{title: "waifu", rowId: usedPrefix + 'dlrandom2 waifu'},
{title: "wallpaper", rowId: usedPrefix + 'dlrandom2 wallpaper'},
{title: "yuri", rowId: usedPrefix + 'dlrandom2 yuri'}
	]
    }
]

const listMessage = {
  text: `⚡ Silakan pilih tema di tombol di bawah...\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah nsfw lagi`,
  footer: global.wm,
  title: `⎔───「 ${command} 」───⎔`,
  buttonText: `Random Disini`,
  sections
}
conn.sendMessage(m.chat, listMessage, {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: wm,jpegThumbnail: Buffer.alloc(0)}}}, ephemeralExpiration: ephemeral})
}

}
handler.command = handler.help = ['ceritahoror', 'growiki', 'growstocks', 'gsearch', 'gsmarena', 'jadwalbola', 'jadwaltv', 'jalantikus', 'jaraktempuh', 'random', 'random2']
handler.tags = ['random']

export default handler