let handler = async (m, { conn, text }) => {
   if (!text) throw `Masukan Text Untuk Bio Baru Bot`
     try {
		await conn.updateProfileStatus(text).catch(_ => _)
		conn.reply(m.chat, 'Sukses Mengganti Bio Bot', m)
} catch {
       throw 'Yah Error.. :>'
     }
}
handler.help = ['setbotbio']
handler.tags = ['owner']
handler.command = /^setb(io(bot)?|otbio)$/i
handler.owner = true

export default handler