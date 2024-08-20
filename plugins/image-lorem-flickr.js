import fetch from "node-fetch";

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
	let query = "input text\nEx. .loremflickr hello world\n<command> <tex>"
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else throw query
	
	try {
	m.reply(wait)
	 var imge = await getFlickrImageURLByKeyword(text)
	 conn.sendFile(m.chat, imge, "result", "*Result Flickr:*\n" + text.toUpperCase(), m)
  } catch (e) {
  throw eror
 }
}
handler.help = ["loremflickr"]
handler.tags = ["search"]
handler.command = /^(loremflickr)$/i
export default handler

const WIDTH = 339;
const HEIGHT = 500;

async function getFlickrImageURLByKeyword(keyword) {
  const url = `https://loremflickr.com/json/g/${WIDTH}/${HEIGHT}/${encodeURIComponent(
    keyword
  )}/all`;
  const response = await fetch(url);
  const json = await response.json();
  return json.file;
}