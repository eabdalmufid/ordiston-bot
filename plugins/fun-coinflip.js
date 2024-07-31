import { Sticker } from 'wa-sticker-formatter';

const handler = async (m, { conn, args, text }) => {
  const arr = ["atas", "bawah"];
  if (!arr.includes(args[0])) throw "Input atas/bawah";
  const terbang = arr.getRandom();
  const res = terbang === "atas"
    ? "https://cdn-icons-png.flaticon.com/512/1490/1490832.png"
    : "https://cdn-icons-png.flaticon.com/512/4315/4315581.png";

  const MiliSecond = 3000; //1 second

  const coins = parseInt(Math.floor(Math.random() * 100000));
  const exp = parseInt(Math.floor(Math.random() * 10000));
  const player = global.db.data.users[m.sender];

  const createSticker = async (img, url, packName, authorName, quality) => {
    const stickerMetadata = {
      type: 'full',
      pack: packName,
      author: authorName,
      quality
    };
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
  };

  try {
    const stiker = await createSticker(false, res, terbang === "atas" ? "WINNER" : "LOSE", "COINFLIP", 30);
    const pesan = `
*[ ${terbang === "atas" ? "WIN" : "LOSE"} ]*

${terbang === "atas" ? "Anda Mendapatkan:" : "Inventory Berkurang:"}
${new Intl.NumberFormat('en-US').format(coins)} Money
${new Intl.NumberFormat('en-US').format(exp)} XP
`;

    m.reply(stiker).then(() => {
      setTimeout(() => {
        conn.reply(m.chat, pesan, m);
      }, MiliSecond);
    });

    if (terbang === "atas") {
      player.money += coins;
      player.exp += exp;
      global.db.data.users[m.sender].tiketcoin += 1;
    } else if (terbang === "bawah") {
      player.money -= coins;
      player.exp -= exp;
      global.db.data.users[m.sender].tiketcoin -= 1;
    }
  } catch (error) {
    console.log(error);
    m.reply('Terjadi kesalahan saat melakukan operasi');
  }
};

handler.help = ["coin", "koin"].map(v => v + 'flip');
handler.tags = ["fun"];
handler.command = /^((coin|koin)?flip)$/i;
export default handler;