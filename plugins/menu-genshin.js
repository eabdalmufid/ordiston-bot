import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'

function ranNumb(min, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}

function padLead(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

let tags = {
	'genshin': 'Genshin Data'
}
const defaultMenu = {
	before: `
Genshin Impact JSON data with a robust searching API! Updated to version 2.8. Sources from the fandom wiki and GenshinData repo.

🐳 GENSHIN COMMAND`.trimStart(),
	header: ``,
  body: `⭔ %cmd`,
  footer: ``
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
	try {
		let meh = padLead(ranNumb(39), 3)
		let nais = fs.readFileSync('./thumbnail.jpg')
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
				tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
				prefix: 'customPrefix' in plugin,
				enabled: !plugin.disabled,
			}
		})
		let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
          }
		conn.menu = conn.menu ? conn.menu : {}
		let before = conn.menu.before || defaultMenu.before
		let header = conn.menu.header || defaultMenu.header
		let body = conn.menu.body || defaultMenu.body
		let footer = conn.menu.footer || defaultMenu.footer
		let _text = [
			before,
			...Object.keys(tags).map(tag => {
				return header.replace(/%category/g, tags[tag]) + '\n' + [
					...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
						return menu.help.map(help => {
							return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
		let replace = {
			p: _p,
			'%': '%',
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		/*conn.sendHydrated(m.chat, text.replace(`si <character>`, `si <character>${readMore}`).trim(), namebot + ' - ' + author, nais, 'https://bit.ly/3eggcxd', 'Minimalist ツ Sweet', null, null, [
			['Premium', '/premium'],
			['Speed', '/ping'],
			['Owner', '/owner']
		], m)*/
		conn.sendButton(m.chat, text.replace(`si <character>`, `si <character>${readMore}`).trim(), namebot + ' - ' + author, nais, [], m)
	} catch (e) {
		conn.reply(m.chat, 'Maaf, menu genshin sedang error', m)
		throw e
	}
}
handler.help = ['genshinmenu']
handler.tags = ['genshin']
handler.command = /^(genshinm(enu)?|m(enu)?genshin)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)