import fetch from 'node-fetch'
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {

    let q = m.quoted ? m.quoted : m
    let mime = q.mediaType || ''
    if (/image|video|audio|sticker|document/.test(mime)) {
        let media = await q.download()
        let res = await recognizeAudio(media)
        let aduiotext = res.match('"text": "(.*)",')[1].trim();
        await m.reply(aduiotext)
    } else throw "Reply media vn"

}
handler.help = ["witai"]
handler.tags = ["tools"]

handler.command = /^(witai)$/i

export default handler

async function recognizeAudio(input) {
    let result = await fetch('https://api.wit.ai/speech?v=20211210', {
            method: "POST",
            headers: {
                Authorization: "Bearer SPVMC7DYW5SJWTSNWQJIL33I6LICH5LK",
                "Content-Type": "audio/mpeg3",
            },
            body: input,
        })
        .then(res => res.text())
    return result
}
