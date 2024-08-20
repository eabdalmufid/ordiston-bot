import fetch from "node-fetch"
import cheerio from "cheerio"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let lister = [
        "gc",
        "pc"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) throw "*Example:*\n.caripesan pc|halo\n\n*Pilih type yg ada*\n" + lister.map((v, index) => " ○ " + v).join("\n")

    if (lister.includes(feature)) {
        if (feature == "gc") {
            if (!inputs) throw "Input pesan yang mau di cari"
            // Contoh pemanggilan fungsi
            let chats = Object.entries(await conn.chats)
                .filter(([nama]) => !nama.endsWith('s.whatsapp.net'))
                .map(([nama, isi]) => ({
                    nama,
                    messages: Object.values(isi.messages || {})
                }))
            let msge = chats
                .flatMap(({
                    messages
                }) => Object.values(messages))
                .filter(
                    obj =>
                    obj.message.extendedTextMessage &&
                    obj.message.extendedTextMessage.text.includes(inputs) ||
                    obj.message.conversation &&
                    obj.message.conversation.includes(inputs)
                )
            if (msge) {
                let teks = await Promise.all(
                    msge.map(async (v, index) => {
                        let groupName = await conn.getName(v.key.remoteJid)
                        let participantNumber = "@" + v.key.participant.split("@")[0]
                        return `*[ ${index + 1} ]*\n*Grup:*\n${groupName}\n*Dari:*\n${participantNumber}\n*Pesan:*\n${
        v.message.extendedTextMessage
          ? v.message.extendedTextMessage.text
          : v.message.conversation
      }`.trim()
                    })
                )

                let caption = teks.filter(v => v).join("\n\n________________________\n\n")
                m.reply(caption, m.chat, {
                    mentions: conn.parseMention(caption)
                })
            } else throw "Not found"
        }
        if (feature == "pc") {
            if (!inputs) throw "Input pesan yang mau di cari"
            // Contoh pemanggilan fungsi
            let chats = Object.entries(await conn.chats)
                .filter(([nama]) => !nama.endsWith('g.us'))
                .map(([nama, isi]) => ({
                    nama,
                    messages: Object.values(isi.messages || {})
                }))
            let msge = chats
                .flatMap(({
                    messages
                }) => Object.values(messages))
                .filter(
                    obj =>
                    obj.message.extendedTextMessage &&
                    obj.message.extendedTextMessage.text.includes(inputs) ||
                    obj.message.conversation &&
                    obj.message.conversation.includes(inputs)
                )
            if (msge) {
                let teks = await Promise.all(
                    msge.map(async (v, index) => {
                        let participantNumber = "@" + v.key.remoteJid.split("@")[0]
                        return `*[ ${index + 1} ]*\n*Dari:*\n${participantNumber}\n*Pesan:*\n${
        v.message.extendedTextMessage
          ? v.message.extendedTextMessage.text
          : v.message.conversation
      }`.trim()
                    })
                )

                let caption = teks.filter(v => v).join("\n\n________________________\n\n")
                m.reply(caption, m.chat, {
                    mentions: conn.parseMention(caption)
                })
            } else throw "Not found"
        }

    }
}
handler.help = ["caripesan type query"]
handler.tags = ["search"]
handler.command = /^(caripesan|searchmessage)$/i
export default handler