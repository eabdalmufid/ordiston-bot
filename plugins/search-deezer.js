import fetch from "node-fetch"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    if (!(text)) return m.reply("*Example:*\n.deezer sfw|wave")
            await m.reply(wait)
            let data = await searchDeezer(text)
            let list = data.data.map((item, index) => `*${++index}.* *Title:* ${item.title}
*ID:* ${item.id}
*Artist:* ${item.artist.name}
*Duration:* ${item.duration}
*Link:* ${item.link}
*Preview:* ${item.preview}`).join("\n\n")
    await conn.sendFile(m.chat, data.data[0].artist.picture, "", `*${htki} 📺 Deezer Search 🔎 ${htka}*\n\n${list}`, m)
}
handler.help = ["deezer query"]
handler.tags = ["internet"]
handler.command = /^(deezer)$/i
export default handler

async function searchDeezer(query) {
  try {
    let res = await fetch("https://api.deezer.com/2.0/search?q=" + query)
    let suks = await res.json()
    return suks
  } catch (error) {
    console.log("Error fetching data:", error)
  }
}
