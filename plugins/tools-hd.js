import fetch from "node-fetch"
import uploadImage from '../lib/uploadImage.js'
import { ArtEnhance } from "../lib/art-enhance.js"
import fs from "fs"

import deepai from 'deepai'

deepai.setApiKey('04f02780-e0bd-44c1-afa2-14cf5a78948c')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
    	try {
			
            let media = await q.download()
		let sauce = await ArtEnhance(await uploadImage(media), "3a4886dd3230e523600d3b555f651dc82aba3a4e")
		await conn.sendFile(m.chat, sauce, null, '', m)
    	} catch (e) {
    	try {
    	let img = await q.download?.()
			let out = await uploadImage(img)
			var resp = await deepai.callStandardApi("waifu2x", {
                        image: out,
                    })
                    let w2x1 = resp['output_url']
           var resep = await deepai.callStandardApi("waifu2x", {
                        image: w2x1,
                    })
                    // console.log(resp);
                    let w2x2 = resep['output_url']
           var resup = await   deepai.callStandardApi("torch-srgan", {
            image: w2x2,
            })
            await conn.sendFile(m.chat, resup['output_url'], 'simpcard.png', 'simp', m)
            
    		} catch (e) {
    		await m.reply(eror)
    		}
    	}
    } else {
    	await m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
    }
}
handler.help = ['hd', 'enhance']
handler.tags = ['tools']
handler.command = /^(hd|enhance)$/i
handler.premium = true
export default handler