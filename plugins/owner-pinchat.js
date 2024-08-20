let handler = async (m, { conn, command }) => {
	try {
		await conn.chatModify({ pin: command.includes('un') ? false : true }, m.chat)
		m.reply(`Chat Berhasil Di *${command.includes('un') ? 'unpin' : 'pin'}*.`)
	} catch (e) {
		console.log(e)
		m.reply('Gagal, Coba Lagi Nanti.')
	}
}

handler.help = ['pinchat','unpinchat']
handler.tags = ['owner']
handler.command = /^((un)?pin(chats?))$/i

handler.owner = true

export default handler