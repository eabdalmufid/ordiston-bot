/* Recode By Ordiston */
import fetch from "node-fetch"
import OpenAI from 'openai';
let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    let query = usedPrefix + command + " Wibu"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    let urut = text.split`|`

    try {
        let res = await (await fetch('https://mfarels.my.id/api/openai?text=' + text)).json()
        if (!res) throw eror
        m.reply('*Result:*\n' + res.result + '\n\n' + '*Made by:* mfarels.my.id')
    } catch (e) {
        try {
            let ainya = await ChatGpt(text)
                if (!ainya) throw eror
                m.reply('*Result:*\n' + ainya + '\n\n' + '*Made by:* pawan.krd')

        } catch (e) {
        try {
            let ainyat = await ChatGptTurbo(text)
                if (!ainyat) throw eror
                m.reply('*Result:*\n' + ainyat + '\n\n' + '*Made by:* pawan.krd')
            } catch (e) {
            let ai = await (await fetch(global.API('lolhuman', '/api/openai', {
                text: text
            }, 'apikey'))).json()
            if (!ai) throw eror
            m.reply('*Result:*\n' + ai.result + '\n\n' + '*Made by:* ' + global.API('lolhuman'))
            }
        }
    }

}
handler.help = ["tai"]
handler.tags = ["info"]
handler.command = ["tai"]
export default handler

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