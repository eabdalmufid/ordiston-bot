let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, 'Kamu tidak jadi bot!?', m)
  else {
    await conn.reply(m.chat, 'Goodbye bot :\')', m)
    conn.close()
  }
}
handler.help = ['scanbotstop']
handler.tags = ['jadibot']
handler.command = /^(scanbotstop)$/i

export default handler
