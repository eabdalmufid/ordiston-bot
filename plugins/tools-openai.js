/* Recode By Ordiston */

import cp, {
    exec as _exec
} from "child_process"
import {
    promisify
} from "util"
let exec = promisify(_exec).bind(cp)
import fs from "fs"
import fetch from "node-fetch"

let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    let query = "input text\nEx. ." + command + " naruto\n<command> <tex>\n"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    
    
    if (command == "openaiimg") {
        try {
            let res = await fetch(`https://api.lolhuman.xyz/api/dall-e?apikey=${global.lolkey}&text=${encodeURIComponent(text)}`)
                let anu = Buffer.from(await res.arrayBuffer())
                if (Buffer.byteLength(anu) < 22000) throw Error(`[!] Error : Buffer not found.`)
                await conn.sendMessage(m.chat, {
                    image: anu,
                    caption: "*[ Lolhuman AI Dall E ]*\nText:" + text
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                })
        } catch (e) {
            try {
                let url = "https://dalle-mini.amasad.repl.co/gen/" + text
                await conn.sendMessage(m.chat, {
                    image: { url: url },
                    caption: "*[ Dall E Mini ]*\nText:" + text
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                })
            } catch (e) {
                throw eror
            }
        }
    }
    if (command == "openaitext") {
        try {
            let ainya = await (await fetch('https://api.zahwazein.xyz/entertainment/openai?query=' + text + '&apikey=85345ee3d9de')).json()
                if (!ainya) throw eror
                m.reply('*Result:*\n' + ainya.result.message + '\n\n' + '*Made by:* api.zahwazein.xyz')
        } catch (e) {
            try {
                let ai = await (await fetch(global.API('lolhuman', '/api/openai', {
                        text: text
                    }, 'apikey'))).json()
                    if (!ai) throw eror
                    m.reply('*Result:*\n' + ai.result + '\n\n' + '*Made by:* ' + global.API('lolhuman'))
            } catch (e) {
                try {
                    let res = await (await fetch('https://mfarels.my.id/api/openai?text=' + text)).json()
                    if (!res) throw eror
                    m.reply('*Result:*\n' + res.result + '\n\n' + '*Made by:* mfarels.my.id')
                } catch (e) {
                    throw eror
                }
            }
        }
    }
}
handler.command = ["openaitext", "openaiimg"]
handler.tags = ["tools"]

export default handler