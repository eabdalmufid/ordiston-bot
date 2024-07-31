import fetch from "node-fetch"

let handler = async (m, { conn, args, usedPrefix, command }) => {
    	try {
			let fak = await fetch(global.API("lolhuman", "/api/random/faktaunik", {}, "apikey"))
			let ta = await fak.json()
			await conn.reply(m.chat, "*Taukah kamu ternyata*\n" + ta.result + "\n\n*Powered by:* lolhuman", m)
    	} catch (e) {
    	try {
    	let fak = await fetch(global.API("zenz", "/randomtext/faktaunik", {}, "apikey"))
			let ta = await fak.json()
			await conn.reply(m.chat, "*Taukah kamu ternyata*\n" + ta.result.message + "\n\n*Powered by:* zenzapi", m)
    	} catch (e) {
    		throw eror
    		}
    	}
}
handler.help = ['fakta']
handler.tags = ['edukasi']
handler.command = /^(fakta|faktaunik)$/i
export default handler