let handler = async (m, { conn, args, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let url = await conn.profilePictureUrl(who).catch((_) => "./src/avatar_contact.png");
  let scircle = global.API("dzx", "/api/canvas/circle", { url });
  conn.sendFile(m.chat, scircle, "pp.jpg", "*Done!*", m);
};

handler.help = ["circle"].map((v) => v + " <tag>");
handler.tags = ["maker"];

handler.command = /^(cir(cle)?(le)?(cele)?(kel)?)$/i;
export default handler;
