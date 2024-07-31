import OpenAI from 'openai';
    
import fetch from "node-fetch";

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
    } else throw "Input Teks"
    try {
    if (command == "ailsturbo") {
        await m.reply(wait)
        let res = await ChatGpt(text)
        await m.reply(res)
        } else {
        await m.reply(wait)
        let res = await ChatGptTurbo(text)
        await m.reply(res)
        }
    } catch (e) {
        throw eror
    }
}
handler.help = ["ails"]
handler.tags = ["internet"]
handler.command = /^ails|ailsturbo$/i

export default handler

/* New Line */
const pkey = "pk-kyptPcoSLLtQyiqFBvRtpyVBKLiPzYiBOYceqwEgVrMKCPHc"

async function ChatGpt(prompt) {
const openai = new OpenAI({
  apiKey: pkey,
	basePath: "https://api.pawan.krd/v1",
});
const chatCompletion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{"role": "user", "content": prompt}],
});
return chatCompletion.choices[0].message;
}

async function ChatGptTurbo(prompt) {
let response = await(await fetch("https://api.pawan.krd/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + pkey,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "gpt-3.5-turbo",
    "max_tokens": 100,
    "messages": [
      {
        "role": "system",
        "content": "You are an helpful assistant."
      },
      {
        "role": "user",
        "content": prompt
      }
    ]
  })
})).json()
return response.choices[0].message.content
}