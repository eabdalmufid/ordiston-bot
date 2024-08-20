import fetch from 'node-fetch'
let handler = async(m, {
	conn, text, usedPrefix, command, args
}) => {
if (!args[0]) throw 'Gunakan format .menfes 6282195322106 Haloo'
if (args[0].startsWith('0')) throw 'Gunakan format .menfes 6282195322106 Haloo'
    let mention = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[0] ? (args[0].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
	let txt = (args.length > 1 ? args.slice(1).join(' ') : '') || ''
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	let tujuan = `👋 Saya *${conn.user.name}*, Pesan Untuk Kamu
👥 Dari : *PENGIRIM RAHASIA*

${htki} 💌 Pesan ${htka}
${txt}
`
	let cap = `${htki} PESAN RAHASIA ${htka}
Anda Ingin Mengirimkan Pesan ke pacar/sahabat/teman/doi/
mantan?, tapi Tidak ingin tau siapa Pengirimnya?
Kamu bisa menggunakan Bot ini
Contoh Penggunaan: ${usedPrefix + command} ${nomorown} pesan untuknya

Contoh: ${usedPrefix + command} ${nomorown} hai`
	if (!m.quoted) {
		await conn.sendButton(mention, tujuan, cap, null, [['Menu', '/menu']], m)
	} else {
		await conn.sendButton(mention, tujuan, cap, null, [['Menu', '/menu']], m)
		let media = q ? await m.getQuotedObj() : false || m
		await conn.copyNForward(mention, media, false).catch(_ => _)
	}
	let suks = `Mengirim Pesan *${mime ? mime : 'Teks'}*
👥 Dari : @${m.sender.replace(/@.+/, '')}
👥 Untuk : @${mention.replace(/@.+/, '')}

${htki} 💌 Pesan ${htka}
${txt}
`
	await conn.sendButton(m.chat, suks, wm, null, [['Menu', '/menu']], m, { mentions: conn.parseMention(suks) })
}
handler.help = ['menfes <pesan>']
handler.tags = ['main']
handler.command = /^(menfes|chat)$/i
handler.disabled = true
export default handler