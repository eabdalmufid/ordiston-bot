let handler = async (m, { conn, usedPrefix }) => {
    try {
      const timeToWait = 300000;
      const currentTime = new Date();
      const timeSinceLastAdventure = currentTime - global.db.data.users[m.sender].lastadventure;
      const timeLeft = timeToWait - timeSinceLastAdventure;
      const timers = clockString(timeLeft);
  
      const user = global.db.data.users[m.sender];
      const { healt, armor, rubah, kuda, kucing, anjing } = user;
  
      if (healt <= 79) {
        return conn.reply(m.chat, `⚠️ *Minimal health harus 80* untuk berpetualang. Beli obat dengan ${usedPrefix}shop buy potion <jumlah> dan gunakan dengan ${usedPrefix}use potion <jumlah>. Untuk mendapatkan money dan potion gratis ketik *${usedPrefix}claim*`, m);
      }
  
      if (timeSinceLastAdventure <= timeToWait) {
        return conn.reply(m.chat, `⌛ *Anda sudah berpetualang*, silahkan menunggu sampai *${timers}* lagi`, m);
      }
  
      const health = Math.floor(Math.random() * 101);
      const kucingHealth = [0, 5, 10, 15, 21, 30][kucing] || 30;
      const armorHealth = [0, 5, 10, 15, 21, 30][armor] || 30;
      const totalHealth = health > 60 ? health - kucingHealth - armorHealth : health;
      const exp = Math.floor(Math.random() * 400) + kuda * 70;
      const money = Math.floor(Math.random() * 400) + anjing * 70;
      const potion = Math.floor(Math.random() * 5) + 1; // Jumlah potion ditingkatkan menjadi 1 hingga 5
      const diamond = [pickRandom(['0', '1']), pickRandom(['0', '1']), pickRandom(['0', '1', '2']), pickRandom(['0', '1', '2']), pickRandom(['0', '1', '1', '2', '1', '1', '0']), pickRandom(['0', '0', '1', '2', '2', '1', '1', '0'])][rubah] || 0;
      const common = Math.floor(Math.random() * 5) + 1; // Jumlah common crate ditingkatkan menjadi 1 hingga 5
      const uncommon = Math.floor(Math.random() * 3) + 1; // Jumlah uncommon crate ditingkatkan menjadi 1 hingga 3
      const mythic = pickRandom(['1', '0', '0', '1']);
      const legendary = pickRandom(['1', '0', '0', '0']);
      const sampah = Math.floor(Math.random() * 300) + 100; // Jumlah sampah ditingkatkan menjadi 100 hingga 399
      const wood = Math.floor(Math.random() * 3) + 1; // Jumlah wood ditingkatkan menjadi 1 hingga 3
      const rock = Math.floor(Math.random() * 2) + 1; // Jumlah rock ditingkatkan menjadi 1 hingga 2
      const string = Math.floor(Math.random() * 2) + 1; // Jumlah tali ditingkatkan menjadi 1 hingga 2
      const iron = Math.floor(Math.random() * 2) + 1; // Jumlah iron ditingkatkan menjadi 1 hingga 2
  
      user.healt -= health;
      user.exp += exp;
      user.money += money;
      user.potion += potion;
      user.diamond += diamond;
      user.common += common;
      user.uncommon += uncommon;
      user.sampah += sampah;
      user.iron += iron;
      user.rock += rock;
      user.wood += wood;
      user.string += string;
      user.lastadventure = currentTime;
  
      const str = `
  *${rpg.emoticon('healt')} Nyawa berkurang -${health}* karena Kamu berpetualang sampai *${pickRandom(['🌏 Ujung dunia', '🌌 Luar angkasa', '🗺️ Dunia mimpi', '🚀 Mars', '🌚 Bulan', '🪐 Pluto', '🌞 Matahari', '❤️ Hatinya dia', '...'])}* dan mendapatkan
  *${rpg.emoticon('exp')} Exp:* ${exp}
  *${rpg.emoticon('money')} Uang:* ${money}
  *${rpg.emoticon('sampah')} Sampah:* ${sampah}${potion === 0 ? '' : `\n*${rpg.emoticon('potion')} Potion:* ${potion}`}${iron === 0 ? '' : `\n*${rpg.emoticon('iron')} Iron:* ${iron}`}${wood === 0 ? '' : `\n*${rpg.emoticon('wood')} Wood:* ${wood}`}${rock === 0 ? '' : `\n*${rpg.emoticon('rock')} Rock:* ${rock}`}${string === 0 ? '' : `\n*${rpg.emoticon('string')} Tali:* ${string}`}${diamond === 0 ? '' : `\n*${rpg.emoticon('diamond')} Diamond:* ${diamond}`}${common === 0 ? '' : `\n*${rpg.emoticon('common')} Common Crate:* ${common}`}${uncommon === 0 ? '' : `\n*${rpg.emoticon('uncommon')} Uncommon Crate:* ${uncommon}`}`;
  
      conn.reply(m.chat, str, m);
  
      if (mythic > 0) {
        user.mythic += mythic;
        conn.reply(m.chat, `🎉 *Selamat!*\nAnda mendapatkan item *Rare* yaitu *${mythic}* ${rpg.emoticon('mythic')} Mythic Crate`, m);
      }
  
      if (legendary > 0) {
        user.legendary += legendary;
        conn.reply(m.chat, `🎉 *Selamat!*\nAnda mendapatkan item *Epic* yaitu *${legendary}* ${rpg.emoticon('legendary')} Legendary Crate`, m);
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  
  handler.help = ['petualang', 'work'];
  handler.tags = ['rpg'];
  handler.command = /^(petualang|work)$/i;
  
  handler.fail = null;
  handler.register = false;
  handler.group = true;
  export default handler;
  
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  
function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    console.log({ ms, d, h, m, s })
    return [d, h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}