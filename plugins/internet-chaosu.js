import fetch from "node-fetch";

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
    } else throw "Input Teks"
    try {
        await m.reply(wait)
        let res = await ChatGpt(text)
        await m.reply(res)
    } catch (e) {
        throw eror
    }
}
handler.help = ["chaosu"]
handler.tags = ["internet"]
handler.command = /^chaosu$/i

export default handler

/* New Line */
async function ChatGpt(input) {
    let gg = await fetch("https://chaosu.xyz/chat.php?q=" + input)
    let ff = await gg.text()
    let data = JSON.parse(JSON.stringify(ff))

    // Membuat variabel baru dengan nilai berupa objek kosong
    let combinedData = {};

    // Memisahkan teks menjadi baris-baris
    let lines = data.split("\n");

    // Looping melalui setiap baris dan mengambil nilai content dari objek
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("content")) {
            let obj = JSON.parse(lines[i].slice(6));
            combinedData["content"] = combinedData["content"] + obj["content"];
        }
    }

    // Mencetak hasil penggabungan konten
    return combinedData["content"].slice(9)
}