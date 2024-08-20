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
        "link",
        "mp4",
        "mp3",
        "search"

    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.10down search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "link") {
            if (!inputs) return m.reply("Input query link\nExample: .10down link|vpn")
            await m.reply(wait)
           try {
                let res = await YoutubePlaylist(inputs)
                let vidlink = res.video.map((item) => {
  return `📝 quality: ${item.quality}\n🔗 Tautan: ${item.link}\n🏷️ Size: ${item.size}`
}).filter(v => v).join("\n\n")
                let teks = `🔍 *[ HASIL ]*
📚 Judul: ${res.title}
⌚ Waktu: ${res.duration}
`
const proxyurl = 'https://files.xianqiao.wang/';
                await conn.sendFile(m.chat, proxyurl + res.video[0].link || logo, "", teks + vidlink, m)

            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .10down search|vpn")
            await m.reply(wait)
           try {
                let item = await getSearch(inputs)
                let teks = item.map((res) => {
  return `title: ${res.title}
id: ${res.id}
link: ${res.link}
thumbnails: ${res.thumbnails}
duration: ${res.duration}
chanel: ${res.chanel}
publish: ${res.publish}
view: ${res.view}`
}).filter(v => v).join("\n\n")

                await conn.sendFile(m.chat, logo, "", teks, m)

            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "mp3") {
            if (!inputs) return m.reply("Input query link\nExample: .10down mp3|vpn")
            await m.reply(wait)
           try {
                let teks = await getMusic(inputs)
                throw teks
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "mp4") {
            if (!inputs) return m.reply("Input query link\nExample: .10down mp4|vpn")
            await m.reply(wait)
           try {
                let teks = await getVideo(inputs)
                throw teks
            } catch (e) {
                await m.reply(eror)
            }
        }

    }
}
handler.help = ["10down"]
handler.tags = ["internet"]
handler.command = /^(10down)$/i
export default handler

/* New Line */
async function YoutubePlaylist(query) {
  const url = 'https://10downloader.com/download?v=' + query; // Ganti dengan URL yang sesuai
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const video = [];
  const thumbnail = [];

  $('#video-downloads .downloadsTable tbody tr').each((index, element) => {
    const [quality, format, size] = $(element).find('td').slice(0, 3).map((i, el) => $(el).text().trim()).get();
    const link = $(element).find('td:nth-child(4) a').attr('href');
    video.push({ quality, format, size, link, thumb });
  });
  $('#thumbnail-downloads .downloadsTable tbody tr').each((index, element) => {
    const [quality, format, size] = $(element).find('td').slice(0, 3).map((i, el) => $(el).text().trim()).get();
    const thumb = $('tbody tr:first-child a').attr('href');
    thumbnail.push({ quality, format, size, thumb });
  });

  const title = $('.title').text().trim();
  const duration = $('.duration span').text().trim();

  return { title, duration, thumbnail, video };
};

async function shortUrl(url) {
	let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
	return await res.text()
}

async function getMusic(url) {
  try {
    var check = await fetch("https://x2convert.com/ajax2/getFile.ashx?linkinfo=" + url + "&lang=id&option=100&country=ID");
    return await check.json();
  } catch (error) {
    console.error(error);
    return "not-valid";
  }
}

async function getVideo(q) {
  const url = 'https://www.videovor.com/en/getlinks?url=' + q + '&r=0&retry=false';
  try {
    const response = await fetch(url);
    const data = await response.text();
    return JSON.parse(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getSearch(teks) {
  try {
    teks = teks.replace(" ", "+");
    var api = await fetch("https://api.mp3download.to/v1/external/search/?query=" + teks);
    api = await api.json();

    return api["data"]["items"].map(item => {
      return {
        "title": item["title"],
        "id": item["id"],
        "link": "https://youtu.be/" + item["id"],
        "thumbnails": item["thumbnails"][Math.floor(Math.random() * item["thumbnails"].length)],
        "duration": item["duration"],
        "chanel": item["extra_data"]["channel_title"],
        "publish": item["extra_data"]["publishedAt"],
        "view": item["extra_data"]["viewCount"]
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}