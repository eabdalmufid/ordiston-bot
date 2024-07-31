import fetch from "node-fetch"
let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {
    let spas = "                "
    let lister = [
        "all",
"sort",
"file"
    ]
    let [feature, querys] = text.split(/[^\w\s]/g)
    if (!lister.includes(feature)) return m.reply("*Example:*\n.openlibrary api\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))
    if (lister.includes(feature)) {
            if (!querys) return m.reply("Input Query!")
            await m.reply(wait)
            
            if (feature == "sort") {
            let data = await getBookInfo(feature, querys)
            let capt = await formatData([data])
            await conn.reply(m.chat, `*${htki} 📺 Openlibrary Search 🔎 ${htka}*\n${capt}`, m)
            }
            if (feature == "all") {
            let data = await getBookInfo(feature, querys)
            let capt = await formatData([data])
            await conn.reply(m.chat, `*${htki} 📺 Openlibrary Search 🔎 ${htka}*\n${capt}`, m)
            }
            if (feature == "file") {
            await conn.sendFile(m.chat, querys, 'Boom nya kak!', '', m, false, { asDocument: true })
            }
    }
}
handler.help = ["openlibrary"]
handler.tags = ["search"]
handler.command = /^(openlibrary)$/i
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

async function getBookInfo(type, query) {
  const response = await fetch("https://openlibrary.org/search.json?q=" + query)
  const data = await response.json()
  if (type == "sort") {
  const bookInfo = data.docs[0]
  return bookInfo
  }
  if (type == "all") {
  const items = data.docs
  const output = []
  for (let i = 0; i < items.length; i++) {
    output.push(items[i])
  }
  return output
  }
}