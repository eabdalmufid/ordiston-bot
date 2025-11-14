import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .gptgo hello")
await m.reply(wait)
try {
// Contoh penggunaan
let input = await gptGo(text)
let result = input.content
await m.reply(convertNewline(result))
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["gptgo"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(gptgo)$/i
export default handler

function convertNewline(output) {
  const convertedOutput = output.replace(/\\n/g, '\n');
  return convertedOutput;
}

/* New Line */
async function gptGo(query) {
  const tokenResponse = await fetch(`https://gptgo.ai/action_get_token.php?q=${encodeURIComponent(query)}&hlgpt=default`, {
    method: "GET",
    headers: {
      "Referer": "https://gptgo.ai/?hl=zh",
      "origin": "https://gptgo.ai/",
    }
  });
  const tokenData = await tokenResponse.json();
  const gpttoken = tokenData.token;

  const response = await fetch(`https://gptgo.ai/action_ai_gpt.php?token=${gpttoken}`, {
    method: "GET",
    headers: {
      "Referer": "https://gptgo.ai/?hl=zh",
      "origin": "https://gptgo.ai/",
      "accept": "text/event-stream"
    }
  });

  const inputText = await response.text();
  const arrays = inputText.split('\n');
  const result = arrays.reduce((acc, item) => {
    const match = item.match(/"content":"([^"]+)"/);
    if (match) {
      const content = match[1];
      acc.push(content);
    }
    return acc;
  }, []);

  // Menghapus elemen terakhir dari array result
  if (result.length > 0) {
    result.pop();
  }

  const mergedContent = { content: result.join('') };
  return mergedContent;
}