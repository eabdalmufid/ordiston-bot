import fetch from "node-fetch"

let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
	let query = "input text\nEx. .diffusion hello world\n<command> <tex>"
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else throw query
	try {
	m.reply(wait)
	 await Draw(text).then((img) => {
                conn.sendFile(m.chat, img, text, "*[ Result ]*\n" + text, m)
            })
      } catch (e) {
      throw eror
   }
            
}
handler.help = ["diffusion"]
handler.tags = ["misc"]
handler.command = /^(diffusion)$/i
export default handler


async function Draw(propmt) {
        const Blobs = await fetch(
		"https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify({ inputs : propmt }),
		}
	)
      .then((res) => res.blob())
        const arrayBuffer = await Blobs.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer
}