import Acytoo from '../lib/acytoo.js';
const model = 'gpt-3.5-turbo';
const getAcytooResponse = async (messages, proxy) => {
  
  const responseChunks = await Acytoo.createAsyncGenerator(model, messages, proxy);
  const responseArray = [];

  for await (const chunk of responseChunks) {
    responseArray.push(chunk);
  }

  return responseArray.join('');
};
    
const handler = async (m, { text }) => {
  if (!text) throw 'Contoh: .acytoo Pesan yang ingin Anda sampaikan kepada asisten AI';

  m.reply(wait);
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: encodeURIComponent(text) },
  ];

  
  try {
    const proxy = null; // Ganti dengan proxy jika diperlukan
    const response = await getAcytooResponse(messages, proxy);

    m.reply(response);
  } catch (error) {
    console.error('Error:', error);
    m.reply(eror);
  }
};

handler.help = ['acytoo'];
handler.tags = ['ai'];
handler.command = /^(acytoo)$/i;

export default handler;