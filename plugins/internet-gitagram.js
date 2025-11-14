import * as cheerio from 'cheerio';
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
        "chord"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.gitagram search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .gitagram search|hello")
            await m.reply(wait)
            try {
                let res = await searchGitagram(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${item.index} ]*
📰 *Title:* ${item.title || 'Tidak diketahui'}
🔗 *Url:* ${item.link || 'Tidak diketahui'}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "chord") {
            if (!inputs) return m.reply("Input query link\nExample: .gitagram chord|link")
            try {
                let item = await chordGitagram(inputs)
                let teks = `🔍 *[ RESULT ]*
📰 *Title:* ${item.title || 'Tidak diketahui'}
🖼️ *Image:* ${item.image || 'Tidak diketahui'}
📅 *Release Date:* ${item.releaseDate || 'Tidak diketahui'}
👤 *Author:* ${item.author || 'Tidak diketahui'}
🎸 *Chord:* ${item.chord || 'Tidak diketahui'}
📝 *Description:* ${item.description || 'Tidak diketahui'}
🔗 *Link:* ${item.link || 'Tidak diketahui'}
`
                await conn.sendFile(m.chat, item.image || flaaa + command, "", teks, m)

            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["gitagram"]
handler.tags = ["internet"]
handler.command = /^(gitagram)$/i
export default handler

/* New Line */
async function searchGitagram(query) {
  const url = `https://www.gitagram.com/index.php?s=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);
  const results = [];

  $('.main .section .container .columns .column .panel .table tbody tr').each((index, element) =>
    results.push({
      index: index + 1,
      title: $(element).find('span.title').first().text().trim(),
      link: $(element).find('a').attr('href')
    })
  );

  return results;
}

async function chordGitagram(url) {
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);
  const element = $('.main .section.single .container .columns .column.cetak article');

  return {
    title: element.find('.entry-header .title.is-5').text().trim(),
    image: element.find('.entry-header .image img').attr('src'),
    releaseDate: element.find('.entry-meta .icon-text').first().text().trim(),
    author: element.find('.entry-meta .title.is-7').text().trim(),
    chord: element.find('.content pre').text().trim(),
    description: $('meta[property="og:description"]').attr('content'),
    link: $('meta[property="og:url"]').attr('content')
  };
}