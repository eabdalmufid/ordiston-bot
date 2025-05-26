import { Prodia } from "prodia.js";
const apiKey = "df165bab-9893-4f02-92bf-e8b09592b43a";
const prodia = Prodia(apiKey);

import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'
let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    let link = await (isTele ? uploadImage : uploadFile)(media)
    
    await m.reply(wait)
    try {
        
        const generateImageParams = {
            imageUrl: link,
            imageData: media.toString('base64'),
            resize: 4
        };
        const openAIResponse = await generateImage(generateImageParams);
        if (openAIResponse) {
            const result = openAIResponse;
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: result.imageUrl
                },
                caption: `Nih effect *upscale* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m, ephemeralExpiration: ephemeral
            });
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["tohdx *[Reply image]*"]
handler.tags = ["ai"]
handler.command = /^(tohdx)$/i
export default handler

async function generateImage(params) {
    const generate = await prodia.upscale(params);

    while (generate.status !== "succeeded" && generate.status !== "failed") {
        await new Promise((resolve) => setTimeout(resolve, 250));

        const job = await prodia.getJob(generate.job);

        if (job.status === "succeeded") {
            return job;
        }
    }
}