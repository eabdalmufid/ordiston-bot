import fetch from "node-fetch"
import cheerio from "cheerio"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let lister = [
        "search"

    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) throw "*Example:*\n.suratmp3 search|naruto\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n")

    if (lister.includes(feature)) {
        if (feature == "search") {
            if (!inputs) throw "Input query reciters number"
            try {
                // Contoh pemanggilan fungsi
                let outs = await searchSuratmp3(inputs)
                let teks = outs.map((anime, index) => {
                    return `*[ ${index + 1} ]*
*Title:* ${anime.title}
*Sound:* ${anime.sound}
*Download Url:* ${anime.downloadUrl}
*Listen Url:* ${anime.listenUrl}
*SubCount:* ${anime.subCount}
   `.trim()
                }).filter(v => v).join("\n\n________________________\n\n")
                await conn.sendFile(m.chat, logo, '', teks, m)
            } catch (e) {
                throw eror
            }
        }
        
    }
}
handler.help = ["suratmp3 type query"]
handler.tags = ["internet"]
handler.command = /^(suratmp3)$/i
export default handler

async function searchSuratmp3(query) {
  const url = 'https://suratmp3.com/quran/reciters/' + query + '/hq'; // Ganti dengan URL yang sesuai

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const results = [];

    $('.playlist.no-top.list li').each((index, element) => {
      const surah = {
        title: $(element).find('.title-container a').text().trim() || 'tidak diketahui',
        sound: $(element).find('.icon-play').attr('sound-data') || 'tidak diketahui',
        downloadUrl: $(element).find('.spf-link').attr('href') || 'tidak diketahui',
        listenUrl: $(element).find('.title-container a').attr('href') || 'tidak diketahui',
        subCount: $(element).find('.sub').text().trim() || 'tidak diketahui',
      };

      results.push(surah);
    });

    return results;
  } catch (error) {
    console.log(error);
  }
}