let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (!text) throw "gimme a name grup"
  await conn.groupUpdateSubject(m.chat, text)
 m.reply(`${text ? `${text}` : 'None'} Now is name this groups`)
}
handler.help = ['setname <teks>']
handler.tags = ['group']
handler.command = /^(setname)$/i
handler.botAdmin = true
handler.group = true
handler.admin = true
export default handler
