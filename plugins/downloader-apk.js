import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	var regex = /^https?:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z0-9.]+$/;

	if (!regex.test(args[0])) throw `Ex: ${usedPrefix + command} https://play.google.com/store/apps/details?id=com.linecorp.LGGRTHN`
	let res = await appDl(args[0])
	m.reply(wait)
	conn.sendMessage(m.chat, { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName }, { quoted: m, ephemeralExpiration: ephemeral })
}
handler.help = handler.alias = ['appdl']
handler.tags = ['downloader']
handler.command = /^(appdl)$/i

export default handler

async function appDl(url) {
	let res = await fetch('https://apk.support/gapi/index.php', {
		method: 'post',
		body: new URLSearchParams(Object.entries({ x: 'downapk', t: 1, google_id: url, device_id: '', language: 'en-US', dpi: 480, gl: 'SUQ=', model: '', hl: 'en', de_av: '', aav: '', android_ver: 5.1, tbi: 'arm64-v8a', country: 0, gc: undefined }))
	})
	let $ = cheerio.load(await res.text())
	let fileName = $('div.browser > div.dvContents > ul > li > a').text().trim().split(' ')[0]
	let download = $('div.browser > div.dvContents > ul > li > a').attr('href')
	if (!download) throw 'Can\'t download the apk!'
	let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type')
	return { fileName, mimetype, download }
}