import moment from 'moment-timezone'
import gplay from 'google-play-scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let [url, appId] = text.match(/([a-zA-Z]+(\.[a-zA-Z]+)+)/g) || []
	if (url !== 'play.google.com') throw `Ex: ${usedPrefix + command} https://play.google.com/store/apps/details?id=com.whatsapp`
	// if (!appId) throw 'App ID not found'
	let res = await gplay.app({ appId })
	let { title, summary, installs, scoreText, priceText, size, androidVersionText, developer, icon, screenshots, released, updated, version } = res
	let str = `📚 *Title:* ${title || 'Tidak diketahui'}\n  ${summary || 'Tidak diketahui'}\n💾 *Installs:* ${installs || 'Tidak diketahui'}\n⭐️ *Score:* ${scoreText || 'Tidak diketahui'}\n💲 *Price:* ${priceText || 'Tidak diketahui'}\n`
		+ `📏 *Size:* ${size || 'Tidak diketahui'}\n📱 *Android Ver:* ${androidVersionText || 'Tidak diketahui'}\n👩‍💻 *Dev:* ${developer || 'Tidak diketahui'}\n📅 *Released:* ${released || 'Tidak diketahui'}\n`
		+ `🔄 *Updated:* ${moment(updated).locale('en').format('MMM D, Y') || 'Tidak diketahui'}\n🆕 *Version:* ${version || 'Tidak diketahui'}`
	let opt = { contextInfo: { externalAdReply: { title, body: summary, thumbnail: (await conn.getFile(icon)).data, sourceUrl: res.url }}}
	conn.sendMessage(m.chat, { image: { url: screenshots.getRandom() }, caption: str, ...opt }, { quoted: m, ephemeralExpiration: ephemeral })
}
handler.command = /^(apk(info|detail))$/i

export default handler