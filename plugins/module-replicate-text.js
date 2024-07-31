
import fetch from 'node-fetch'
import Replicate from 'replicate'

let handler = async (m, {
    conn,
    usedPrefix,
    args,
    command
}) => {
    let query = "Input Code:\n.replicatext console"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    
    let model =
  "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478"
    if (text) {
        await m.reply(wait)
        let hasil = await textReplicate(text, model, "3a4886dd3230e523600d3b555f651dc82aba3a4e")
        await conn.sendFile(m.chat, hasil[0], "result", "Result:\n", m)
    } else throw eror
}
handler.help = ['replicatext']
handler.tags = ['internet', 'tools']
handler.command = /^replicatext$/i
export default handler


async function textReplicate(prompt, models, ApiKey) {
const replicate = new Replicate({
  auth: ApiKey
})
const input = {
  prompt: prompt
}
const output = await replicate.run(models, { input })
return output
}