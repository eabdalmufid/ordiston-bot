import axios from 'axios';

export async function before(m) {
    const chat = global.db.data.chats[m.chat];
    if (m.isBaileys || !m.text) return false;
    let text = m.text;
    try {
        if (chat.autoAi) {
            const openAIResponse = await await fetchChatData('chat', text)
            const result = openAIResponse;
            let str = ""
            let anu = result.split('data: ').slice(1).map(x => (str += x.replace(/\n/g, '')))

            if (result) {
                await conn.sendMessage(m.chat, {
                    text: str.replace(/\\n/g, '\n')
                }, {
                    quoted: m, ephemeralExpiration: ephemeral
                });
            }
        }
    } catch {
        await this.reply(m.chat, 'Error occurred.', m);
    }
}

export const disabled = false;

function generateRandomUserAgent() {
    const androidVersions = ['4.0.3', '4.1.1', '4.2.2', '4.3', '4.4', '5.0.2', '5.1', '6.0', '7.0', '8.0', '9.0', '10.0', '11.0'];
    const deviceModels = ['M2004J19C', 'S2020X3', 'Xiaomi4S', 'RedmiNote9', 'SamsungS21', 'GooglePixel5'];
    const buildVersions = ['RP1A.200720.011', 'RP1A.210505.003', 'RP1A.210812.016', 'QKQ1.200114.002', 'RQ2A.210505.003'];

    const selectedModel = deviceModels[Math.floor(Math.random() * deviceModels.length)];
    const selectedBuild = buildVersions[Math.floor(Math.random() * buildVersions.length)];
    const chromeVersion = 'Chrome/' + (Math.floor(Math.random() * 80) + 1) + '.' + (Math.floor(Math.random() * 999) + 1) + '.' + (Math.floor(Math.random() * 9999) + 1);

    const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersions[Math.floor(Math.random() * androidVersions.length)]}; ${selectedModel} Build/${selectedBuild}) AppleWebKit/537.36 (KHTML, like Gecko) ${chromeVersion} Mobile Safari/537.36 WhatsApp/1.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9) + 1}`;

    return userAgent;
}

function generateRandomIP() {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
}

async function fetchChatData(type, message) {
    try {
        const headers = {
            'User-Agent': generateRandomUserAgent(),
            'Referer': 'https://talkai.info/id/chat/',
            'X-Forwarded-For': generateRandomIP(),
        };

        const data = {
            temperature: 1,
            frequency_penalty: 0,
            type: type,
            messagesHistory: [{
                    from: 'chatGPT',
                    content: 'You are a helpful assistant.'
                },
                {
                    from: 'you',
                    content: message
                },
            ],
            message: message,
        };

        const response = await axios.post('https://talkai.info/id/chat/send2/', data, {
            headers
        });

        return response.data;
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}