import fetch from "node-fetch"


let handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
if (!text) throw 'Example: .diffusion highly detailed, intricate, 4k, 8k, sharp focus, detailed hair, detailed'
m.reply(wait)
try {
conn.sendFile(m.chat, `https://api.xyroinee.xyz/api/ai/stablediffusion?q=${encodeURIComponent(text)}&apikey=${global.xyro}`, 'anu.jpg', `Prompt: ${text}`, m)
} catch (e) {
m.reply(eror)
}
    
}
handler.help = ['stabledif']
handler.tags = ['ai']
handler.command = /^(stabledif)$/i
handler.limit = true
export default handler