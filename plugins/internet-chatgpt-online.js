import fetch from "node-fetch"

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
            await m.reply(wait)
            let res = await getFormattedRideInfo(text)
            await m.reply(res.choices[0].message.content)
    } catch (e) {
        throw eror
    }
}
handler.help = ["chatgptonline"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^chatgptonline$/i

export default handler

/* New Line */
async function getFormattedRideInfo(message) {
  const apiUrl = 'https://openai.api2d.net/v1/chat/completions'
  const headers = {
    Authorization: 'Bearer fk186009-gCYVPTkf6aMycD4o2ZM9fRsDwp52ONdz|ck43-632713d', // <-- Replace fkxxxxx with your own Forward Key, make sure to keep 'Bearer ' and have a space in between.
    'Content-Type': 'application/json',
  }

  const payload = {
    messages: [{ content: message, role: 'user' }],
    model: 'gpt-3.5-turbo',
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return undefined;
  }
}