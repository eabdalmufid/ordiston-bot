import {
    Aki
} from 'aki-api';

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    conn.akinatorv2 = conn.akinatorv2 || {};
    if (text == 'end') {
        if (!conn.akinatorv2[m.sender]) return m.reply('Anda tidak sedang dalam sesi Akinator')
        delete conn.akinatorv2[m.sender]
        m.reply('Berhasil keluar dari sesi Akinator.')
    } else if (text == 'start') {
        if (conn.akinatorv2[m.sender]) return conn.reply(m.chat, 'Anda masih berada dalam sesi Akinator', conn.akinatorv2[m.sender].msg)
        try {
            conn.akinatorv2[m.sender] = new Aki({
                region: 'id',
                childMode: false,
                proxy: undefined
            });
            await conn.akinatorv2[m.sender].start();

            let txt = `🎮 *Akinator* 🎮\n\n@${m.sender.split('@')[0]}\n${conn.akinatorv2[m.sender].question}\n\n`
            txt += '0 - Ya\n'
            txt += '1 - Tidak\n'
            txt += '2 - Saya Tidak Tau\n'
            txt += '3 - Mungkin\n'
            txt += '4 - Mungkin Tidak\n\n'
            txt += `*${usedPrefix + command} end* untuk keluar dari sesi Akinator`
            let soal = await conn.sendMessage(m.chat, {
                text: txt,
                mentions: [m.sender]
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            })
            conn.akinatorv2[m.sender].msg = soal
        } catch (e) {
            console.log(e)
            await m.reply(eror)
        }
    } else {
        m.reply('Contoh: .akinatorv2 start/end')
    }
}

handler.menu = ['akinatorv2']
handler.tags = ['game']
handler.command = /^(akinatorv2)$/i

handler.limit = true

export default handler