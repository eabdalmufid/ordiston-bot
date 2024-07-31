/*
     ig : https://www.instagram.com/fg98._/
*/
import hispamemes from 'hispamemes'

let handler = async (m, { conn, usedPrefix, command }) => {
	const meme = await hispamemes.meme()
    await conn.sendFile(m.chat, meme, '', '', m)
    await m.reply('😆') 
}
handler.help = ['hispamemes']
handler.tags = ['internet']
handler.command = ['hispamemes', 'hispameme'] 
handler.diamond = true

export default handler