import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .wetabchat hello")
await m.reply(wait)
try {
    let inputText = await wetabChat(text);
let regex = /{"data":"([^{}]+)}/g;
let outputs = inputText.match(regex)?.map(item => JSON.parse(item)?.data);
let result = outputs?.join('');
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["wetabchat"]
handler.tags = ["internet"]
handler.command = /^(wetabchat)$/i
export default handler

/* New Line */
async function getHaoKey() {
    try {
        const url = `https://yeyu1024.xyz/chat/haohula.json?r=${Math.random()}`;
        const response = await fetch(url);
        const data = await response.json();
        let array = data.haohula.token
        const randomItem = array[Math.floor(Math.random() * array.length)];
        return randomItem;
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return null;
    }
}

async function wetabChat(query) {
    try {
        const ops = {
            prompt: query
        };

        const response = await fetch("https://wetabchat.haohuola.com/api/chat/conversation", {
            method: "POST",
            headers: {
                "I-App": "hitab",
                "I-Branch": "zh",
                "I-Lang": "id-ID",
                "I-Platform": "chrome",
                "I-Version": "1.0.43",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${await getHaoKey()}`,
                "Referer": "https://wetabchat.haohuola.com/api/chat/conversation",
                "origin": "chrome-extension://aikflfpejipbpjdlfabpgclhblkpaafo",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
            },
            body: JSON.stringify(ops)
        });

        // Mengembalikan respons yang diperoleh
        return await response.text();
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return null;
    }
}