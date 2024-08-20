import fetch from "node-fetch"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let ends = [
        "search",
        "videos"
    ]
    
    let [modes, kodes] = text.split(/[^\w\s]/g)
    if (!ends.includes(modes)) return m.reply("*Example:*\n.discogs sfw|wave\n\n*Pilih type yg ada*\n" + ends.map((v, index) => "  ○ " + v).join('\n'))

    if (ends.includes(modes)) {
        if (modes == "search") {
        if (!(kodes)) return m.reply("Input query!")
            await m.reply(wait)
            let data = await(await fetch("https://api.discogs.com/database/search?q=" + kodes + "&token=QBRmstCkwXEvCjTclCpumbtNwvVkEzGAdELXyRyW")).json()
            let list = data.results.map((item, index) => `*${++index}.* *Title:* ${item.title}
*ID:* ${item.id}
*Link:* ${item.resource_url}`).join("\n\n")
    await conn.sendFile(m.chat, data.results[0].cover_image, "", `*${htki} 📺 Discogs Search 🔎 ${htka}*\n\n${list}`, m)
        }
        if (modes == "videos") {
        if (!(kodes)) return m.reply("Input ID!")
            await m.reply(wait)
            let data = await(await fetch("https://api.discogs.com/masters/" + kodes)).json()
            let list = data.videos.map((item, index) => `*${++index}.* *Title:* ${item.title}
*Duration:* ${item.duration}
*Link:* ${item.uri}
*Description:* ${item.description}`).join("\n\n")
    await conn.reply(m.chat, `*${htki} 📺 Discogs Search 🔎 ${htka}*\n\n${list}`, m)
        }
    }

}
handler.help = ["discogs type query"]
handler.tags = ["internet"]
handler.command = /^(discogs)$/i
export default handler
