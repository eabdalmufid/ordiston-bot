import fetch from 'node-fetch';

const fetchStickers = async (query) => {
  const url = `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const stickers = data.result.stickers;

    const stickerRequests = await Promise.all(stickers.map(async (sticker) => {
      const fileResponse = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${sticker.file_id}`);
      const fileData = await fileResponse.json();

      return {
        file_id: sticker.file_id,
        url: `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${fileData.result.file_path}`,
      };
    }));

    return stickerRequests;
  } catch (error) {
    throw new Error('Terjadi kesalahan saat mengambil stiker.');
  }
};

const getRandomSticker = (stickers) => stickers[Math.floor(Math.random() * stickers.length)];

const handler = async (m, { conn, args, usedPrefix, text, command }) => {
  const query = text.split('|')[0]?.trim();
  const count = text.split('|')[1];

  if (!query) {
    return m.reply('*❗ Masukan tidak sesuai.*\nGunakan format yang benar: *stickertele [query]* atau *stickertelegram [query]|[angka]* atau *telesticker [query]|all* atau *telegramsticker [query]|random*');
  }

  try {
    const stickers = await fetchStickers(query);

    if (!stickers.length) {
      return m.reply('*❗ Stiker tidak ditemukan.*\nHarap coba dengan nama stiker yang berbeda.');
    }

    if (!count || count.toLowerCase() === 'random') {
      const randomSticker = getRandomSticker(stickers);
      return conn.sendFile(m.chat, randomSticker.url, '', `*Stiker Telegram (Acak)*`, m);
    }

    if (count.toLowerCase() === 'all') {
      for (let i = 0; i < stickers.length; i++) {
        await conn.sendFile(m.sender, stickers[i].url, '', `*Stiker Telegram (${i + 1}/${stickers.length})*`, m);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Menunggu 2 detik antara pengiriman stiker
      }
    } else {
      const stickerNumber = parseInt(count) - 1;
      if (isNaN(stickerNumber) || stickerNumber < 0 || stickerNumber >= stickers.length) {
        return m.reply('*❗ Nomor stiker tidak valid.*\nHarap berikan nomor stiker yang valid atau gunakan "random" untuk mengirim stiker secara acak atau "all" untuk mendapatkan semua stiker.');
      }
      return conn.sendFile(m.chat, stickers[stickerNumber].url, '', `*Stiker Telegram (${stickerNumber + 1}/${stickers.length})*`, m);
    }
  } catch (error) {
    return m.reply('*❗ Terjadi kesalahan saat mengambil stiker.*\nSilakan coba lagi nanti.');
  }
};

handler.help = ['stickertele [query]', 'stickertelegram [query]|[angka]', 'telesticker [query]|all', 'telegramsticker [query]|random'];
handler.tags = ['sticker'];
handler.command = /^(stickertele(gram)?|telesticker|telegramsticker)$/i;
handler.limit = 1;

export default handler;