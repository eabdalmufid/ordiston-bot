import fetch from "node-fetch"
import uploadImage from "../lib/uploadImage.js"
const {
    NeoxrApi
} = await (await import("../lib/neoxr.js"))
import fs from "fs"

let handler = async (m, {
    conn
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ""
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        await m.reply(wait)
        try {
            let img = await q.download?.()
            let out = await uploadImage(img)
            let neo = new NeoxrApi("kyaOnechan")
            let response = await neo.remini(out)
            if (response.status && response.data) {
                const imageBuffer = base64ToBuffer(response.data.image);

                if (response.data.url) {
                    await conn.sendFile(m.chat, response.data.url || imageBuffer, "", "*[ REMINI URL ]*\n" + (response.data.url ? response.data.url : "Url tidak ada"), m)
                }

                if (response.data.image) {
                    await conn.sendFile(m.chat, imageBuffer || imageBuffer, "", "*[ REMINI IMAGE]*\n" + (response.data.url ? response.data.url : "Url tidak ada"), m)
                }
            } else throw "Invalid image response"

        } catch (e) {
            await m.reply(eror)
        }
    } else throw "Reply imagenya"
}
handler.help = ["remini"]
handler.tags = ["tools"]
handler.command = ["remini"]
handler.premium = true
export default handler

function base64ToBuffer(base64Image) {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    return Buffer.from(base64Data, "base64");
}