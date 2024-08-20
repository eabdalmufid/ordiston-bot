import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, text, args, command }) => {
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom());
  const name = await conn.getName(who);

  if (command === 'sound') {
    if (!text) throw `🎶 Contoh Penggunaan:
${usedPrefix + command} 2

🔢 List Nomor
Maksimal Angka 70

Contoh:
${usedPrefix + command} arigatou

🔠 List Alphabet
${soundAlphabets.map(item => `• ${item}`).join('\n')}`;

    let vn;
    if (isNumber(text)) {
      try {
        vn = 'https://raw.githubusercontent.com/AyGemuy/Sound/main/sound' + text + '.mp3';
      } catch {
        vn = 'https://hansxd.nasihosting.com/sound/sound' + text + '.mp3';
      }
    } else {
      vn = `https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/${text}.mp3`;
    }
    
    try {
      await conn.sendMessage(m.chat, { audio: { url: vn }, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0, 100, 0, 100, 0] }, { quoted: m, ephemeralExpiration: ephemeral });
    } catch {
      throw 'Maaf, terjadi kesalahan saat mengirim Voice Note (VN). Mohon coba lagi nanti.';
    }
  } else if (command === 'mangkane') {
    if (!text) throw `🎵 Contoh Penggunaan:
${usedPrefix + command} 1`;

    let vn;
    try {
      vn = 'https://raw.githubusercontent.com/AyGemuy/Rest-Sound/main/HyuuraKane/mangkane' + text + '.mp3';
    } catch {
      vn = 'raw.githubusercontent.com/WH-MODS-BOT/Soundskane/master/mangkane' + text + '.mp3';
    }

    if (args[0] > 25) {
      const ya = 'https://raw.githubusercontent.com/AyGemuy/mangkane/main/Mangkanenya/mangkane' + args[0] + '.mp3';
      await conn.sendFile(m.chat, ya, text + '.mp3', '', m, null, adReply);
    }
  } else if (command === 'ringtone') {
    if (!text) throw `🎵 Contoh Penggunaan:
${usedPrefix + command} black cover`;

    const vn = await fetch(global.API('btchx', '/api/search/ringtone', { text: text }, 'apikey'));
    const dapet = await vn.json();
    const listSections = Object.values(dapet.result).map((v, index) => `${index} ${cmenub} ${v.title}\nAudio 🎧 ${usedPrefix + command}get ${v.audio}\n*Source:* ${v.source}`);
    conn.sendMessage(m.chat, `📺 Ringtone Search 🔎\n⚡ Silakan pilih Ringtone Search di bawah ini...\n\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, 'conversation', { contextInfo: { mentionedJid: conn.parseMention(listSections) }, quoted: m, ephemeralExpiration: ephemeral });
  } else if (command === 'ringtoneget') {
    try {
      await conn.sendFile(m.chat, text, 'ringtone.mp3', '', m, null, adReply);
    } catch {
      throw 'Maaf, terjadi kesalahan saat mengirim Ringtone. Mohon coba lagi nanti.';
    }
  }
};

handler.help = ['sound', 'mangkane', 'ringtone'];
handler.command = ['sound', 'mangkane', 'ringtone', 'ringtoneget'];
handler.tags = ['random'];

export default handler;

const soundAlphabets = [
  "anjay",
"ara-ara",
"ara-ara-cowok",
"ara-ara2",
"arigatou",
"assalamualaikum",
"asu",
"ayank",
"aku-ngakak",
"bacot",
"bahagia-aku",
"baka",
"bansos",
"beat-box",
"beat-box2",
"biasalah",
"bidadari",
"bot",
"buka-pintu",
"canda-anjing",
"cepetan",
"cuekin-terus",
"daisuki-dayo",
"daisuki",
"dengan-mu",
"gaboleh-gitu",
"gak-lucu",
"gamau",
"gay",
"gelay",
"gitar",
"gomenasai",
"hai-bot",
"hampa",
"hayo",
"hp-iphone",
"i-like-you",
"ih-wibu",
"india",
"karna-lo-wibu",
"kiss",
"kontol",
"ku-coba",
"maju-wibu",
"makasih",
"mastah",
"nande-nande",
"nani",
"ngadi-ngadi",
"nikah",
"nuina",
"onichan",
"owner-sange",
"ownerku",
"pak-sapardi",
"pale",
"pantek",
"pasi-pasi",
"punten",
"sayang",
"siapa-sih",
"sudah-biasa",
"summertime",
"tanya-bapak-lu",
"to-the-bone",
"wajib",
"waku",
"woi",
"yamete",
"yowaimo",
"yoyowaimo"
];

function isNumber(x) {
  return !isNaN(x);
}