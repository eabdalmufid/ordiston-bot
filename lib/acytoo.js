import fetch from 'node-fetch';

class Acytoo {
  static url = 'https://chat.acytoo.com';
  static working = true;
  static supports_gpt_35_turbo = true;

  static async *createAsyncGenerator(model, messages, proxy = null, kwargs) {
    const headers = _createHeader();

    const payload = _createPayload(messages, kwargs);

    const response = await fetch(this.url + '/api/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      proxy: proxy,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    for await (const chunk of response.body) {
      if (chunk) {
        yield chunk.toString();
      }
    }
  }
}

function _createHeader() {
  return {
    'accept': '*/*',
    'content-type': 'application/json',
  };
}

function _createPayload(messages, { temperature = 0.5 } = {}) {
  return {
    'key': '',
    'model': 'gpt-3.5-turbo',
    'messages': messages,
    'temperature': temperature,
    'password': '',
  };
}

export default Acytoo;