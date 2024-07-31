// create by ArifzynXD

export async function before(m) {
    this.casino = this.casino ? this.casino : {};
    if (m.isGroup && m.chat in this.casino) {
      if (
        m.sender == this.casino[m.chat].player_2 &&
        /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(
          m.text
        )
      ) {
        if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(m.text)) {
          this.sendMessage(
            m.chat,
            {
              text: `@${
                player_2.split`@`[0]
              } menolak bermain casino, casino dibatalkan`,
              mentions: [player_2],
            },
            { quoted: m, ephemeralExpiration: ephemeral }
          );
          delete this.casino[m.chat];
          return !0;
        }
        global.db.data.users[this.casino[m.chat].player_1].money -=
          this.casino[m.chat].count * 1;
        global.db.data.users[this.casino[m.chat].player_2].money -=
          this.casino[m.chat].count * 1;
        let randomplayer_1 = `${Math.floor(Math.random() * 10)}`.trim() * 1;
        let randomplayer_2 = `${Math.floor(Math.random() * 10)}`.trim() * 1;
        let sya = await conn.getName(this.casino[m.chat].player_1);
        let lwn = await conn.getName(this.casino[m.chat].player_2);
        if (randomplayer_1 > randomplayer_2) {
          let caption = `💰 *C A S I N O - D U E L* 💰\n\n${htjava} @${
            this.casino[m.chat].player_1.split("@")[0]
          } - [${sya}]\n┗┅⭑ ${randomplayer_1} Point\n${htjava} @${
            this.casino[m.chat].player_2.split("@")[0]
          } - [${lwn}]\n┗┅⭑ ${randomplayer_2} Point\n\n@${
            this.casino[m.chat].player_1.split("@")[0]
          } WIN \nKamu menang dan mendapatkan ${
            this.casino[m.chat].count * 2
          } Money`.trim();
          this.reply(m.chat, caption, m, {
            mentions: this.parseMention(caption),
          });
          global.db.data.users[this.casino[m.chat].player_1].money +=
            this.casino[m.chat].count * 2;
          delete this.casino[m.chat];
        } else if (randomplayer_1 < randomplayer_2) {
          let caption = `💰 *C A S I N O - D U E L* 💰\n\n${htjava} @${
            this.casino[m.chat].player_1.split("@")[0]
          } - [${sya}]\n┗┅⭑ ${randomplayer_1} Point\n${htjava} @${
            this.casino[m.chat].player_2.split("@")[0]
          } - [${lwn}]\n┗┅⭑ ${randomplayer_2} Point\n\n@${
            this.casino[m.chat].player_2.split("@")[0]
          } WIN \nKamu menang dan mendapatkan ${
            this.casino[m.chat].count * 2
          } Money`.trim();
          this.reply(m.chat, caption, m, {
            mentions: this.parseMention(caption),
          });
          global.db.data.users[this.casino[m.chat].player_2].money +=
            this.casino[m.chat].count * 2;
          delete this.casino[m.chat];
        } else {
          let caption = `💰 *C A S I N O - D U E L* 💰\n\n${htjava} @${
            this.casino[m.chat].player_1.split("@")[0]
          } - [${sya}]\n┗┅⭑ \n${randomplayer_1} Point\n${htjava} @${
            this.casino[m.chat].player_2.split("@")[0]
          } - [${lwn}]\n┗┅⭑ ${randomplayer_2} Point\n\nKalian berdua seri dan ${
            this.casino[m.chat].count
          } Money dikembalikan`.trim();
          this.reply(m.chat, caption, m, {
            mentions: this.parseMention(caption),
          });
          global.db.data.users[this.casino[m.chat].player_1].money >=
            this.casino[m.chat].count * 1;
          global.db.data.users[this.casino[m.chat].player_2].money >=
            this.casino[m.chat].count * 1;
          delete this.casino[m.chat];
        }
      }
    }
  }