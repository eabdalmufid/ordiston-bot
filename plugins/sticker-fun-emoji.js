
import wibusoft from 'wibusoft'

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    
    var style = [
"Adventurer",
"Adventurer-Neutral",
"Avataaars",
"Avataaars-Neutral",
"Big-Ears",
"Big-Ears-Neutral",
"Big-Smile",
"Bottts",
"Bottts-Neutral",
"Croodles",
"Croodles-Neutral",
"Fun-Emoji",
"Icons",
"Identicon",
"Initials",
"Lorelei",
"Lorelei-Neutral",
"Micah",
"Miniavs",
"Notionists",
"Notionists-Neutral",
"Open-Peeps",
"Personas",
"Pixel-Art",
"Pixel-Art-Neutral",
"Shapes",
"Thumbs"
]
var sty = style.map((v) => v.toLowerCase())
var sep = text.split(/[^\w\s]/g)
var sa = sep[0]
if (sa > 26) throw "lebih"
var du = sep[1]
if (!(sa && du)) throw "input .dicebear 9|felix"
m.reply(wait)
       var fakec = "https://api.dicebear.com/6.x/" + sty[sa] + "/png?seed=" + encodeURIComponent(du)
        var out = await wibusoft.tools.makeSticker(fakec, {
    author: packname,
    pack: name,
    keepScale: true,
    circle: true
})
        
        try {
        await m.reply(out)
        } catch (e) {
        throw eror
        }
        
}
handler.help = ['dicebear']
handler.tags = ['sticker']
handler.command = /^(dicebear)$/i

export default handler
