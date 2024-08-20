// By Arifzyn, Yang Hapus Yatim
// Recode Nadia adek Raka
let handler = async (m, { conn, args, usedPrefix }) => {
    if (!args[0] || !m.mentionedJid[0])
      return conn.reply(
        m.chat,
        usedPrefix +
          "casino <jumlah> @lawan\n " +
          usedPrefix +
          `casino 1000 @${m.sender.split("@")[0]}`,
        m,
        { mentions: [m.sender] }
      );
    conn.casino = conn.casino ? conn.casino : {};
    if (m.chat in conn.casino)
      return m.reply(
        "Masih ada yang melakukan casino disini, tunggu sampai selesai!!"
      );
    if (!global.db.data.users[m.mentionedJid[0]])
      return m.reply(
        "Lawan tidak terdaftar didatabase bot atau format kamu salah. " +
          usedPrefix +
          "casino <jumlah> @lawan"
      );
    let count = args[0];
    count = count
      ? /all/i.test(count)
        ? Math.floor(global.db.data.users[m.sender].money / 1)
        : parseInt(count)
      : args[0]
      ? parseInt(args[0])
      : 1;
    count = Math.max(1, count);
    if (
      global.db.data.users[m.sender].money >= count * 1 &&
      global.db.data.users[m.mentionedJid[0]].money >= count * 1
    ) {
      conn.casino[m.chat] = {
        player_1: m.sender,
        player_2: m.mentionedJid[0],
        count: count,
      };
      let caption = ` _*CASINO - DUEL*_ 
         
  @${m.sender.split`@`[0]} 
       _*MENANTANG*_
  @${m.mentionedJid[0].split`@`[0]} 
  
  Untuk Bermain Casino Dengan Taruhan ${count}
  
  Ketik Tombol Di Bawah Untuk Terima Atau Totak
  Atau Ketik Terima/Tolak`;
      conn.reply(
        m.chat,
        caption + "\n\n" + "terima" + "\n" + "tolak",
        m,
        { mentions: [m.sender, m.mentionedJid[0]] }
      );
    } else {
      if (global.db.data.users[m.sender].money <= count)
        return m.reply(
          "Money kamu tidak mencukupi untuk Casino silahkan *.claim* terlebih dahulu!"
        );
      if (global.db.data.users[m.mentionedJid[0]].money <= count)
        return m.reply(
          "Money lawan kamu tidak mencukupi untuk Casino silahkan suruh lawan kamu *.claim* terlebih dahulu!"
        );
    }
  };
  
  handler.help = ["casino <jumlah> @lawan"];
  handler.group = true;
  handler.tags = ["rpg"];
  handler.command = /^((casino|csn)pvp|duel)$/i;
  
  export default handler;
  
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }