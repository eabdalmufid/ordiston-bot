import fetch from "node-fetch"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let xgkeys = "&api_key=KXd3d73NrijPmZDc"
    let lister = [
        "facebook",
        "gofile",
        "instagram",
        "instagramv2",
        "likee",
        "mirrored",
        "ouo",
        "pinterest",
        "pinterestv2",
        "srt",
        "terabox",
        "tiktok",
        "twitter",
        "twitterv2"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.xgorn facebook|link\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join('\n'))

    if (lister.includes(feature)) {
        if (!(inputs)) return m.reply("Input link " + feature)
        await m.reply(wait)
        let outs = await fetchJson(feature, inputs + xgkeys)
        await m.reply(await formatData(outs))
    }
}
handler.help = ["xgorn type query"]
handler.tags = ["internet"]
handler.command = /^(xgorn)$/i
export default handler

function formatData(data) {
  let output = '';
  let dataArray = Array.isArray(data) ? data : [data];

  dataArray.forEach((item, index) => {
    output += `*[ Result ${index + 1} ]*\n`;
    Object.keys(item).forEach(key => {
      output += ` *${key}:* `;
      if (typeof item[key] === 'object' && item[key] !== null) {
        Object.keys(item[key]).forEach(subKey => {
          output += `\n *${subKey}:* ${item[key][subKey]}`;
        });
      } else {
        output += ` ${item[key]}\n`;
      }
    });
  });

  return output;
}

async function fetchJson(type, querys) {
    let selectedInput
    // contoh penggunaan
    let input = [
        "https://api.xgorn.tech/facebook_scrape?url=",
        "https://api.xgorn.tech/gofile_scrape?url=",
        "https://api.xgorn.tech/instagram_scrape?url=",
        "https://api.xgorn.tech/instagram_scrapev2?url=",
        "https://api.xgorn.tech/likee_scrape?url=",
        "https://api.xgorn.tech/mirrored_bypass?url=",
        "https://api.xgorn.tech/ouo_bypass?url=",
        "https://api.xgorn.tech/pinterest_scrape?url=",
        "https://api.xgorn.tech/pinterest_scrapev2?url=",
        "https://api.xgorn.tech/srt_translate?url=",
        "https://api.xgorn.tech/terabox_scrape?url=",
        "https://api.xgorn.tech/tiktok_scrape?url=",
        "https://api.xgorn.tech/twitter_scrape?url=",
        "https://api.xgorn.tech/twitter_scrapev2?url="
    ]

    if (type == "facebook") {
        selectedInput = input[0]
    }
    if (type == "gofile") {
        selectedInput = input[1]
    }
    if (type == "instagram") {
        selectedInput = input[2]
    }
    if (type == "instagramv2") {
        selectedInput = input[3]
    }
    if (type == "likee") {
        selectedInput = input[4]
    }
    if (type == "mirrored") {
        selectedInput = input[5]
    }
    if (type == "ouo") {
        selectedInput = input[6]
    }
    if (type == "pinterest") {
        selectedInput = input[7]
    }
    if (type == "pinterestv2") {
        selectedInput = input[8]
    }
    if (type == "srt") {
        selectedInput = input[9]
    }
    if (type == "terabox") {
        selectedInput = input[10]
    }
    if (type == "tiktok") {
        selectedInput = input[11]
    }
    if (type == "twitter") {
        selectedInput = input[12]
    }
    if (type == "twitterv2") {
        selectedInput = input[13]
    }
    const response = await fetch(selectedInput + querys)
    const data = await response.json()
    return data
}