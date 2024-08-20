import { Cerpen } from "dhn-api";

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
  await m.reply(wait);
  try {
    let item = await Cerpen();
    let cap = `🔍 *[ RESULT ]*
    
${item}
`;
    await m.reply(cap);
  } catch (e) {
    await m.reply(eror);
  }
};
handler.help = ["cerpen"];
handler.tags = ["internet"];
handler.command = /^(cerpen)$/i;
export default handler;

/* New Line */
