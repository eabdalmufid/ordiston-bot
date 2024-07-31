import { profile, watch, prepaid, post, media } from '../lib/merchant-api.js';

const handler = async (m, { args, text, usedPrefix, command }) => {
  const [one, two] = text.split`|`;

  const template = (args[0] || '').toLowerCase();

  if (!args[0]) {
    return m.reply(`*Contoh Penggunaan*

${usedPrefix + command} list

*List Command*
📋 list
🔄 trx
🛡️ status
🧑‍💼 profile
    `);
  }

  switch (template) {
    case "list":
      if (!one && !two) {
        const Ser = await prepaid();
        const resu = await Ser.services();
        const listSections = Object.values(resu.data)
          .sort((a, b) => a.index - b.index)
          .map((v, index) => `${index + 1}. ${v.type}\n- ${v.brand}`)
          .join("\n\n");
        return m.reply(`📋 *Berikut daftar semua produk:*\n\n${listSections}`);
      }
      if (one && !two) {
        let Oser = await prepaid(one);
        let resul = await Oser.services(one);
        if (!resul.result) return m.reply(resul.message);
        const brands = new Set();
        const listSections = Object.values(resul.data)
          .sort((a, b) => a.index - b.index)
          .filter((item) => brands.has(item.brand) ? false : (brands.add(item.brand), true))
          .map((v, index) => `${index + 1}. ${v.type}\n- ${v.brand}`)
          .join("\n\n");
        return m.reply(`📋 *Berikut daftar produk ${one}:*\n\n${listSections}`);
      }
      if (one && two) {
        let OTS = await prepaid(one, two);
        let result = await OTS.services(one, two);
        if (!result.data) return m.reply(result.message);
        const listSections = result.data.map(i =>
          `*Code*: ${i.code}\n*Nama*: ${i.name}\n*Harga*: ${i.price.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 2 })}\n*Status*: ${i.status}\n*Note*: ${i.note}`
        ).join("\n\n");
        return m.reply(`*[ Berikut daftar produk ]*\n\n${listSections}`);
      }
      break;

    case "trx":
      if (!one || !two) return m.reply(`🔄 *Penggunaan:*\n.${command + " " + args[0]} |Code|Nomor`);
      const OTR = await prepaid(one, two);
      const TRX = await OTR.order(one, two);
      console.log(TRX);
      const { data } = TRX;
      if (TRX.result && data !== null) {
        let teks2 = `_Transaksi status *${data.status}*_\n\n*TRXID*: ${data.trxid}\n*orderID*: ${data.data}\n*itemID*: ${data.service}\n\n*_${TRX.message}_*`;
        m.reply(teks2);
      } else {
        return m.reply(TRX.message);
      }
      const stats = await watch(data.trxid);
      if (stats.result) {
        const { data } = stats;
        let datas1 = data[0];
        let teks2 = `_Transaksi status *${datas1.status}*_\n\n*TRXID*: ${datas1.trxid}\n*orderID*: ${datas1.data}\n*itemID*: ${datas1.service}`;
        m.reply(teks2);
      }
      console.log(stats);
      break;

    case "status":
      if (!one) return m.reply(`🛡️ *Penggunaan:*\n.${command} TRXID`);
      const stats2 = await watch(one);
      if (stats2.result) {
        const { data } = stats2;
        let datas = data[0];
        let teks3 = `_Transaksi status *${datas.status}*_\n\n*TRXID*: ${datas.trxid}\n*orderID*: ${datas.data}\n*itemID*: ${datas.service}`;
        m.reply(teks3);
      }
      break;

    case "profile":
      const prof = await profile();
      let prip = `🧑‍💼 *Profil Pengguna*\n\n*Username*: ${prof.data.username}\n*Balance*: ${prof.data.balance.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 2 })}\n*Point*: ${prof.data.point}\n*Level*: ${prof.data.level}\n*Registered*: ${prof.data.registered}\n\n*${prof.message}*`;
      m.reply(prip);
      break;
  }
};

handler.help = ['merchant <args>'];
handler.tags = ['tools'];
handler.command = /^(ampangpedia|merchant|produk)$/i;
export default handler;