let handler = async (m, { conn, args, usedPrefix, command }) => {
    const groupMeta = await conn.groupMetadata(m.chat);
    const isRestricted = groupMeta.restrict;
    const isAnnounced = groupMeta.announce;

    const actionMap = {
        'open': { target: 'not_announcement', message: 'membuka', check: !isRestricted },
        'close': { target: 'announcement', message: 'menutup', check: isRestricted && !isAnnounced },
        'unlock': { target: 'unlocked', message: 'membuka', check: !isAnnounced },
        'lock': { target: 'lock', message: 'mengunci', check: isAnnounced && !isRestricted },
    };

    const action = args[0] || '';
    const actionDetails = actionMap[action];

    if (!actionDetails) {
        await conn.reply(m.chat, `
*Format salah! Contoh :*
○ ${usedPrefix + command} close 1menit
○ ${usedPrefix + command} open 30menit
○ ${usedPrefix + command} unlock 15menit
○ ${usedPrefix + command} lock 5menit
        `.trim(), m);
        return;
    }

    if (!actionDetails.check) {
        await conn.reply(m.chat, `Grup ini sudah dalam kondisi yang tidak dapat diubah.`, m);
        return;
    }

    const timeInput = args[1];
    const timeMatch = timeInput.match(/^(\d+)([a-zA-Z]+)$/);

    if (!timeMatch || isNaN(timeMatch[1])) {
        await conn.reply(m.chat, "Format waktu tidak valid. Gunakan format '1detik/menit/jam/hari'.", m);
        return;
    }

    const [timeValue, timeUnit] = [parseInt(timeMatch[1]), timeMatch[2].toLowerCase()];
    const timeUnits = { detik: 1000, menit: 60 * 1000, jam: 60 * 60 * 1000, hari: 24 * 60 * 60 * 1000 };

    if (!(timeUnit in timeUnits) || timeValue <= 0) {
        await conn.reply(m.chat, "Waktu yang dimasukkan tidak valid. Gunakan angka positif untuk waktu.", m);
        return;
    }

    const timeInMilliseconds = timeValue * timeUnits[timeUnit];
    const actionMessage = actionDetails.message;

    const processingMessage = await conn.reply(m.chat, `Sedang ${actionMessage} grup setelah ${timeInput}...`, m);

    setTimeout(async () => {
        await conn.groupSettingUpdate(m.chat, actionDetails.target);
        await conn.reply(m.chat, `Grup telah ${actionMessage} setelah ${timeInput}`, processingMessage);
    }, timeInMilliseconds);
};

handler.help = ['gece *open / close / unlock / lock* *waktu*'];
handler.tags = ['group'];
handler.command = /^(gece)$/i;
handler.admin = true;
handler.botAdmin = true;

export default handler;