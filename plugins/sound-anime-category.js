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
    if (!text) throw "input text\ncth: .audiojungle anime.2"
    try {

        await m.reply(wait)
        let [category, page] = text.split(/[^\w\s]/g)
        let res = await AnimeSound(category, page)
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

    } catch (e) {
        throw eror
    }
}
handler.help = ["audiojungle"]
handler.tags = ["internet"]
handler.command = /^audiojungle$/i

export default handler

/* New Line */
async function AnimeSound(category, page) {
    let res = await fetch('https://audiojungle.net/search/' + category + '?page=' + page)
    let html = await res.text()
    let dom = new JSDOM(html)
    var collection = dom.window.document.getElementsByTagName('source');
    let audio = []
    for (var i = 0; i < collection.length; i++) {
        audio.push(collection[i].getAttribute('src'))
    }
    let newArr = audio.filter(el => el != null);
    return newArr
}