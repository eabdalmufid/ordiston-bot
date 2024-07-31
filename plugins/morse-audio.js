import fetch from "node-fetch";
let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
let query = "input text\nEx. .vnmorse hello world\n<command> <tex>"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
        try {
        let res = await Morse(text)
        await conn.sendMessage(m.chat, {
            audio: res,
            seconds: fsizedoc,
            ptt: true,
            mimetype: "audio/mpeg",
            fileName: "vn.mp3",
            waveform: [100, 0, 100, 0, 100, 0, 100]
        }, {
            quoted: m,
            ephemeralExpiration: ephemeral
        })
        } catch (e) {
        await m.reply(wait)
        }
}
handler.help = ["vnmorse"]
handler.tags = ["misc"]
handler.command = /^(vnmorse)$/i
export default handler

async function Morse(input) {
let res = await fetch('http://api.funtranslations.com/translate/morse/audio?text=' + input + '&speed=0&tone=0', {
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json'
  }
});
let su = await res.json()
let wavUrl = su.contents.translated.audio
let buffer = Buffer.from(
  wavUrl.split('base64,')[1],
  'base64'
)
return buffer
}