import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, {
    text,
    args,
    usedPrefix,
    command
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    let link = await (isTele ? uploadImage : uploadFile)(media)
    let res = await (await fetch("https://api.ocr.space/parse/imageurl?apikey=helloworld&url=" + link + "&language=jpn")).json()
    await m.reply("*Result:*\n\n" + res.ParsedResults[0].ParsedText)
}
handler.tags = ["tools"]
handler.help = ["ocrj ( Reply media )"]
handler.command = ["ocrj"]

export default handler