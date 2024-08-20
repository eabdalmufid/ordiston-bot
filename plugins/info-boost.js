import { performance } from "perf_hooks";

let handler = async (m, { conn }) => {

    let start = `Mulai Akselerasi....Mohon Tunggu Sebentar`
    let boost = `${pickRandom(['[▒▒▒▒▒▒▒▒▒▒]'])}`
    let boost2 = `${pickRandom(['[█▒▒▒▒▒▒▒▒▒]','[██▒▒▒▒▒▒▒▒]'])}`
    let boost3 = `${pickRandom(['[██▒▒▒▒▒▒▒▒]','[███▒▒▒▒▒▒▒▒]','[████▒▒▒▒▒▒▒]'])}`
    let boost4 = `${pickRandom(['[██████▒▒▒▒▒▒▒]','[████████▒▒▒▒▒▒]','[████████▒▒▒▒]'])}`
    let boost5 = `${pickRandom(['[██████████▒▒▒]','[████████████▒]'])}`
    let boost6 = `${pickRandom(['*Conection Lost...*','[████████████▒]','[█▒▒▒▒▒▒▒▒▒]'])}`
    let boost7 = `${pickRandom(['[██████████▒▒▒]','[████████████▒]','[████████████]'])}`

    /*
    const arr = [
      "Loading... 0%",
      "Loading... 10%",
      "Loading... 30%",
      "Loading... 50%",
      "Loading... 100%",
      "Successfully!"
    ];

    const { key } = await conn.sendMessage(m.chat, { text: 'Trend Kontol Please Wait...' });

    for (let i = 0; i < arr.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, { text: arr[i], edit: key });
    }
    */

  await m.reply(start);
  const { key } = await conn.sendMessage(m.chat, { text: boost });
  await conn.sendMessage(m.chat, { text: boost2, edit: key });
  await conn.sendMessage(m.chat, { text: boost3, edit: key });
  await conn.sendMessage(m.chat, { text: boost4, edit: key });
  await conn.sendMessage(m.chat, { text: boost5, edit: key });
  await conn.sendMessage(m.chat, { text: boost6, edit: key });
  await conn.sendMessage(m.chat, { text: boost7, edit: key });
  let old = performance.now();
  let neww = performance.now();
  let speed = `${neww - old}`;
  let finish = `*_Bot Berhasil Dipercepat_*\n\n⚡: ${speed} Detik!`;

  await conn.sendMessage(m.chat, { text: finish, edit: key });
};
handler.help = ["boost", "refresh"];
handler.tags = ["info"];
handler.command = /^boost|refresh/i;

handler.rowner = true;
handler.fail = null;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
