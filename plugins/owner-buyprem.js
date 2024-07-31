const handler = async (m, { conn, text }) => {
  // Check if user is already premium
  let user = global.db.data.users[m.sender];

  const hargaPremium = {
    "1": 100000000, // Harga 100000000 uang, mendapatkan 1 hari premium
    "2": 200000000, // Harga 200000000 uang, mendapatkan 3 hari premium
    "3": 500000000, // Harga 500000000 uang, mendapatkan 7 hari premium
    "4": 1000000000 // Harga 1000000000 uang, mendapatkan 15 hari premium
    // Tambahkan harga dan jumlahHari sesuai kebutuhan
  };

  const input = text.trim();
  if (!/^[1-4]$/.test(input)) {
    return conn.reply(m.chat, `Silakan pilih angka sesuai daftar berikut:\n\n${Object.entries(hargaPremium).map(([key, harga]) => `*${key}*. Untuk *${key} hari* total *Rp.${harga.toLocaleString()}*`).join('\n')}`, m);
  }

  const harga = hargaPremium[input];
  if (!harga) return conn.reply(m.chat, "🚫 *Pilihan harga tidak valid.* 🚫", m);

  let { key } = await conn.reply(m.chat, `
🌟 *Keanggotaan Premium* 🌟

Tingkatkan keanggotaan premium dan nikmati manfaat eksklusif!

💰 *Harga:* *Rp.${harga.toLocaleString()}*

Balas dengan *Y* untuk meningkatkan keanggotaan premium atau *N* untuk membatalkan.
  `, m);

  conn.buyprem[m.chat] = { list: input, hargaPremium, key, timeout: setTimeout(() => {
                conn.sendMessage(m.chat, {
                    delete: key
                })
                delete conn.buyprem[m.chat]
            }, 60 * 1000) };
};

handler.before = async (m, { conn }) => {
  conn.buyprem = conn.buyprem || {};

  if (m.isBaileys || !(m.chat in conn.buyprem)) return;

  let user = global.db.data.users[m.sender];

  const input = m.text.trim().toUpperCase();
  if (!/^[YN]$/i.test(input)) return;

  const { list, key, hargaPremium, timeout } = conn.buyprem[m.chat];
  const harga = hargaPremium[list];

  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;

  if (input === 'Y') {
    if (user.money < harga) {
      return conn.reply(m.chat, "🚫 *Anda membutuhkan setidaknya 10000 uang untuk menjadi pengguna premium.* 🚫", m);
    }

    user.money -= harga;
    var jumlahHari = 86400000 * list;
    var now = new Date() * 1;

    user.premiumTime = user.premiumTime || now;
    user.premiumTime += jumlahHari;

    if (!user.premium) user.premium = true;

    let message = user.premium
      ? `🌟 *Selamat! Jumlah hari premium bertambah.* 🌟\n⏳ *Countdown:* ${getCountdownText(now, user.premiumTime)}`
      : `🎉 *Selamat! Anda sekarang pengguna premium.* 🎉\n⏳ *Countdown:* ${getCountdownText(now, user.premiumTime)}`;
      
    conn.reply(m.chat, message, m);
    conn.sendMessage(m.chat, {
                    delete: key
                })
        clearTimeout(timeout)
    delete conn.buyprem[m.chat]; // Remove the session after the user has made a choice
  } else if (input === 'N') {
    conn.reply(m.chat, "✅ *Anda telah membatalkan peningkatan premium.* ✅", m);
    conn.sendMessage(m.chat, {
                    delete: key
                })
        clearTimeout(timeout)
    delete conn.buyprem[m.chat]; // Remove the session after the user has made a choice
  }
};

handler.help = ["buyprem"];
handler.tags = ["owner"];
handler.command = /^buyprem$/i;

export default handler;

function getCountdownText(now, premiumTime) {
  let remainingTime = premiumTime - now;
  let days = Math.floor(remainingTime / 86400000);
  let hours = Math.floor((remainingTime % 86400000) / 3600000);
  let minutes = Math.floor((remainingTime % 3600000) / 60000);
  let seconds = Math.floor((remainingTime % 60000) / 1000);

  let countdownText = "";

  if (days > 0) countdownText += `${days} hari `;
  if (hours > 0) countdownText += `${hours} jam `;
  if (minutes > 0) countdownText += `${minutes} menit `;
  if (seconds > 0) countdownText += `${seconds} detik`;

  return countdownText.trim();
}