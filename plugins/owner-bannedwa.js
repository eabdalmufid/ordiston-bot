import axios from 'axios';
import cheerio from 'cheerio';
import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Masukkan Nomor!");

  const number = text.replace(/[^0-9]/g, "").replace(/^08/, "62");
  if (!number.startsWith("62")) return m.reply("Only INDONESIA number!");

  if (number + "@s.whatsapp.net" === conn.user.jid) return m.reply("Is that bot number ?");

  const isValid = await conn.isOnWhatsApp(number + "@s.whatsapp.net");
  if (!isValid) return m.reply("Number not in WhatsApp!");

  const textnum = PhoneNumber("+" + number).getNumber("international");

  try {
    const { data, headers } = await axios.get("https://www.whatsapp.com/contact/noclient/");
    const email = (await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")).data[0];
    const $ = cheerio.load(data);
    const $form = $("form");
    const url = new URL($form.attr("action"), "https://www.whatsapp.com").href;
    const form = new URLSearchParams({
      jazoest: $form.find("input[name=jazoest]").val(),
      lsd: $form.find("input[name=lsd]").val(),
      step: "submit",
      country_selector: "INDONESIA",
      phone_number: textnum,
      email,
      email_confirm: email,
      platform: "ANDROID",
      your_message: "Perdido/roubado: desative minha conta",
      __user: "0",
      __a: "1",
      __csr: "",
      __req: "8",
      __hs: "19316.BP:whatsapp_www_pkg.2.0.0.0.0",
      dpr: "1",
      __ccg: "UNKNOWN",
      __rev: "1006630858",
      __comment_req: "0"
    });

    const { data: resData } = await axios.post(url, form, { headers: { cookie: headers["set-cookie"] || "" } });
    const payload = String(resData);

    if (payload.includes(`"payload":true`)) {
      m.reply(`WhatsApp Support
Hai,
Terima kasih atas pesan Anda.
Kami telah mengaktifkan kembali akun anda.`.trim());
    } else if (payload.includes(`"payload":false`)) {
      m.reply(`Halo, 
Kami menerima pesan Anda.
Kami tahu bahwa saat ini Anda tidak memiliki akses ke WhatsApp dan kami sedang bekerja
untuk memenuhi pesanan Anda.
Kami berterima kasih atas kesabaran Anda dan akan menghubungi Anda sesegera mungkin.
Untuk informasi lebih lanjut, silakan baca peraturan kami.`.trim());
    } else m.reply(await import("utils").format(resData));
  } catch (err) {
    m.reply(`${err}`);
  }
};

handler.help = ['unbannedwa'];
handler.tags = ['owner'];
handler.command = /^(unbannedwa|unbanwa)$/i;
handler.owner = true;

export default handler;