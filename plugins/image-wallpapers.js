import axios from "axios"
import fetch from "node-fetch"
import * as cheerio from 'cheerio';
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
            await m.reply(wait)
            let res = await WallPapers(text)
            let rdm = res[Math.floor(Math.random() * res.length)];
            await conn.sendMessage(m.chat, {
                image: {
                    url: rdm
                }
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })

    } catch (e) {
        throw eror
    }
}
handler.help = ["wallpapers"]
handler.tags = ["internet"]
handler.command = /^wallpapers$/i

export default handler

/* New Line */
async function WallPapers(query) {
let res = await fetch('https://wallpapers.com/' + query)
    let html = await res.text()
    let dom = new JSDOM(html)
    var collection = dom.window.document.querySelectorAll('.promote');
    let img = []
for (var i = 0; i < collection.length; i++) {
	img.push("https://wallpapers.com" + collection[i].getAttribute('src'))
}
let newArr = img.filter(el => el != null);
return newArr
}