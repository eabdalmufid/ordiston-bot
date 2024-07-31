import uploadImage from '../lib/uploadImage.js'
import {
    webp2png
} from '../lib/webp2mp4.js'
import fs from 'fs'

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let keyList = ['wYj4CmzTa1CJX2YVsCZdnsZq', 'hz99DPWitBbRAgnjTrtG3rEF', 'aGSQ7rF4TnnUeytKEbX72fSN']
    let nobgKey = keyList[Math.floor(Math.random() * keyList.length)]
    await m.reply(wait)
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        try {
        const img = await q.download()
                const formData = new FormData()
                formData.append('size', 'auto')
                formData.append('image_file', new Blob([new Uint8Array(img)], {
                    type: 'image/png'
                }))
                const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Api-Key': nobgKey,
                    },
                })
                const buffer = await response.arrayBuffer()
                await conn.sendFile(m.chat, Buffer.from(buffer), '', '*Made by:* api.remove.bg', m)
            
        } catch (e) {
            try {
                let img = await q.download?.()
                let out = await uploadImage(img)
                let url = "https://removebg.api.akuari.my.id/other/removebgg?gambar=" + out
                await conn.sendFile(m.chat, url, 'removebg.png', '*Made by:* akuari', m)
            } catch (e) {
                let img = await webp2png(await q.download()),
                url = API('lolhuman', '/api/removebg', {
                    img
                }, 'apikey')
            await conn.sendFile(m.chat, url, 'removebg.png', '*Made by:* lolhuman', m)
            }
        }
    } else {
        m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
    }
}

handler.help = ['removebg']
handler.tags = ['tools']
handler.command = /^(no|remove)bg$/i

export default handler