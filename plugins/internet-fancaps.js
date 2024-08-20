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
        "tv",
        "anime",
        "movie"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.fancaps tv|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "tv") {
            if (!inputs) return m.reply("Input query link\nExample: .fancaps tv|vpn")
            await m.reply(wait)
            try {
                let res = await searchFancaps(inputs)
                let teks = res.tv.map((item, index) => {
                let formattedLinks = item.images.map((link, index) => `${index + 1}. ${link}`).join("\n");
                    return `🔍 *[ RESULT ${index + 1} ]*
🔗 *Url:* ${item.link}
📰 *Title:* ${item.title}
🖼️ *Image:* \n${formattedLinks}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "anime") {
            if (!inputs) return m.reply("Input query link\nExample: .fancaps anime|vpn")
            await m.reply(wait)
            try {
                let res = await searchFancaps(inputs)
                let teks = res.anime.map((item, index) => {
                    let formattedLinks = item.images.map((link, index) => `${index + 1}. ${link}`).join("\n");
                    return `🔍 *[ RESULT ${index + 1} ]*
🔗 *Url:* ${item.link}
📰 *Title:* ${item.title}
🖼️ *Image:* \n${formattedLinks}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "movie") {
            if (!inputs) return m.reply("Input query link\nExample: .fancaps movie|vpn")
            await m.reply(wait)
            try {
                let res = await searchFancaps(inputs)
                let teks = res.movie.map((item, index) => {
                    let formattedLinks = item.images.map((link, index) => `${index + 1}. ${link}`).join("\n");
                    return `🔍 *[ RESULT ${index + 1} ]*
🔗 *Url:* ${item.link}
📰 *Title:* ${item.title}
🖼️ *Image:* \n${formattedLinks}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

    }
}
handler.help = ["fancaps"]
handler.tags = ["internet"]
handler.command = /^(fancaps)$/i
export default handler

/* New Line */
async function searchFancaps(query) {
  const url = `https://fancaps.net/search.php?q=${encodeURIComponent(query)}&MoviesCB=Movies&TVCB=TV&animeCB=Anime&submit=Kirim`;

  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);
  const data = { tv: [], anime: [], movie: [] };

  const categories = {
    tv: 'TV Results',
    anime: 'Anime Results',
    movie: 'Movie Results',
  };

  Object.keys(categories).forEach((category) => {
    const results = $(`h2:contains("${categories[category]}")`).next('table').find('tr');
    results.each((_, element) => {
      const titleElement = $(element).find('h4 a');
      const title = titleElement.text();
      const link = 'https://fancaps.net' + titleElement.attr('href');
      const imageElements = $(element).find('.col-xs-4 img');
      const images = imageElements.map((_, img) => $(img).attr('src')).get();
      data[category].push({ title, link, images });
    });
  });

  return data;
}