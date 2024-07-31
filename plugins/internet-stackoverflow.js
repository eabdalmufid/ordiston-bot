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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.stackover search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .stackover search|vpn")
            await m.reply(wait)
            try {
                let res = await searchStackover(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ HASIL ${index + 1} ]*
🆔️ ID: ${item.id}
👍 Jumlah Suara: ${item.vote}
💬 Jumlah Komentar: ${item.answer}
👀 Jumlah Dilihat: ${item.views}
🔗 Tautan: ${item.link}
📚 Judul: ${item.title}
📝 Konten: ${item.content}
👤 Pengguna: ${item.userInfo.username}
⌚ Waktu: ${item.time}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "detail") {
            if (!inputs) return m.reply("Input query link\nExample: .stackover detail|link")
            await m.reply(wait)
            try {
                let item = await detailStackover(inputs)
                let cap = `🔍 *[ HASIL ]*
🔗 Tautan: ${item.link}
📚 Judul: ${item.title}
🖼️ Gambar: ${item.image}
📝 Konten: ${item.content}
⌚ Waktu: ${item.time}
👤 Penulis: ${item.author}
🏷️ Tag: ${item.questions}
`
                await conn.sendFile(m.chat, item.image || logo, "", cap, m)

            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["stackover"]
handler.tags = ["internet"]
handler.command = /^(stackover)$/i
export default handler

/* New Line */
const BaseLinks = 'https://stackoverflow.com'
async function searchStackover(q) {
	const url = BaseLinks + '/questions/tagged/' + q;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    return $('.s-post-summary').map((index, element) => ({
      id: $(element).attr('data-post-id'),
      vote: parseInt($(element).find('.s-post-summary--stats-item__emphasized .s-post-summary--stats-item-number').text()),
      answer: parseInt($(element).find('.s-post-summary--stats-item:eq(1) .s-post-summary--stats-item-number').text()),
      views: parseInt($(element).find('.s-post-summary--stats-item:eq(2) .s-post-summary--stats-item-number').text()),
      link: BaseLinks + $(element).find('.s-post-summary--content-title a').attr('href'),
      title: $(element).find('.s-post-summary--content-title a').text().trim(),
      content: $(element).find('.s-post-summary--content-excerpt').text().trim(),
      tags: $(element).find('.s-post-summary--meta-tags a.js-tagname').toArray().map(tagElement => $(tagElement).text()),
      userInfo: {
        username: $(element).find('.s-user-card--info a').text().trim(),
        reputation: parseInt($(element).find('.s-user-card--info .s-user-card--rep span').text()),
        image: $(element).find('.s-user-card--info img.s-avatar--image').attr('src')
      },
      time: $(element).find('.s-user-card--time .relativetime').attr('title')
    })).get();
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
};

async function detailStackover(url) {
  try {
    const response = await fetch(url); // Ganti URL dengan URL yang sesuai
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('#question-header .fs-headline1 a').text();
    const link = BaseLinks + $('#question-header .fs-headline1 a').attr('href');
    const image = $('link[itemprop="image"]').attr('href');
    const content = $('.js-post-body').text().trim();
    const time = $('time[itemprop="dateCreated"]').text();
    const author = $('.user-details a').text();

    const questions = [];
    $('.post-taglist .post-tag').each((index, element) => {
      const question = $(element).text();
      questions.push(question);
    });

    return {
      title,
      link,
      image,
      content,
      time,
      author,
      questions,
    };
  } catch (error) {
    console.log('Error:', error);
  }
};