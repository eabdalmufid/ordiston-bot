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
        "info"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.deviantart search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .deviantart search|vpn")
            await m.reply(wait)
            try {
                let res = await searchDeviantart(inputs)
                let teks = res.map((item, index) => {
                
                    return `🔍 *[ RESULT ${index + 1} ]*

📚 *Title:* ${item.title}
🔗 *Link:* ${item.link}
🆔 *Guid:* ${extractIdFromUrl(item.guid)}
📅 *PubDate:* ${item.pubDate}
🎥 *MediaTitle:* ${item.mediaTitle}
📰 *MediaCategory:* ${item.mediaCategory}
📷 *MediaCredit:* ${generateOutput(item.mediaCredit)}
📝 *MediaDescription:* ${removeHtmlTags(item.mediaDescription)}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "info") {
            if (!inputs) return m.reply("Input query link\nExample: .deviantart app|link")
            await m.reply(wait)
            try {
            if (!inputs.startsWith('https://www.deviantart.com/') && !inputs.startsWith('https://backend.deviantart.com/')) return m.reply('Link salah');

                let item = await infoDeviantart(inputs)
                let cap = `🔍 *[ RESULT ]*

📷 *Version:* ${item.version}
🔖 *Type:* ${item.type}
📚 *Title:* ${item.title}
📰 *Category:* ${item.category}
👤 *Author Name:* ${item.author_name}
🔗 *Author URL:* ${item.author_url}
📡 *Provider Name:* ${item.provider_name}
🔗 *Provider URL:* ${item.provider_url}
🛡️ *Safety:* ${item.safety}
📅 *Pubdate:* ${item.pubdate}
🔖 *Tags:* ${item.tags}
`
                await conn.sendFile(m.chat, item.url || logo, "", cap, m)
                
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["deviantart"]
handler.tags = ["internet"]
handler.command = /^(deviantart)$/i
export default handler

/* New Line */
function generateOutput(text) {
  const name = text.substr(0, text.indexOf("https"));
  const link = text.substr(text.indexOf("https"));
  return `Credit: ${name}\nLink: ${link}`;
}

function extractIdFromUrl(url) {
  const regex = /-(\d+)\b/;
  const match = url.match(regex);
  let id = "";
  if (match && match.length > 1) {
    id = match[1];
  }
  return id;
}

function removeHtmlTags(text) {
  const regex = /(<([^>]+)>)/gi;
  return text.replace(regex, '');
}

async function searchDeviantart(input) {
  const urlToFetch = `https://backend.deviantart.com/rss.xml?q=${input}&type=deviation`;
  try {
    const response = await fetch(urlToFetch);
    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });
    const items = [];

    $('item').each((index, element) => {
      const item = {};

      item.title = $(element).find('title').text();
      item.link = $(element).find('link').text();
      item.guid = $(element).find('guid').text();
      item.pubDate = $(element).find('pubDate').text();
      item.mediaTitle = $(element).find('media\\:title').text();
      item.mediaCategory = $(element).find('media\\:category').text();
      item.mediaCredit = $(element).find('media\\:credit').text();
      item.mediaDescription = $(element).find('media\\:description').text();
      
      // Mengambil atribut URL dari elemen thumbnail pertama
      item.thumbnailUrl = $(element).find('media\\:thumbnail').eq(0).attr('url');

      items.push(item);
    });

    return items;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function infoDeviantart(url) {
  const modifiedURL = url.includes('https://backend.deviantart.com/oembed?url=') ? url : `https://backend.deviantart.com/oembed?url=${url}&format=json`;
  try {
    const response = await fetch(modifiedURL);
    const items = await response.json();
    return items;
  } catch (error) {
    console.error(error);
    throw error;
  }
}