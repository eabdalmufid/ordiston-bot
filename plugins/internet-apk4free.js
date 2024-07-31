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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apk4free search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apk4free search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApk4free(inputs)
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*

*item.title:* ${item.title}
*url:* ${item.url}
*thumbnail:* ${item.thumbnail}
*category:* ${item.category}
*tag:* ${item.tag}
*description:* ${item.description}
*author name:* ${item.author.name}
*author image:* ${item.author.image}
*author count:* ${item.author.count}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apk4free app|link")
            try {
                let resl = await getApk4free(inputs)
                let cap = "*About:*\n" + resl.text.slice(4, 16).join("\n") + "\n" + "*Link:*\n" + resl.download.map((v, index) => (index + 1) + ". " + v).join("\n");
                await conn.sendFile(m.chat, resl.image[0], "", cap, m)
                
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apk4free"]
handler.tags = ["internet"]
handler.command = /^(apk4free)$/i
export default handler

/* New Line */
async function searchApk4free(query) {
  const url = `https://apk4free.org/?s=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);
  const articles = [];

  $('article').each((index, element) => {
    const $article = $(element);

    articles.push({
      title: $article.find('h1.title a').text(),
      url: $article.find('h1.title a').attr('href'),
      thumbnail: $article.find('.featured-image .thumb.hover-effect span.fullimage').css('background-image').replace(/url\((.*)\)/, '$1'),
      category: $article.find('.tags a[href^="https://apk4free.org/category/"]').map((index, tagElement) => $(tagElement).text()).get(),
      tag: $article.find('.tags a[href^="https://apk4free.org/tag/"]').map((index, tagElement) => $(tagElement).text()).get(),
      description: $article.find('.post-excerpt p').text(),
      author: {
        name: $article.find('footer.author-meta a .author-name').text(),
        image: $article.find('footer.author-meta a .author-image').css('background-image').replace(/url\('(.*)'\)/, '$1'),
        count: $article.find('footer.author-meta a .author-count').text().replace(' Resources', ''),
      }
    });
  });

  return articles;
}

async function getApk4free(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const data = [];

    $('section.post-content p, .slider img, strong a[href^="https://"]').each((index, element) => {
      const $element = $(element);

      if ($element.is('p')) {
        const content = $element.text().trim();
        if (content !== '') {
          data.push({ type: 'text', content });
        }
      } else if ($element.is('img')) {
        let src = $element.attr('src');
        if (src.startsWith('//')) {
          src = 'https:' + src;
        }
        data.push({ type: 'image', src });
      } else if ($element.is('a')) {
        let link = $element.attr('href');
        if (link.startsWith('//')) {
          link = 'https:' + link;
        }
        data.push({ type: 'download', link });
      }
    });

    const output = data.reduce((result, item) => {
      const { type, content, src, link } = item;
      if (type === 'text') {
        if (!result.text) {
          result.text = [];
        }
        result.text.push(content);
      } else if (type === 'image') {
        if (!result.image) {
          result.image = [];
        }
        result.image.push(src);
      } else if (type === 'download') {
        if (!result.download) {
          result.download = [];
        }
        result.download.push(link);
      }
      return result;
    }, {});

    return output;
  } catch (error) {
    console.log(error);
  }
}