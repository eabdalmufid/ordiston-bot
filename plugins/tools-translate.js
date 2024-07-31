import { translate } from '@vitalets/google-translate-api'

let handler = async (m, {
    args,
    usedPrefix,
    command
}) => {
    let lang, text
    if (args.length >= 2) {
        lang = args[0] ? args[0] : "id", text = args.slice(1).join(" ")
    } else if (m.quoted && m.quoted.text) {
        lang = args[0] ? args[0] : "id", text = m.quoted.text
    } else throw `Ex: ${usedPrefix + command} id hello i am robot`
    try {
        const prompt = (text.trim());
        let res = await translate(prompt, {
            to: lang,
            autoCorrect: true
        }).catch(_ => null)
        if (!res) throw "Error : Bahasa *" + lang + "* Tidak Support"

        let Detect = (res.raw.src.toUpperCase() ? res.raw.src.toUpperCase() : "US")
        let ToLang = (lang.toUpperCase())
        let caption = `*[ Terdeteksi ]*
- ${Detect}

*[ Ke Bahasa ]*
- ${ToLang}

*[ Terjemahan ]*
- ${res.text}
`
        await m.reply(caption, null, m.mentionedJid ? {
        mentions: conn.parseMention(caption)
    } : {})
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["translate2"].map(v => v + " <lang> <teks>")
handler.tags = ["tools"]
handler.command = /^(t(erjemahkan|ransl(ate|et))2|t(erjemah|r)2|apanih2)$/i

export default handler