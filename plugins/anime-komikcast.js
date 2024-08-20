const KomikCast = await (await import('../lib/komikcast.js')).default;
const komikCast = new KomikCast();

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    const commandArgs = args[0] ? args[0].split('|') : null; // Memisahkan perintah dan query

    if (!commandArgs || commandArgs.length !== 2) {
        return conn.reply(m.chat, `
*Format perintah salah atau tidak valid.*

Gunakan ${usedPrefix}komikcast [search|info|render] [query]

*Contoh Penggunaan:*
1. ${usedPrefix}komikcast search One Piece
2. ${usedPrefix}komikcast info One Punch Man
3. ${usedPrefix}komikcast render Attack on Titan
        `, m);
    }

    const [action, query] = commandArgs;

    switch (action) {
        case 'search':
            const searchResult = await komikCast.search(query);

            if (searchResult.status) {
                let replyMsg = 'Hasil Pencarian Komik:\n\n';

                for (const result of searchResult.data) {
                    replyMsg += `📚 *Title:* ${result.title}\n`;
                    replyMsg += `📖 *Type:* ${result.type}\n`;
                    replyMsg += `📃 *Chapter:* ${result.chapter}\n`;
                    replyMsg += `⭐ *Score:* ${result.score}\n`;
                    replyMsg += `🔗 *URL:* [Link](${result.url})\n\n`;
                }

                conn.reply(m.chat, replyMsg, m);
            } else {
                conn.reply(m.chat, 'Komik tidak ditemukan atau terjadi kesalahan.', m);
            }
            break;

        case 'info':
            const komikInfo = await komikCast.fetch(query);

            if (komikInfo.status) {
                let replyMsg = `*Informasi Komik* 📚\n\n`;
                replyMsg += `📖 *Title:* ${komikInfo.data.title}\n`;
                replyMsg += `✍️ *Author:* ${komikInfo.data.author}\n`;
                replyMsg += `📈 *Status:* ${komikInfo.data.status}\n`;
                replyMsg += `📃 *Chapter:* ${komikInfo.data.chapter}\n`;
                replyMsg += `⭐ *Score:* ${komikInfo.data.score}\n`;
                replyMsg += `🎭 *Genre:* ${komikInfo.data.genre}\n`;
                replyMsg += `📅 *Updated:* ${komikInfo.data.updated}\n\n`;

                if (komikInfo.data.chapters.length > 0) {
                    replyMsg += '*Chapter List* 📖\n\n';

                    for (const chapter of komikInfo.data.chapters) {
                        replyMsg += `📚 *Title:* ${chapter.title}\n`;
                        replyMsg += `📅 *Release:* ${chapter.release}\n`;
                        replyMsg += `🔗 *URL:* [Link](${chapter.url})\n\n`;
                    }
                }

                conn.reply(m.chat, replyMsg, m);
            } else {
                conn.reply(m.chat, 'Tidak dapat mengambil informasi komik atau terjadi kesalahan.', m);
            }
            break;

        case 'render':
            const renderInfo = await komikCast.render(query);

            if (renderInfo.status) {
                conn.reply(m.chat, 'Gambar Komik:', m);
                for (const imageUrl of renderInfo.data) {
                    conn.sendFile(m.chat, imageUrl, '', '', m);
                }
            } else {
                conn.reply(m.chat, 'Tidak dapat merender komik atau terjadi kesalahan.', m);
            }
            break;

        default:
            conn.reply(m.chat, 'Perintah tidak valid. Gunakan format: [search|info|render] [query]', m);
    }
}

handler.help = ["komikcast"]
handler.tags = ["komik"]
handler.command = /^komikcast$/i
export default handler;