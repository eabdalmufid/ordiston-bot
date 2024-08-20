/* Recode By Ordiston */
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import {
    webp2png
} from '../lib/webp2mp4.js'
import {
    Sticker,
    StickerTypes
} from 'wa-sticker-formatter'
import OpenAI from 'openai';
import fetch from 'node-fetch';
import request from "request"
import fs from "fs"

/* Key list
e47e4a2d-b384-4420-ad3b-08e599e5607f
cd3363ea-da8c-452a-b6f1-8ad1c40c302d
b3f1d05a-c175-4ad1-ac71-d0be778bb9a7
quickstart-QUdJIGlzIGNvbWluZy4uLi4K (not paid user)
*/

let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    let query = "input text\nEx. .deepai naruto\n<command> <tex>"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    let urut = text.split`|`
    let one = urut[0]
    let two = urut[1]
    let three = urut[2]

    let effecttxt = [
        "3d-character-generator",
        "3d-objects-generator",
        "abstract-painting-generator",
        "ai-word-definition",
        "anime-portrait-generator",
        "anime-world-generator",
        "contemporary-architecture-generator",
        "cute-creature-generator",
        "cyberpunk-generator",
        "fantasy-character-generator",
        "fantasy-world-generator",
        "future-architecture-generator",
        "hologram-3d-generator",
        "impressionism-painting-generator",
        "logo-generator",
        "old-style-generator",
        "origami-3d-generator",
        "pixel-art-generator",
        "pop-art-generator",
        "renaissance-painting-generator",
        "sentiment-analysis",
        "stable-diffusion",
        "steampunk-generator",
        "street-art-generator",
        "summarization",
        "surreal-graphics-generator",
        "surreal-portrait-generator",
        "text-generator",
        "text-tagging",
        "text2img",
        "watercolor-architecture-generator",
        "watercolor-painting-generator"
    ]

    let effectimg = [
        "CNNMRF",
        "colorizer",
        "content-moderation",
        "deepdream",
        "fast-style-transfer",
        "image-similarity",
        "neural-style",
        "nsfw-detector",
        "toonify",
        "torch-srgan",
        "waifu2x"
    ]

    const openai = new OpenAI({
  apiKey: openaikey
});

    if (command == "deepai") {
        m.reply(wait)
        let listSections = []
        Object.keys(effecttxt).map((v, index) => {
            listSections.push(["Num. " + ++index, [
                [effecttxt[v].toUpperCase(), usedPrefix + "deepaigettext " + effecttxt[v] + "|" + encodeURIComponent(text), ""]
            ]])
        })
        return conn.sendList(m.chat, htki + " 🗒️ List Effect " + htka, "⚡ Silakan pilih efek yang anda mau.", author, "[ Effect ]", listSections, m)
    }
    if (command == "deepai2") {
        m.reply(wait)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw "balas gambar"
        let img = await q.download()
        let stek = new Sticker(img, {
            pack: packname,
            author: author,
            type: StickerTypes.FULL
        })
        let buffer = await stek.toBuffer()
        let out
        try {
            if (/webp/g.test(mime)) out = await webp2png(img)
            else if (/image/g.test(mime)) out = await uploadImage(img)
            else if (/video/g.test(mime)) out = await uploadFile(img)
            else if (/viewOnce/g.test(mime)) out = await uploadFile(img)
            if (typeof out !== 'string') out = await uploadImage(img)
            else if (/gif/g.test(mime)) out = stek
        } catch (e) {
            console.error(e)
        }
        let listSections = []
        Object.keys(effectimg).map((v, index) => {
            listSections.push(["Num. " + ++index, [
                [effectimg[v].toUpperCase(), usedPrefix + "deepaigetimg " + effectimg[v] + "|" + out, ""]
            ]])
        })
        return conn.sendList(m.chat, htki + " 🗒️ List Effect " + htka, "⚡ Silakan pilih efek yang anda mau.", author, "[ Effect ]", listSections, m)
    }
    if (command == "deepaigetimg") {
        m.reply(wait)
        let res = await DeepImg(one, two)
        await conn.sendFile(m.chat, res.output_url, 'Result.jpg', "*[ DEEPAI ]*\n*Result:* " + await clean(JSON.stringify(res)), m)
    }

    if (command == "deepaigettext") {
        m.reply(wait)
        let res = await DeepText(one, two)
        await conn.sendFile(m.chat, res.output_url, 'Result.jpg', "*[ DEEPAI ]*\n*Result:* " + await clean(JSON.stringify(res)), m)
    }

    if (command == "aidalle") {
        m.reply(wait)
        try {
            let res = await fetch(`https://api.lolhuman.xyz/api/dall-e?apikey=${global.lolkey}&text=${encodeURIComponent(text)}`)
            let anu = Buffer.from(await res.arrayBuffer())
            if (Buffer.byteLength(anu) < 22000) throw Error(`[!] Error : Buffer not found.`)
            await conn.sendMessage(m.chat, {
                image: anu,
                caption: "*[ Lolhuman AI Dall E ]*\n*Text:* " + text
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })
        } catch (e) {
            let url = "https://dalle-mini.amasad.repl.co/gen/" + encodeURIComponent(text)
            await conn.sendButton(m.chat, author, "*[ Dall E Mini ]*\n*Text: *" + text, url, [
                [emojis + " M E N U", ".menulist"]
            ], m)
        }
    }

    if (command == "ai") {
        try {
            const chatCompletion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{"role": "user", "content": text}],
});
            await m.reply("*Result:*\n\n" + chatCompletion.choices[0].message + "\n\n" + "*Made by:* " + "OPENAI")
        } catch (e) {
            try {
                let result = await CleanDx("Gunakan bahasa indonesia, " + text)
                await m.reply("*Result:*\n\n" + result + "\n\n" + "*Made by:* " + "CLEANDX")
            } catch (e) {
                try {
                    let input = await NBAI(text)
                    let filteredTexts = filterJSONInput(input);
                    let result = (JSON.parse(filteredTexts[1]).text);
                    await m.reply("*Result:*\n\n" + result + "\n\n" + "*Made by:* " + "NBAI")
                } catch (e) {
                    try {
                        let result = await AIUSS(text)
                        await m.reply("*Result:*\n\n" + result + "\n\n" + "*Made by:* " + "AIUSS")
                    } catch (e) {
                        try {
                            let result = await wxGpt(text)
                            await m.reply("*Result:*\n\n" + result + "\n\n" + "*Made by:* " + "WXGPT")
                        } catch (e) {
                            try {
                                let result = await gptBaby(text)
                                await m.reply("*Result:*\n\n" + convertNewline(result.content) + "\n\n" + "*Made by:* " + "GPTBABY")
                            } catch (e) {
                                try {
                                    let result = await gptEso(text)
                                    await m.reply("*Result:*\n\n" + result + "\n\n" + "*Made by:* " + "ESOJOURN")
                                } catch (e) {
                                    try {
                                        let outs = await pizzaGpt(text)
                                        let result = JSON.parse(outs).answer.content
                                        await m.reply("*Result:*\n\n" + result + "\n\n" + "*Made by:* " + "PIZZAGPT")
                                    } catch (e) {
                                        try {
                                            let input = await gptGo(text)
                                            let result = input.content
                                            await m.reply("*Result:*\n\n" + convertNewline(result) + "\n\n" + "*Made by:* " + "GPTGO")
                                        } catch (e) {
                                            try {
                                                let result = await chatGptD4(text)
                                                await m.reply("*Result:*\n\n" + result + "\n\n" + "*Made by:* " + "GPTD4")
                                            } catch (e) {
                                                await m.reply(eror)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (command == "aimodel") {
        if (!text) throw query
        let lm = await openai.listModels();
        let listSections = []
        Object.values(lm.data.data).map((v, index) => {
            listSections.push(["Model [ " + ++index + ' ]', [
                [v.id.toUpperCase(), usedPrefix + command + "get " + v.id + "|" + text, "➥"]
            ]])
        })
        return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
    }

    if (command == "aimodelget") {
        try {
            const chatCompletion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{"role": "user", "content": text}],
});
            m.reply('*Result:*' + chatCompletion.choices[0].message + '\n\n' + '*Made by:* ' + 'OpenAi')
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
                    try {
                        let ai = await (await fetch(global.API('lolhuman', '/api/openai', {
                            text: text
                        }, 'apikey'))).json()
                        if (!ai) throw eror
                        m.reply('*Result:*\n' + ai.result + '\n\n' + '*Made by:* ' + global.API('lolhuman'))
                    } catch (e) {
                        try {
                            let res = await (await fetch('https://mfarels.my.id/api/openai?text=' + text)).json()
                            if (!res) throw eror
                            m.reply('*Result:*\n' + res.result + '\n\n' + '*Made by:* mfarels.my.id')
                        } catch (e) {
                            throw eror
                        }
                    }
                }
            }
        }
    }

}
handler.help = [
    "ai",
    "aidalle",
    "aimodel",
    "deepai",
    "deepai2"
]
handler.tags = ["info"]
handler.command = /^(deepai(get(text|img)|2)?|ai(modelget|((model)?|dalle)))$/i
export default handler

let userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0"
let DeepKey = "e47e4a2d-b384-4420-ad3b-08e599e5607f"

async function DeepText(efek, teks) {
    return new Promise(async (resolve, reject) => {
        var a = await request.post({
                headers: {
                    'Api-Key': DeepKey,
                    'User-Agent': userAgent
                },
                url: 'https://api.deepai.org/api/' + efek,
            },
            function(err, response, body) {
                if (err) {
                    return resolve(err)
                }
                var response = JSON.parse(body)
                resolve(response)
            })
        var form = a.form()
        form.append("text", teks)
    })
}

async function DeepImg(efek, img) {
    return new Promise(async (resolve, reject) => {
        var a = await request.post({
                headers: {
                    'Api-Key': DeepKey,
                    'User-Agent': userAgent
                },
                url: 'https://api.deepai.org/api/' + efek,
            },
            function(err, response, body) {
                if (err) {
                    return resolve(err)
                }
                var response = JSON.parse(body)
                resolve(response)
            })
        var form = a.form()
        form.append("image", img)
    })
}

function clean(string) {
    return string.replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/,/g, '\n')
}

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
    let response = await (await fetch("https://api.pawan.krd/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + pkey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "max_tokens": 100,
            "messages": [{
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

async function NBAI(query) {
    const url = "https://154.40.59.105:3006/api/chat-process";
    const headers = {
        "Content-Type": "application/json",
        "Referer": "https://f1.nbai.live/",
        "accept": "application/json, text/plain, */*",
    };

    const body = JSON.stringify({
        prompt: query,
        options: {}
    });

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body
    });

    return await response.text();
}

function filterJSONInput(input) {
    const regex = /{(?:[^{}]|(?:\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\}))*}/g;
    const matches = input.match(regex);

    const filteredTexts = matches.filter(text => {
        try {
            JSON.parse(text);
            return true;
        } catch (error) {
            return false;
        }
    });

    return filteredTexts;
}
async function CleanDx(your_qus) {
    let linkaiList = [];
    let linkaiId = generateRandomString(21);
    let Baseurl = "https://vipcleandx.xyz/";

    console.log(formatTime());
    linkaiList.push({
        "content": your_qus,
        "role": "user",
        "nickname": "",
        "time": formatTime(),
        "isMe": true
    });
    linkaiList.push({
        "content": "正在思考中...",
        "role": "assistant",
        "nickname": "AI",
        "time": formatTime(),
        "isMe": false
    });
    if (linkaiList.length > 10) {
        linkaiList = linkaiList.shift();
    }

    let response = await fetch(Baseurl + "v1/chat/gpt/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": generateRandomIP(),
            "Referer": Baseurl,
            "accept": "application/json, text/plain, */*"
        },
        body: JSON.stringify({
            "list": linkaiList,
            "id": linkaiId,
            "title": your_qus,
            "prompt": "",
            "temperature": 0.5,
            "models": "0",
            "continuous": true
        })
    })
    const data = await response.text();

    return data;
}

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

function generateRandomIP() {
    const ipParts = [];
    for (let i = 0; i < 4; i++) {
        const randomPart = Math.floor(Math.random() * 256);
        ipParts.push(randomPart);
    }
    return ipParts.join('.');
}

function formatTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

async function wxGpt(you_qus) {
    let baseURL = "https://free-api.cveoy.top/";
    try {
        const response = await fetch(baseURL + "v3/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "origin": "https://ai1.chagpt.fun",
                "Referer": baseURL
            },
            body: JSON.stringify({
                prompt: you_qus
            })
        });

        const data = await response.text();
        // Handle the response data here
        return (data);

        return data; // Return the response data if needed
    } catch (error) {
        // Handle any errors here
        console.error(error);
    }
}

function convertNewline(output) {
    const convertedOutput = output.replace(/\\n/g, '\n');
    return convertedOutput;
}

/* New Line */
async function gptBaby(your_qus) {
    const baseURL = "https://fasdsgdfsg97986agagyk656.lovebaby.today/";
    const messageChain8 = [{
        role: "user",
        content: your_qus
    }];

    try {
        const response = await fetch(baseURL + "api/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "text/event-stream",
                "origin": "https://fasdsgdfsg97986agagyk656.lovebaby.today/",
                "Referer": baseURL
            },
            body: JSON.stringify({
                messages: messageChain8,
                stream: true,
                model: "gpt-3.5-turbo",
                temperature: 0.5,
                presence_penalty: 0
            })
        });

        // Handle the response data here
        const inputText = await response.text();
        const arrays = inputText.split('\n');
        const result = arrays.reduce((acc, item) => {
            const match = item.match(/"content":"([^"]+)"/);
            if (match) {
                const content = match[1];
                acc.push(content);
            }
            return acc;
        }, []);

        const mergedContent = {
            content: result.join('')
        };
        return mergedContent;
    } catch (error) {
        // Handle any errors here
        console.error(error);
    }
}

async function gptEso(you_qus) {
    try {
        let baseURL = "https://gpt.esojourn.org/";
        const messageChain4 = [{
            role: "user",
            content: you_qus
        }];

        const response = await fetch(baseURL + "api/chat-stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-code": "586-484-535D",
                "path": "v1/chat/completions",
                "Referer": baseURL
            },
            body: JSON.stringify({
                messages: messageChain4,
                stream: true,
                model: "gpt-3.5-turbo",
                temperature: 1,
                max_tokens: 2000,
                presence_penalty: 0
            })
        });

        const data = await response.text();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function pizzaKey() {
    const sourceResponse = await fetch("https://www.pizzagpt.it/", {
        method: "GET",
        headers: {
            "Referer": "www.pizzagpt.it"
        }
    });
    const sourceText = await sourceResponse.text();
    const reqJS = sourceText.match("index.*?\.js")[0];

    const response = await fetch("https://www.pizzagpt.it/_nuxt/" + reqJS.trim(), {
        method: "GET",
        headers: {
            "Referer": "www.pizzagpt.it"
        }
    });
    const respText = await response.text();
    const pizzaSecret = respText.match("x=\"(.*?)\"")[1];

    return pizzaSecret;
}

async function pizzaGpt(query) {
    const url = "https://www.pizzagpt.it/api/chat-completion";
    const headers = {
        "Content-Type": "text/plain;charset=UTF-8",
        "Referer": "https://www.pizzagpt.it/"
    };
    const data = JSON.stringify({
        question: query,
        secret: await pizzaKey()
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: data,
        });

        const responseText = await response.text();
        return responseText;
    } catch (error) {
        // Handle errors here
        console.error(error);
        return null;
    }
}
async function gptGo(query) {
    const tokenResponse = await fetch(`https://gptgo.ai/action_get_token.php?q=${encodeURIComponent(query)}&hlgpt=default`, {
        method: "GET",
        headers: {
            "Referer": "https://gptgo.ai/?hl=zh",
            "origin": "https://gptgo.ai/",
        }
    });
    const tokenData = await tokenResponse.json();
    const gpttoken = tokenData.token;

    const response = await fetch(`https://gptgo.ai/action_ai_gpt.php?token=${gpttoken}`, {
        method: "GET",
        headers: {
            "Referer": "https://gptgo.ai/?hl=zh",
            "origin": "https://gptgo.ai/",
            "accept": "text/event-stream"
        }
    });

    const inputText = await response.text();
    const arrays = inputText.split('\n');
    const result = arrays.reduce((acc, item) => {
        const match = item.match(/"content":"([^"]+)"/);
        if (match) {
            const content = match[1];
            acc.push(content);
        }
        return acc;
    }, []);

    const mergedContent = {
        content: result.join('')
    };
    return mergedContent;
}
async function chatGptD4(prompt) {
    let messageChain7 = []
    let baseURL = "https://chatgptdddd.com/";
    const data = JSON.stringify({
        messages: messageChain7,
        model: {
            id: "gpt-3.5-turbo",
            name: "GPT-3.5",
            maxLength: 12000,
            tokenLimit: 4000
        },
        temperature: 1,
        prompt: prompt,
        key: null
    });

    const headers = {
        "Content-Type": "application/json",
        "Referer": baseURL
    };

    try {
        const response = await fetch(baseURL + "api/chat", {
            method: "POST",
            headers: headers,
            body: data,
            responseType: "stream"
        });

        const result = await response.text();
        return result;
    } catch (error) {
        // Handle errors here
        console.error(error);
        return null;
    }
}