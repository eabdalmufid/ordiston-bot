let handler = async (m, { conn, command }) => {
  let user = global.db.data.users[m.sender]
  let imgr = flaaa
  const caption = `
▧「  *H U T A N G  U S E R*  」
│ 📛 *Name:* ${user.registered ? user.name : conn.getName(m.sender)}
│ 💹 *Money:* ${user.money} 💲
└──···
`.trim()
  await conn.sendFthumb(m.chat, 'HUTANG', caption, imgr + command, '', m)
  //await conn.sendFile(m.chat, imgr + command, "", caption, m)
}
handler.help = ['hutang']
handler.tags = ['rpg']
handler.command = /^(hutang)$/i

handler.register = false
export default handler