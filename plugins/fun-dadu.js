import { createSticker } from "wa-sticker-formatter"
let handler = async (m, { conn }) => {
await m.reply(wait)
let diceImage = rollDice()
let stiker = await createSticker(diceImage, { pack: packname, author: m.name })
await conn.sendFile(m.chat, stiker, "dadu.webp", "", m)
}
handler.help = ["dadu"]
handler.tags = ["game"]
handler.command = ["dadu"] 
export default handler

function rollDice() {
  return "https://www.random.org/dice/dice" + (Math.floor(Math.random() * 6) + 1) + ".png"
}