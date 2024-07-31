import { join } from 'path'
import { promises } from 'fs'

let handler = async (m, { args, usedPrefix, __dirname }) => {
    let imgr = flaaa
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let user = global.db.data.users[m.sender]
    if (user.health >= 100) return m.reply(`
Your ❤️health is full!
`.trim())
    const heal = 40 + (user.cat * 4)
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / heal)))) * 1
    let low = `ʏᴏᴜ ɴᴇᴇᴅ ᴛᴏ ʙᴜʏ ${count - user.potion} ᴍᴏʀᴇ 🥤ᴩᴏᴛɪᴏɴ ᴛᴏ ʜᴇᴀʟ.
ʏᴏᴜ'ᴠᴇ ${user.potion} 🥤ᴩᴏᴛɪᴏɴ ɪɴ ʙᴀɢ.
⛊━─┈────────┈─━⛊
💁🏻‍♂ ᴛɪᴩ :
ʙᴜʏ🥤ᴩᴏᴛɪᴏɴ
`.trim()
    if (user.potion < count) return conn.sendFthumb(m.chat, `–『 INSUFFICIENT POTION 』–`, low, imgr + 'lowpotion', '', m)
    //conn.sendMessage(m.chat, { image: { url: imgr + 'lowpotion' }, caption: low }, { quoted: fliveLocc })
    user.potion -= count * 1
    user.health += heal * count
    let full = `sᴜᴄᴄᴇssғᴜʟʟʏ ${count} 🥤ᴩᴏᴛɪᴏɴ ᴜsᴇ ᴛᴏ ʀᴇᴄᴏᴠᴇʀ ʜᴇᴀʟᴛʜ.`
    conn.sendFthumb(m.chat, `━┈━┈━『 FULL HEALTH 』━┈━┈━`, full, imgr + 'fullhealth', '', m)
    //conn.sendMessage(m.chat, { image: { url: imgr + 'fullhealth' }, caption: full }, { quoted: fliveLocc })
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal)$/i

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}