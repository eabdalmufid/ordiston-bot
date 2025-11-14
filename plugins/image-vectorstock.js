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
            let res = await VectorDtock(text)
            let rdm = res[Math.floor(Math.random() * res.length)];
            await conn.sendMessage(m.chat, {
                image: {
                    url: rdm
                }, caption: "[ RESULT ]"
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })

    } catch (e) {
        throw eror
    }
}
handler.help = ["vectorstock"]
handler.tags = ["internet"]
handler.command = /^vectorstock$/i

export default handler

/* New Line */
async function VectorDtock(query) {
let res = await fetch('https://www.vectorstock.com/royalty-free-vectors/' +query+ '-vectors')
    let html = await res.text()
    let dom = new JSDOM(html)
    var collection = dom.window.document.getElementsByTagName('img');
    let img = []
for (var i = 0; i < collection.length; i++) {
	if (collection[i].getAttribute('src').startsWith('https://cdn.vectorstock.com')) {
	img.push(collection[i].getAttribute('src'))
	}
}
let newArr = img.filter(el => el != null);
return newArr
}