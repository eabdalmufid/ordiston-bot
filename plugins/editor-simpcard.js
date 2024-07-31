import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
    	try {
			let img = await q.download?.()
			let out = await uploadImage(img)
			let sim = global.API('https://some-random-api.com', '/canvas/simpcard', { avatar: out })
            await conn.sendFile(m.chat, sim, 'simpcard.png', 'simp', m)
    	} catch (e) {
    		console.log(e)
    	}
    } else {
    	m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
    }
}
handler.help = ['simpcard']
handler.tags = ['anime']
handler.command = /^(simpcard)$/i
export default handler