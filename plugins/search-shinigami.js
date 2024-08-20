import cheerio from 'cheerio';
import PDFDocument from 'pdfkit';
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
        "detail",
        "pdf"
        
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.shinigami search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .shinigami search|vpn")
            await m.reply(wait)
            try {
                let res = await searchShikigami(inputs)
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*
*nama:* ${item.nama}
*link:* ${item.link}
*image:* ${item.image}
*alternative:* ${item.alternative}
*authors:* ${item.authors}
*artists:* ${item.artists}
*genres:* ${item.genres}
*status:* ${item.status}
*releaseYear:* ${item.releaseYear}
*latestChapter:* ${item.latestChapter}
*rating:* ${item.rating}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "detail") {
            if (!inputs) return m.reply("Input query link\nExample: .shinigami info|link")
            try {
                let resl = await getDetails(inputs)
                let chap = resl.chapters.map((item, index) => {
                    return `*[ Chapter ]*
*nama:* ${item.chapterTitle}
*link:* ${item.chapterLink}
*date:* ${item.releaseDate}`
                }).filter(v => v).join("\n\n________________________\n\n")
                let cap = `*rating:* ${resl.info.rating}
*rank:* ${resl.info.rank}
*alternative:* ${resl.info.alternative}
*authors:* ${resl.info.authors}
*artists:* ${resl.info.artists}
*genres:* ${resl.info.genres}
*type:* ${resl.info.type}
*tags:* ${resl.info.tags}
*releaseYear:* ${resl.info.releaseYear}
*status:* ${resl.info.status}
*description:* ${resl.info.description}

`
                await conn.sendFile(m.chat, resl.image, "", cap + chap, m)
                
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "pdf") {
            if (!inputs) return m.reply("Input query link\nExample: .shinigami info|link")
            await m.reply(wait)
            try {
                let buff = await getPDF(inputs)
                await conn.sendFile(m.chat, buff, 'Nih kak!', '', m, false, { asDocument: true })
                 } catch (e) {
                await m.reply(eror)
            }
        }
        
        
    }
}
handler.help = ["shinigami"]
handler.tags = ["internet"]
handler.command = /^(shinigami)$/i
export default handler

/* New Line */
async function searchShikigami(query) {
// Menggunakan fungsi searchShikigami dengan URL yang diberikan
const url = 'https://shinigami.id/?s=' + query + '&post_type=wp-manga&op=&author=&artist=&release=&adult='; // Ganti dengan URL yang sesuai
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  const shikigamiArray = $('.c-tabs-item__content').map((index, element) => {
    const $element = $(element);

    return {
      nama: $element.find('.post-title h3 a').text().trim(),
      link: $element.find('.post-title h3 a').attr('href'),
      image: $element.find('.tab-thumb img').attr('data-src'),
      alternative: $element.find('.mg_alternative').text().trim(),
      authors: $element.find('.mg_author a').map((index, authorElement) => $(authorElement).text().trim()).get(),
      artists: $element.find('.mg_artists a').map((index, artistElement) => $(artistElement).text().trim()).get(),
      genres: $element.find('.mg_genres a').map((index, genreElement) => $(genreElement).text().trim()).get(),
      status: $element.find('.mg_status').text().trim(),
      releaseYear: $element.find('.release-year a').text().trim(),
      latestChapter: $element.find('.meta-item.latest-chap .chapter a').text().trim(),
      rating: $element.find('.post-total-rating .score').text().trim()
    };
  }).get();

  return shikigamiArray;
}

async function getDetails(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const manga = {};

    manga.title = $('.post-title h1').text().trim();
    manga.image = $('.summary_image img').attr('data-src');

    manga.info = {
      rating: $('.post-total-rating .score').text().trim(),
      rank: $('.post-content_item:contains("Rank") .summary-content').text().trim(),
      alternative: $('.post-content_item:contains("Alternative") .summary-content').text().trim(),
      authors: $('.post-content_item:contains("Author(s)") .summary-content a').map((index, authorElement) => $(authorElement).text().trim()).get(),
      artists: $('.post-content_item:contains("Artist(s)") .summary-content a').map((index, artistElement) => $(artistElement).text().trim()).get(),
      genres: $('.post-content_item:contains("Genre(s)") .summary-content a').map((index, genreElement) => $(genreElement).text().trim()).get(),
      type: $('.post-content_item:contains("Type") .summary-content').text().trim(),
      tags: $('.post-content_item:contains("Tag(s)") .summary-content .tags-content').text().trim(),
      releaseYear: $('.post-content_item:contains("Release") .summary-content a').text().trim(),
      status: $('.post-content_item:contains("Status") .summary-content').text().trim(),
      description: $('.description-summary').text().trim()
    };

    manga.chapters = [];
    $('.listing-chapters_wrap .main li').each((index, element) => {
      const chapter = {
        chapterTitle: $(element).find('.chapter-manhwa-title').text().trim(),
        chapterLink: $(element).find('.chapter-link a').attr('href'),
        releaseDate: $(element).find('.chapter-release-date i').text().trim()
      };
      manga.chapters.push(chapter);
    });

    manga.detail = {
      title: manga.title,
      image: manga.image,
      info: manga.info,
      chapters: manga.chapters
    };

    return manga;
  } catch (error) {
    throw new Error('Terjadi kesalahan saat mengambil detail manga');
  }
}

async function getPDF(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const imageUrls = [];

  $('.reading-content .page-break img').each((index, element) => {
    const imageUrl = $(element).attr('data-src').trim();
    imageUrls.push(imageUrl);
  });

  const doc = new PDFDocument();

  for (let i = 0; i < imageUrls.length; i++) {
  const imageUrl = imageUrls[i];
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);
  doc.image(imageBuffer);
  if (i < imageUrls.length - 1) {
    doc.addPage();
  }
}


  doc.end();

  return new Promise((resolve, reject) => {
    const buffers = [];
    doc.on('data', chunk => buffers.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
    doc.on('error', error => reject(error));
  });
}