import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, {
    conn,
    usedPrefix,
    args,
    text,
    command
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    let link = await (isTele ? uploadImage : uploadFile)(media)
    if (link && text) {
        m.reply(wait)
        let hasil = await Replicate(link, text, "3a4886dd3230e523600d3b555f651dc82aba3a4e");
        await conn.sendFile(m.chat, hasil.generated, "result", "ID:\n" + hasil.id, m)
    } else throw eror
}
handler.help = ['replicate']
handler.tags = ['internet', 'tools']
handler.command = /^replicate$/i
export default handler


async function Replicate(imageUrl, prompt, ApiKey) {
    try {
        // POST request to Replicate to start the image restoration generation process
        let startResponse = await fetch(
            "https://api.replicate.com/v1/predictions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token " + ApiKey,
                },
                body: JSON.stringify({
                    version: "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
                    input: {
                        image: imageUrl,
                        prompt: prompt
                    },
                }),
            }
        );
        let jsonStartResponse = await startResponse.json();
        let endpointUrl = jsonStartResponse.urls.get;
        const originalImage = jsonStartResponse.input.image;
        const roomId = jsonStartResponse.id;
        // GET request to get the status of the image restoration process & return the result when it's ready
        let generatedImage;
        while (!generatedImage) {
            // Loop in 1s intervals until the alt text is ready
            let finalResponse = await fetch(endpointUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token " + ApiKey,
                },
            });
            let jsonFinalResponse = await finalResponse.json();
            if (jsonFinalResponse.status === "succeeded") {
                generatedImage = jsonFinalResponse.output[1];
            } else if (jsonFinalResponse.status === "failed") {
                break;
            } else {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }
        if (generatedImage) {
            return {
                original: originalImage,
                generated: generatedImage,
                id: roomId
            }
        } else {
            console.log("Failed to restore image");
        }
    } catch (error) {
        // Increment their credit if something went wrong
        console.log("Failed to restore image");
    }
}