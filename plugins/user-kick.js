import fs from 'fs'
let handler = async (m, { conn, args }) => {
 let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
  let aki = m.quoted ? [m.quoted.sender] : m.mentionedJid
  let users = aki.filter(u => !(u == ownerGroup || u.includes(conn.user.jid)))
  let wayy = '*Kick*'
  for (let i of users) {
  wayy += ` @${i.split('@')[0]}`
  }
  conn.reply(m.chat, wayy, m, { contextInfo: { mentionedJid: users }})
  for (let user of users) if (user.endsWith('@s.whatsapp.net')) await conn.groupParticipantsUpdate(m.chat, [user], "remove")
}
handler.help = ['kick'].map(v => v + ' @user')
handler.tags = ['group']
handler.command = /^(ukick|\u-)$/i
handler.owner = true
handler.group = true
handler.botAdmin = true

export default handler