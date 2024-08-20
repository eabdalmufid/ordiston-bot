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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.apkhome search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .apkhome search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApkhome(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📰 *Title:* ${item.title}
🔗 *Url:* ${item.href}
🖼️ *Thumb:* ${item.imageSrc}
📆 *Edition:* ${item.edition}`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .apkhome app|link")
            try {
                let resl = await getApkhome(inputs)
                
                let cap = "*Name:* " + resl.downloadLink + "\n" + "*Link:* " + resl.downloadLinkURL + "\n\n" + wait
                await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m)
                await conn.sendFile(m.chat, resl.downloadLinkURL, resl.downloadLink, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apkhome"]
handler.tags = ["internet"]
handler.command = /^(apkhome)$/i
export default handler

/* New Line */
async function searchApkhome(query) {
  try {
// URL yang akan diambil HTML-nya
const url = 'https://apkhome.io/id/?s=' + query; // Ganti dengan URL yang sesuai

// Fetch HTML dari URL menggunakan fetch
const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Cari semua elemen <li><dl><a>
    const elements = $('li > dl > a');

    // Array untuk menyimpan objek hasil
    const result = elements.map((index, element) => {
      const anchorElement = $(element);

      // Ambil data dari elemen yang sesuai
      const data = {
        href: anchorElement.attr('href'),
        imageSrc: anchorElement.find('.l img').attr('data-cfsrc') || anchorElement.find('.l img').attr('src'),
        title: anchorElement.find('.r .p1').text().trim(),
        edition: anchorElement.find('.r p:last-of-type').text().trim()
      };

      return data;
    }).get();

    // Tampilkan array objek JSON
    return result;
    } catch (error) {
    console.error(error);
  }
}

async function getApkhome(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const ogImageUrl = $('meta[property="og:image"]').attr('content');
    const gtBlockElement = $('p.gt-block');
    const data = {
      title: gtBlockElement.find('strong').first().text().trim(),
      description: gtBlockElement.first().text().trim(),
      supportedAndroid: gtBlockElement.filter(':contains("Android yang didukung")').next('br').text().trim(),
      supportedAndroidVersions: gtBlockElement.filter(':contains("Versi Android yang didukung")').next('br').text().trim(),
      ogImageUrl: ogImageUrl,
      downloadLink: $('a[href^="https://dl2.apkhome.io"]').text().trim(),
      downloadLinkURL: $('a[href^="https://dl2.apkhome.io"]').attr('href')
    };

    return data;
  } catch (error) {
    console.error(error);
  }
}