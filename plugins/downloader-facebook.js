/*import fetch from "node-fetch"
import {
    facebook
} from "@xct007/frieren-scraper"

// others version will added soon.
let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    let imgr = flaaa

    let ends = [
        "V1",
        "V2"
    ]

    let [links, version, quality] = text.split(" ")
    if (!links) throw "Input URL"
    let dapet = ["V1", "V2"]
    let buttons = []
    Object.keys(dapet).map((v, index) => {
        buttons.push(
            [dapet[v].toUpperCase() + " Video 🎥", usedPrefix + command + " " + links + " " + dapet[v]]
        )
    })
    if (!(version)) return conn.sendButton(m.chat, htki + " 📺 FB DOWN 🔎 " + htka + `\n⚡ Silakan pilih menu di tombol di bawah...\n*Teks yang anda kirim:* ${links}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, imgr + command, buttons, m)


    if (ends.includes(version)) {
        if (version == "V1") {
            try {
                let results = await facebook.v1(links)
                let dapet = ["hd", "sd"]
                let buttons = []
                Object.keys(dapet).map((v, index) => {
                    buttons.push(
                        [dapet[v].toUpperCase() + " Video 🎥", usedPrefix + command + " " + links + " " + version + " " + dapet[v]]
                    )
                })
                if (!(quality)) return conn.sendButton(m.chat, htki + " 📺 FB DOWN 🔎 " + htka + `\n⚡ Silakan pilih menu di tombol di bawah...\n*Teks yang anda kirim:* ${links}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, imgr + command, buttons, m)

                let caption = `*[ F A C E B O O K ]*

*Title:* ${results.title}
*HD:* ${results.isHdAvailable}
	`

                let out
                if (quality == "hd") {
                    out = results.urls[0].hd ? results.urls[0].hd : (results.urls[1].sd ? results.urls[1].sd : giflogo)
                }
                if (quality == "sd") {
                    out = results.urls[1].sd ? results.urls[1].sd : (results.urls[0].hd ? results.urls[0].hd : giflogo)
                }

                await m.reply(wait)
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (version == "V2") {
            try {
                let results = await (await fetch(global.API("xcdr", "/api/download/fb2", {
                    url: links,
                    apikey: "Lann"
                }, ""))).json()
                let dapet = ["hd", "sd"]
                let buttons = []
                Object.keys(dapet).map((v, index) => {
                    buttons.push(
                        [dapet[v].toUpperCase() + " Video 🎥", usedPrefix + command + " " + links + " " + version + " " + dapet[v]]
                    )
                })
                if (!(quality)) return conn.sendButton(m.chat, htki + " 📺 FB DOWN 🔎 " + htka + `\n⚡ Silakan pilih menu di tombol di bawah...\n*Teks yang anda kirim:* ${links}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, imgr + command, buttons, m)

                let caption = `*[ F A C E B O O K ]*

*Title:* ${results.result.title}
*Duration:* ${results.result.duration}
	
*Process:* ${results.processed}`

                let out
                if (quality == "hd") {
                    out = results.result.links.hd ? results.result.links.hd : (results.result.links.sd ? results.result.links.sd : giflogo)
                }
                if (quality == "sd") {
                    out = results.result.links.sd ? results.result.links.sd : (results.result.links.hd ? results.result.links.hd : giflogo)
                }

                await m.reply(wait)
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }

}
handler.help = ["facebook"]
handler.tags = ["downloader"]
handler.alias = ["fb", "fbdl", "facebook", "facebookdl"]
handler.command = /^((facebook|fb)(dl)?)$/i
export default handler*/

import fetch from 'node-fetch'
import fg from 'api-dylux'


const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `✳️ Please send the link of a Facebook video\n\n📌 Example :\n*${usedPrefix + command}* https://www.facebook.com/Ankursajiyaan/videos/981948876160874/?mibextid=rS40aB7S9Ucbxw6v`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  if (!urlRegex.test(args[0])) {
    throw '⚠️ Pleas give a valid url.'
  }

 await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⌛'  }}, { messageId: m.key.id })

  try {
    const result = await fg.fbdl(args[0]);
    const tex = `
*[ F A C E B O O K ]*
*Title:* ${result.title}
`

    const response = await fetch(result.videoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)
    
    conn.sendFile(m.chat, videoBuffer, 'file', tex, m)
  } catch (error) {
    console.log(error)
    m.reply('⚠️ An error occurred while processing the request. Please try again later.')
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i

export default handler
