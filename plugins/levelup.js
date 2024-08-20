import {
    canLevelUp,
    xpRange
} from "../lib/levelling.js"
import {
    levelup
} from "../lib/canvas.js"
import canvafy from "canvafy"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let {
            min,
            xp,
            max
        } = xpRange(user.level, global.multiplier)
        throw `
Level ${user.level} 📊
*${user.exp - min} / ${xp}*
Kurang *${max - user.exp}* lagi! ✨
`.trim()
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let teks = `Selamat ${conn.getName(m.sender)} naik 🧬level\n.             ${user.role}`
        let str = `Selamat ${conn.getName(m.sender)} naik 🧬level\n.             ${user.role}

*🎉 C O N G R A T S 🎉*
*${before}* ➔ *${user.level}* [ *${user.role}* ]

• 🧬Level Sebelumnya : ${before}
• 🧬Level Baru : ${user.level}
• Pada Jam : ${new Date().toLocaleString("id-ID")}

*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_
`.trim()

        let {
            min,
            xp,
            max
        } = xpRange(user.level, global.multiplier)
        let pp = await conn.profilePictureUrl(m.sender).catch(_ => "./src/avatar_contact.png")
        
        let exp = user.exp
        let required = xp
        let role = user.role
        let level = user.level
        let disec = m.sender.substring(3, 7)
        let sortedlevel = Object.entries(global.db.data.users).sort((a, b) => b[1].level - a[1].level)
        let userslevel = sortedlevel.map(v => v[0])
        let rank = (userslevel.indexOf(m.sender) + 1)

        let ppuser
        try {
            ppuser = await conn.profilePictureUrl(m.sender, "image")
        } catch {
            ppuser = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxMUXFtd5GrFkxyrU-f5zA2IH8MZ-U-cFKg&usqp=CAU"
        }
       
        try {
        let datab = await canvafyRank(ppuser, user.name, disec.toString(), "online", level, rank, Number(required), Number(exp))
            await conn.sendFthumb(m.chat, 'Ordiston Bot', str, ppuser, '', m)
            //await conn.sendFile(m.chat, datab, "", str, m)
        } catch (e) {
        try {
        let datac = await levelup(teks, user.level)
            await conn.sendFthumb(m.chat, 'Ordiston Bot', str, ppuser, '', m)
            //await conn.sendFile(m.chat, datac, "", str, m)
            } catch (e) {
            await conn.sendFthumb(m.chat, 'Ordiston Bot', str, fla + 'levelup', '', m)
            //await conn.sendFile(m.chat, fla + "levelup", "", str, m)
            }
        }

    }
}
handler.help = ["levelup"]
handler.tags = ["xp"]
handler.command = /^level(|up)$/i
export default handler

async function canvafyRank(avatar, username, discrim, status, level, rank, cxp, rxp) {
    const rankBuffer = await new canvafy.Rank()
    .setAvatar(avatar)
    .setBackground("image", "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0")
    .setUsername(username)
    .setDiscriminator(discrim)
    .setStatus(status)
    .setLevel(level)
    .setRank(rank)
    .setCurrentXp(cxp)
    .setRequiredXp(rxp)
    .build();
    return rankBuffer
    }