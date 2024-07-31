let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  const features = ["antiBot", "antiFoto", "antiVideo", "antiAudio", "antiCall", "antiDelete", "antiLink", "antiLinkFb", "antiLinkHttp", "antiLinkIg", "antiLinkTel", "antiLinkTik", "antiLinkWa", "antiLinkYt", "antiSatir", "antiSticker", "antiVirtex", "antiToxic", "antibule", "autoBio", "autoChat", "autoAi", "autoGpt", "autochatGpt", "autoJoin", "autoPresence", "autoReply", "autoSticker", "autoVn", "viewStory", "bcjoin", "detect", "getmsg", "nsfw", "antiSpam", "simi", "alicia", "gptvoice", "characterai", "updateAnime", "updateAnimeNews", "viewonce", "welcome", "autoread", "gconly", "nyimak", "pconly", "self", "swonly", "lastAnime", "latestNews"];
  const activeFeatures = ["antiDelete", "detect", "getmsg", "lastAnime", "latestNews", "welcome"];
  const result = features.map((f, i) => {
    const isActive = activeFeatures.includes(f) ? !global.db.data.chats[m.chat][f] : global.db.data.chats[m.chat][f];
    return `*${(i + 1).toString().padEnd(2)}.* ${f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).padEnd(18)} *${isActive ? "ON" : "OFF"}*`;
  }).join('\n');

  const  featureStatus = `*# Feature*            *Mode*\n${"-".repeat(50)}\n${result}`;
  const listEnab = `🛠️ *DAFTAR FITUR*

${featureStatus}

*📝 CARA MENGGUNAKAN:*
→ ${usedPrefix + command} [nomor atau nama fitur]`;

  let isEnable = !/false|disable|(turn)?off|0/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];

  // Ambil input dari args
  let input = args[0];
  
  // Cek apakah input adalah angka
  let isNumber = !isNaN(input);

  let featureName;

  if (isNumber) {
    let index = parseInt(input) - 1;

    if (index < 0 || index >= features.length) {
      return await conn.reply(m.chat, listEnab, m);
    }

    featureName = features[index];
  } else {
    // Jika input bukan angka, gunakan itu sebagai nama fitur
    featureName = input;
  }

  // Periksa apakah featureName cocok dengan salah satu elemen dalam daftar fitur
  if (!features.includes(featureName)) {
    return await conn.reply(m.chat, listEnab, m);
  }

  // ...
  
  if (activeFeatures.includes(featureName)) {
    chat[featureName] = !isEnable;
    conn.reply(m.chat, `Feature *${featureName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON' : 'OFF'}*`, m);
  } else {
    if (["autoChat"].includes(featureName)) {
      conn.autochat = conn.autochat ? conn.autochat : {}
      conn.autochat.status = isEnable;
      conn.reply(m.chat, `Feature *${featureName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON' : 'OFF'}*`, m);
    } else {
      chat[featureName] = isEnable;
      conn.reply(m.chat, `Feature *${featureName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON' : 'OFF'}*`, m);
    }
  }
}
handler.help = ["en", "dis"].map(v => v + "able <nomor atau nama fitur>");
handler.tags = ["group", "owner"];
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i;
handler.owner = true

export default handler;