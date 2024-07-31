import fetch from 'node-fetch';

class Aichat {
  constructor() {
    this.url = "https://chat-gpt.org/chat";
    this.working = true;
    this.supports_gpt_35_turbo = true;
  }

  static async createAsync(model, messages, proxy = null, kwargs) {
    const headers = {
      "authority": "chat-gpt.org",
      "accept": "*/*",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "origin": "https://chat-gpt.org",
      "pragma": "no-cache",
      "referer": "https://chat-gpt.org/chat",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    };

    const json_data = {
      "message": Aichat.formatPrompt(messages),
      "temperature": kwargs?.temperature || 0.5,
      "presence_penalty": 0,
      "top_p": kwargs?.top_p || 1,
      "frequency_penalty": 0,
    };

    const response = await fetch("https://chat-gpt.org/api/text", {
      method: "POST",
      headers,
      body: JSON.stringify(json_data),
      proxy: proxy,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    if (!result.response) {
      throw new Error(`Error Response: ${JSON.stringify(result)}`);
    }

    return result.message;
  }

  static formatPrompt(messages) {
    // Implementasi dari formatPrompt() dalam Python
    // Anda perlu mengubah format pesan sesuai dengan kebutuhan Anda.
    // Contoh sederhana: return messages.join('\n');
    return JSON.stringify(messages);
  }
}

export default Aichat;