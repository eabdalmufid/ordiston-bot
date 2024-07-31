import fs from 'fs'
import axios from 'axios'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

export default async (conn, buffer, type) => {
	let { filename } = await conn.getFile(buffer, true)
	let form = new FormData
	if (/^tele(graph)?$/i.test(type)) {
		form.append('file', fs.createReadStream(filename))
		let data = await req('https://telegra.ph/upload', form, { headers: form.getHeaders() })
		if (data.error) throw data.error
		return `https://telegra.ph/${data[0].src}`
	} else if (/^uguu$/i.test(type)) {
		form.append('files[]', fs.createReadStream(filename))
		let data = await req('https://uguu.se/upload.php', form, { headers: form.getHeaders() })
		return data.files[0].url
	} else if (/^anon(files)?$/i.test(type)) {
		form.append('file', fs.createReadStream(filename))
		let data = await req('https://api.anonfiles.com/upload', form, { headers: form.getHeaders() })
		if (!data.status) throw data.error.message
		return data.data.file.url.short
	} else if (/^zippy(share)?$/i.test(type)) {
		let url = await home()
		filename = filename.split('/tmp/')[1]
		form.append('name', filename)
		form.append('notprivate', 'true')
		form.append('zipname', '')
		form.append('ziphash', '')
		form.append('embPlayerValues', 'false')
		form.append('file', buffer, filename)
		let data = await req(url, form, { headers: form.getHeaders() })
		return data.replace(/\n/g, '').replace(new RegExp(`.+(https?:\/\/.+/v/[a-zA-Z0-9]+\/file\.html).+`, 'gi'), '$1')
	} else {
		form.append('files[]', fs.createReadStream(filename))
		let data = await req('https://up1.fileditch.com/upload.php', form, { headers: form.getHeaders() })
		return data.files[0].url
	}
}

async function home() {
	let { data } = await axios.get('https://www.zippyshare.com')
	return 'https://' + data.replace(/\n/g, '').replace(/.+\/\/(www[0-9]+\.zippyshare\.com\/upload).+/g, '$1')
}

async function req(url, body, opt = {}) {
	let { data } = await axios(url, {
		method: 'post', data: body,
		headers: opt.headers,
		maxContentLength: Infinity,
		maxBodyLength: Infinity
	})
	return data
}