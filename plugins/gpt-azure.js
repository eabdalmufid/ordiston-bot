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
    await m.reply(wait)
    try {
        let res = await chatWithGPT(text)
        await m.reply(res.choices[0].message.content)
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["azuregpt"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(azuregpt)$/i

export default handler

/* New Line */
async function chatWithGPT(input) {
    const messages = [{
        role: 'system',
        content: 'Anda adalah asisten yang membantu.'
    }, {
        role: 'user',
        content: input
    }];
    const response = await fetch('https://oai-4.openai.azure.com/openai/deployments/complete-4/chat/completions?api-version=2023-07-01-preview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': '2e6532692d764b48b5454f0f4abf8c81'
        },
        body: JSON.stringify({
            messages
        }),
    });
    const data = await response.json();
    return data;
}