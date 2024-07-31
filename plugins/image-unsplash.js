import axios from "axios"

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
	let query = "input text\nEx. .openjourney hello world\n<command> <tex>"
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else throw query
	
        try {
	m.reply(wait)
	 var imge = await searchImages(text)
	 var xmg = imge.getRandom()
	 conn.sendFile(m.chat, xmg.urls.full ? xmg.urls.regular : xmg.urls.thumb, "result", "Result Unsplash: *" + xmg.description + "*", m)
   } catch (e) {
   throw eror
 }            
}
handler.help = ["unsplash"]
handler.tags = ["misc"]
handler.command = /^(unsplash)$/i
export default handler

async function searchImages(term) {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID mxr-J3YtqewQPrikLf7npmJY7ZvKKcxg7erlUer4bJM",
    },
    params: {
      query: term,
    },
  });

  return response.data.results;
};
