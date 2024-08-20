import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {

    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} japan`
    let f = await fetch(`https://api.lolhuman.xyz/api/shopee?apikey=sonelganz&query=${text}`)
    let xx = await f.json()
    let str = xx.result.map((v, index) => {
        return `${1 + index}. *${v.name}*

💰 *Price:* *RP* ${v.price}
🛒 *Sold:* ${v.sold}
📦 *Stock:* ${v.stock}
📍 *Shop Location:* ${v.shop_loc}

🔗 *Product Link:*
${v.link_produk}
🖼️ *Image Cover:*
${v.image_cover}

📝 *Description:* ${v.desc}
${cmenua}
`.trim()
    }).join(`\n\n*${htki} SHOPEE ${htka}*\n\n`)

    let weem = `📮 *Note:* Jangan beli sembarangan`
    let mim_ = ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/rtf"]
    await conn.sendButton(m.chat, str, weem, Buffer.alloc(0), [
        ['All Menu', usedPrefix + 'allmenu'],
        ['List Menu', usedPrefix + 'menulist']
    ], m, {
        quoted: fakes,
        mimetype: mim_.getRandom(),
        fileName: ucapan,
        pageCount: fpagedoc,
        fileLength: fsizedoc,
        seconds: fsizedoc,
        jpegThumbnail: await (await fetch(xx.result[0].image_cover)).buffer(),
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: wm,
                body: botdate,
                sourceUrl: xx.result[0].link_produk,
                thumbnail: await (await fetch(xx.result[0].image_cover)).buffer(),
            }
        }
    })
}

handler.help = ['shopii'].map(v => v + ' <app>')
handler.command = ['shopii']
handler.tags = ['internet']

export default handler