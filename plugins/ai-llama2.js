import fetch from 'node-fetch';

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    const input_data = ["meta-llama/Llama-2-7b-chat-hf", "meta-llama/Llama-2-70b-chat-hf"];

    let [urutan, tema] = text.split("|")
    if (!tema) return m.reply("Input query!\n*Example:*\n.llama2 [nomor]|[query]")

    await m.reply(wait)
    try {
        let data = input_data.map((item, index) => ({
            title: item.split('/')[1],
            id: item
        }));
        if (!urutan) return m.reply("Input query!\n*Example:*\n.llama2 [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.llama2 [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.llama2 [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1].id

        if (out) {
            if (out == "meta-llama/Llama-2-7b-chat-hf") {
                const messages = [{
                        role: "user",
                        content: tema
                    },
                    {
                        role: "assistant",
                        content: "I'm doing well, thanks!"
                    }
                ];
                const asyncGenerator = await createAsyncGenerator(out, messages, null, {});
                await conn.sendMessage(m.chat, {
                    text: asyncGenerator
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                });
            } else if (out == "meta-llama/Llama-2-70b-chat-hf") {
                const messages = [{
                        role: "user",
                        content: tema
                    },
                    {
                        role: "assistant",
                        content: "I'm doing well, thanks!"
                    }
                ];
                const asyncGenerator = await createAsyncGenerator(out, messages, null, {});
                await conn.sendMessage(m.chat, {
                    text: asyncGenerator
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                });
            }
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["llama2 *[nomor]|[query]*"]
handler.tags = ["ai"]
handler.command = /^(llama2)$/i
export default handler

const models = {
    "meta-llama/Llama-2-7b-chat-hf": {
        "name": "Llama 2 7B",
        "version": "d24902e3fa9b698cc208b5e63136c4e26e828659a9f09827ca6ec5bb83014381",
        "shortened": "7B"
    },
    "meta-llama/Llama-2-70b-chat-hf": {
        "name": "Llama 2 70B",
        "version": "2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf",
        "shortened": "70B"
    }
};

const url = "https://www.llama2.ai";
const working = true;
const supports_message_history = true;

async function createAsyncGenerator(model, messages, proxy, kwargs) {
    if (!model) {
        model = "meta-llama/Llama-2-70b-chat-hf";
    } else if (!models[model]) {
        throw new Error(`Model is not supported: ${model}`);
    }
    const version = models[model].version;

    const headers = {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0",
        "Accept": "*/*",
        "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": `${url}/`,
        "Content-Type": "text/plain;charset=UTF-8",
        "Origin": url,
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "TE": "trailers"
    };

    const prompt = formatPrompt(messages);

    const data = {
        "prompt": prompt,
        "version": version,
        "systemPrompt": kwargs.system_message || "You are a helpful assistant.",
        "temperature": kwargs.temperature || 0.75,
        "topP": kwargs.top_p || 0.9,
        "maxTokens": kwargs.max_tokens || 8000,
        "image": null
    };

    let started = false;
    const response = await fetch(`${url}/api`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
        proxy: proxy
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const text = await response.text();
    return text;
}

function formatPrompt(messages) {
    const formattedMessages = messages.map(message => {
        return message.role === "user" ? `[INST] ${message.content} [/INST]` : message.content;
    });
    return formattedMessages.join('\n') + '\n';
}