import fetch from "node-fetch"
import bo from "dhn-api"
let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {
    let spas = "                "
    let lister = [
        "album",
"article",
"artist",
"lyrics",
"playlist",
"song",
"user"
    ]
    let [feature, querys] = text.split(/[^\w\s]/g)
    if (!lister.includes(feature)) return m.reply("*Example:*\n.kkbox api\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))
    if (lister.includes(feature)) {
            if (!querys) return m.reply("Input Query!")
            await m.reply(wait)
            let data = await KKBOX(feature, querys)
            
            await m.reply(`*${htki} 📺 KKBOX Search 🔎 ${htka}*\n${await formatData(data)}`)
    }
}
handler.help = ["kkbox"]
handler.tags = ["fun"]
handler.command = /^(kkbox)$/i
export default handler

function formatData(data) {
  let output = ''
  data.forEach((item, index) => {
    output += `*[ Result ${index + 1} ]*\n`
    Object.keys(item).forEach(key => {
      output += ` *${key}:* `
      if (typeof item[key] === 'object') {
        Object.keys(item[key]).forEach(subKey => {
          output += `\n *${subKey}:* ${item[key][subKey]}`
        })
      } else {
        output += ` ${item[key]}\n`
      }
    })
  })
  return output
}

async function _KKBOX(type, query) {
    let url = `https://api.kkbox.com/v1.1/search?q=${query}&territory=TW`
    let token = "Bearer 9pYoKeM-L8ldglRUP5JGhg=="
    let response = await fetch(url, {
        headers: {
            Authorization: token
        }
    })
    let data = await response.json()
    return data[type].data
}

async function KKBOX(type, query) {
    let url = "https://www.kkbox.com/api/search/" + type + "?q=" + query
    let response = await fetch(url)
    let data = await response.json()
    return data.data.result
}