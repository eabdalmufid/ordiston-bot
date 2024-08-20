import fetch from "node-fetch"

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
	let query = "input text\nEx. .duckduckgo hello world\n<command> <tex>"
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else throw query
	
	try {
	m.reply(wait)
	 var res = await DuckGo(text)
	 var list = res.RelatedTopics
	 const captiond = list.map((v, index) => { return `*${htki + " " + ++index + " " + htka}*\nResult: ${v.Text ? v.Text : "Kosong"}\nLink: ${v.FirstURL ? v.FirstURL : "Kosong"}` }).join('\n\n\n')
        await conn.sendFile(m.chat, flaaa + "DuckGo", "result", captiond, m)
   } catch (e) {
   throw eror
 }
}
handler.help = ["duckduckgo"]
handler.tags = ["search"]
handler.command = /^(duckduckgo)$/i
export default handler

async function DuckGo(term) {
var url = "https://api.duckduckgo.com/?q=" + term + "&format=json"
  const json = await fetch(url)
  const result = await json.json()
  return result
};