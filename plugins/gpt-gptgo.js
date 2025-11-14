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
let result = await gptGo(text)
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["gptgo"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(gptgo)$/i
export default handler

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

  const result = (await response.text())
  .split('\n')
  .filter(line => line.trim() !== '')
  .map(line => line.replace('data: ', ''))
  .slice(0, -2)
  .map(item => JSON.parse(item))
  .map(v => v.choices[0].delta.content)
  .join('');

return result;
}