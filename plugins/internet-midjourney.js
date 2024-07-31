import Replicate from 'replicate'
import fetch from "node-fetch"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) throw "input text"
    try {
        let model = 'prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb'
        if (text) {
            await m.reply(wait)
            let hasil = await textReplicate(text, model, "3a4886dd3230e523600d3b555f651dc82aba3a4e")
            await conn.sendFile(m.chat, hasil[0] || "https://api.yanzbotz.my.id/api/text2img/midjourney?prompt=" + text, text, "*[ Result ]*\n" + text, m)
        }
    } catch (e) {
        throw eror
    }
}
handler.help = ["midjourney"]
handler.tags = ["internet"]
handler.command = /^midjourney$/i

export default handler

async function textReplicate(prompt, models, ApiKey) {
    const replicate = new Replicate({
        auth: ApiKey
    })
    const input = {
        prompt: prompt
    }
    const output = await replicate.run(models, {
        input
    })
    return output
}