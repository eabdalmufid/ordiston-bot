import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .gptbaby hello")
await m.reply(wait)
try {
// Contoh penggunaan
let result = await gptBaby(text)
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["gptbaby"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(gptbaby)$/i
export default handler

function convertNewline(output) {
  const convertedOutput = output.replace(/\\n/g, '\n');
  return convertedOutput;
}

/* New Line */
async function gptBaby(your_qus) {
  const baseURL = "https://fasdsgdfsg97986agagyk656.lovebaby.today/";
  const messageChain8 = [{ role: "user", content: your_qus }];
  
  try {
    const response = await fetch(baseURL + "api/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "text/event-stream",
        "origin": "https://fasdsgdfsg97986agagyk656.lovebaby.today/",
        "Referer": baseURL
      },
      body: JSON.stringify({
        messages: messageChain8,
        stream: true,
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        presence_penalty: 0
      })
    });
    
    // Handle the response data here
    const inputString = await response.text();
  const regex = /"content":"([^"]*)"/g;
  let match;
  let result = "";

  while ((match = regex.exec(inputString))) {
    result += match[1];
  }

  return result.replace(/\\n/g, '\n');
  } catch (error) {
    // Handle any errors here
    console.error(error);
  }
}