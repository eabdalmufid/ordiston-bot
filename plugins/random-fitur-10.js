import fetch from 'node-fetch'
import fs from 'fs'
let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command }) => {

// Fake 🤥
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hoppai.getRandom())
let name = await conn.getName(who)
let imgr = flaaa

if (command == 'createqr') {
if (!text) throw `Contoh:\n${usedPrefix + command} Teks`
let res = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${text}`
await conn.sendFile(m.chat, res, 'image.png', "Your Text: \n" + text, m)
}

if (command == 'catboys') {
if (args[0] == 'img') {
let f = await fetch(`https://api.catboys.com/img`)
let x = await f.json()
await conn.sendFile(m.chat, x.url, 'image.png', wm, m)
}
if (args[0] == '8ball') {
let f = await fetch(`https://api.catboys.com/8ball`)
let x = await f.json()
await conn.sendFile(m.chat, x.url, 'image.png', wm, m)
}
if (args[0] == 'dice') {
let f = await fetch(`https://api.catboys.com/dice`)
let x = await f.json()
await conn.sendFile(m.chat, x.url, 'image.png', wm, m)
}
if (args[0] == 'catboy') {
let f = await fetch(`https://api.catboys.com/catboy`)
let x = await f.json()
await conn.sendButton(m.chat, `*Pencet untuk mendengar hasil:*`, wm, null, [
                ['Awkawk', `${usedPrefix}tts ${x.response}`]
            ], fakes, adReply)
}
await conn.sendButton(m.chat, `*Silahkan pilih di bawah:*
${usedPrefix + command} img
${usedPrefix + command} 8ball
${usedPrefix + command} catboy
`, wm, null, [
                ['IMG', `${usedPrefix + command} img`],
                ['8BALL', `${usedPrefix + command} 8ball`]
            ], fakes, adReply)
}

if (command == 'nekos') {
if (!args[0]) throw `Contoh:\n${usedPrefix + command} baka

*List:*
• kitsune
• neko
• waifu
• baka
• bite
• blush
• bored
• cry
• cuddle
• dance
• facepalm
• feed
• handhold
• happy
• highfive
• hug
• kick,kiss
• laugh
• pat
• poke
• pout
• punch
• shoot
• shrug
• slap
• sleep
• smile
• smug
• stare
• think
• thumbsup
• tickle
• wave
• wink
`

let f = await fetch(`https://nekos.best/api/v2/${args[0]}`)
let x = await f.json()
if (args[0] == 'neko') {
await conn.sendFile(m.chat, x.results[0].url, '', x.results[0].anime_name, m)
}
if (args[0] == 'waifu') {
await conn.sendFile(m.chat, x.results[0].url, '', x.results[0].anime_name, m)
}
if (args[0] == 'kitsune') {
await conn.sendFile(m.chat, x.results[0].url, '', x.results[0].anime_name, m)
}
try {
await conn.sendFile(m.chat, x.results[0].url, '', x.results[0].anime_name, false, { mimetype: 'image/gif', thumbnail: Buffer.alloc(0) })
} catch (e) {
await conn.sendFile(m.chat, x.results[0].url, '', x.results[0].anime_name, m)
}
}

if (command == 'avatar') {
if (!text) throw `Contoh:\n${usedPrefix + command} 853c80ef3c3749fdaa49938b674adae6`
    let nm = ["🪄 avatars", "🗿 head", "🦧 body", "🥷 skins", "🐦 capes"]
    let av = ["https://crafatar.com/avatars/", "https://crafatar.com/renders/head/", "https://crafatar.com/renders/body/", "https://crafatar.com/skins/", "https://crafatar.com/capes/"]
    
	let row = Object.keys(av, nm).map((v, index) => ({
		title: nm[v],
		description: 'By: ' + wm,
		rowId: usedPrefix + 'get ' + av[v] + args[0]
	}))
	let button = {
		buttonText: `Avatar Disini`,
		description: `⚡ Silakan pilih Avatar di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, button, row, m)
}

if (command == 'randomuser') {
let ft = await fetch('https://randomuser.me/api/')
let res = await ft.json()
let v = res.results[0]
let cp = `
v.gender:* ${v.gender}
*name.title:* ${v.name.title}
*name.first:* ${v.name.first}
*name.last:* ${v.name.last}
*location.street.name:* ${v.location.street.name}
*login.uuid:* ${v.login.uuid}
*login.username:* ${v.login.username}
*login.password:* ${v.login.password}
*login.salt:* ${v.login.salt}
*login.md5:* ${v.login.md5}
*login.sha1:* ${v.login.sha1}
*login.sha256:* ${v.login.sha256}
*registered.date:* ${v.registered.date}
*cell:* ${v.cell}
*picture.large:* ${v.picture.large}
`
conn.sendButton(m.chat, cp, wm, v.picture.large, [
                ['Get Avatar', `${usedPrefix}avatar ${v.login.uuid}`]
            ], fakes, adReply)
}

		
if (command == 'karakter') {
  if (!text) throw `Masukkan query!`
  let res = await fetch(`https://api.jikan.moe/v4/anime?q=${text}`)
  let json = await res.json()
  let kar = json.data
  let row = Object.values(kar).map((v, index) => ({
		title: ++index + dmenub + ' ' + v.name,
		description: '\n*ID* ' + v.mal_id + '\n💭 *Nickname* ' + v.alternative_names + '\n🔗 *Link* ' + v.url + '\n👤 *Character Type* ' + Object.values(v.manga).map(v => v.type) + '\n👤 *name* ' + Object.values(v.manga).map(v => v.name) + '\n👤 *mal_id* ' + Object.values(v.manga).map(v => v.mal_id) + '\n👤 *url* ' + Object.values(v.manga).map(v => v.url) + '\n*Image* ' + v.image_url,
		rowId: usedPrefix + 'get ' + v.image_url
	}))
	let button = {
		buttonText: `${command} Disini`,
		description: `⚡ ${name} Silakan pilih ${command} di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, button, row, m)
}


}
handler.command = handler.help = ['createqr', 'catboys', 'nekos', 'avatar', 'randomuser', 'karakter']
handler.tags = ['random']

export default handler

function formatDate(n, locale = 'id') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}