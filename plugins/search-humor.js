import fetch from "node-fetch"
import {
    Sticker,
    StickerTypes
} from 'wa-sticker-formatter'

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let ends = [
        "memes",
        "jokes",
        "gif"
    ]
    
    let [modes, kodes] = text.split(/[^\w\s]/g)
    if (!ends.includes(modes)) return m.reply("*Example:*\n.humor sfw|wave\n\n*Pilih type yg ada*\n" + ends.map((v, index) => "  ○ " + v).join('\n'))

    if (ends.includes(modes)) {
        if (modes == "memes") {
            await m.reply(wait)
            let outs = await getMeme()
            let output = Object.entries(outs).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n');
        await conn.sendMessage(m.chat, {
                    image: {
                        url: outs.url
                    },
                    caption: output
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                })
        }
        if (modes == "jokes") {
            await m.reply(wait)
            let outs = await getJoke()
            let output = Object.entries(outs).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n');
        await conn.sendMessage(m.chat, {
                    image: {
                        url: outs.url
                    },
                    caption: output
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                })
        }
        if (modes == "gif") {
            await m.reply(wait)
            if (!kodes) return m.reply("Input Query")
            let data = await getGifs(kodes)
            let outs = data.images[Math.floor(Math.random() * data.images.length)];
            let output = Object.entries(outs).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n');
        await conn.sendMessage(m.chat, {
                    video: {
                        url: outs.url
                    },
                    gifPlayback: true,
                    gifAttribution: ~~(Math.random() * 2),
                    caption: output
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                })
        }
    }

}
handler.help = ["humor type query"]
handler.tags = ["internet"]
handler.command = /^(humor)$/i
export default handler

async function getJoke() {
  try {
    let res = await fetch("https://api.humorapi.com/jokes/random?api-key=c1be3de018d14210981b291d6e2b3dde")
    let suks = await res.json()
    return suks
  } catch (error) {
    console.log("Error fetching data:", error)
  }
}

async function getMeme() {
  try {
    let res = await fetch("https://api.humorapi.com/memes/random?api-key=c1be3de018d14210981b291d6e2b3dde")
    let suks = await res.json()
    return suks
  } catch (error) {
    console.log("Error fetching data:", error)
  }
}

async function getGifs(query) {
  try {
    let res = await fetch("https://api.humorapi.com/gif/search?query=" + query + "&api-key=c1be3de018d14210981b291d6e2b3dde")
    let suks = await res.json()
    return suks
  } catch (error) {
    console.log("Error fetching data:", error)
  }
}