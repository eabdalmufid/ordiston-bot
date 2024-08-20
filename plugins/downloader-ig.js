/*import fetch from "node-fetch"
import got from "got"
import cheerio from "cheerio"
import {
    instagram
} from "@xct007/frieren-scraper"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let lister = [
        "v1",
        "v2",
        "v3",
        "v4"

    ]
let spas = "                "
    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ")
    if (!lister.includes(feature.toLowerCase())) return m.reply("*Example:*\n" + usedPrefix + command + " v2 link\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v.toUpperCase()).join("\n"))

    if (lister.includes(feature)) {
        if (feature == "v1") {
            if (!inputs) return m.reply("Input query link")
            m.reply(wait)
                try {
                let results = await instagram.v1(inputs)

                let caption = `*[ I N S T A G R A M ]*`
                let out = results[0].url
                await m.reply(wait)
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "v2") {
            if (!inputs) return m.reply("Input query link")
            m.reply(wait)
                try {
                let results = await (await fetch("https://fantox001-scrappy-api.vercel.app/instadl?url=" + inputs)).json()

                let caption = `*[ I N S T A G R A M ]*`
                let out = results.videoUrl

                await m.reply(wait)
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }

        }
        if (feature == "v3") {
            if (!inputs) return m.reply("Input query link")
            m.reply(wait)
                try {
                let results = await igDownload(inputs)

                let caption = `*[ I N S T A G R A M ]*`
                let out = results
                await m.reply(wait)
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }

        }
        
        if (feature == "v4") {
            if (!inputs) return m.reply("Input query link")
            m.reply(wait)
                try {
                let results = await getVideo(inputs)

                let caption = `*[ I N S T A G R A M ]*`
                let out = results
                await m.reply(wait)
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }

        }
        

    }
}
handler.help = ['instagram']
handler.tags = ['downloader']
handler.command = /^(ig(dl)?|instagram(dl)?)$/i

export default handler

async function igDownload(url) {
return await got(url)
  .then(response => {
    const $ = cheerio.load(response.body);
    const metaTags = $('meta[property="og:video:secure_url"]').attr('content');
    return metaTags;
  })
  }
  
function b64decode(str) {
  return atob(str.replace('_', '/').padEnd(str.length + (4 - str.length % 4) % 4, '='));
}

async function getVideo(url) {
  if (!url.startsWith('http')) url = 'https://' + url;
  const instagramDomains = ['https://www.instagram.com', 'https://instagram.com'];
  if (instagramDomains.some(domain => url.toLowerCase().startsWith(domain))) {
    url = url.split('?')[0];

    try {
      const headers = {
        'url': url,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'origin': 'https://instavideosave.net',
        'accept': '*//*'  //hapus satu garis miring nya
      };

      const response = await fetch('https://api.instavideosave.com/allinone', { headers });
      const { video } = await response.json();
      const link = video?.[0]?.video;

      if (link) return link;
      throw new Error('No video link found');
    } catch (error) {
      return { success: false, error: error.toString() };
    }
  }

  return { success: false, error: 'invalidUrl' };
}*/  //lihat line 123


import {
    instagramdl
} from '@bochilteam/scraper'
var handler = async (m, {
    args,
    text,
    usedPrefix,
    command
}) => {
    if (!args[0]) throw `*Use example:* ${usedPrefix}${command} https://www.instagram.com/reel/Cfi6nIVpGYj/?igshid=Yzg5MTU1MDY=`
    if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
    if (!text.includes('instagram.com')) return m.reply(`Invalid Instagram URL.`)
    try {
        let res = await bochil.snapsave(args[0])
        let media = await res[0].url
        const short = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
        const text = `🔗 *Url:* ${short}`.trim();
        if (!res) throw 'Can\'t download the post'
        m.reply('_In progress, please wait..._')
        conn.sendFile(m.chat, media, 'file', text, m)
        //conn.sendMessage(m.chat, { video : { url : media }}, m) 
    } catch {
        try {
            let res2 = await instagramdl(args[0])
            let media2 = res2.url
            let cap = res2.title
            return conn.sendFile(m.chat, media2, 'file', cap, m)
            //return conn.sendFile(m.chat, media2, 'instagram.mp4', cap, m)
        } catch {
            conn.sendFile(m.chat, media, '', '', m)
        } finally {}
    }
}
handler.help = ['instagram']
handler.tags = ['downloader']
handler.command = /^(ig(dl)?|instagram(dl)?)$/i
handler.limit = true

export default handler