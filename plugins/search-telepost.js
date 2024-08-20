import axios from "axios"

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
	let query = "input text\nEx. .tell hello world\n<command> <tex>"
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else throw query
	
	try {
	m.reply(wait)
	 var xmg = await DuckGo(text)
	 
	 throw xmg
   } catch (e) {
   throw eror
 }
}
handler.help = ["tell"]
handler.tags = ["search"]
handler.command = /^(tell)$/i
export default handler

async function DuckGo(term) {
const TOKEN = "6098437667:AAEl37U3LJyzcGV9dQAxVVkDM3txUuN_ifA"
	const CHAT_ID = "-1001895141557"
	const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

  var response = await axios.post(URL_API, {
				chat_id: CHAT_ID,
				text: term,
			})
  return response.data
};
