import { wallpaper } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
let arr_url = ["aesthetic",
"akira",
"akiyama",
"ana",
"ana",
"anime",
"anjing",
"asuna",
"ayuzawa",
"boneka-chucky",
"boruto",
"cecan2",
"cecan",
"chiho",
"chitoge",
"cogan2",
"cogan",
"cyberspace",
"deidara",
"doraemon",
"eba",
"elaina",
"emilia",
"erza",
"gaming",
"gremory",
"hekel",
"hestia",
"hinata",
"inori",
"islami",
"isuzu",
"itachi",
"itori",
"jeni",
"jiso",
"justina",
"kaga",
"kagura",
"kaori",
"kartun",
"katakata",
"keneki",
"kotori",
"kpop",
"kucing",
"kurumi",
"loli",
"madara",
"megumin",
"mikasa",
"miku",
"minato",
"mobil",
"montor",
"mountain",
"naruto",
"nezuko",
"nsfwloli",
"onepiece",
"pentol",
"pokemon",
"ppcouple",
"programing",
"pubg",
"rize",
"rose",
"ryujin",
"sagiri",
"sakura",
"sasuke",
"satanic",
"shina",
"shinka",
"shinomiya",
"shizuka",
"shota",
"tatasurya",
"tejina",
"teknologi",
"toukachan",
"trans",
"tsunade",
"waifu2",
"waifu",
"wallhp",
"yotsuba",
"yuki",
"yumeko",
"yuri"]
    let listSections = []
	Object.keys(arr_url).map((v, index) => {
	listSections.push(["Model [ " + ++index + ' ]', [
          [arr_url[v].toUpperCase(), usedPrefix + "get https://web-production-7c28.up.railway.app/api/wallpaper/" + arr_url[v] + "?apikey=APIKEY", "➥"]
        ]])
	})
	if (!text) return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
    const res = await (/2/.test(command) ? wallpaper : wallpaper)(text)
    const img = res[Math.floor(Math.random() * res.length)]
    conn.sendButton(m.chat, `Result from *${text}*`, wm, await(await fetch(img)).buffer(), [['🎀 Menu', '/menu']], fakes, adReply)
}
handler.help = ['', '2'].map(v => 'wallpaper' + v + ' <query>')
handler.tags = ['downloader']

handler.command = /^(wallpaper2?)$/i

export default handler