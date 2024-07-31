import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
import {
    JSDOM
} from "jsdom"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) throw "input text"
    try {
        if (command == "mlsounden") {
            await m.reply(wait)
            let res = await MLSound("en", text)
            let rdm = res[Math.floor(Math.random() * res.length)];
            await conn.sendMessage(m.chat, {
                audio: {
                    url: rdm
                },
                ptt: true,
                mimetype: "audio/mpeg",
                fileName: rdm.split("/")[4] + ".mp3",
                waveform: [0, 100, 0, 100, 0]
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })
        }
        if (command == "mlsoundid") {
            await m.reply(wait)
            let res = await MLSound("id", text)
            let rdm = res[Math.floor(Math.random() * res.length)];
            await conn.sendMessage(m.chat, {
                audio: {
                    url: rdm
                },
                ptt: true,
                mimetype: "audio/mpeg",
                fileName: rdm.split("/")[7] + ".mp3",
                waveform: [0, 100, 0, 100, 0]
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })
        }

    } catch (e) {
        throw eror
    }
}
handler.help = ["mlsounden", "mlsoundid"]
handler.tags = ["internet"]
handler.command = /^mlsound(en|id)$/i

export default handler

/* New Line */
async function MLSound(tema, query) {
    let res
    if (tema == "id") {
        res = await fetch("https://mobile-legends.fandom.com/wiki/" + query + "/Audio/id")
    }
    if (tema == "en") {
        res = await fetch("https://mobilelegendsbuild.com/sound/" + query)
    }
    let html = await res.text()
    let dom = new JSDOM(html)
    var totals = dom.window.document.getElementsByTagName("audio");
    let audio = []
    for (var i = 0; i < totals.length; i++) {
        audio.push(totals[i].getAttribute("src"))
    }
    return audio
}