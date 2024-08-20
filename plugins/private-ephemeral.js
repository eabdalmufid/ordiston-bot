import pkg from '@adiwajshing/baileys';

const { WA_DEFAULT_EPHEMERAL } = pkg;

const options = {
    'on': WA_DEFAULT_EPHEMERAL,
    'off': 0,
    '1d': 86400,
    '7d': 604800,
    '90d': 7776000
};

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (args.length !== 2) {
        const usage = `Usage: *${usedPrefix + command} Number <options>*\nExample: *${usedPrefix + command} 628383770933 1d*\n\n[ List Options ]\n⭔ *on* ( WA Default )\n⭔ *off* ( disable )\n⭔ *1d* ( 1 hari )\n⭔ *7d* ( 7 hari )\n⭔ *90d* ( 90 hari )`;
        return m.reply(usage);
    }

    let jid = formatJid(args[0]);
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomor tidak terdaftar di WhatsApp!';

    const lowercaseText = args[1].toLowerCase();
    const selectedOption = options[lowercaseText];

    if (selectedOption !== undefined) {
        await conn.sendMessage(jid, { disappearingMessagesInChat: selectedOption });
        const response = selectedOption === 0 ? 'dimatikan' : selectedOption === WA_DEFAULT_EPHEMERAL ? 'diaktifkan' : `disetel untuk *${lowercaseText}*`;
        return m.reply(`*Ephemeral messages* berhasil ${response}.`);
    } else {
        const usage = `Usage: *${usedPrefix + command} Number <options>*\nExample: *${usedPrefix + command} 628383770933 1d*\n\n[ List Options ]\n⭔ *on* ( WA Default )\n⭔ *off* ( disable )\n⭔ *1d* ( 1 hari )\n⭔ *7d* ( 7 hari )\n⭔ *90d* ( 90 hari )`;
        return m.reply(usage);
    }
};

handler.help = ['disappearing'];
handler.tags = ['main'];
handler.command = /^(disappearing)$/i;

export default handler;

function formatJid(input) {
    input = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (input.startsWith('0')) {
        return '62' + input.substring(1) + '@s.whatsapp.net';
    } else if (input.startsWith('+62')) {
        return '62' + input.substring(3) + '@s.whatsapp.net';
    } else if (input.startsWith('62')) {
        return input + '@s.whatsapp.net';
    } else {
        return input + '@s.whatsapp.net';
    }
}