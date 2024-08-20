import fetch from "node-fetch"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else return m.reply("Input Teks")
    await m.reply(wait)
    try {
        let res = await GoogleBard(text)
        await m.reply(res.join(''));
    } catch (e) {
            try {
        let res = await GoogleBardApi(text)
        await m.reply(res);
    } catch (e) {
            await m.reply(eror);
            }
            }
}
handler.help = ["bard"]
handler.tags = ["internet"]
handler.command = /^bard$/i

export default handler

/* New Line */
async function GoogleBard(query) {
  const COOKIE_KEY = "awhDhy-7HHtxxRztpGSA13d3-DxQUe_b_mtNK4qzwkdnP85eNsq5RPSY5lvXLn8Wm7gKww.";
  const psidCookie = '__Secure-1PSID=' + COOKIE_KEY;
  const headers = {
    "Host": "bard.google.com",
    "X-Same-Domain": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Origin": "https://bard.google.com",
    "Referer": "https://bard.google.com",
    'Cookie': psidCookie
  };

  const bardRes = await fetch("https://bard.google.com/", { method: 'get', headers });
  const bardText = await bardRes.text();

  const [snlM0e, blValue] = [bardText.match(/"SNlM0e":"(.*?)"/)?.[1], bardText.match(/"cfb2h":"(.*?)"/)?.[1]];

  const bodyData = `f.req=[null,"[[\\"${encodeURIComponent(query)}\\"],null,[\\"\\",\\"\\",\\"\\"]]\"]&at=${snlM0e}`;
  const response = await fetch(`https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${blValue}&_reqid=229189&rt=c`, { method: 'post', headers, body: bodyData });
  const answer = JSON.parse(JSON.parse((await response.text()).split("\n").reduce((a, b) => (a.length > b.length ? a : b), ""))[0][2])[4][0][1];

  return answer;
};

async function GoogleBardApi(query) {
  const headers = {
    "Host": "api.azz.biz.id",
    "X-Same-Domain": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Origin": "https://api.azz.biz.id",
    "Referer": "https://api.azz.biz.id"
  };

  const bardRes = await fetch(`https://api.azz.biz.id/api/bard?q=${query}&key=global`, { method: 'get', headers });
  const bardText = await bardRes.json();
  return bardText.respon;
};