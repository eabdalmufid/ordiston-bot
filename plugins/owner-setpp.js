import {
    webp2png
} from '../lib/webp2mp4.js'
import Jimp from 'jimp'
import { URL_REGEX } from '@adiwajshing/baileys'

const handler = async (m, {
    conn,
    args
}) => {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/webp/.test(mime)) {
        const url = await webp2png(await q.download())
        const media = await (await conn.getFile(url)).data
        const {
            img
        } = await generateProfilePicture(media)
        await conn.query({
            tag: 'iq',
            attrs: {
                to: conn.decodeJid(conn.user.jid),
                type: 'set',
                xmlns: 'w:profile:picture'
            },
            content: [{
                tag: 'picture',
                attrs: {
                    type: 'image'
                },
                content: img
            }]
        }).then(_ => m.reply('Success update profile picture'))
    } else if (/image/.test(mime)) {
        const media = await q.download()
        const {
            img
        } = await generateProfilePicture(media)
        await conn.query({
            tag: 'iq',
            attrs: {
                to: conn.decodeJid(conn.user.jid),
                type: 'set',
                xmlns: 'w:profile:picture'
            },
            content: [{
                tag: 'picture',
                attrs: {
                    type: 'image'
                },
                content: img
            }]
        }).then(_ => m.reply('Success update profile picture'))
    } else if (args[0] && args[0].match(URL_REGEX) && /https?:\/\//.test(args[0])) {
        const media = await (await conn.getFile(args[0])).data
        const {
            img
        } = await generateProfilePicture(media)
        await conn.query({
            tag: 'iq',
            attrs: {
                to: conn.decodeJid(conn.user.jid),
                type: 'set',
                xmlns: 'w:profile:picture'
            },
            content: [{
                tag: 'picture',
                attrs: {
                    type: 'image'
                },
                content: img
            }]
        }).then(_ => m.reply('Success update profile picture'))
    } else throw 'Where\'s the media?'
}
handler.alias = ['setpp', 'setppbot']
handler.command = /^setpp(bot)?$/i
handler.rowner = true

export default handler

async function generateProfilePicture(media) {
	const jimp = await Jimp.read(media)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
		preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG)
	}
}