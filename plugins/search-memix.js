import fetch from "node-fetch"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let [tema, urutan, pesan] = text.split(/[^\w\s]/g)
    if (!tema) return m.reply("Input query!\n*Example:*\n.memix [tema]|[angka]|[teks]")
    if (!urutan) return m.reply("Input angka!\n*Example:*\n.memix [tema]|[angka]|[teks]")
    if (isNaN(urutan)) return m.reply("Input angka saja!\n*Example:*\n.memix [tema]|[angka]|[teks]")
    if (!pesan) return m.reply("Input pesan!\n*Example:*\n.memix [tema]|[angka]|[teks]")
    await m.reply(wait)
    try {
        let data = await getTemplateImageUrl(tema, urutan, pesan)
        let regex = /^https:\/\/cdn\.memix\.com/;
        if (regex.test(data.url)) {
            await conn.sendMessage(m.chat, {
                sticker: {
                    url: data.url
                },
                thumbnail: await (await conn.getFile(data.url)).data,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 1,
                        mediaUrl: null,
                        title: data.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                        body: m.name,
                        sourceUrl: null,
                        thumbnail: await (await conn.getFile(data.url)).data
                    }
                }
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })
        } else {
            await m.reply("Input query!\n*Example:*\n.memix [tema]|[angka]|[teks]\n\n*Pilih angka yg ada*\n" + data)
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["memix *[tema]|[angka]|[teks]*"]
handler.tags = ["internet"]
handler.command = /^(memix)$/i
export default handler

async function getTemplateImageUrl(input, number, text) {
    try {
        const data = await (await fetch("https://api.memix.com/v1/templates/search?q=" + input)).json();

        if (number > data.templates.length) {
            return data.templates.map((item, index) => `*${index + 1}.* ${item.id}`).join("\n");
        } else {
            const selectedId = data.templates[number - 1].id;
            return {
                url: `https://cdn.memix.com/memix-${selectedId}.webp?text=${encodeURIComponent(text)}`,
                name: selectedId
            };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return "Error fetching data.";
    }
}