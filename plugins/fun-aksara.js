import { aksaraToLatin, latinToAksara } from "@bochilteam/scraper"

let handler = async (m, { conn, args, usedPrefix, command}) => {
let text
if (args.length >= 1) {
  text = args.slice(0).join(" ")
} else if (m.quoted && m.quoted.text) {
  text = m.quoted.text
} else {
  throw "Input teks atau reply teks yang ingin dijadikan aksara atau latin!"
}

try {
  await m.reply(wait)
  const outputText = await convertText(text)
  await m.reply(outputText)
} catch (error) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan saat melakukan konversi!")
}

}
handler.help = ["aksara"]
handler.tags = ["tools"]
handler.command = /^(aksara)$/i
export default handler

async function convertText(inputText) {
  try {
    if (/^[a-zA-Z0-9\s]+$/.test(inputText)) {
      return await latinToAksara(inputText)
    } else {
      return await aksaraToLatin(inputText)
    }
  } catch (error) {
    console.error("Error occurred during conversion:", error)
    return ""
  }
}