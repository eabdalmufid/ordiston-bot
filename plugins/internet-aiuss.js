import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .aiuss hello")
await m.reply(wait)
try {
// Contoh penggunaan
let result = await AIUSS(text)
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["aiuss"]
handler.tags = ["internet"]
handler.command = /^(aiuss)$/i
export default handler

/* New Line */
async function AIUSS(you_qus) {
  let ops = {
    systemMessage: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-05-${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()}`,
    completionParams: { presence_penalty: 0.8, temperature: 1 }
  };

  let referer_uesless = "https://ai.usesless.com/chat/1002";
  const response = await fetch("https://ai.usesless.com/api/chat-process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Referer": referer_uesless,
      "origin": "https://ai.usesless.com",
      "accept": "application/json, text/plain, */*"
    },
    body: JSON.stringify({
      openaiKey: "",
      prompt: you_qus,
      options: ops
    })
  });

  const filteredTexts = await response.text();
  let outs = filteredTexts.split('\n').pop();
  return JSON.parse(outs).text
}