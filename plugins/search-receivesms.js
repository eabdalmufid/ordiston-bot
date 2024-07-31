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
        "country",
        "number",
        "code"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.receivesms search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {
    
        if (feature == "country") {
            try {
                let res = await listCountry()
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*
*Name:* ${item.name}
*Link:* ${item.link}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "number") {
        if (!inputs) return m.reply("Input query")
            try {
                let res = await listNumber(inputs, inputs_ = '')
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*
*Name:* ${item.name}
*Link:* ${item.link}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "code") {
        if (!inputs) return m.reply("Input query")
            try {
                let res = await listCode(inputs)
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*
*Title:* ${item.title}
*Time:* ${item.time}
*Message:* ${item.message}
*Code:* ${item.code}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        
    }
}
handler.help = ["receivesms"]
handler.tags = ["internet"]
handler.command = /^(receivesms)$/i
export default handler

/* New Line */
async function listCountry() {
const url = 'https://receive-sms.cc/Countries/'
  try {
    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);
    const elements = $('.row.mt-auto');

    return elements.map((index, element) => ({
      link: "https://receive-sms.cc" + $(element).find('a').attr('href').trim(),
      name: ("https://receive-sms.cc" + $(element).find('a').attr('href').trim()).split("/")[3].split("-")[0]
    })).get();
  } catch (error) {
    console.error(error);
  }
}

async function listNumber(url, page = '') {
if (page !== '') {
      url += `/Page/${page}`; // Menambahkan query parameter "page" jika parameter page tidak kosong
    }
  try {
    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);
    const elements = $('.row.mt-auto');

    return elements.map((index, element) => ({
      link: "https://receive-sms.cc" + $(element).find('a').attr('href').trim(),
      name: ("https://receive-sms.cc" + $(element).find('a').attr('href').trim()).split("/")[3].split("-")[0]
    })).get();
  } catch (error) {
    console.error(error);
  }
}

async function listCode(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const result = [];

  $('.row.border-bottom.border-temps.table-hover.bg-messages').each((index, element) => {
    const row = $(element);
    const titleElement = row.find('.col-xs-12.col-md-2 a');
    const title = titleElement.text();
    const time = row.find('.col-xs-0.col-md-2.mobile_hide').text();
    const message = row.find('.col-xs-12.col-md-8').text().trim();
    const codeElement = row.find('.col-xs-12.col-md-8 .btn1 b');
    const code = codeElement.text();

    const item = {
      title: title || 'Nothing',
      time: time || 'Nothing',
      message: message || 'Nothing',
      code: code || 'Nothing'
    };

    result.push(item);
  });

  return result;
}