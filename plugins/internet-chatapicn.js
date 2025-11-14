import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .chatapicn hello")
await m.reply(wait)
try {
    let inputText = await ChatGpt(text)
await m.reply(inputText.text)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["chatapicn"]
handler.tags = ["internet"]
handler.command = /^(chatapicn)$/i
export default handler

/* New Line */
async function ChatGpt(query) {
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Referer": "https://2chat.c3r.ink/",
      "accept": "application/json, text/plain, */*"
    },
    body: JSON.stringify({
      prompt: query,
      options: {},
      regenerate: false,
      roomId: 1002,
      uuid: Date.now(),
      systemMessage: "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
      top_p: 1,
      temperature: 0.8
    })
  };

  const response = await fetch("https://chatapicn.a3r.fun/api/chat-process", requestData);
  const data = await response.text();
  // Handle the response data here
  let out = JSON.parse(data.split("\n").pop());
  return out;
}