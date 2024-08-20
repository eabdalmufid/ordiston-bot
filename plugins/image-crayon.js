import fetch from "node-fetch"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) throw "input text"
    try {
            await m.reply(wait)
            let res = await CraYon(text)
            const base64Image = "data:image/webp;base64," + await pickRandom(res);
       const base64Data = base64Image.replace(/^data:image\/webp;base64,/, "");
       const buffer = Buffer.from(base64Data, "base64");
            await conn.sendMessage(m.chat, {
                image: buffer, caption: "*[ Result ]*\n" + text
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })

    } catch (e) {
        throw eror
    }
}
handler.help = ["crayon"]
handler.tags = ["internet"]
handler.command = /^crayon$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
/* New Line */
async function CraYon(query) {
let proxyurl = "https://corsproxy.io/?";
   let res = await fetch(
      `${proxyurl}${encodeURIComponent`https://backend.craiyon.com/generate`}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: query,
        }),
      }
    )
       let json = await res.json()
       return json.images
}