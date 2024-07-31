import {
	areJidsSameUser
} from '@adiwajshing/baileys'
let handler = async (m, {
	conn,
	participants,
	teks,
	isOwner,
	isAdmin,
	args
}) => {
	if (!(isAdmin || isOwner)) {
		global.dfail('admin', m, conn)
		throw false
	}
	let ownerGroup = m.chat.split`-` [0] + "@s.whatsapp.net";
	if (m.quoted) {
		if (m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;
		let usr = m.quoted.sender;
		await conn.groupParticipantsUpdate(m.chat, [usr], "remove");
		return;
	}
	if (!m.mentionedJid[0]) throw `tag yang mau dikick`;
	let users = m.mentionedJid.filter(
		(u) => !(u == ownerGroup || u.includes(conn.user.jid))
	);
	for (let user of users)
		if (user.endsWith("@s.whatsapp.net"))
			await conn.groupParticipantsUpdate(m.chat, [user], "remove");
};
handler.help = ['kick', '-'].map(v => 'a' + v + ' @user')
handler.tags = ['group']
handler.command = /^(kick|a-)$/i

handler.group = true
handler.botAdmin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))