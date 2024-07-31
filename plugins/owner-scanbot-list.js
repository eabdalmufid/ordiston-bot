let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
let users = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]
  m.reply(users.map(v => 'wa.me/' + v.jid.replace(/[^0-9]/g, '') + `?text=${userbot.prefix}menu (${v.name})`).join('\n'))
}
handler.help = ['scanbotlist']
handler.tags = ['jadibot']
handler.command = /^(scanbotlist)$/i

export default handler
