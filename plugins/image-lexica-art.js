const { NeoxrApi } = await(await import('../lib/neoxr.js'))
import fetch from 'node-fetch'
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {

var salah_input = "*Example:*\n" + usedPrefix + command + " cyberpunk \n*[ Menampilkan list gambar cyberpunk ]*\n"
if (!text) throw salah_input
try {
let neo = new NeoxrApi('kyaOnechan')
let res = await neo.diffusion(text)
let randm = res.data
    let resul = randm.getRandom()
    await m.reply(wait)
    await conn.sendFile(m.chat,
    resul.url, text, "*[ Result V1 ]*\n" + text, m)
} catch (e) {
try {
    let res = await(await fetch('https://lexica.art/api/v1/search?q=' + text)).json()
    let randm = res.images
    let resul = randm.getRandom()
    await m.reply(wait)
    await conn.sendFile(m.chat, 
    resul.src, text, "*[ Result V2 ]*\n" + resul.prompt, m)
    } catch (e) {
    await m.reply(eror)
    }
    }
}
handler.help = ["lexica"]
handler.tags = ['internet']
handler.command = ["lexica"]

export default handler