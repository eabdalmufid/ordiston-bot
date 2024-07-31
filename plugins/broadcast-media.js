import { addExif } from '../lib/sticker.js';
import fetch from "node-fetch";

const commandList = ["bcvn", "bcvid", "bcimg", "bcstick", "bctxt", "bctxt2"];
const mimeAudio = 'audio/mpeg';
const mimeVideo = 'video/mp4';
const mimeImage = 'image/jpeg';
const mimeSticker = 'image/webp';

const generateDoc = (teks, externalAdReply) => ({
  mimetype: mimeAudio,
  fileLength: fsizedoc,
  //seconds: fsizedoc,
  ptt: true,
  waveform: [0, 100, 0, 100, 0],
  contextInfo: { externalAdReply }
});

let handler = async (m, { conn, command, args }) => {
    let teks
    if (args.length >= 1) {
        teks = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        teks = m.quoted.text
    }
    
  const more = String.fromCharCode(8206);
  const readMore = more.repeat(1);
  const imgvn = await (await conn.getFile(await imagesUrl("Broadcast " + command.slice(2), m.name))).data;
  const externalAdReply = {
    body: "Pesan: " + teks,
    containsAutoReply: true,
    mediaType: 1,
    mediaUrl: sig,
    renderLargerThumbnail: true,
    sourceUrl: null,
    thumbnail: imgvn,
    thumbnailUrl: await imagesUrl("Broadcast " + command.slice(2), m.name),
    title: `BROADCAST 📢`
  };

  if (!commandList.includes(command)) {
    throw "❌ Perintah tidak valid!";
  }

  const doc = generateDoc(teks, externalAdReply);
  let groups = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0]).filter(item => item.endsWith('@g.us'));
  for (let id of groups) {
  if (command === 'bcvn') {
    const audioValue = m.quoted && m.quoted.mtype === "audioMessage" // Check for m.quoted before accessing m.quoted.mtype
      ? m.quoted.download()
      : await generateVoice("id-ID", "id-ID-ArdiNeural", teks);

    if (audioValue) {
      doc.audio = audioValue;
      doc.mimetype = mimeAudio;
      await conn.sendMessage(id, doc, { quoted: null, ephemeralExpiration: ephemeral });
    }
  } else if (command === 'bcvid') {
    const videoValue = m.quoted && m.quoted.mtype === "videoMessage" // Check for m.quoted before accessing m.quoted.mtype
      ? m.quoted.download()
      : { url: giflogo };

    if (videoValue) {
      doc.video = videoValue;
      doc.mimetype = mimeVideo;
      doc.caption = teks;
      await conn.sendMessage(id, doc, { quoted: null, ephemeralExpiration: ephemeral });
    }
  } else if (command === 'bcimg') {
    const imageValue = m.quoted && m.quoted.mtype === "imageMessage" // Check for m.quoted before accessing m.quoted.mtype
      ? m.quoted.download()
      : { url: logo };

    if (imageValue) {
      doc.image = imageValue;
      doc.mimetype = mimeImage;
      doc.caption = teks;
      await conn.sendMessage(id, doc, { quoted: null, ephemeralExpiration: ephemeral });
    }
  } else if (command === 'bcstick') {
    const stickerValue = m.quoted && m.quoted.mtype === "stickerMessage" // Check for m.quoted before accessing m.quoted.mtype
      ? await m.quoted.download()
      : await (await conn.getFile(await imagesUrl("Broadcast " + command.slice(2), m.name))).data;

    if (stickerValue) {
      const imgvn = await (await conn.getFile(await imagesUrl("Broadcast " + command.slice(2), m.name))).data;
      const stiker = await addExif(stickerValue, packname, m.name);
      conn.sendFile(id, stiker, 'sticker.webp', '', null, null, {
        fileLength: fsizedoc,
        mimetype: mimeSticker,
        contextInfo: { externalAdReply }
      });
    }
  } else if (command === 'bctxt') {
    const textValue = m.quoted && m.quoted.mtype === "extendedTextMessage" // Check for m.quoted before accessing m.quoted.mtype
      ? m.quoted.text
      : teks;

    if (textValue) {
      doc.text = readMore;
      doc.contextInfo.externalAdReply.body = textValue;
      doc.contextInfo.externalAdReply.thumbnailUrl = await imagesUrl(textValue, m.name);
      await conn.sendMessage(id, doc, { quoted: null, ephemeralExpiration: ephemeral });
    }
  } else if (command === 'bctxt2') {
    const textValue2 = m.quoted && m.quoted.mtype === "extendedTextMessage" // Check for m.quoted before accessing m.quoted.mtype
      ? m.quoted.text
      : teks;

    if (textValue2) {
      doc.text = textValue2;
      doc.contextInfo.externalAdReply.body = author;
      await conn.sendMessage(id, doc, { quoted: null, ephemeralExpiration: ephemeral });
    }
  }
  }
};

handler.help = commandList;
handler.tags = ["main"];
handler.command = new RegExp(`^(${commandList.join('|')})$`, 'i');
handler.owner = true

export default handler;

function getCurrentTime() {
  const options = { 
    timeZone: 'Asia/Jakarta', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };

  const now = new Date().toLocaleString('id-ID', options);
  return now;
}

async function imagesUrl(q, aut) {
let data = {
    "bi": "https://source.unsplash.com/UF_wwDxI6uk/1200x630",
    "h": "630",
    "w": "1200",
    "a.tp": "rect",
    "a.x": "600",
    "a.y": "315",
    "a.w": "751",
    "a.h": "313",
    "a.c": "#ffffff",
    "a.rx": "20",
    "a.ry": "20",
    "b.tp": "textbox",
    "b.x": "594",
    "b.y": "306",
    "b.w": "603",
    "b.h": "45",
    "b.t": q,
    "b.fs": "40",
    "b.lh": "1",
    "b.fw": "400",
    "b.ff": "Inter",
    "b.oy": "top",
    "b.maxHeight": "40",
    "c.tp": "textbox",
    "c.x": "765",
    "c.y": "243",
    "c.w": "288",
    "c.h": "40",
    "c.c": "#555",
    "c.t": getCurrentTime(),
    "c.ta": "right",
    "c.fs": "35",
    "c.lh": "1",
    "c.fw": "400",
    "c.ff": "Inter",
    "c.maxHeight": "30",
    "d.tp": "textbox",
    "d.x": "600",
    "d.y": "397",
    "d.w": "613",
    "d.h": "34",
    "d.t": aut,
    "d.fs": "30",
    "d.lh": "1",
    "d.fw": "400",
    "d.ff": "Inter",
    "d.maxHeight": "20",
    "e.tp": "image",
    "e.x": "324",
    "e.y": "245",
    "e.w": "128",
    "e.h": "128",
    "e.sx": "0.5",
    "e.sy": "0.5",
    "e.src": "https://logo.clearbit.com/whatsapp.com"
} 
data.apiKey = ""

// Generate apiURL from data
let apiURL = 'https://img.bruzu.com/?'+new URLSearchParams(data).toString();

return apiURL
}

async function generateVoice(Locale = "id-ID", Voice = "id-ID-ArdiNeural", Query) {
    const formData = new FormData();
    formData.append("locale", Locale);
    formData.append("content", `<voice name="${Voice}">${Query}</voice>`);
    formData.append("ip", '46.161.194.33');
    const response = await fetch('https://app.micmonster.com/restapi/create', {
        method: 'POST',
        body: formData
    });
    return Buffer.from(('data:audio/mpeg;base64,' + await response.text()).split(',')[1], 'base64');
};