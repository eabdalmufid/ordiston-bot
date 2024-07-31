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
        await m.reply(res)
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["gptd4"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(gptd4)$/i

export default handler

/* New Line */
async function chatWithGPT(your_qus) {
    let baseURL = "http://lemurchat.anfans.cn";

    const requestData = `{"messages":"[{\\"content\\":\\"\\",\\"id\\":\\"LEMUR_AI_SYSTEM_SETTING\\",\\"isSensitive\\":false,\\"needCheck\\":false,\\"role\\":\\"system\\"},{\\"content\\":\\"${your_qus}\\",\\"isSensitive\\":false,\\"needCheck\\":true,\\"role\\":\\"user\\"}]"}`

    const response = await fetch(baseURL + "/api/chat/conversation-trial", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 4 Prime) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
        },
        body: (requestData),
        responseType: "stream"
    });

    const res = await response.text();
    const sp = res.replace(/id: \d+\ndata: '/, '\n')
    const data = sp.split('\n')
    var filteredData = data.filter(item => item.startsWith('data:'));
    const dataArray = filteredData.map(item => JSON.parse(item.replace(/^data: /, '')));
    var input = dataArray.map(v => v.data).join('')

    const regex = /"content":"(.*?)"/g;
    const contents = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
        contents.push(match[1]);
    }

    return (contents.join('').replace(/\\n/g, '\n'));
}