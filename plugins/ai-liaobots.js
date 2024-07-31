import { Liaobots } from '../lib/liaobots.js';
const model = 'gpt-3.5-turbo';
const getLiaobotsResponse = async (messages, proxy) => {
  
  const responseChunks = await (new Liaobots()).createAsyncGenerator(model, messages, proxy);
  const responseArray = [];

  for await (const chunk of responseChunks) {
    responseArray.push(chunk);
  }

  return responseArray.join('');
};
    
const handler = async (m, { text }) => {
  if (!text) throw 'Contoh: .liaobots Pesan yang ingin Anda sampaikan kepada asisten AI';

  m.reply(wait);
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: text },
  ];

  
  try {
    const proxy = null; // Ganti dengan proxy jika diperlukan
    const response = await getLiaobotsResponse(messages, proxy);

    m.reply(response);
  } catch (error) {
    console.error('Error:', error);
    m.reply(eror);
  }
};

handler.help = ['liaobots'];
handler.tags = ['ai'];
handler.command = /^(liaobots)$/i;

export default handler;