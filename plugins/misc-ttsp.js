import fetch from "node-fetch";
let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    let query = "input text\nEx. .ttsp hello world\n<command> <tex>"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    let urut = text.split`|`
    let one = urut[0]
    let two = urut[1]
    let three = urut[2]
    let lis = [
        "Lotte",
        "Maxim",
        "Ayanda",
        "Salli",
        "Ola",
        "Arthur",
        "Ida",
        "Tomoko",
        "Remi",
        "Geraint",
        "Miguel",
        "Elin",
        "Giorgio",
        "Marlene",
        "Ines",
        "Kajal",
        "Zhiyu",
        "Zeina",
        "Suvi",
        "Karl",
        "Gwyneth",
        "Joanna",
        "Lucia",
        "Cristiano",
        "Astrid",
        "Andres",
        "Vicki",
        "Mia",
        "Vitoria",
        "Bianca",
        "Chantal",
        "Raveena",
        "Daniel",
        "Amy",
        "Liam",
        "Ruth",
        "Kevin",
        "Brian",
        "Russell",
        "Aria",
        "Matthew",
        "Aditi",
        "Dora",
        "Enrique",
        "Hans",
        "Hiujin",
        "Carmen",
        "Ivy",
        "Ewa",
        "Maja",
        "Gabrielle",
        "Nicole",
        "Filiz",
        "Camila",
        "Jacek",
        "Thiago",
        "Justin",
        "Celine",
        "Kazuha",
        "Kendra",
        "Arlet",
        "Ricardo",
        "Mads",
        "Hannah",
        "Mathieu",
        "Lea",
        "Sergio",
        "Hala",
        "Tatyana",
        "Penelope",
        "Naja",
        "Olivia",
        "Ruben",
        "Laura",
        "Takumi",
        "Mizuki",
        "Carla",
        "Conchita",
        "Jan",
        "Kimberly",
        "Liv",
        "Adriano",
        "Lupe",
        "Joey",
        "Pedro",
        "Seoyeon",
        "Emma",
        "Stephen"
    ];
    if (command == "ttsp") {
        let listSections = []
        Object.keys(lis).map((v, index) => {
            listSections.push(["Model [ " + ++index + " ]", [
                [lis[v], usedPrefix + command + "get " + lis[v] + "|" + text, "➥"]
            ]])
        })
        return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
    }
    if (command == "ttspget") {
        try {
            let res = `https://api.pawan.krd/tts?text=${encodeURIComponent(two)}&voice=${one}`
            await conn.sendMessage(m.chat, {
                audio: await(await conn.getFile(res)).data,
                mimetype: 'audio/mp4',
                ptt: true,
                waveform: [0, 100, 0, 100, 0]
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })
        } catch (e) {
            await m.reply(eror)
        }
    }
    if (command == "ttsplist") {
        let res = lis.map((v, index) => ++index + ". " + v).join("\n")
        let nah = `${htki} *L I S T* ${htka}
*Example* ${usedPrefix + command} Brian|halo

${res}`
        await m.reply(nah)
    }
}
handler.help = ["ttsp"]
handler.tags = ["misc"]
handler.command = /^(ttsp|ttspget|ttsplist)$/i
export default handler