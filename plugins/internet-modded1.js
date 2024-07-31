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
    if (!lister.includes(feature)) return m.reply("*Example:*\n.modcombo search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .modcombo search|vpn")
            await m.reply(wait)
            try {
                let res = await Search(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📝 *Title:* ${item.title} ( ${item.alt} )
🔗 *Url:* ${item.href}
🖼️ *Thumb:* ${item.image}
⌚ *Time:* ${item.datetime}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .modcombo app|link")
            try {
                let resl = await getLinks(inputs)
                let res = await getResult(resl.downloadLink)
                let apkname = res.endsWith('APK') ? res.slice(0, -4) : res
                let urls = "https://dlnew.gamestoremobi.com/" + apkname + "-ModCombo.Com.apk"
                let cap = "*Name:* " + resl.downloadText + "\n" + "*Link:* " + resl.downloadLink + "\n\n" + wait
                await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m)
                await conn.sendFile(m.chat, urls, resl.downloadText, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["modcombo"]
handler.tags = ["internet"]
handler.command = /^(modcombo)$/i
export default handler

/* New Line */
async function Search(input) {
    const url = 'https://modcombo.com/?s=' + input; // Ganti dengan URL yang ingin Anda scrap
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const result = [];
    $('.blogs.w3 li').each((index, element) => {
        const $element = $(element);
        const $a = $element.find('a');
        const $img = $element.find('img');
        const $time = $element.find('time');
        const item = {
            title: $a.find('.title').text(),
            href: $a.attr('href'),
            image: $img.attr('data-src'),
            alt: $img.attr('alt'),
            datetime: $time.attr('datetime'),
        };
        result.push(item);
    });
    return result;
}

// URL yang ingin Anda ambil informasinya
async function getLinks(url) {
    // Mengambil konten HTML menggunakan fetch
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const ogImageUrl = $('meta[property="og:image"]').attr('content');
    // Mencari elemen dengan ID 'content-download'
    const contentDownload = $('#content-download');
    // Mendapatkan atribut href dari elemen <a>
    const downloadLink = contentDownload.find('a').attr('href');
    // Mendapatkan teks dari elemen <span>
    const downloadText = contentDownload.find('span').text();
    // Membuat objek JSON dari hasil pencarian
    const result = {
        downloadLink: downloadLink,
        downloadText: downloadText,
        ogImageUrl: ogImageUrl
    };
    return (result);
}

async function getResult(input) {
  const response = await fetch(input);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const originalText = $('.bc-title').map((index, element) => {
    const words = $(element).text().trim().split(' ');
    const version = words[words.length - 2];
    const appName = words.slice(0, words.length - 2).join('-');
    return `${appName}-${version}`;
  }).get();
  
  return originalText[0];
}