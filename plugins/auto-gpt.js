import fetch from 'node-fetch';

export async function before(m) {
    const chat = global.db.data.chats[m.chat];
    if (m.isBaileys || !m.text) return false;
    let text = m.text;
    try {
        if (chat.autoGpt) {
            const openAIResponse = await chatgpt(text)
            const result = openAIResponse;
            
            if (result.status === true) {
                await this.sendMessage(m.chat, {
                    text: result.result
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                });
            }
        }
    } catch {
        await this.reply(m.chat, 'Error occurred.', m);
    }
}

export const disabled = false;


async function chatgpt(input) {
  if (!input) {
    return {
      status: false,
      message: "No input.",
      contoh: "Halo"
    };
  }

  const result = {
    status: true,
    result: "",
  };

  const apiEndpoints = [
    {
      url: "https://api-fgmods.ddns.net/api/info/openai2",
      processResponse: (data) => {
        if (data.result !== 'error' && data.result !== '' && data.result !== undefined) {
          return data.result;
        }
        return null;
      }
    },
    {
      url: "https://vihangayt.me/tools/chatgpt?q=",
      processResponse: (data) => {
        if (data.data !== 'error' && data.data !== '' && data.data !== undefined) {
          return data.data;
        }
        return null;
      }
    },
    {
      url: "https://vihangayt.me/tools/chatgpt2?q=",
      processResponse: (data) => {
        if (data.data !== 'error' && data.data !== '' && data.data !== undefined) {
          return data.data;
        }
        return null;
      }
    },
    {
      url: "https://vihangayt.me/tools/chatgpt3?q=",
      processResponse: (data) => {
        if (data.data !== 'error' && data.data !== '' && data.data !== undefined) {
          return data.data;
        }
        return null;
      }
    },
    {
      url: `https://api.lolhuman.xyz/api/openai?apikey=${lolkey}&text=`,
      processResponse: (data) => {
        if (data.result !== 'error' && data.result !== '' && data.result !== undefined) {
          return data.result;
        }
        return null;
      }
    },
    {
      url: "https://api.ibeng.tech/api/others/chatgpt?q=",
      processResponse: (data) => {
        if (data.data !== 'error' && data.data !== '' && data.data !== undefined) {
          const hahaha = data.data.replace(' Indonesia ', ' español ').trim();
          return hahaha;
        }
        return null;
      }
    },
    {
      url: "https://api.akuari.my.id/ai/gpt?chat=",
      processResponse: (data) => {
        if (data.respon !== 'error' && data.respon !== '' && data.respon !== undefined) {
          return data.respon;
        }
        return null;
      }
    },
    {
      url: "https://api.azz.biz.id/api/bard?q=",
      processResponse: (data) => {
        if (data.respon !== 'error' && data.respon !== '' && data.respon !== undefined) {
          return data.respon;
        }
        return null;
      }
    },
    // Add more endpoints with the appropriate processResponse functions
  ];

  for (const endpoint of apiEndpoints) {
    try {
      const response = await fetch(`${endpoint.url}${input}`);
      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          const processedResult = endpoint.processResponse(responseData);
          if (processedResult) {
            result.result = processedResult.trim();
            return result;
          }
        }
      }
    } catch (error) {
      // Handle errors if needed
    }
  }

  result.status = false;
  result.result = "Error";
  return result;
}