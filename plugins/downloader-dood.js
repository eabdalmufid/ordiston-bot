let handler = async (m, { conn, command, usedPrefix, args, text }) => {
  if (!args[0]) throw `*Use example:* ${usedPrefix}${command} https://dood.pm/d/inawx9akk1yu?fbclid=IwAR1qg-d6FyEPzP68oyq7Ff3_JkzA61D1ZVXwaD7kwc-CfFD9TmT_6fz--b8`;
  if (!(text.includes("http://") || text.includes("https://"))) return m.reply('Url invalid, please input a valid url. Try with add http:// or https://');

  try {
    const res = await dood(args[0]);
    let ana = res.data;
    await (await import("axios")).default
      .get(ana.direct_link, {
        headers: { referer: res.referer },
        responseType: "arraybuffer",
      })
      .then((a) => conn.sendMessage(m.chat, { video: Buffer.from(a["data"]) }));
  } catch {
    m.reply(eror)
  }
};
handler.help = ["dood"];
handler.tags = ["dood"];
handler.command = /^dood$/i;
handler.owner = true;

export default handler;

async function dood(URL) {
  const axios = await (await import("axios")).default;
  const data = {
    app: "com.sec.android.app.sbrowser",
    duration: "3799ms",
    headers: {
      Host: "api.hunternblz.com",
      origin: "https://teradood.hunternblz.com",
      referer: "https://teradood.hunternblz.com/",
    },
    method: "POST",
    url: "https://api.hunternblz.com/doodstream",
  };

  const params = new URLSearchParams();
  params.append("pesan", "API INI BEBAS DIPAKAI");
  params.append("url", URL);

  const { data: d } = await axios
    .post(data.url, params, { headers: data.headers })
    .catch((e) => e?.response);
  return d;
}
