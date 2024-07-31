import { isNumber, somematch } from '../lib/other-function.js'

let handler = async (m, { conn, args, command, usedPrefix }) => {
	const item = (args[0] || '').toLowerCase()
	let ini_txt = `Contoh : *${usedPrefix + command} limit 100 @tag*\n\n`
	ini_txt += `Data yang dapat di reset :\n`
	ini_txt += `- exp\n`
	ini_txt += `- money\n`
	ini_txt += `- atm\n`
	ini_txt += `- limit\n`
	ini_txt += `- potion\n`
	ini_txt += `- emerald\n`
	ini_txt += `- diamond\n`
	ini_txt += `- gold`
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : m.quoted ? m.quoted.sender : ''
    if (!who) return m.reply(ini_txt)
    let user = global.db.data.users
    if (!(who in user)) return m.reply(`User ${who} not in database`)
	args[1] = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if (args[1] > 999999999999999) args[1] = 999999999999999
	if (somematch(['exp','money','atm','limit','potion','emerald','diamond','gold'], item)) {
		user[who][item] = args[1]
		if (item == 'exp') user[who].level = 0
		await m.reply(`Berhasi mengubah ${item} *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* menjadi ${args[1]}`, null, { mentions: [who] })
	} else {
		m.reply(ini_txt)
	}
}

handler.menuowner = ['setuser <data>']
handler.tagsowner = ['owner']
handler.command = /^((re)?setuser)$/i

handler.owner = true

export default handler