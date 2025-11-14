import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {

    let lister = [
        "google",
        "unsplash"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.kapwing google|cars\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "google") {
            if (!inputs) return m.reply("Input query link\nExample: .kapwing google|cars")
            await m.reply(wait)
            try {
                let res = await getImageResults(inputs)
                let outs = Random(res.google)
            let teks = `*[ Name ]*\n${outs.name}\n\n*[ Type ]*\n${outs.type}`
        await conn.sendFile(m.chat, outs.url, "", teks, m)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "unsplash") {
            if (!inputs) return m.reply("Input query link\nExample: .kapwing google|cars")
            await m.reply(wait)
            try {
                let res = await getImageResults(inputs)
                let outs = Random(res.unsplash)
            let teks = `*[ Name ]*\n${outs.name}\n\n*[ Type ]*\n${outs.type}`
        await conn.sendFile(m.chat, outs.images.large, "", teks, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["kapwing type query"]
handler.tags = ["internet"]
handler.command = /^(kapwing)$/i
export default handler

/* New Line */
async function getImageResults(query) {
  const response = await fetch(
    "https://us-central1-kapwing-181323.cloudfunctions.net/image_search",
    {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "content-type": "application/json",
        referer: "https://www.kapwing.com/studio/editor/overlay/search",
        origin: "https://www.kapwing.com",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36"
      }
    }
  );

  const json = await response.json();

  return json;
}

function Random(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}