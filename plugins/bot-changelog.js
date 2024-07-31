let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    const changelogData = conn.changelog || [];

    const reply = (pesan) => {
        conn.reply(m.chat, pesan, m);
    };

    if (args.length === 0 || args[0] === 'help') {
        reply(`📝 *Perintah Changelog:*\n\n🔹 ${usedPrefix}changelog add|nama_fitur\n🔹 ${usedPrefix}changelog del|indeks\n🔹 ${usedPrefix}changelog list\n🔹 ${usedPrefix}changelog help`);
    } else {
        const [action, ...rest] = args.join(" ").split("|");
        const actionType = action.trim().toLowerCase();

        switch (actionType) {
            case 'add':
                if (rest.length === 0) {
                    reply("Mohon berikan nama fitur yang ingin ditambahkan.");
                } else {
                    const featureName = rest.join("|").trim();
                    changelogData.push(featureName);
                    conn.changelog = changelogData;
                    reply(`✅ Fitur "${featureName}" telah ditambahkan ke changelog.`);
                }
                break;

            case 'del':
                if (rest.length === 0) {
                    reply("Mohon berikan indeks fitur yang ingin dihapus.");
                } else {
                    const indexToDelete = parseInt(rest[0]) - 1;
                    if (indexToDelete >= 0 && indexToDelete < changelogData.length) {
                        const deletedFeature = changelogData.splice(indexToDelete, 1)[0];
                        conn.changelog = changelogData;
                        reply(`❌ Fitur "${deletedFeature}" telah dihapus dari changelog.`);
                    } else {
                        reply("Indeks tidak valid. Mohon berikan indeks yang valid untuk dihapus.");
                    }
                }
                break;

            case 'list':
                if (changelogData.length === 0) {
                    reply("Changelog saat ini kosong.");
                } else {
                    let changelogMessage = "📜 *Changelog:*\n\n";
                    changelogData.forEach((feature, index) => {
                        changelogMessage += `${index + 1}. ${feature}\n`;
                    });
                    reply(changelogMessage);
                }
                break;

            default:
                reply("Perintah tidak valid. Gunakan " + usedPrefix + "changelog help untuk melihat perintah yang tersedia.");
                break;
        }
    }
};

handler.help = ["changelog"];
handler.tags = ["group", "owner"];
handler.command = /^(changelog)$/i;

export default handler;