import Aivvm from '../lib/aivvm.js';

const model = 'gpt-3.5-turbo';

const getAivvmResponse = async (messages, proxy) => {
  const responseChunks = await Aivvm.createAsyncGenerator(model, messages, true, {});
  const responseArray = [];

  for await (const chunk of responseChunks) {
    responseArray.push(chunk);
  }

  return responseArray.join('');
};

const handler = async (m, { text }) => {
  if (!text) throw 'Contoh: .aivvm Pesan yang ingin Anda sampaikan kepada asisten AI';

  m.reply('Sedang memproses...');
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: encodeURIComponent(text) },
  ];

  try {
    const proxy = null; // Ganti dengan proxy jika diperlukan
    const response = await getAivvmResponse(messages, proxy);

    m.reply(response);
  } catch (error) {
    console.error('Error:', error);
    m.reply('Terjadi kesalahan saat berkomunikasi dengan AI Service.');
  }
};

handler.help = ['aivvm'];
handler.tags = ['ai'];
handler.command = /^(aivvm)$/i;

export default handler;