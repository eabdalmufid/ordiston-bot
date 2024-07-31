//Harga Build
let rumahsakit = 500
let benteng = 700
let camptroops = 900
let pertanian = 700
let pertambangan = 600

let handler = async (m, {
    conn,
    command,
    args,
    usedPrefix,
    DevMode
}) => {

    let type = (args[0] || '').toLowerCase()
    let upgrade = (args[0] || '').toLowerCase()

    let user = global.db.data.users[m.sender]

    const sections = [{
        title: '🚜 List Contruction For kingdoms facility',
        rows: [{
                title: "🏯 Benteng",
                rowId: usedPrefix + command + ' benteng'
            },
            {
                title: "🌾 Pertanian",
                rowId: usedPrefix + command + ' pertanian'
            },
            {
                title: "🏕 camptroop",
                rowId: usedPrefix + command + ' camptroop'
            },
            {
                title: "⚒️ Pertambangan",
                rowId: usedPrefix + command + ' pertambangan'
            },
            {
                title: "🏥 Rumah Sakit",
                rowId: usedPrefix + command + ' hospital'
            }
        ]
    }]

    const listMessage = {
        text: `⚡ Silakan pilih build di bawah...`,
        footer: global.wm,
        title: `⎔───「 ${command} 」───⎔`,
        buttonText: `Klik Disini`,
        sections
    }

    //
    try {
        if (/build|bangun/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) {
                case 'benteng':
                case 'fortress':
                    if (global.db.data.users[m.sender].rock > benteng * count) {

                        global.db.data.users[m.sender].rock >= benteng * count
                        global.db.data.users[m.sender].fortress += count * 1
                        global.db.data.users[m.sender].wood -= benteng * count
                        global.db.data.users[m.sender].rock -= benteng * count
                        m.reply(`Berhasil membangun benteng`)
                    } else m.reply(`SDA Kamu tidak cukup untuk membangun benteng yg senilai ${benteng * count } Wood & ${benteng * count} Rock`)
                    break
                case 'pertanian':
                    if (user.rock > pertanian * count) {
                        user.rock >= pertanian * count
                        user.pertanian += count * 1
                        user.wood -= pertanian * count
                        user.rock -= pertanian * count
                        m.reply(`Berhasil membangun pertanian`)
                    } else m.reply(`SDA Kamu tidak cukup untuk membangun pertanian yg senilai ${pertanian * count } Wood & ${pertanian * count} Rock`)
                    break
                case 'camptroops':
                case 'camptroop':
                    if (user.rock > camptroops * count) {
                        user.rock >= camptroops * count
                        user.camptroops += count * 1
                        user.wood -= camptroops * count
                        user.rock -= camptroops * count
                        m.reply(`Berhasil membangun camptoops`)
                    } else m.reply(`SDA Kamu tidak cukup untuk membangun kamp pasukan yg senilai ${camptroops * count } Wood & ${camptroops * count} Rock`)

                    break
                case 'pertambangan':
                    if (user.tambang > pertambangan * count) {
                        user.rock >= pertambangan * count
                        user.tambang += count * 1
                        user.wood -= pertambangan * count
                        user.rock -= pertambangan * count
                        m.reply(`Berhasil membangun pertambangan`)
                    } else m.reply(`SDA Kamu tidak cukup untuk membangun pertanian yg senilai ${pertambangan * count } Wood & ${pertambangan * count} Rock`)

                    break
                case 'rumahsakit':
                case 'hospital':
                    if (user.rumahsakit > rumahsakit * count) {
                        user.rumahsakit += count * 1
                        user.wood -= rumahsakit * count
                        user.rock -= rumahsakit * count
                        m.reply(`Berhasil membangun hospital`)
                    } else m.reply(`SDA Kamu tidak cukup untuk membangun pertanian yg senilai ${rumahsakit * count } Wood & ${rumahsakit * count} Rock`)
                    break

                default:
                    let lister = [
                        "benteng",
                        "pertanian",
                        "camptroop",
                        "pertambangan",
                        "hospital"
                      ]
                      if (!lister.includes(args[0])) return m.reply("*Example:*\n.build benteng\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))
                    //return conn.sendMessage(m.chat, listMessage, { quoted: fakes })
            }
        }
    } catch (e) {
        conn.reply(m.chat, 'Error', m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, 'shop.js error\nNo: *' + m.sender.split`@` [0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
            }
        }
    }
}

handler.help = ['build <args>', 'upgrade <sell|buy> <args>']
handler.tags = ['rpg']
handler.owner = false
handler.command = /^(build|bangun|upgrade|upgd)$/i
export default handler