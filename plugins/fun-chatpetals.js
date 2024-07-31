import WebSocket from "ws";

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    const input_data = [
        "stabilityai/StableBeluga2",
        "meta-llama/Llama-2-70b-chat-hf"
    ]
    let [urutan, tema] = text.split("|")
    if (!tema) return m.reply("Input query!\n*Example:*\n.chatpetals [nomor]|[query]")

    await m.reply(wait)
    try {
        let data = input_data.map((item, index) => ({
            title: item.split('/')[1],
            id: item
        }));
        if (!urutan) return m.reply("Input query!\n*Example:*\n.chatpetals [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.chatpetals [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.chatpetals [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1].id
        if (out == "stabilityai/StableBeluga2") {
            const response = await chatPetals(tema, "stabilityai/StableBeluga2");
            await m.reply(response);
        } else if (out == "meta-llama/Llama-2-70b-chat-hf") {
            const response = await chatPetals(tema, "meta-llama/Llama-2-70b-chat-hf");
        await m.reply(response);
    } else if (out == "tiiuae/falcon-180B-chat") {
        const response = await chatPetals(tema, "tiiuae/falcon-180B-chat");
        await m.reply(response);
    } else if (out == "timdettmers/guanaco-65b") {
        const response = await chatPetals(tema, "timdettmers/guanaco-65b");
        await m.reply(response);
    } else if (out == "bigscience/bloomz") {
        const response = await chatPetals(tema, "bigscience/bloomz");
        await m.reply(response);
    }
} catch (e) {
    await m.reply(eror)
}
}
handler.help = ["chatpetals *[nomor]|[query]*"]
handler.tags = ["fun"]
handler.command = /^(chatpetals)$/i
export default handler

async function chatPetals(inputs, model) {
    const ws = new WebSocket(`wss://chat.petals.dev/api/v2/generate`);
    await new Promise((resolve) => ws.onopen = resolve);
    const maxLength = 30;
    ws.send(JSON.stringify({
        type: "open_inference_session",
        model,
        max_length: maxLength
    }));
    const generateResponse = await new Promise((resolve, reject) => {
        ws.send(JSON.stringify({
            type: "generate",
            inputs,
            max_length: maxLength,
            do_sample: 1,
            temperature: 0.6,
            top_p: 0.9
        }));
        ws.onmessage = event => {
            const response = JSON.parse(event.data);
            if (response.ok) {
                if (response.outputs === undefined) {
                    console.log("Session opened, generating...");
                } else {
                    const generatedText = response.outputs;
                    console.log("Generated: " + generatedText);
                    ws.close();
                    resolve(generatedText);
                }
            } else {
                console.log("Error: " + response.traceback);
                ws.close();
                reject(response.traceback);
            }
        };
    });
    return generateResponse;
}