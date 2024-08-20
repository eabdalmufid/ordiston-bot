import ChatBase from '../lib/chatbase.js';

const model = 'gpt-4';

const getChatBaseResponse = async (messages, proxy) => {
  const responseChunks = await ChatBase.createAsyncGenerator(model, messages, true, {});
  const responseArray = [];

  for await (const chunk of responseChunks) {
    responseArray.push(chunk);
  }

  return responseArray.join('');
};

const handler = async (m, { text }) => {
  if (!text) throw 'Contoh: .chatbase Pesan yang ingin Anda sampaikan kepada asisten AI';

  m.reply('Sedang memproses...');
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: encodeURIComponent(text) },
  ];

  try {
    const proxy = null; // Ganti dengan proxy jika diperlukan
    const response = await getChatBaseResponse(messages, proxy);

    m.reply(response);
  } catch (error) {
    console.error('Error:', error);
    m.reply('Terjadi kesalahan saat berkomunikasi dengan AI Service.');
  }
};

handler.help = ['chatbase'];
handler.tags = ['ai'];
handler.command = /^(chatbase)$/i;

export default handler;