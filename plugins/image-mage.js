import fetch from "node-fetch"
import * as cheerio from 'cheerio';

let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    let query = "input text\nEx. .comicvine hello world\n<command> <tex>"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query

    try {
        m.reply(wait)
        let res = await ComicvineSearch(text)
        let list = res.results.map((item, index) => `*${htki} SEARCH ${htka}*

*ID:* ${item.id}
*Name:* ${item.name}
*Deck:* ${item.deck}

`).join("\n")

        let res1 = await ComicvineCharacters()
        let list1 = res1.results.map((item, index) => `*${htki} CHARACTER ${htka}*

*ID:* ${item.id}
*Name:* ${item.name}
*Deck:* ${item.deck}
*Alias:* ${item.aliases}

`).join("\n")

        let res2 = await ComicvineVideos()
        let list2 = res2.results.map((item, index) => `*${htki} VIDEOS ${htka}*

*ID:* ${item.id}
*GUID:* ${item.guid}
*Name:* ${item.name}
*Hurl:* ${item.high_url}
*Deck:* ${item.deck}

`).join("\n")

conn.sendFile(m.chat, res.results[0].image.original_url, "result", "\n" + list + "\n" + list1 + "\n" + list2, m)
    } catch (e) {
        throw eror
    }
}
handler.help = ["comicvine"]
handler.tags = ["search"]
handler.command = /^(comicvine)$/i
export default handler

async function ComicvineSearch(query) {
    const response = await fetch("https://www.comicvine.com/api/search?format=json&field_list=name,id,deck,image&api_key=d800216c205879548fdc491e0a260ff402633c00&query=" + query);
    const data = await response.json();
    return data;
}

async function ComicvineCharacters() {
    const response = await fetch("https://www.comicvine.com/api/characters?format=json&api_key=d800216c205879548fdc491e0a260ff402633c00");
    const data = await response.json();
    return data;
}

async function ComicvineVideos() {
    const response = await fetch("https://www.comicvine.com/api/videos?format=json&api_key=d800216c205879548fdc491e0a260ff402633c00");
    const data = await response.json();
    return data;
}