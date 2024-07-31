import fetch from "node-fetch";
let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let lister = [
        "list",
        "get"
    ]
let voicer = [
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
            ]
    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(/[^\w\s]/g)
    if (!lister.includes(feature)) return m.reply("*Example:*\n.ttsv get.Emma.halo\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join('\n'))

    if (lister.includes(feature)) {
        if (feature == "get") {
            if (!voicer.includes(inputs)) return m.reply("*Example:*\n.ttsv get.Emma.halo\n\n*Pilih type yg ada*\n" + voicer.map((v, index) => "  ○ " + v).join('\n'))
            if (!inputs_) return m.reply("Input text")
            try {
            let res = await getAudioURLs(inputs, inputs_)
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
        if (feature == "list") {
            await m.reply("*Example:*\n.ttsv get.Emma.halo\n\n*Pilih type yg ada*\n" + voicer.map((v, index) => "  ○ " + v).join('\n'))
        }
    }

}
handler.help = ["ttsv type query"]
handler.tags = ["internet"]
handler.command = /^(ttsv)$/i
export default handler

// keys must be lowercase
const CUSTOM_WORD_MAP = {
    blgsteve: "B L G Steve",
    bexchat: "Bex Chat",
    specialcei: "Special K",
    cei: "K",
};

function replaceWordsIfNeeded(text) {
    return text
        .split(" ")
        .map((token) => {
            if (
                Object.prototype.hasOwnProperty.call(
                    CUSTOM_WORD_MAP,
                    token.toLowerCase()
                )
            ) {
                return CUSTOM_WORD_MAP[token.toLowerCase()];
            }

            return token;
        })
        .join(" ");
}

async function getAudioURL({
    voice,
    text
}) {
    const response = await fetch("https://streamlabs.com/polly/speak", {
        method: "POST",
        body: JSON.stringify({
            voice,
            text,
        }),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });

    if (response.status !== 200) {
        throw new Error(`Something went wrong (${response.statusText})`);
    }

    const json = await response.json();

    if (json.error) {
        throw new Error(json.error);
    }

    if (!json.success) {
        throw new Error(
            "Something went wrong getting text-to-speech audio URL"
        );
    }

    return json.speak_url;
}

async function getAudioURLs(voice, text) {
    return getAudioURL({
        voice: voice,
        text: replaceWordsIfNeeded(text),
    });
}