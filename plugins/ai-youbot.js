import fetch from 'node-fetch';

const getyoubotResponse = async (q, u) => {
  try {
    const response = await fetch(`https://api.azz.biz.id/api/youbot?q=${q}&key=global`);
    const data = await response.json();
    return data.hasil;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handler = async (m, { text }) => {
  if (!text) throw 'Contoh: .youbot Pesan yang ingin Anda sampaikan kepada asisten AI';

  m.reply(wait);
  
  try {
    
    const response = await getyoubotResponse(text, m.name);

    m.reply(response);
  } catch (error) {
    console.error('Error:', error);
    m.reply(eror);
  }
};

handler.help = ['youbot'];
handler.tags = ['ai'];
handler.command = /^(youbot)$/i;

export default handler;