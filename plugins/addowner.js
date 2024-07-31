let handler = async (m, { conn }) => {
    if (!m.isGroup) throw 'Perintah ini hanya bisa digunakan dalam grup!';

    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw 'Tag orang yang akan dijadikan sebagai Owner!';

    const ownerID = who.split('@')[0];
    if (global.owner.some(owner => owner[0] === ownerID)) throw 'Orang ini sudah menjadi owner!';

    global.owner.push([ownerID, await conn.getName(who) || "Owner", true]);

    const caption = `Sekarang @${ownerID} telah dijadikan sebagai Owner!`;
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });
}
handler.help = ['addowner @user']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)owner$/i
handler.owner = true

export default handler