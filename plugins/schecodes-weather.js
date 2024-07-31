import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, args }) => {
  let query = "⚙️ *Input text*\nContoh. *" + usedPrefix + "schecodes hello world*\n\n*<command> <text>*";
  let text = args.length >= 1 ? args.join(" ") : m.quoted && m.quoted.text ? m.quoted.text : null;

  if (!text) throw query;

  try {
    const waitMsg = "⏳ *Memuat data cuaca...*";
    m.reply(waitMsg);

    const xmg = await fetchWeather(text);
    const location = `${xmg.city}, ${xmg.country}`;
    const temperature = `${xmg.temperature.current}°C`;
    const description = xmg.condition.description;
    const iconUrl = xmg.condition.icon_url;

    const message = `
🌦️ *Cuaca saat ini*
📍 *Lokasi:* ${location}
🌡️ *Suhu:* ${temperature}
🌈 *Kondisi:* ${description}`;

    conn.sendFile(m.chat, iconUrl, 'weather.png', message, m);
  } catch (e) {
    console.error(e);
    throw "❌ *Gagal memuat data.*";
  }
};

handler.help = ["schecodes"];
handler.tags = ["misc"];
handler.command = /^(schecodes)$/i;
export default handler;

async function fetchWeather(term) {
  const response = await fetch(`https://api.shecodes.io/weather/v1/current?query=${encodeURIComponent(term)}&key=96f59ob69a32facbb34b2tdb5d2e7405`);
  const data = await response.json();
  return data;
};