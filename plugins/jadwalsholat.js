import {
    jadwalsholat
} from '@bochilteam/scraper'

let handler = async (m, {
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw `Use example ${usedPrefix}${command} semarang\nAnd ${usedPrefix}${command} semarang|15 (for date)`
    var ayat = text.split('|')

    if (ayat[0] && ayat[1]) {
        try {
            let resu = await jadwalsholat(ayat[0])
            m.reply(wait)
            m.reply(`
${htki} Jadwal Sholat ${htka}

${Object.entries(resu.list[--ayat[1]]).map(([name, data]) => `Sholat *${name}* : ${data}`).join('\n').trim()}
`.trim())
        } catch (e) {
            m.reply(eror)
        }
    } else {
        try {
            let res = await jadwalsholat(text)
            m.reply(wait)
            m.reply(`
${htki} Jadwal Sholat ${htka}

${Object.entries(res.today).map(([name, data]) => `Sholat *${name}* : ${data}`).join('\n').trim()}
`.trim())
        } catch (e) {
            m.reply(eror)
        }
    }

}
handler.help = ['salat <daerah>']
handler.tags = ['quran']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i

export default handler
