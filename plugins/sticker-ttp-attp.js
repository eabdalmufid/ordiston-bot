import fetch from 'node-fetch';
const { ttp, attp } = await(await import('../lib/text2picture.js'));

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        m.reply(wait);
        text = text || m.quoted?.text || m.quoted?.caption || m.quoted?.description || '';
        if (!text) throw `Example: ${usedPrefix + command} Lagi Ruwet`;

        const apiEndpoint = 'https://api.lolhuman.xyz/api';
        const apiKey = global.lolkey;

        const commandMap = {
            ttp: async () => {
                const apiUrl = `${apiEndpoint}/ttp?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
                const attpRes = await fetch(apiUrl);
                return attpRes.arrayBuffer();
            },
            ttp2: async () => {
                const apiUrl = `${apiEndpoint}/ttp2?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
                const attpRes = await fetch(apiUrl);
                return attpRes.arrayBuffer();
            },
            ttp3: async () => {
                const apiUrl = `${apiEndpoint}/ttp3?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
                const attpRes = await fetch(apiUrl);
                return attpRes.arrayBuffer();
            },
            ttp4: async () => {
                const apiUrl = `${apiEndpoint}/ttp4?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
                const attpRes = await fetch(apiUrl);
                return attpRes.arrayBuffer();
            },
            ttp5: async () => {
                const apiUrl = `${apiEndpoint}/ttp5?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
                const attpRes = await fetch(apiUrl);
                return attpRes.arrayBuffer();
            },
            ttp6: async () => {
                const apiUrl = `${apiEndpoint}/ttp6?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
                const attpRes = await fetch(apiUrl);
                return attpRes.arrayBuffer();
            },
            ttp7: async () => {
                const response = await ttp(text);
                if (Array.isArray(response) && response.length > 0 && response[0].url) {
                    return await fetch(response[0].url).then(res => res.arrayBuffer());
                } else {
                    throw 'Invalid response from ttp7';
                }
            },
            attp: async () => {
                const apiUrl = `${apiEndpoint}/attp?apikey=${apiKey}&text=${encodeURIComponent(text)}`;
                const attpRes = await fetch(apiUrl);
                return attpRes.arrayBuffer();
            },
            attp2: async () => {
                const apiUrl = `${apiEndpoint}/attp2?apikey=${apiKey}&text=${encodeURIComponent(text)}`;
                const attpRes = await fetch(apiUrl);
                return attpRes.arrayBuffer();
            },
            attp3: async () => {
                const response = await attp(text);
                if (Array.isArray(response) && response.length > 0 && response[0].url) {
                    return await fetch(response[0].url).then(res => res.arrayBuffer());
                } else {
                    throw 'Invalid response from attp3';
                }
            },
        };

        const commandFunction = commandMap[command];

        if (!commandFunction) {
            throw 'Invalid command';
        }

        const data = await commandFunction();
        
        await conn.sendFile(m.chat, data, 'atet.webp', '', m);
    } catch (error) {
        console.error(error);
        m.reply(eror);
    }
};

handler.help = ['ttp', 'ttp2 -> ttp7', 'attp', 'attp2 -> attp3', 'hartacustom'];
handler.tags = ['sticker'];
handler.command = /^(ttp[2-7]?|attp[2-3]?|hartacustom)$/i;
handler.limit = true;

export default handler;