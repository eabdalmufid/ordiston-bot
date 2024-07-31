import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} library*`
	try {
		let anu = await genshindb.geographies(text)
		let ini_txt = `*Found : ${anu.name}*\n\n`
		ini_txt += `_"${anu.description}"_\n\n`
		ini_txt += `*Area :* ${anu.area}\n`
		ini_txt += `*Region :* ${anu.region}\n`
		ini_txt += `_sort order : ${anu.sortorder}_`
		m.reply(ini_txt)
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.geographies(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available geographies is :*\n${anu2.join(", ")}`)
	}
}

handler.help = ['giarea <place>']
handler.tags = ['genshin']
handler.command = /^((gi|genshin)(areas?|geogra(fi|ph(y|ies?))))$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)