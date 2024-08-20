import axios from 'axios'
let handler = async (m, {
	conn,
	text,
	command
}) => {
	if (!text) throw `*Nothing url*\nExample: .${command} https://ordiston.xyz`
	if (!/^https?:\/\//.test(text)) throw 'Param *URL* must be starts with http:// or https://'
	var phone = await ssweb(text, 'phone')
	var desktop = await ssweb(text, 'desktop')
	var tablet = await ssweb(text, 'tablet')
	var res = `${text}`
	if (command === 'sshp') {
		await conn.sendFile(m.chat, phone.result, '', res, m, false)
	}
	if (command === 'ssweb' || command === 'sstablet') {
		await conn.sendFile(m.chat, tablet.result, '', res, m, false)
	}
	if (command === 'sspc') {
		await conn.sendFile(m.chat, desktop.result, '', res, m, false)
	}
	if (command === 'ssfull') {
		let ss = await (await fetch(`https://image.thum.io/get/fullpage/${text}`)).buffer()
		conn.sendFile(m.chat, ss, 'error.png', res, m)
	}
}
handler.help = ['ssweb', 'sspc', 'sshp', 'sstablet', 'ssfull']
handler.tags = ['internet']
handler.command = /^(ssweb|sstablet|sspc|sshp|ssfull)$/i
export default handler

async function ssweb(url, device = 'desktop') {
	return new Promise((resolve, reject) => {
		const base = 'https://www.screenshotmachine.com'
		const param = {
			url: url,
			device: device,
			cacheLimit: 0
		}
		axios({
			url: base + '/capture.php',
			method: 'POST',
			data: new URLSearchParams(Object.entries(param)),
			headers: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then((data) => {
			const cookies = data.headers['set-cookie']
			if (data.data.status == 'success') {
				axios.get(base + '/' + data.data.link, {
					headers: {
						'cookie': cookies.join('')
					},
					responseType: 'arraybuffer'
				}).then(({
					data
				}) => {
					let result = {
						status: 200,
						author: 'AngelDark',
						result: data
					}
					resolve(result)
				})
			} else {
				reject({
					status: 404,
					author: 'AngelDark',
					message: data.data
				})
			}
		}).catch(reject)
	})
}