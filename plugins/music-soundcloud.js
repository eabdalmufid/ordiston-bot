import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, text, args, usedPrefix: _p, command: cmd }) => {
	let sc = new SoundCloud
	if (text && /soundcloud\.com\/[^/]+\//.test(args[0])) {
		let data
		try {
		data = await sc.download2(args[0])
		} catch (e) {
		data = await sc.download(args[0])
		}
		if (!data.status) throw data.message
		let txt = `*Title:* ${data.title}\n*Likes:* ${data.like_count}\n*Duration:* ${sc.toTimeString(data.duration)}`
		let msg = /^(?:-|--)doc$/i.test(args[1]) ? await conn.sendFile(m.chat, data.thumbnail, '', txt, m) : await conn.sendButton(m.chat, txt, wait, data.thumbnail, [['Audio (Document)', `${_p + cmd} ${args[0]} --doc`]], m)
		let url = data.streams.find(v => /mp3/.test(v.extension) && v.has_audio).url
		let audio = await sc.req(url, { responseType: 'arraybuffer' }).catch(e => m.reply(e + ''))
		await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) ? 'document' : 'audio']: audio.data, fileName: `${data.title}.mp3`, mimetype: audio.headers['content-type'] }, { quoted: msg, ephemeralExpiration: ephemeral })
	} else if (text) {
		let data = await sc.search(text)
		if (!data?.length) throw 'Not Found'
		let listSections = []
    Object.values(data).map((v, index) => {
        listSections.push([v.user.username + ' [ ' + v.genre + ' ] ', [
            [v.title, _p + cmd + ' ' + v.permalink_url, sc.toTimeString(v.full_duration)]
        ]])
    })
    return conn.sendList(m.chat, '*[ SOUNDCLOUD ]*\n\n', `The Most Trusted How-to Site on The Internet....\n\nPencarian *${text.toUpperCase()}*\n\n${data.length} Hasil Ditemukan Dari Pencarian ${text.capitalize()}\n\nTap Button On Below For More`, author, 'Tap Here !', listSections, m)
	} else throw `Ex: ${_p + cmd} Query / SoundCloud Url`
}
handler.help = ['soundcloud'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^s(oundcloud(d(own|l))?|cd(own|l))$/i


export default handler

export class SoundCloud {
	toTimeString(num) {
		return new Date(num * 1000).toTimeString().split(' ')[0]
	}
	
	cLoad(html) {
		return cheerio.load(html.data)
	}
	
	async req(url, opt = {}) {
		return await axios({ url, ...opt })
	}
	
	async getSession() {
		let res = await this.req('https://soundcloudmp3.org/id')
		let token = this.cLoad(res)('form#conversionForm > input[type=hidden]').attr('value')
		return {
			cookie: res['headers']['set-cookie'],
			token
		}
	}
	
	async search(query) {
		let res = await this.req(`https://api-mobi.soundcloud.com/search?q=${query}&client_id=iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX&stage=`)
		return res?.data?.collection?.filter(v => /track/.test(v?.kind))
	}
	
	async download(url) {
		let session = await this.getSession()
		let res = await this.req('https://soundcloudmp3.org/converter', {
			method: 'post',
			data: new URLSearchParams(Object.entries({ _token: session.token, url })),
			headers: {
				cookie: session.cookie
			},
		})
		let $ = this.cLoad(res)
		let data = {}
		data.thumb = $('div.info.clearfix > img').attr('src')
		data.title = $('div.info.clearfix > p:nth-child(2)').text().replace('Title:', '')
		data.duration = $('div.info.clearfix > p:nth-child(3)').text().replace(/Length\:|Minutes/gi, '').trim()
		data.quality = $('div.info.clearfix > p:nth-child(4)').text().replace('Quality:', '')
		data.url = $('a#download-btn').attr('href')
		return data
	}
	
	async download2(url) {
		let res = await this.req(`https://getvideo.p.rapidapi.com/?url=${url}`, {
			headers: {
				'x-rapidapi-key': '5be05bd400msh1fe8c757005c169p10ea3bjsnf6b6811bc600' 
			}
		})
		return res.data
	}
}