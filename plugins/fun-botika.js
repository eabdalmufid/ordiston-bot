import { sendWebhookRequest } from '../lib/botika.js';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
let text
if (args.length >= 1) {
  text = args.slice(0).join(" ")
} else if (m.quoted && m.quoted.text) {
  text = m.quoted.text
} else return m.reply("Masukkan pesan!")
await m.reply(wait)
try {
    const openAIResponse = await sendWebhookRequest(text);
    
    if (openAIResponse) {
      console.log("Respons dari OpenAI:");
      await m.reply(openAIResponse);
    } else {
      console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    await m.reply(eror);
  }
}
handler.help = ["botika"]
handler.tags = ["fun"]
handler.command = /^botika$/i
export default handler