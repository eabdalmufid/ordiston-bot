import fetch from 'node-fetch'
let handler = async (m, { jid, conn, usedPrefix }) => {
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    
    conn.reply(m.chat, `╭─「 *Daftar Chat Terbanned* 」
│ ✇ Total : ${chats.length} Chat${chats ? '\n' + chats.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
│ ${jid}
`.trim()).join('\n') : ''}
╰────

╭─「 *Daftar User Terbanned* 」
│ ✇ Total : ${users.length} User${users ? '\n' + users.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
│ ${jid}
`.trim()).join('\n') : ''}
╰────
`.trim(), m, { contextInfo: { externalAdReply: { title: botdate, body: bottime, mediaType: 2, sourceUrl: sig, mediaUrl: sig, thumbnail: await(await fetch('https://telegra.ph/file/1836eec6c22d949829474.jpg')).buffer()}}})

}
handler.help = ['bannedlist']
handler.tags = ['info']
handler.command = /^listban(ned)?|ban(ned)?list|daftarban(ned)?$/i
export default handler
