import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply("Input query\nExample: .chawnyma hello")
    await m.reply(wait);
    try {
        const result = await fetchCompletion(text);
        await m.reply(result);
    } catch (error) {
        await m.reply(error);
    }

}
handler.help = ["chawnyma"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(chawnyma)$/i
export default handler

async function fetchCompletion(inputValue) {
    try {
        const chatApiUrl = 'https://api.chatanywhere.com.cn/v1/chat/completions';
        const chatResponse = await fetch(chatApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-pu4PasDkEf284PIbVr1r5jn9rlvbAJESZGpPbK7OFYYR6m9g',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{
                    role: 'user',
                    content: inputValue,
                }, ],
            }),
        });
        const chatData = await chatResponse.json();
        return chatData.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}