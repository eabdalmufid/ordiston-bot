import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "app"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.a2zapk search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .a2zapk search|vpn")
            await m.reply(wait)
            try {
                let res = await searchModded(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📰 *Title:* ${item.title}
🔗 *Url:* ${item.url}
🖼️ *Thumb:* ${item.iconUrl}
📋 *Meta:* ${item.meta}
📚 *Categories:* ${item.categories}`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .a2zapk app|link")
            try {
                let resl = await getMod1(inputs)
                
                let cap = "*Name:* " + resl.text + "\n" + "*Link:* " + resl.url + "\n\n" + wait
                await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m)
                await conn.sendFile(m.chat, resl.url, resl.text, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["a2zapk"]
handler.tags = ["internet"]
handler.command = /^(a2zapk)$/i
export default handler

/* New Line */
async function searchA2zapk(query) {
const url = "https://a2zapk.io/Search/" + query + "/user=SmpLdVh6bGk2M3hVaFQ2TCsyYUE1dkExTU9kRDVWQTg5ZGZ2Wmp2NnZNN2xuazFJMzI0OTFnOVg0NVhRRGFveg==/"
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const result = [];

    $('.AppCont').each((index, element) => {
      const item = {
        title: $(element).find('a').attr('title'),
        url: $(element).find('a').attr('href'),
        imageSrc: $(element).find('img').attr('data-original'),
        heading2: $(element).find('h2').text(),
        heading3: $(element).find('h3').text(),
        starWidth: $(element).find('.stars span').attr('style'),
        date: $(element).find('.dateyear_utc').text(),
      };

      result.push(item);
    });

    return result;
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
}