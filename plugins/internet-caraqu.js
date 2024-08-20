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
        "detail"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.caraqu search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .caraqu search|vpn")
            await m.reply(wait)
            try {
                let res = await searchCaraqu(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
📚 title: ${item.title}
🔗 link: ${item.link}
🖼️ image: ${item.image}
📅 date: ${item.date}
📖 story: ${item.story}
  `
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "detail") {
            if (!inputs) return m.reply("Input query link\nExample: .caraqu search|group")
            await m.reply(wait)
            try {
                let item = await detailCaraqu(inputs)
                let cap = `🔍 *[ RESULT ]*
📚 Title: ${item.title}
📝 Content: ${item.content}
🖼️ Image: ${item.image}
`
                await conn.sendFile(m.chat, item.image || logo, "", cap, m)

            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["caraqu"]
handler.tags = ["internet"]
handler.command = /^(caraqu)$/i
export default handler

/* New Line */
async function searchCaraqu(query) {
  const url = `https://www.caraqu.com/?s=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url); // Ganti dengan URL yang sesuai
    const body = await response.text();
    const $ = cheerio.load(body);

    return $('.mvp-blog-story-wrap').map((index, element) => ({
      title: $(element).find('.mvp-blog-story-in h2').text().trim(),
      link: $(element).find('a').attr('href'),
      image: $(element).find('.mvp-blog-story-img .mvp-big-img').attr('src'),
      date: $(element).find('.mvp-cat-date-wrap .mvp-cd-date').text().trim(),
      story: $(element).find('.mvp-blog-story-text p').text().trim(),
    })).get();
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
};

async function detailCaraqu(url) {
  try {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    const title = $('h1.entry-title').text().trim();
    const image = $('div#mvp-post-feat-img img').attr('src');

    const content = $('div#mvp-content-body')
      .find('p, ul > li')
      .map((index, element) => {
        const paragraph = $(element).clone().children().remove().end().text().trim();
        const link = $(element).find('a').attr('href');
        return link ? `${paragraph}\n${link}` : paragraph;
      })
      .get()
      .join('\n');

    const related = $('ul.related-posts-list li')
      .map((index, element) => ({
        title: $(element).find('.mvp-blog-story-in h2').text().trim(),
        link: $(element).find('.mvp-blog-story-out a').attr('href'),
        image: $(element).find('.mvp-blog-story-img .mvp-big-img').attr('src')
      }))
      .get();

    const tableOfContents = $('.lwptoc_item')
      .map((index, element) => ({
        number: $(element).find('.lwptoc_item_number').text().trim(),
        label: $(element).find('.lwptoc_item_label').text().trim(),
        link: $(element).find('.lwptoc_item a').attr('href')
      }))
      .get();

    return { title, image, content, related, tableOfContents };
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};