let handler = async (m, { conn, usedPrefix: _p, args, text, usedPrefix }) => {
	try {
	  if (!m.quoted) throw 'Balas Chatnya !';
	  if (text.length > 2) throw 'Cuma Untuk 1 Emoji!';
	  if (!text) throw `📍 Contoh Penggunaan :\n${usedPrefix}react 🗿`;
  
	  await conn.relayMessage(m.chat, {
		reactionMessage: {
		  key: {
			id: m.quoted.id,
			remoteJid: m.chat,
			fromMe: true
		  },
		  text: text
		}
	  }, { messageId: m.id });
	} catch (error) {
	  try {
	  await conn.sendReact(m.chat, text, m.quoted.vM.key);
	} catch (error) {
	  await conn.reply(m.chat, eror, m);
	}
	}
  };
  
  handler.help = ['react <emoji>'];
  handler.tags = ['Baileys'];
  handler.command = /^(reac(tions|(t(ion)?)?)|addreact)$/i;
  
  export default handler;