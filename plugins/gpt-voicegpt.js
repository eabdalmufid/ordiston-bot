import fetch from 'node-fetch';
import gtts from 'node-gtts';
import {
    readFileSync,
    unlinkSync
} from 'fs';
import {
    join
} from 'path';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import OpenAI from 'openai';

const defaultLang = 'id';
const language = 'id';
const sysmsg = `Akan bertindak seperti bot WhatsApp.`;

const openai = new OpenAI({
    apiKey: global.openaikey
});

const handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw `*Masukkan pertanyaan untuk menggunakan perintah ini*\n\n*Contoh:*\n*- ${usedPrefix + command} Refleksi tentang Netflix La Casa de Papel 2022*\n*- ${usedPrefix + command} Kode JS untuk permainan kartu*`;
    try {
        conn.sendPresenceUpdate('composing', m.chat);
        const inputValue = text
        const chatApiUrl = 'https://api.chatanywhere.com.cn/v1/chat/completions';
        const textToSpeechApiUrl = 'https://api.elevenlabs.io/v1/text-to-speech/CYw3kZ02Hs0563khs1Fj';
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
        const textToSpeechResponse = await fetch(textToSpeechApiUrl, {
            method: 'POST',
            headers: {
                'accept': 'audio/mpeg',
                'xi-api-key': '08a134b000ccc8017863efc0160ff934',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "text": chatData.choices[0].message.content,
                "model_id": "eleven_multilingual_v2",
                "voice_settings": {
                    "stability": 0.5,
                    "similarity_boost": 0.5,
                },
            }),
        });

        const audioBuffer = await textToSpeechResponse.arrayBuffer();
        const audioUrl = Buffer.from(audioBuffer);
        await conn.sendMessage(m.chat, {
            audio: audioUrl,
            fileName: 'response.mp3',
            mimetype: 'audio/mpeg',
            ptt: true
        }, {
            quoted: m,
            ephemeralExpiration: ephemeral
        });
    } catch (e) {
        try {
            conn.sendPresenceUpdate('composing', m.chat);
            const response = await getOpenAIChatCompletion(text, global.openaikey);

            if (response == 'error' || response == '' || !response) {
                throw eror;
            }

            const audio = await tts(response, language);
            await conn.sendMessage(m.chat, {
                audio: audio,
                fileName: 'response.mp3',
                mimetype: 'audio/mpeg',
                ptt: true
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            });
        } catch (e) {
            try {
                conn.sendPresenceUpdate('composing', m.chat);
                const response = await openai.chat.completions.create({
                    model: 'text-davinci-003',
                    prompt: text,
                    temperature: 0.3,
                    max_tokens: 4097,
                    stop: ['Ai:', 'Human:'],
                    top_p: 1,
                    frequency_penalty: 0.2,
                    presence_penalty: 0
                });

                if (response.data.choices[0].text == 'error' || response.data.choices[0].text == '' || !response.data.choices[0].text) {
                    throw eror;
                }

                const audio = await tts(response.data.choices[0].text, language);
                await conn.sendMessage(m.chat, {
                    audio: audio,
                    fileName: 'response.mp3',
                    mimetype: 'audio/mpeg',
                    ptt: true
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                });
            } catch (e) {
                try {
                    conn.sendPresenceUpdate('composing', m.chat);
                    const response = await fetch(`https://api-fgmods.ddns.net/api/info/openai?text=${text}&symsg=${sysmsg}&apikey=XlwAnX8d`);
                    const json = await response.json();

                    if (json.result == 'error' || json.result == '' || !json.result) {
                        throw eror;
                    }

                    const audio = await tts(json.result, language);
                    await conn.sendMessage(m.chat, {
                        audio: audio,
                        fileName: 'response.mp3',
                        mimetype: 'audio/mpeg',
                        ptt: true
                    }, {
                        quoted: m,
                        ephemeralExpiration: ephemeral
                    });
                } catch (e) {
                    try {
                        conn.sendPresenceUpdate('composing', m.chat);
                        const response = await fetch(`https://vihangayt.me/tools/chatgpt?q=${text}`);
                        const json = await response.json();

                        if (json.data == 'error' || json.data == '' || !json.data) {
                            throw eror;
                        }

                        const audio = await tts(json.data, language);
                        await conn.sendMessage(m.chat, {
                            audio: audio,
                            fileName: 'response.mp3',
                            mimetype: 'audio/mpeg',
                            ptt: true
                        }, {
                            quoted: m,
                            ephemeralExpiration: ephemeral
                        });
                    } catch (e) {
                        try {
                            conn.sendPresenceUpdate('composing', m.chat);
                            const response = await fetch(`https://vihangayt.me/tools/chatgpt2?q=${text}`);
                            const json = await response.json();

                            if (json.data == 'error' || json.data == '' || !json.data) {
                                throw eror;
                            }

                            const audio = await tts(json.data, language);
                            await conn.sendMessage(m.chat, {
                                audio: audio,
                                fileName: 'response.mp3',
                                mimetype: 'audio/mpeg',
                                ptt: true
                            }, {
                                quoted: m,
                                ephemeralExpiration: ephemeral
                            });
                        } catch (e) {
                            try {
                                conn.sendPresenceUpdate('composing', m.chat);
                                const response = await fetch(`https://vihangayt.me/tools/chatgpt3?q=${text}`);
                                const json = await response.json();

                                if (json.data == 'error' || json.data == '' || !json.data) {
                                    throw eror;
                                }

                                const audio = await tts(json.data, language);
                                await conn.sendMessage(m.chat, {
                                    audio: audio,
                                    fileName: 'response.mp3',
                                    mimetype: 'audio/mpeg',
                                    ptt: true
                                }, {
                                    quoted: m,
                                    ephemeralExpiration: ephemeral
                                });
                            } catch (e) {
                                try {
                                    conn.sendPresenceUpdate('composing', m.chat);
                                    const response = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${global.lolkey}&text=${text}&user=${m.sender}`);
                                    const json = await response.json();

                                    if (json.result == 'error' || json.result == '' || !json.result) {
                                        throw eror;
                                    }

                                    const json_result = await translate(`${json.result}`, {
                                        to: language,
                                        autoCorrect: true
                                    });
                                    const audio = await tts(json_result.text, language);
                                    await conn.sendMessage(m.chat, {
                                        audio: audio,
                                        fileName: 'response.mp3',
                                        mimetype: 'audio/mpeg',
                                        ptt: true
                                    }, {
                                        quoted: m,
                                        ephemeralExpiration: ephemeral
                                    });
                                } catch (e) {
                                    try {
                                        conn.sendPresenceUpdate('composing', m.chat);
                                        const searchString2 = ' Italia ';
                                        const replacementString2 = ' italiano ';
                                        const response = await fetch(`https://api.ibeng.tech/api/others/chatgpt?q=${text}&apikey=eMlBNRzUXv`);
                                        const json = await response.json();

                                        if (json.data == 'error' || json.data == '' || !json.data) {
                                            throw eror;
                                        }

                                        const transLate = await translate(`${json.data}`, {
                                            to: language,
                                            autoCorrect: true
                                        });
                                        const sextS = transLate.text;
                                        const replacedText = sextS.replace(searchString2, replacementString2).trim();
                                        const audio = await tts(replacedText, language);
                                        await conn.sendMessage(m.chat, {
                                            audio: audio,
                                            fileName: 'response.mp3',
                                            mimetype: 'audio/mpeg',
                                            ptt: true
                                        }, {
                                            quoted: m,
                                            ephemeralExpiration: ephemeral
                                        });
                                    } catch (e) {
                                        try {
                                            conn.sendPresenceUpdate('composing', m.chat);
                                            const response = await fetch(`https://api.akuari.my.id/ai/gpt?chat=${text}`);
                                            const json = await response.json();

                                            if (json.respon == 'error' || json.respon == '' || !json.respon) {
                                                throw eror;
                                            }

                                            const transLate = await translate(`${json.respon}`, {
                                                to: 'it',
                                                autoCorrect: true
                                            });
                                            const audio = await tts(transLate.text, language);
                                            await conn.sendMessage(m.chat, {
                                                audio: audio,
                                                fileName: 'response.mp3',
                                                mimetype: 'audio/mpeg',
                                                ptt: true
                                            }, {
                                                quoted: m,
                                                ephemeralExpiration: ephemeral
                                            });
                                        } catch (e) {
                                            try {
                                                conn.sendPresenceUpdate('composing', m.chat);
                                                const response = await fetch(`https://api.akuari.my.id/ai/gbard?chat=${text}`);
                                                const json = await response.json();

                                                if (json.respon == 'error' || json.respon == '' || !json.respon) {
                                                    throw eror;
                                                }

                                                const transLate = await translate(`${json.respon}`, {
                                                    to: 'it',
                                                    autoCorrect: true
                                                });
                                                const audio = await tts(transLate.text, language);
                                                await conn.sendMessage(m.chat, {
                                                    audio: audio,
                                                    fileName: 'response.mp3',
                                                    mimetype: 'audio/mpeg',
                                                    ptt: true
                                                }, {
                                                    quoted: m,
                                                    ephemeralExpiration: ephemeral
                                                });
                                            } catch (e) {
                                                throw eror;
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
};
handler.help = ["voicegpt"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(openaivoce|voicegpt|gptvoice)$/i;
export default handler;

function tts(text, lang = 'id') {
    console.log(lang, text)
    return new Promise((resolve, reject) => {
        try {
            let tts = gtts(lang)
            let filePath = join(global.__dirname(import.meta.url), '../../tmp', (1 * new Date) + '.wav')
            tts.save(filePath, text, () => {
                resolve(readFileSync(filePath))
                unlinkSync(filePath)
            })
        } catch (e) {
            reject(e)
        }
    })
}

async function getOpenAIChatCompletion(texto, openaiAPIKey) {
    const chgptdb = [{
        role: 'user',
        content: texto
    }];
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiAPIKey}`
    };
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "system",
            "content": sysmsg
        }, ...chgptdb, ]
    };

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    const result = await response.json();
    const finalResponse = result.choices[0].message.content;
    return finalResponse;
};