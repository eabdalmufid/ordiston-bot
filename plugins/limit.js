let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (args[0] == 'reset') {
let list = Object.entries(global.db.data.users)
	let lim = !args || !args[0] ? 1000 : isNumber(args[0]) ? parseInt(args[0]) : 1000
	lim = Math.max(1, lim)
	list.map(([user, data], i) => (Number(data.limit = lim)))
		conn.reply(m.chat, `*Berhasil direset ${lim} / user*`, fakes, adReply)
		}
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let ke1 = global.db.data.users[who].limit
    let ke2 = global.db.data.users[who].exp
    let ke3 = global.db.data.users[who].money
    
    let caption = `
${dmenut} *B A N K  U S E R*
${dmenub} 📛 *Limit:* ${ke1}
${dmenub} 💳 *Exp:* ${ke2}
${dmenub} 🏛️ *Money:* ${ke3}
${dmenuf}
`
  conn.sendFthumb(m.chat, `Ordiston Bot`, caption, 'https://telegra.ph/file/0451b07945f7f9633b59b.jpg', '', m)
  //conn.reply(m.chat, caption, fakes, adReply)

}
handler.help = ['limit [@user]']
handler.tags = ['xp']
handler.command = /^(limit)$/i
export default handler

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}