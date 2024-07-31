import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
  try {
    let u = global.db.data.users[m.sender];
    u.lastbansos = u.lastbansos || 0;
    let Aku = `${Math.floor(Math.random() * 101)}`.trim();
    let Kamu = `${Math.floor(Math.random() * 81)}`.trim(); // Menantang 😏
    let A = (Aku * 1);
    let K = (Kamu * 1);
    let kb = 'https://telegra.ph/file/afcf9a7f4e713591080b5.jpg';
    let mb = 'https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg';
    let t = (new Date - u.lastbansos);
    let timers = clockString(604800000 - t);

    if (t > 300000) {
      if (A > K) {
        conn.sendFthumb(m.chat, 'Korupsi Bansos', `*Kamu Tertangkap!* Korupsi dana bansos 🕴️💰, Denda *3 Ratus Ribu* rupiah 💵`, kb, '', m)
        //conn.sendFile(m.chat, kb, 'b.jpg', `*Kamu Tertangkap!* Korupsi dana bansos 🕴️💰, Denda *3 Ratus Ribu* rupiah 💵`, m);
        u.money -= 300000;
        u.lastbansos = new Date * 1;
      } else if (A < K) {
        u.money += 300000;
        conn.sendFthumb(m.chat, 'Korupsi Bansos', `*Berhasil Korupsi!* Dana bansos 🕴️💰, Dapatkan *3 Ratus Ribu* rupiah 💵`, mb, '', m)
        //conn.sendFile(m.chat, mb, 'b.jpg', `*Berhasil Korupsi!* Dana bansos 🕴️💰, Dapatkan *3 Ratus Ribu* rupiah 💵`, m);
        u.lastbansos = new Date * 1;
      } else {
        conn.reply(m.chat, `*Maaf!* Kamu tidak berhasil melakukan korupsi bansos dan kamu tidak akan masuk penjara karena kamu *melarikan diri* 🏃`, m);
        u.lastbansos = new Date * 1;
      }
    } else conn.reply(m.chat, `*Sudah Melakukan Korupsi!* 💰\nHarus menunggu selama agar bisa korupsi bansos kembali\n▸ 🕓 ${timers}`, m);
  } catch (e) {
    throw `Terjadi kesalahan`;
  }
};

handler.help = ['bansos'];
handler.tags = ['rpg'];
handler.command = /^(bansos|korupsi)$/i;
handler.group = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
	console.log({ ms, h, m, s })
	return [d, h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}