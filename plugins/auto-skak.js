import axios from 'axios';

export async function all(m) {
    if (m.isBaileys || !m.text) return
    let MengSkak = /^(napa|halah|cih|cuih|yaha|erorr|kasian|dek|gajelas|bokep)$/i.test(m.text)
    if (MengSkak && m.isGroup) {
        const options = {
            method: 'POST',
            url: 'https://openai37.p.rapidapi.com/chat-completion',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
                'X-RapidAPI-Host': 'openai37.p.rapidapi.com'
            },
            data: {
                messages: [{
                        role: 'assistant',
                        content: 'Hello there! How may I assist you today?'
                    },
                    {
                        role: 'user',
                        content: m.text
                    }
                ],
                temperature: 1
            }
        };
        try {
            const response = await axios(options);
            await this.reply(m.chat, response.data.content, m, adReply);
        } catch (error) {
            console.error(error);
            try {
                const kanyeResponse = await axios.get('https://api.kanye.rest/');
                await this.reply(m.chat, kanyeResponse.data.quote, m, adReply);
            } catch (kanyeError) {
                console.error(kanyeError);
                return null; // Atau lakukan sesuatu dengan error ini sesuai kebutuhan Anda.
            }
        }
    }
}