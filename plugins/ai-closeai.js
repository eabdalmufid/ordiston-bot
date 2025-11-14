import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
const API_BASE = ["https://api.closeai-proxy.xyz", "https://api.openai-proxy.live"];
const API_KEY = "sk-zaTFbMjIUsKv23JlrhbyYdJG6A9gNOK2G713GvoZ0TBRkfI3";
const MODEL_3_5 = "gpt-3.5-turbo";
const MODEL_4 = "gpt-4";

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .closeai hello")
await m.reply(wait);
try {
    const messages = [
      { role: 'system', content: 'Hello!' },
      { role: 'user', content: text },
    ];

    const result = await fetchCompletion(MODEL_3_5, messages);
    await m.reply(result);
} catch (e) {
    try {
        const messages = [
          { role: 'system', content: 'Hello!' },
          { role: 'user', content: text },
        ];

        const result = await fetchCompletion(MODEL_3_5, messages, true);
        await m.reply(result);
    } catch (error) {
        await m.reply(error);
    }
}
}
handler.help = ["closeai"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(closeai)$/i
export default handler

async function fetchCompletion(model, messages, useSecondAPI = false) {
  let url = useSecondAPI ? API_BASE[1] : API_BASE[0];
  try {
    const response = await fetch(`${url}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0,
        top_p: 0,
        messages,
      }),
    });

    const result = (await response.text())
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => line.replace('data: ', ''))
        .slice(0, -1)
        .map(item => JSON.parse(item))
        .map(v => v.choices[0].delta.content)
        .join('');

    return result;
  } catch (error) {
    throw error;
  }
}