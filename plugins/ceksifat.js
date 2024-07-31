import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    command,
    text
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom());
    let name = await conn.getName(who);

    if (!text) return conn.reply(m.chat, '*Masukan Namamu Udin!*', m);

    const attributes = ['Baik Hati', 'Sombong', 'Pelit', 'Dermawan', 'Rendah Hati', 'Rendah Diri', 'Pemalu', 'Penakut', 'Pengusil', 'Cengeng'];
    const behaviors = ['Rajin', 'Malas', 'Membantu', 'Ngegosip', 'Jail', 'Gak jelas', 'Shoping', 'Chattan sama Doi', 'Chattan di WA karna Jomblo', 'Sedih', 'Kesepian', 'Bahagia'];

    const getRandomValue = () => Math.floor(Math.random() * 100) + 1;
    const getRandomElement = array => array[Math.floor(Math.random() * array.length)];

    let nm = getRandomValue();
    let [a, b, e, f, g, h] = Array.from({
        length: 6
    }, getRandomValue);
    let c = getRandomElement(attributes);
    let d = getRandomElement(behaviors);

    let cksft = `
    *📝 Nama:* ${text}
    *🔶 Ahlak Baik:* ${a}%
    *🔷 Ahlak Buruk:* ${b}%
    *🔸 Orang yang:* ${c}
    *🔹 Selalu:* ${d}
    *🔺 Kecerdasan:* ${e}%
    *🔻 Kenakalan:* ${f}%
    *🚀 Keberanian:* ${g}%
    *🚧 Ketakutan:* ${h}%
  `;

    const msdpn = [text + ' Anda akan menjadi orang yang Kaya, keluarga yang harmonis, memiliki ' + b + ' memiliki anak, memiliki ' + d + ' memiliki kendaraan, memiliki ' + b + ' rumah', text + ' Anda akan menjadi orang yang Sederhana, keluarga yang harmonis, memiliki ' + c + ' memiliki anak, memiliki ' + a + ' memiliki kendaraan, memiliki ' + a + ' rumah', text + ' Anda akan menjadi orang yang Miskin, keluarga yang Sederhana, memiliki ' + a + ' anak, tidak memiliki kendaraan, rumah ngontrak', text + ' Anda akan menjadi orang yang Sederhana, keluarga yang dicerai, memiliki ' + e + ' anak, memiliki ' + b + ' kendaraan, memiliki ' + b + ' rumah', text + ' Anda akan menjadi orang yang Sederhana, keluarga yang Sederhana, memiliki ' + b + ' anak, memiliki ' + b + ' kendaraan, memiliki ' + a + ' rumah', text + ' Anda akan menjadi orang yang Miskin, keluarga yang dicerai memiliki ' + b + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + a + ' rumah', text + ' Anda akan menjadi orang yang Kaya, keluarga yang Sederhana, memiliki ' + a + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + b + ' rumah', text + ' Anda akan menjadi orang yang Sederhana, keluarga yang Harmonis, memiliki ' + a + ' anak, memiliki ' + c + ' kendaraan, memiliki ' + a + ' rumah', text + ' Anda akan menjadi orang yang Miskin, tidak memiliki keluarga (jomblo), tidak memiliki anak, tidak memiliki kendaraan, tidak memiliki rumah', text + ' Anda akan menjadi orang yang Sederhana, keluarga yang Sederhana, memiliki ' + d + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + b + ' rumah', text + ' Anda akan menjadi orang yang Sederhana, keluarga yang kacau, tidak memiliki anak (Gugur), memiliki ' + b + ' kendaraan, memiliki ' + a + ' rumah', text + ' Anda akan menjadi orang yang Sangat Kaya, keluarga yang Sangat Harmonis, memiliki ' + e + ' anak, memiliki ' + f + ' kendaraan, memiliki ' + g + ' rumah', text + ' Anda akan menjadi orang yang Sangat Miskin, keluarga yang Sederhana, memiliki ' + g + ' anak, tidak memiliki kendaraan, rumah ngontrak', text + ' Anda akan menjadi orang yang Kaya, keluarga yang Pelit, memiliki ' + b + ' anak, memiliki ' + b + ' kendaraan, memiliki ' + b + ' rumah', text + ' Anda akan menjadi orang yang Sederhana, keluarga yang Pelit, memiliki ' + a + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + a + ' rumah', text + ' Anda akan menjadi orang yang Sederhana, keluarga yang dicerai, memiliki ' + b + ' anak, memiliki ' + a + ' kendaraan, rumah ngontrak', text + ' Anda akan menjadi orang yang Sangat Sederhana, keluarga yang Sakinah, memiliki ' + a + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + a + ' rumah', text + ' Anda akan menjadi orang yang Sederhana, keluarga yang Sangat Sederhana, memiliki ' + a + '' + a + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + a + ' rumah', text + ' Anda akan menjadi orang yang Sederhana, keluarga yang Sangat Sederhana, memiliki ' + b + ' anak kembar, memiliki ' + c + ' kendaraan, memiliki ' + b + ' rumah', text + ' Anda akan menjadi orang yang Sederhana keluarga yang Sederhana, memiliki ' + b + ' anak kembar dan ' + a + ' anak lagi, memiliki ' + a + ' kendaraan, memiliki ' + a + ' rumah'][getRandomValue() % 20];

    if (command == 'ceksifat') {
        await conn.reply(m.chat, cksft, m, {
            mentions: conn.parseMention(cksft),
            fileLength: fsizedoc,
            contextInfo: {
            mentionedJid: conn.parseMention(cksft),
                externalAdReply: {
                    mediaUrl: sig,
                    mediaType: 2,
                    description: wm,
                    title: 'Hai, ' + name,
                    body: botdate,
                    thumbnail: await (await conn.getFile(pp)).data,
                    sourceUrl: sig
                }
            }
        });
    }

    if (command == 'masadepannya') {
        await conn.reply(m.chat, msdpn, m, {
            mentions: conn.parseMention(msdpn),
            fileLength: fsizedoc,
            contextInfo: {
            mentionedJid: conn.parseMention(msdpn),
                externalAdReply: {
                    mediaUrl: sig,
                    mediaType: 2,
                    description: wm,
                    title: 'Hai, ' + name,
                    body: botdate,
                    thumbnail: await (await conn.getFile(pp)).data,
                    sourceUrl: sig
                }
            }
        });
    }
};

handler.help = ['ceksifat', 'masadepannya'].map(v => v + ' <nama>');
handler.tags = ['kerang', 'fun'];
handler.command = ['ceksifat', 'masadepannya'];

export default handler;