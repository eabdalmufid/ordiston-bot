import axios from 'axios';

const models = {
  'gpt-3.5-turbo': { id: 'gpt-3.5-turbo', name: 'GPT-3.5' },
  'gpt-3.5-turbo-0613': { id: 'gpt-3.5-turbo-0613', name: 'GPT-3.5-0613' },
  'gpt-3.5-turbo-16k': { id: 'gpt-3.5-turbo-16k', name: 'GPT-3.5-16K' },
  'gpt-3.5-turbo-16k-0613': { id: 'gpt-3.5-turbo-16k-0613', name: 'GPT-3.5-16K-0613' },
  'gpt-4': { id: 'gpt-4', name: 'GPT-4' },
  'gpt-4-0613': { id: 'gpt-4-0613', name: 'GPT-4-0613' },
  'gpt-4-32k': { id: 'gpt-4-32k', name: 'GPT-4-32K' },
  'gpt-4-32k-0613': { id: 'gpt-4-32k-0613', name: 'GPT-4-32K-0613' },
};

class Aivvm {
  static url = 'https://chat.aivvm.com';
  static supportsStream = true;
  static working = true;
  static supportsGpt35Turbo = true;
  static supportsGpt4 = true;

  static async *createAsyncGenerator(model, messages, stream = true, kwargs) {
    if (!model) {
      model = 'gpt-3.5-turbo';
    } else if (!models[model]) {
      throw new Error(`Model are not supported: ${model}`);
    }

    const headers = {
      authority: 'chat.aivvm.com',
      accept: '*/*',
      'accept-language': 'en,fr-FR;q=0.9,fr;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,am;q=0.4,de;q=0.3',
      'content-type': 'application/json',
      origin: 'https://chat.aivvm.com',
      referer: 'https://chat.aivvm.com/',
      'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    };

    const json_data = {
      model: models[model],
      messages,
      key: '',
      prompt: "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
      temperature: kwargs?.temperature || 0.7,
    };

    try {
      const response = await axios.post('https://chat.aivvm.com/api/chat', json_data, {
        headers,
        responseType: 'stream',
      });

      for await (const chunk of response.data) {
        yield chunk.toString('utf-8');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error for handling elsewhere, if needed.
    }
  }

  static get params() {
    const params = [
      'model: str',
      'messages: list[dict[str, str]]',
      'stream: bool',
      'temperature: float',
    ];
    const paramStr = params.join(', ');
    return `g4f.provider.${this.name} supports: (${paramStr})`;
  }
}

export default Aivvm;