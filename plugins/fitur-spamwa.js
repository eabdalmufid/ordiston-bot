let handler = async (m, { conn, text }) => {
    let [nomor, pesan, jumlah] = text.split(/[^\w\s]/g);
  
    if (!nomor) throw '*[ ⚠️ ] Harap masukkan nomor tujuan untuk melakukan spam pesan!*';
    if (!pesan) throw '*[ ⚠️ ] Harap masukkan pesan yang ingin di-spam!*';
    if (jumlah && isNaN(jumlah)) throw '*[ ⚠️ ] Jumlah pesan harus berupa angka!*';
  
    let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net';
    let fixedJumlah = jumlah ? jumlah * 1 : 10;
  
    if (fixedJumlah > 10) throw '*[ ⚠️ ] Terlalu banyak pesan! Jumlah harus kurang dari 10 pesan*️';
    
    await m.reply(`*[❗] Spam pesan ke nomor ${nomor} berhasil dilakukan*\n*Jumlah terkirim: ${fixedJumlah} kali!*`);
  
    for (let i = fixedJumlah; i > 1; i--) {
      if (i !== 0) conn.reply(fixedNumber, pesan.trim(), m);
    }
  }
  
  handler.help = ['spamwa <number>|<message>|<no of messages>'];
  handler.tags = ['tools'];
  handler.command = /^spam(wa)?$/i;
  handler.group = false;
  handler.premium = true;
  handler.private = true;
  handler.limit = true;
  export default handler;