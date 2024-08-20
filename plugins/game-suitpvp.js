
let timeout = 60000;
let poin = 500;
let poin_lose = -100;
let handler = async (m, { conn, usedPrefix }) => {
let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
  conn.suit = conn.suit ? conn.suit : {};
  if (Object.values(conn.suit).find(room => room.id.startsWith("suit") && [room.p, room.p2].includes(m.sender))) throw "Selesaikan suit sebelumnya terlebih dahulu.";
  if (!who) return m.reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya.. Contoh\n\n${usedPrefix}suit @${conn.user.jid.split('@')[0]}`, m.chat, { contextInfo: { mentionedJid: [conn.user.jid] } });
  if (Object.values(conn.suit).find(room => room.id.startsWith("suit") && [room.p, room.p2].includes(who))) throw `Orang yang kamu tantang sedang bermain suit bersama orang lain :(`;
  let id = "suit_" + (new Date() * 1);
  let caption = `
_*SUIT PvP*_

@${m.sender.split`@`[0]} menantang @${who.split`@`[0]} untuk bermain suit.

Silahkan @${who.split`@`[0]}.
\n\n`.trim();
  let footer = `Ketik "terima/ok/gas" untuk memulai suit\nKetik "tolak/gabisa/nanti" untuk menolak.`;
  conn.suit[id] = {
    chat: await conn.reply(m.chat, caption + footer, m, { mentions: [m.sender, ...conn.parseMention(caption)] }),
    id: id,
    p: m.sender,
    p2: who,
    status: "wait",
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `_Waktu suit habis_`, m);
      delete conn.suit[id];
    }, timeout),
    poin,
    poin_lose,
    timeout
  };
};
handler.tags = ["game"];
handler.help = ["suitpvp", "suit"].map(v => v + " @tag");
handler.command = /^suit(pvp)?$/i;
handler.group = true;

export default handler;