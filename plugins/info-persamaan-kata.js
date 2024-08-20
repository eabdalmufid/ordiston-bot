import axios from "axios"
import cheerio from "cheerio"
let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    let query = "input text\nEx. .persamaankata hello world\n<command> <tex>"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query

    try {
        m.reply(wait)
        let res = await Persamaan_Kata(text)
        await conn.sendMessage(m.chat, { image: { url: res.image }, caption: "*[ Result ]*\n\n" + ArrClean(res.result) }, { quoted: m, ephemeralExpiration: ephemeral })
    } catch (e) {
        throw eror
    }
}
handler.help = ["persamaankata"]
handler.tags = ["search"]
handler.command = /^(persamaankata|sinonim)$/i
export default handler

function ArrClean(str) {
    return str.map((v, index) => ++index + ". " + v).join('\r\n')
}

async function Persamaan_Kata(kata) {
    const html = await axios.get("https://m.persamaankata.com/search.php?q=" + kata)
    const $ = cheerio.load(html.data)
    const h = []
    $("div.word_thesaurus > a").each(function(e, a) {
        h.push($(a).text());
    })
    const image = $("img#visual_synonym_img").attr("src")
    return {
        image: image,
        result: h
    }
}