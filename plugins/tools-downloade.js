import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply("Input query link\nExample: .downloade link")
    await m.reply(wait)
    try {
        let res = await downloade(text);
        let teks = res.medias.map((item, index) => {
            return `🔍 *HASIL ${index + 1}*

📢 *Kualitas:* ${item.quality}
🌐 *Ekstensi:* ${item.extension}
🖼️ *Ukuran Terformat:* ${item.formattedSize}
🔖 *URL:* ${item.url}
`;
        }).filter(v => v).join("\n\n________________________\n\n");
        await m.reply(teks);
    } catch (e) {
        await m.reply(eror)
    }

}
handler.help = ["downloade"]
handler.tags = ["tools"]
handler.command = /^(downloade)$/i
export default handler

/* New Line */
async function downloade(url) {
    try {
        const response = await fetch("https://downloade.co/wp-json/aio-dl/video-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url
            }),
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        throw error;
    }
}