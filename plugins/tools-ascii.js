import fetch from 'node-fetch';

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    const input_data = await FONT();

    let [urutan, tema] = text.split("|")
    if (!tema) return m.reply("Input query!\n*Example:*\n.ascii [nomor]|[query]")

    await m.reply(wait)
    try {
        let data = Object.keys(input_data).map(title => ({
            title: input_data[title]
        }));
        if (!urutan) return m.reply("Input query!\n*Example:*\n.ascii [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.ascii [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.ascii [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1].title

        const openAIResponse = await ASCII(out, tema);

        if (openAIResponse) {
            await conn.reply(m.chat, openAIResponse, m, adReplyS);
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["ascii *[nomor]|[query]*"]
handler.tags = ["ai"]
handler.command = /^(ascii)$/i
export default handler

async function ASCII(font, message) {
    const response = await fetch(`https://api.338.rocks/ascii/?message=${message}&font=${font}`);
    const result = await response.json();
    const completion = result.data;
    return completion;
}
async function FONT() {
    const response = await fetch(`https://api.338.rocks/ascii/?message=message&font=`);
    const result = await response.json();
    const completion = result.availableFonts;
    return completion;
}