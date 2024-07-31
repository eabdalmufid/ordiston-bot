import fetch from 'node-fetch';

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
    
    await m.reply(wait)
    try {
        const openAIResponse = await fetchAnimeData(media);

        if (openAIResponse) {
            const result = openAIResponse;
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: result
                },
                caption: `Nih effect *photo-to-anime* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            });
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["jadianime"].map(v => v + " (Balas foto)")
handler.tags = ["tools"]
handler.command = /^(jadianime)$/i
handler.limit = true
export default handler

async function fetchAnimeData(imageBuffer) {
  const api = "https://api.taoanhdep.com/public/anime.php";
  const base64String = imageBuffer.toString('base64');
  const body = new URLSearchParams();
  body.set('image', base64String);

  const response = await fetch(api, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    method: "POST",
  });

  const data = await response.json();
  return data.img;
}