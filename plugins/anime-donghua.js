const Anime = await(await import('../lib/donghua.js')).default;
const anime = new Anime();
let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    const commandArgs = args[0].split('|'); // Memisahkan perintah dan query

    if (commandArgs.length !== 2) {
        return conn.reply(m.chat, `Format perintah salah. Gunakan ${usedPrefix}donghua [search|info|stream|] [query]`, m);
    }

    const [action, query] = commandArgs;

    switch (action) {
        case 'search':
            const searchResult = await anime.search(query);

            if (searchResult.status) {
                conn.reply(m.chat, 'Hasil Pencarian Anime:', m);
                conn.reply(m.chat, JSON.stringify(searchResult.data, null, 2), m); // Menampilkan data anime yang ditemukan
            } else {
                conn.reply(m.chat, 'Anime tidak ditemukan atau terjadi kesalahan.', m);
            }
            break;

        case 'info':
            const animeInfo = await anime.fetch(query);

            if (animeInfo.status) {
                conn.reply(m.chat, 'Informasi Anime:', m);
                conn.reply(m.chat, JSON.stringify(animeInfo.data, null, 2), m); // Menampilkan informasi rinci anime
            } else {
                conn.reply(m.chat, 'Tidak dapat mengambil informasi anime atau terjadi kesalahan.', m);
            }
            break;

        case 'stream':
            const streamInfo = await anime.stream(query);

            if (streamInfo.status) {
                conn.reply(m.chat, 'Tautan Streaming Anime:', m);
                conn.reply(m.chat, streamInfo.data.url, m); // Menampilkan tautan streaming anime
            } else {
                conn.reply(m.chat, 'Tidak dapat menemukan tautan streaming atau terjadi kesalahan.', m);
            }
            break;

        default:
            conn.reply(m.chat, 'Perintah tidak valid. Gunakan format: [search|info|stream] [query]', m);
    }
}

handler.help = ["donghua"]
handler.tags = ["anime"]
handler.command = /^donghua$/i
export default handler;