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
        "pdf"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.bookspdf search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .bookspdf search|vpn")
            await m.reply(wait)
            try {
                let res = await searchBook(inputs)
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*
*Title:* ${item.title}
*Url:* ${item.link}
*Image:* ${item.imageUrl}
*Description:* ${item.description}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "pdf") {
            if (!inputs) return m.reply("Input query link\nExample: .bookspdf pdf|link")
            try {
                let resl = await getInfo(inputs)

                let cap = `
*title:* ${resl.download.title}
*link:* ${resl.link}
*downloadLink:* ${resl.download.downloadLink}
*content:* ${resl.content}
${wait}`
                await m.reply(cap)
                await conn.sendFile(m.chat, resl.download.downloadLink, resl.download.title, null, m, true, {
                    quoted: m,
                    mimetype: "application/pdf"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["bookspdf"]
handler.tags = ["internet"]
handler.command = /^(bookspdf)$/i
export default handler

/* New Line */
async function searchBook(q) {
  try {
    const response = await fetch('https://free-bookspdf.com/?s=' + q); // Ganti URL dengan URL yang sesuai
    const html = await response.text();
    const $ = cheerio.load(html);
    const result = [];

    $('div.col-lg-3.col-md-4.col-sm-6.col-xs-12').each((index, element) => {
      const title = $(element).find('h3').text().trim();
      const imageUrl = $(element).find('img').attr('src');
      const link = $(element).find('a').attr('href');
      const description = $(element).find('.book-tit').text().trim();

      result.push({
        title,
        imageUrl,
        link,
        description
      });
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getInfo(url) {
const baseUrl = 'https://free-bookspdf.com'
  try {
    const response = await fetch(url); // Ganti URL dengan URL yang sesuai
    const html = await response.text();
    const $ = cheerio.load(html);

    const content = $('div.ng-scope').find('p').text().trim();
    const link = $('a.btn-primary').attr('href');
    const ogImageUrl = $('meta[property="og:image"]').attr('content');
    const ogTitle= $('meta[property="og:title"]').attr('content');
    const download = await downloadLink(baseUrl + link)
    const result = {
      content: content,
      link: baseUrl + link,
      ogImageUrl: ogImageUrl,
      ogTitle: ogTitle,
      download: download
    };

    return result;
  } catch (error) {
    console.log(error);
  }
}

async function downloadLink() {
  try {
    const url = 'https://free-bookspdf.com/download/?6786'

    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);

    const downloadLink = $('a.btn-primary').attr('href');
    const title = $('a.btn-primary').text().trim();

    return { title, downloadLink };
  } catch (error) {
    console.error('Error fetching book details:', error);
  }
}