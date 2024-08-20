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
        let res = await ChatGptV1(text)
        await m.reply(res.message)
    } catch (e) {
        try {
            let res = await ChatGptV2(text)
            await m.reply(res.message)
        } catch (e) {
            try {
                let res = await ChatGptV3(text)
                await m.reply(res.answer)
            } catch (e) {
                try {
                    let res = await ChatGptV4(text)
                    await m.reply(res[0].generated_text)
                } catch (e) {
                    await m.reply(eror)
                }
            }
        }
    }
}
handler.help = ["chatgpt"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(chatgpt)$/i

export default handler

/* New Line */
function generateRandomIP() {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
}

async function ChatGptV1(query) {
    try {
        const response = await fetch(
            "https://chat-gpt.org/api/text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2004J19C Build/RP1A.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.129 Mobile Safari/537.36 WhatsApp/1.2.3",
                    "Referer": "https://chat-gpt.org/chat",
                    "X-Forwarded-For": generateRandomIP(),
                },
                body: JSON.stringify({
                    message: query,
                    temperature: 1,
                    presence_penalty: 0,
                    top_p: 1,
                    frequency_penalty: 0
                }),
            }
        );

        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function ChatGptV2(query) {
    try {
        const response = await fetch(
            "https://chatgpt.org/api/text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2004J19C Build/RP1A.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.129 Mobile Safari/537.36 WhatsApp/1.2.3",
                    "Referer": "https://chat-gpt.org/chat",
                    "X-Forwarded-For": generateRandomIP(),
                },
                body: JSON.stringify({
                    message: query,
                    temperature: 1,
                    presence_penalty: 0,
                    top_p: 1,
                    frequency_penalty: 0
                }),
            }
        );

        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function ChatGptV3(query) {
    try {
        const response = await fetch(`https://api.caonm.net/api/ai/o.php?msg=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function ChatGptV4(query) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer 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",
                },
                body: JSON.stringify({
                    inputs: query
                }),
            }
        );

        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
    }
}