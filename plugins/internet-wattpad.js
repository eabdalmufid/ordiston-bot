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
        "read",
        "list"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.wattpad search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
        if (!inputs) return m.reply("Input query link\nExample: .wattpad read|5\nList: .wattpad list")
            await m.reply(wait)
            try {
                let res = await searchWattpad(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
🔗 Link: ${item.link}
🖼️ Image: ${item.image}
📚 Title: ${item.title}
👁️‍🗨️ Read Count: ${item.readCount}
🔥 Vote Count: ${item.voteCount}
📖 Chapter Count: ${item.chapterCount}
ℹ️ Description: ${item.description}
  `
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "list") {
        if (!inputs) return m.reply("Input query link\nExample: .wattpad read|5\nList: .wattpad list")
            await m.reply(wait)
            try {
                let lin = await getStartReadingLink(inputs)
                let res = await listRead(lin)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
📚 Title: ${item.title}
🔗 Link: ${item.link}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }


        if (feature == "read") {
            if (!inputs) return m.reply("Input query link\nExample: .wattpad read|5\nList: .wattpad list")
            await m.reply(wait)
            try {

                let item = await readWattpad(inputs)
                let cap = `🔍 *[ RESULT ]*
📝 Content: ${item}
`
                await m.reply(cap)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["wattpad"]
handler.tags = ["internet"]
handler.command = /^(wattpad)$/i
export default handler

/* New Line */

async function searchWattpad(q) {
  const baseUrl = 'https://www.wattpad.com';
  const url = `${baseUrl}/search/${q}`; // Ganti dengan URL yang sesuai

  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const results = $('section#section-results-stories article#results-stories ul.list-group li.list-group-item')
    .map((index, element) => ({
      link: baseUrl + $(element).find('.story-card').attr('href'),
      image: $(element).find('.cover img').attr('src'),
      title: $(element).find('.story-info .title[aria-hidden="true"]').first().text().trim(),
      readCount: $(element).find('.new-story-stats .stats-value').eq(0).text(),
      voteCount: $(element).find('.new-story-stats .stats-value').eq(1).text(),
      chapterCount: $(element).find('.new-story-stats .stats-value').eq(2).text(),
      description: $(element).find('.description').text().trim()
    }))
    .get();

  return results;
}

async function readWattpad(url, page = 1, output = '\n\n', prevTitle = null) {
  const pageURL = `${url}/page/${page}`;
  const response = await fetch(pageURL);
  const text = await response.text();
  const $ = cheerio.load(text);
  const newTitle = $('title').text();

  if (newTitle === prevTitle) {
    const nextURL = $('a.on-navigate.next-up').attr('href');
    if (!nextURL) return output;
    return readWattpad(nextURL, 1, output + `\n\n\t${prevTitle}\n`, null);
  }

  console.log(newTitle, text.length);

  $('p').each((index, element) => {
    const paragraph = $(element).text().trim();
    output += `${paragraph}\n`;
  });

  return readWattpad(url, page + 1, output, newTitle);
}

async function getStartReadingLink(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const startReadingLink = $('a.read-btn').attr('href');
    return 'https://www.wattpad.com' + startReadingLink;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}

async function listRead(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const tableOfContents = $('ul.table-of-contents li[class=""]')
      .map((index, element) => ({
        title: $(element).find('.part-title').text().trim(),
        link: 'https://www.wattpad.com' + $(element).find('a.on-navigate').attr('href'),
      }))
      .get();
    return tableOfContents;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}