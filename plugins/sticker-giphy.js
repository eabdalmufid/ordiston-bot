import fetch from "node-fetch"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let [tema, urutan] = text.split(/[^\w\s]/g)
    if (!tema) return m.reply("Input query!\n*Example:*\n.giphy [tema]|[angka]")
    if (!urutan) return m.reply("Input angka!\n*Example:*\n.giphy [tema]|[angka]")
    if (isNaN(urutan)) return m.reply("Input angka saja!\n*Example:*\n.giphy [tema]|[angka]")
    await m.reply(wait)
    try {
        let json = await getTemplateImageUrl(tema, urutan)
        let data = json.one
        let all = json.all
        if (urutan > all.length) return m.reply("Input query!\n*Example:*\n.giphy [tema]|[angka]\n\n*Pilih angka yg ada*\n" + all.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isValidURL(data.images.original.mp4)) {
            let caption = `🔍 *[ HASIL ]*

📌 *Tipe:* ${data.type}
🆔 *ID:* ${data.id}
🌐 *URL:* ${data.url}
🔗 *Bitly URL:* ${data.bitly_url}
👤 *Username:* ${data.username}
📰 *Judul:* ${data.title}`
            await conn.sendMessage(m.chat, {
                video: {
                    url: data.images.original.mp4
                },
                caption: caption,
                gifPlayback: true,
                gifAttribution: 1
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["giphy *[tema]|[angka]*"]
handler.tags = ["sticker"]
handler.command = /^(giphy)$/i
export default handler

function isValidURL(message) {
    const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/;
    return urlPattern.test(message);
}

async function getTemplateImageUrl(input, number) {
    try {
        const data = await (await fetch(`https://api.giphy.com/v1/gifs/search?q=${input}&api_key=SdX60eTdyvdo0aAyJMQ5u87Qh7mTz7bG`)).json();
        const selectedId = data.data[number - 1];
        return {
            one: selectedId,
            all: data.data
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return "Error fetching data.";
    }
}